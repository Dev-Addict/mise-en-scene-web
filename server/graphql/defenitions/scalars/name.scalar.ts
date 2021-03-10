import {GraphQLError, Kind} from 'graphql';
import {scalarType} from 'nexus';

import {nameValidator} from '../../../../utils';

export const NameScalar = scalarType({
	name: 'Name',
	asNexusMethod: 'name',
	parseValue: nameValidator,
	serialize: nameValidator,
	parseLiteral(ast) {
		if (ast.kind !== Kind.STRING)
			throw new GraphQLError(
				`Can only validate strings as names but got a: ${ast.kind}`
			);

		return nameValidator(ast.value);
	},
});
