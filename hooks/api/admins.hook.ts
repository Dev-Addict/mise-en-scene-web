import {useEffect, useState} from 'react';
import {useQuery} from '@apollo/client';

import {ChannelAdmin} from '../../types';
import {ADMINS_QUERY, AdminsQueryData, AdminsQueryVariables} from '../../api';

export const useAdmins = (filter?: {[key: string]: any}) => {
	const [admins, setAdmins] = useState<ChannelAdmin[]>([]);
	const [page, setPage] = useState(1);

	const {data, loading, refetch} = useQuery<
		AdminsQueryData,
		AdminsQueryVariables
	>(ADMINS_QUERY, {
		variables: {
			page,
			filter,
		},
		notifyOnNetworkStatusChange: true,
	});

	const loadMore = () => () => {
		setPage((page) => page + 1);
	};

	useEffect(() => {
		if (
			data &&
			admins[admins.length - 1]?.id !==
				data.admins.docs[data.admins.docs.length - 1]?.id
		)
			setAdmins((admins) => [...admins, ...data.admins.docs]);
	}, [data, loading]);

	useEffect(() => {
		(async () => {
			if (!loading && !admins.length && data?.admins?.results) {
				setPage(1);
				setAdmins([]);
				await refetch();
			}
		})();
	}, [admins, loading, data]);

	const reload = async () => {
		setPage(1);
		setAdmins([]);
		await refetch();
	};

	return {
		loading:
			loading || (!loading && !admins.length && data?.admins?.results) || false,
		admins,
		loadMore: loadMore(),
		results: data?.admins?.results,
		reload,
	};
};
