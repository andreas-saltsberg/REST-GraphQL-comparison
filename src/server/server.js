'use strict'

const express = require( 'express' );
const logger = require( 'morgan' );
const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );
const helmet = require( 'helmet' );
const config = require('./config/server');
const schema = require('./schemas/schema');
const graphqlHTTP = require('express-graphql');

const app = express();

app.use( logger( 'dev' ) );
app.use( bodyParser.urlencoded( {
    extended: false
} ) );
app.use( bodyParser.json() );
app.use( cors() );
app.use( helmet() );

const general = require( './routes/general').router;
const connect = require( './lib/connect' );

app.use( connect.connect );
app.use('/api/', general);
app.use('/graphql', graphqlHTTP((request) => ({
    schema: schema,
    graphiql: true,
    request
})));
app.use( connect.close );


app.use( ( error, request, response, next ) => {
    response.status( error.status || 500 );
    response.json( {
        error: error.message
    } );
} );

app.use( ( request, response, next ) => {
    let error = new Error( 'Not Found' );
    error.status = 404;
    response.json( error );
} );

const server = app.listen( config.express.port, function() {
    const host = server.address().address;
    const port = server.address().port;

    console.log( 'App is listening on http://%s:%s', host, port );
} );