import React from 'react';
import { render } from 'react-dom';
import {
    BrowserRouter,
    Route
} from 'react-router-dom'
import './App.css';
import Home from "./containers/Home";

const App = () => (
    <BrowserRouter>
        <div>
            <Route exact path="/" component={Home}/>
        </div>
    </BrowserRouter>
);

render(
    <App />
, document.getElementById('app'));
