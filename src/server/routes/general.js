'use strict';
const router = require('express').Router();
const graphql = require("graphql");
const schema = require('../schemas/schema');
const names = require("../sample_data/names.json");
const r = require('rethinkdb');

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

router.post('/generate-users',( request, response ) => {
    let colors = ["#2980b9", "#e74c3c", "#c0392b", "#8e44ad", "#9b59b6", "#2c3e50", "#27ae60", "#f39c12", "#16a085"];
    let imageUrls = ["https://semantic-ui.com/images/avatar/large/elliot.jpg", "https://semantic-ui.com/images/avatar/large/jenny.jpg",
    "https://semantic-ui.com/images/avatar/large/chris.jpg", "https://semantic-ui.com/images/avatar/large/joe.jpg", "https://semantic-ui.com/images/avatar/large/stevie.jpg",
    "https://semantic-ui.com/images/avatar/large/christian.jpg", "https://semantic-ui.com/images/avatar/large/steve.jpg", "http://semantic-ui.com/images/avatar/large/ade.jpg",
    "https://semantic-ui.com/examples/assets/images/avatar/tom.jpg", "https://semantic-ui.com/images/avatar/large/daniel.jpg", "https://semantic-ui.com/images/avatar/large/justen.jpg"];

    r.db("sample_data").table("users")
        .insert(generateUsers(names.first_names, names.last_names, colors, imageUrls))
        .run( request._rdb )
        .then( result => {
            response.send("Done");
        } );
});

function generateUsers(firstNames, lastNames, colors, profileImages) {
    var users = [];
    var index = 0;
    for (var i = 0; i < firstNames.length; i++) {
        for (var j = 0; j < lastNames.length; j++) {
            index++;
            var user = {
                first_name: firstNames[i],
                last_name: lastNames[j],
                email: firstNames[i] + "." + lastNames[j] + "@gmail.com",
                user_index: index,
                password: "asd" + firstNames[i] + "asd" + lastNames[j],
                color: colors[Math.floor(Math.random()*colors.length)],
                profileImage: profileImages[Math.floor(Math.random()*profileImages.length)],
            };
            if (index > 5) {
                user["friends"] = [index - 1, index - 2, index - 3, index - 4, index - 5]
            }
            users.push(user);
        }
    }

    return users;
}

module.exports = {router};