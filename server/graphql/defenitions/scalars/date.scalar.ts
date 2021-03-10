import {Kind} from 'graphql';
import {scalarType} from 'nexus';

export const DateScalar = scalarType({
	name: 'Date',
	asNexusMethod: 'date',
	parseValue(value) {
		return new Date(value);
	},
	serialize(value) {
		return value.getTime();
	},
	parseLiteral(ast) {
		if (ast.kind === Kind.INT || ast.kind === Kind.STRING)
			return new Date(ast.value);

		return null;
	},
});
