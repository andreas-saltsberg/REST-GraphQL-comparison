import {withApollo} from 'react-apollo';
import {Button, Progress, Segment} from "semantic-ui-react";
import axios from 'axios';
import * as performance from "moment";
import {client} from "../../app";
import {AllFields, FourFields, OneField, ThreeFields, TwoFields} from "../../../queries/graphQlQueries";
import React from "react";

@withApollo
export default class AllQueryFields extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            graphQlBtnName: "Fetch with GraphQL",
            RESTBtnName: "Fetch with REST",
            requesting: false
        };

        this.fetchWithGraphQl = this.fetchWithGraphQl.bind(this);
        this.fetchWithREST=  this.fetchWithREST.bind(this);
    }

    fetchWithGraphQl() {
        const id = this.props.id;
        var UserQuery = (function (id) {
            switch (id) {
                case 1:
                    return OneField;
                case 2:
                    return TwoFields;
                case 3:
                    return ThreeFields;
                case 4:
                    return FourFields;
                default:
                    return AllFields;
            }
        })(id);

        const start = performance.now();
        this.setState({
            requesting: true
        });
        client.networkInterface.query({ // Bad implementation, this is used to bypass caching
            query: UserQuery,
        }).then((data) => {
            const end = performance.now();
            this.setState({
                graphQlBtnName : "GraphQL: " + (end-start) + " ms, " + data.data.all_users.length + " rows",
                requesting: false
            });
        }).catch((err) => {
            console.log('catch', err)
        });
    }

    fetchWithREST() {
        const start = performance.now();
        this.setState({
            requesting: true
        });
        axios.get("http://localhost:3000/api/getAllUsers").then(result => {
            const end = performance.now();
            this.setState({
                RESTBtnName: "REST: " + (end-start) + " ms, " + result.data.length + " rows",
                requesting: false
            });
        });
    }

    render() {
        return (
            <div>
                <Segment raised>
                    <h3>{this.props.name}</h3>
                    <Progress percent={100} indicating={this.state.requesting} />
                    <Button color="red" onClick={this.fetchWithGraphQl}>{this.state.graphQlBtnName}</Button>
                    <Button color="blue" onClick={this.fetchWithREST}>{this.state.RESTBtnName}</Button>
                </Segment>
            </div>
        );
    }
}