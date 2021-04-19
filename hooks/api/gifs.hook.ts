import {useEffect, useState} from 'react';
import {DocumentNode, TypedDocumentNode, useQuery} from '@apollo/client';

import {GifResult} from '../../api';

interface VariablesType {
	page?: number;

	[key: string]: any;
}

export const useGifs = <
	TData extends {[key: string]: GifResult[]},
	TVariables extends VariablesType
>(
	query: DocumentNode | TypedDocumentNode<TData, TVariables>,
	variables: TVariables,
	gifField: keyof TData
) => {
	const [gifs, setGifs] = useState<GifResult[]>([]);

	const {data, loading} = useQuery<TData, TVariables>(query, {
		variables,
	});

	useEffect(() => {
		setGifs([]);
	}, [variables.query]);

	useEffect(() => {
		if (
			data &&
			gifs[gifs.length - 1]?.id !==
				data[gifField][data[gifField].length - 1]?.id
		)
			setGifs((gifs) => [...gifs, ...data[gifField]]);
	}, [data]);

	return {loading, gifs};
};
