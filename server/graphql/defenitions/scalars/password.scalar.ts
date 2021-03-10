import {GraphQLError, Kind} from 'graphql';
import {scalarType} from 'nexus';

import {passwordValidator} from '../../../../utils';

export const PasswordScalar = scalarType({
	name: 'Password',
	asNexusMethod: 'password',
	parseValue: passwordValidator,
	serialize: passwordValidator,
	parseLiteral(ast) {
		if (ast.kind !== Kind.STRING)
			throw new GraphQLError(
				`Can only validate strings as passwords but got a: ${ast.kind}`
			);

		return passwordValidator(ast.value);
	},
});
