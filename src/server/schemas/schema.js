
const {
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
} = require('graphql/type');

const db = require('./queries');

var actualUserType = new GraphQLObjectType({
    name: "User_2",
    description: "User creator",
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLString),
            description: "Generated ID by RDB"
        },
        color: {
            type: new GraphQLNonNull(GraphQLString),
            description: "User theme color"
        },
        first_name: {
            type: new GraphQLNonNull(GraphQLString),
            description: "User first name"
        },
        last_name: {
            type: new GraphQLNonNull(GraphQLString),
            description: "User last name"
        },
        email: {
            type: new GraphQLNonNull(GraphQLString),
            description: "User email"
        },
        password: {
            type: new GraphQLNonNull(GraphQLString),
            description: "Sample data password"
        },
        profileImage: {
            type: new GraphQLNonNull(GraphQLString),
            description: "Generated user profile picture"
        },
        user_index: {
            type: new GraphQLNonNull(GraphQLInt),
            description: "User index"
        },
        friends: {
            type: new GraphQLList(actualUserType),
            description: "Friends",
            resolve: (user, params, source, fieldASTs) => {
                return db.getFriendsById(user.user_index).then(result => {console.log(result); return result});
            },
        },
    })
});

var userType = new GraphQLObjectType({
    name: 'User',
    description: 'User creator',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The id of the user.',
        },
        name: {
            type: GraphQLString,
            description: 'The name of the user.',
        },
        friends: {
            type: new GraphQLList(userType),
            description: 'The friends of the user, or an empty list if they have none.',
            resolve: (user, params, source, fieldASTs) => {
                return [{"id": "123", name: "Peeter"}];
            },
        }
    })
});

var schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            hello: {
                type: GraphQLString,
                resolve: function() {
                    return 'world';
                }
            },
            actual_user: {
                type: actualUserType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve: (root, {id}, source, fieldASTs) => {
                    return db.getUserById(id).then(result => {return result});
                }
            },
            all_users: {
                args: {
                    skip: {
                        name: 'skip',
                        type: GraphQLInt
                    },
                    limit: {
                        name: 'limit',
                        type: GraphQLInt
                    }
                },
                type: new GraphQLList(actualUserType),
                resolve: (root, {skip, limit}, source, fieldASTs) => {
                    return db.getAllUsers(skip, limit).then(result => {return result});
                }
            },
            user: {
                type: userType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: (root, {id}, source, fieldASTs) => {
                    return  {"id": "111", name: "Mark"};
                }
            }
        }
    }),
});

module.exports = schema;