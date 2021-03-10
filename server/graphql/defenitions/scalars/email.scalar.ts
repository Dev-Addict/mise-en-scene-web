import {scalarType} from 'nexus';
import {GraphQLError, Kind} from 'graphql';
import {emailValidator} from '../../../../utils';

export const EmailScalar = scalarType({
	name: 'Email',
	asNexusMethod: 'email',
	parseValue: emailValidator,
	serialize: emailValidator,
	parseLiteral(ast) {
		if (ast.kind !== Kind.STRING)
			throw new GraphQLError(
				`Can only validate strings as emails but got a: ${ast.kind}`
			);

		return emailValidator(ast.value);
	},
});
