import {gql} from '@apollo/client';

import {ChannelAdmin} from '../../../../types';

export const ADMINS_QUERY = gql`
	query AdminsQuery($page: Int, $filter: JSON) {
		admins(page: $page, filter: $filter) {
			docs {
				id
				accepted
				userData {
					firstname
					lastname
					displayName
					username
					avatar
				}
			}
			results
		}
	}
`;

export interface AdminsQueryData {
	admins: {
		docs: ChannelAdmin[];
		results: number;
	};
}

export interface AdminsQueryVariables {
	page?: number;
	filter?: {[key: string]: any};
}
