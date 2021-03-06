// sample graphql server deployed with firebase functions
// minimal server setup
// via http://graphql.org/graphql-js/running-an-express-graphql-server/
const functions = require('firebase-functions');
const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');

// Init express
const app = express();

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
type organisation{
	"""
	Unique ID for this organisation
	"""
	id: ID
	"""
	Name for the organisation
	"""
	name: String
	"""
	Is this organisation currently enabled for use?
	"""
	active: Boolean
}

type Query{
	organisations: [organisation!]
}
schema{
	query: Query
}
  
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

app.use('/', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

exports.graphql = functions.https.onRequest(app);