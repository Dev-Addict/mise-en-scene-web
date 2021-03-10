import {GraphQLError, Kind} from 'graphql';
import {scalarType} from 'nexus';

import {usernameValidator} from '../../../../utils';

export const UsernameScalar = scalarType({
	name: 'Username',
	asNexusMethod: 'username',
	parseValue: usernameValidator,
	serialize: usernameValidator,
	parseLiteral(ast) {
		if (ast.kind !== Kind.STRING)
			throw new GraphQLError(
				`Can only validate strings as usernames but got a: ${ast.kind}`
			);

		return usernameValidator(ast.value);
	},
});
