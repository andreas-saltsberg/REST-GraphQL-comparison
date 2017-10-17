import React from 'react';

import {gql, graphql, withApollo} from 'react-apollo';
import {Button, Progress} from "semantic-ui-react";
import axios from 'axios';
import * as performance from "moment";
import {client} from "../app";

@withApollo
export default class ComparisonPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            graphQlBtnName: "Fetch with GraphQL",
            RESTBtnName: "Fetch with REST"
        };

        this.fetchWithGraphQl = this.fetchWithGraphQl.bind(this);
        this.fetchWithREST=  this.fetchWithREST.bind(this);
    }

    fetchWithGraphQl() {
        const UsersQuery = gql`
            query RootQueryType {    
              all_users {
                first_name
                last_name
                profileImage
                color
                user_index
                email
                id
              },
            }`;

        const start = performance.now();
        client.networkInterface.query({ // Bad implementation, this is used to bypass caching
            query: UsersQuery,
        }).then((data) => {
            const end = performance.now();
            this.setState({
                graphQlBtnName : "GraphQL: " + (end-start) + " ms, " + data.data.all_users.length + " rows"
            });
        }).catch((err) => {
            console.log('catch', err)
        });
    }

    fetchWithREST() {
        const start = performance.now();
        axios.get("http://localhost:3000/api/getAllUsers").then(result => {
                const end = performance.now();
                this.setState({
                    RESTBtnName: "REST: " + (end-start) + " ms, " + result.data.length + " rows"
                });
        });
    }

    render() {
        return (
            <div>
                <Progress percent={100} indicating />
                <Button color="red" onClick={this.fetchWithGraphQl}>{this.state.graphQlBtnName}</Button>
                <Button color="blue" onClick={this.fetchWithREST}>{this.state.RESTBtnName}</Button>
            </div>
        );
    }
}




// export default Home;