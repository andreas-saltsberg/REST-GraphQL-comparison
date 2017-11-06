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
        const id = this.props.id;
        const apiUrl = id === 3 ? "http://localhost:3000/api/gibberish/one" : "http://localhost:3000/api/gibberish";
        return new Promise(function(resolve) {
            const start = performance.now();
            axios.get(apiUrl).then(result => {
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
                    <Progress percent={100} indicating={this.state.requesting} size="small"/>
                    <Button color="blue" onClick={this.compare} loading={this.state.requesting}>Compare</Button>
                    <ResponsiveContainer width='100%' aspect={4.0/1.0}>
                        <BarChart data={[  {name: 'GraphQL', time: this.state.graphQlTime, size: parseFloat(this.state.graphQlBytes)},
                            {name: 'REST', time: this.state.restTime, size: parseFloat(this.state.restBytes)},]}>
                            <XAxis dataKey="name"/>
                            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" label={({ viewBox }) => <AxisLabel axisType="yAxis" {...viewBox}>Time (ms)</AxisLabel>} />
                            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" label={({ viewBox }) => <AxisLabel axisType="yAxis" {...viewBox}>Size (MB)</AxisLabel>}/>
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

function renderText(child, x, y, rotate, stroke, key) {
    if (child && child.content) {
        return (<text
            key={key}
            x={x}
            y={y}
            transform={`rotate(${rotate})`}
            textAnchor="middle"
            stroke={stroke}
            {...child.props}>
            {child.content}
        </text>);
    }

    return (<text
        key={key}
        x={x}
        y={y}
        transform={`rotate(${rotate})`}
        textAnchor="middle"
        stroke={stroke}>{child}</text>);
}

export function AxisLabel({ axisType, x, y, width, height, stroke, children }) {
    const isVert = axisType === 'yAxis';
    const cx = isVert ? x + 30: x + (width / 2);
    const cy = isVert ? (height / 2) + y : y + height;
    const rot = isVert ? `270 ${cx} ${cy}` : 0;
    const lineHeight = 20;

    if (children.length > 1 && children.map) {
        return (<g>
            {children.map((child, index) =>
                renderText(
                    child,
                    cx,
                    cy + index * lineHeight,
                    rot,
                    stroke,
                    index)
            )}
        </g>);
    }

    return renderText(children, cx, cy, rot, stroke);
}

AxisLabel.propTypes = {
    axisType: React.PropTypes.oneOf(['yAxis', 'xAxis']),
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    stroke: React.PropTypes.string,
    children: React.PropTypes.any,
};