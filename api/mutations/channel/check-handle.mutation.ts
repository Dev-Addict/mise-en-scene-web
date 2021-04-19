import {gql} from '@apollo/client';

export const CHECK_HANDLE_MUTATION = gql`
	mutation CheckHandle($handle: Username!) {
		checkHandle(data: {handle: $handle})
	}
`;

export interface CheckHandleMutationData {
	checkHandle: boolean;
}

export interface CheckHandleMutationVariables {
	handle: string;
}
