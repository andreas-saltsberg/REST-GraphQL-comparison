'use strict';
const router = require('express').Router();
const graphql = require("graphql");
const schema = require('../schemas/schema');

router.get('/products',( request, response ) => {
    response.send("Hello world!!!")
});

router.get('/graphql', function* () {
    let query = this.query.query;
    let params = this.query.params;

    let resp = yield graphql(schema, query, '', params);

    if (resp.errors) {
        this.status = 400;
        this.body = {
            errors: resp.errors
        };
        return;
    }

    this.body = resp;
});

module.exports = {router};