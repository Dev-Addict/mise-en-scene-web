import {gql} from '@apollo/client';
import {Channel} from '../../../types';

export const UPDATE_CHANNEL_MUTATION = gql`
	mutation UpdateChannel(
		$id: ID!
		$cover: Upload
		$handle: Username
		$name: String
	) {
		updateChannel(
			id: $id
			data: {cover: $cover, handle: $handle, name: $name}
		) {
			id
		}
	}
`;

export interface UpdateChannelMutationData {
	updateChannel: Channel;
}

export interface UpdateChannelMutationVariables {
	id: string;
	cover?: File;
	handle?: string;
	name?: string;
}
