import {withApollo} from 'react-apollo';
import {Button, Progress, Segment} from "semantic-ui-react";
import axios from 'axios';
import * as performance from "moment";
import {client} from "../../app";
import {AllFields, EightFields, OneField} from "../../../queries/graphQlQueries";
import React from "react";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from "Recharts"

@withApollo
export default class AllQueryFields extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            graphQlBtnName: "Fetch with GraphQL",
            RESTBtnName: "Fetch with REST",
            restTime: 0,
            restBytes: 0,
            graphQlTime: 0,
            graphQlBytes: 0,
            requesting: false
        };

        this.fetchWithGraphQl = this.fetchWithGraphQl.bind(this);
        this.fetchWithREST=  this.fetchWithREST.bind(this);
        this.compare = this.compare.bind(this);
    }

    fetchWithGraphQl() {
        const id = this.props.id;
        var UserQuery = (function (id) {
            switch (id) {
                case 1:
                    return OneField;
                case 2:
                    return EightFields;
                case 3:
                    return OneField;
                default:
                    return AllFields;
            }
        })(id);
        return new Promise(function (resolve) {
            const start = performance.now();
            client.networkInterface.query({ // Bad implementation, this is used to bypass caching
                query: UserQuery,
            }).then((data) => {
                const end = performance.now();
                console.log(data.data.gibberish[0])
                resolve({time: (end - start), bytes: (JSON.stringify(data.data.gibberish).length / 1024 / 1024).toFixed(2)});
            }).catch((err) => {
                resolve({time: 0, bytes: 0})
            });
        })
    }

    fetchWithREST() {
        return new Promise(function(resolve) {
            const start = performance.now();
            axios.get("http://localhost:3000/api/gibberish").then(result => {
                const end = performance.now();
                resolve({time: (end - start), bytes: (JSON.stringify(result.data).length / 1024 / 1024).toFixed(2)});
            });
        })

    }

    compare() {
        this.setState({
            requesting: true
        });
        this.fetchWithREST().then(result => {
            this.fetchWithGraphQl().then(result2 => {
                console.log(result2)
                console.log(result)

                this.setState({
                    requesting: false,
                    graphQlTime: result2.time,
                    graphQlBytes: result2.bytes,
                    restTime: result.time,
                    restBytes: result.bytes
                });
            })
        });
    }

    render() {
        return (
            <div>
                <Segment raised>
                    <h3>{this.props.name}</h3>
                    <Progress percent={100} indicating={this.state.requesting} />
                    <Button color="blue" onClick={this.compare}>Compare</Button>
                    <ResponsiveContainer width='100%' aspect={4.0/1.0}>
                        <BarChart data={[  {name: 'GraphQL', time: this.state.graphQlTime, size: parseFloat(this.state.graphQlBytes)},
                            {name: 'REST', time: this.state.restTime, size: parseFloat(this.state.restBytes)},]}>
                            <XAxis dataKey="name"/>
                            <YAxis yAxisId="left" orientation="left" stroke="#8884d8"/>
                            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Tooltip/>
                            <Legend />
                            <Bar yAxisId="left" dataKey="time" fill="#8884d8" />
                            <Bar yAxisId="right" dataKey="size" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </Segment>
            </div>
        );
    }
}