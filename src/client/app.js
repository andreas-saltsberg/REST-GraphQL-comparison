import React from 'react';
import { render } from 'react-dom';
import {
    BrowserRouter,
    Route
} from 'react-router-dom'
import './App.css';
import Home from "./containers/Home";

import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo';
import AllUsersList from "./components/AllUsersList";
import MasonryList from "./components/MasonryList";

const client = new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: 'http://localhost:3000/graphql',
    }),
});

const App = () => (
    <ApolloProvider client={client}>
        <BrowserRouter>
            <div>
                <Route exact path="/" component={Home}/>
                <Route exact path="/masonry" component={MasonryList}/>
            </div>
        </BrowserRouter>
    </ApolloProvider>
);

render(
    <App />
, document.getElementById('app'));
