import {scalarType} from 'nexus';
import {GraphQLError, Kind} from 'graphql';

import {authKeyValidator} from '../../../../utils';

export const AuthKeyScalar = scalarType({
	name: 'AuthKey',
	asNexusMethod: 'authKey',
	parseValue: authKeyValidator,
	serialize: authKeyValidator,
	parseLiteral(ast) {
		if (ast.kind !== Kind.STRING)
			throw new GraphQLError(
				`Can only validate strings as authKeys but got a: ${ast.kind}`
			);

		return authKeyValidator(ast.value);
	},
});
