import {useMutation} from '@apollo/client';

import {
	VIEW_MUTATION,
	ViewMutationData,
	ViewMutationVariables,
} from '../../api';
import {useAuth, useSocket} from '../contexts';
import {useEffect} from 'react';

export interface ViewOptions {
	page: string;
	post?: string;
	channel?: string;
	conversations?: boolean;
	posts?: boolean;
}

export const useView = (options: ViewOptions) => {
	const {socket} = useSocket();

	const {token} = useAuth();

	const [view] = useMutation<ViewMutationData, ViewMutationVariables>(
		VIEW_MUTATION,
		{
			context: {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
			variables: options,
		}
	);

	useEffect(() => {
		(async () => {
			const {data} = await view();

			await socket?.emit('view', data?.view?.id, options.page);
		})();

		return () => {
			(async () => {
				await socket?.emit('leave');
			})();
		};
	}, [options.page, socket]);
};
