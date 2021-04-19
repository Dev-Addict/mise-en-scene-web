import {gql} from '@apollo/client';

import {Channel} from '../../../types';

export const REQUEST_CHANNEL_MUTATION = gql`
	mutation RequestChannel($handle: Username!, $name: String!, $cover: Upload) {
		requestChannel(data: {handle: $handle, name: $name, cover: $cover}) {
			id
		}
	}
`;

export interface RequestChannelMutationData {
	requestChannel: Channel;
}

export interface RequestChannelMutationVariables {
	handle: string;
	name: string;
	cover?: File;
}
