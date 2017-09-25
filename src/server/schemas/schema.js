const {
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
} = require('graphql/type');

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
                return [{"id": "123", name: "Peeter", "friends": []}];
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
            user: {
                type: userType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: (root, {id}, source, fieldASTs) => {
                    return  {"id": "111", name: "Mark", "friends": []};
                }
            }
        }
    }),
});

module.exports = schema;