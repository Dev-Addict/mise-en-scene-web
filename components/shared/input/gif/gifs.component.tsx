import React, {ChangeEventHandler, FC, useEffect, useState} from 'react';

import {
	FIND_GIFS_QUERY,
	FindGifsVariables,
	GifResult,
	TRENDING_GIFS_QUERY,
	TrendingGifsVariables,
} from '../../../../api';
import {Input} from '../input';
import {Button} from '../../native';
import {
	Container,
	Gif,
	GifData,
	GifsContainer,
	InputContainer,
	Main,
	MessageContainer,
} from './gifs-components.component';
import {useGifs} from '../../../../hooks';

interface Props {
	onSelect?: (gif: GifResult) => void;
}

export const Gifs: FC<Props> = ({onSelect}) => {
	const [trendingPage, setTrendingPage] = useState(1);
	const [findPage, setFindPage] = useState(1);
	const [query, setQuery] = useState('');

	const {gifs: trendingGifs, loading: trendingLoading} = useGifs<
		any,
		TrendingGifsVariables
	>(TRENDING_GIFS_QUERY, {page: trendingPage}, 'trendingGifs');
	const {gifs: findGifs, loading: findLoading} = useGifs<
		any,
		FindGifsVariables
	>(FIND_GIFS_QUERY, {page: findPage, query}, 'findGifs');

	const onInputChange = (): ChangeEventHandler<HTMLInputElement> => ({
		target: {value},
	}) => setQuery(value);
	const onLoadMoreClick = () => () =>
		query
			? setFindPage((page) => page + 1)
			: setTrendingPage((page) => page + 1);
	const onGifClick = (gif: GifResult) => () => onSelect && onSelect(gif);

	const renderGifs = () =>
		(query ? findGifs : trendingGifs).map((gif) => (
			<Gif onClick={onGifClick(gif)}>
				<img src={`/image/gif/${gif.url}`} alt={gif.title} />
				<GifData>{gif.title}</GifData>
			</Gif>
		));

	useEffect(() => {
		setFindPage(1);
	}, [query]);

	return (
		<Container>
			<InputContainer>
				<Input
					value={query}
					placeholder="جستجو (انگلیسی بهتر است.)"
					onChange={onInputChange()}
					primary
					name="query"
				/>
			</InputContainer>
			<Main>
				{(query ? findPage : trendingPage) === 1 &&
				(query ? findLoading : trendingLoading) ? (
					<MessageContainer>درحال بارگذاری اطلاعات...</MessageContainer>
				) : (query ? findGifs : trendingGifs).length ? (
					<>
						<GifsContainer>{renderGifs()}</GifsContainer>
						<Button
							primary
							fill
							onClick={onLoadMoreClick()}
							disabled={query ? findLoading : trendingLoading}
							type="button">
							بارگذاری بیشتر
						</Button>
					</>
				) : (
					<MessageContainer>اطلاعاتی دریافت نکردیم.</MessageContainer>
				)}
			</Main>
		</Container>
	);
};
