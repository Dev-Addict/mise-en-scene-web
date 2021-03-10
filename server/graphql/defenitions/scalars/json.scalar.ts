import GraphQLJSON from 'graphql-type-json';
import {scalarType} from 'nexus';

export const JSONScalar = scalarType({
	name: 'JSON',
	asNexusMethod: 'json',
	parseValue: GraphQLJSON.parseValue,
	serialize: GraphQLJSON.serialize,
	parseLiteral: GraphQLJSON.parseLiteral,
});
