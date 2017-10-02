var Promise = require("bluebird");
var r = require('rethinkdb');

const dbConfig = {
    host: 'localhost',
    port: 28015,
    db: 'sample_data'
};

const connect = ()  => {
    return new Promise((resolve, reject) => {
        r.connect({
            host: dbConfig.host,
            port: dbConfig.port
        }).then((connection)=>{
            resolve(connection);
        }).catch((e) =>{
            reject(e);
        });
    })
};


function getFriendsById(id) {
    return new Promise( (resolve, reject ) => {
        connect().then( (connection) => {
            r.db("sample_data").table("users").getAll(r.args(r.db("sample_data").table("users").getAll(id, {"index": "user_index"}).getField("friends").nth(0)), {index:"user_index"})
            .run(connection).then((cursor) => {
                return cursor.toArray()
            }).then( (result) => {
                resolve(result);
            }).then(() => {
                connection.close();
            }).catch((err) => {
                connection.close();
                reject(err);
            });
        }).catch((error) => {
            console.log("Connection error: ", error);
            reject(error);
        });
    });
}

function getAllUsers(skip, limit) {
    let limit2 = limit || 20000;
    let skip2 = skip || 0;
    console.log(skip2);
    return new Promise( (resolve, reject ) => {
        connect().then( (connection) => {
            r.db("sample_data").table("users").skip(skip2).limit(limit2).run(connection).then((cursor) => {
                return cursor.toArray()
            }).then( (result) => {
                resolve(result);
            }).then(() => {
                connection.close();
            }).catch((err) => {
                connection.close();
                reject(err);
            });
        }).catch((error) => {
            console.log("Connection error: ", error);
            reject(error);
        });
    });
}

function getUserById(id) {
    return new Promise( (resolve, reject ) => {
        connect().then( (connection) => {
            r.db("sample_data").table("users").getAll(id, {index: 'user_index'}).run(connection).then((cursor) => {
                return cursor.toArray()
            }).then( (result) => {
                resolve(result[0]);
            }).then(() => {
                connection.close();
            }).catch((err) => {
                connection.close();
                reject(err);
            });
        }).catch((error) => {
            console.log("Connection error: ", error);
            reject(error);
        });
    });
}

exports.getUserById = getUserById;
exports.getFriendsById = getFriendsById;
exports.getAllUsers = getAllUsers;