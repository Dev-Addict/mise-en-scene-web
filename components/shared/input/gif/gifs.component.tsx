import React, {ChangeEventHandler, FC, useEffect, useState} from 'react';
import Image from 'next/image';
import {useQuery} from '@apollo/client';
import styled from 'styled-components';

import {
	FIND_GIFS_QUERY,
	FindGifsData,
	FindGifsVariables,
	GifResult,
	TRENDING_GIFS_QUERY,
	TrendingGifsData,
	TrendingGifsVariables,
} from '../../../../api';
import {StyledProps} from '../../../../types';
import {Input} from '../input';
import {Button} from '../../native';

const Container = styled.div<StyledProps>`
	width: 324px;
	direction: rtl;
	font-size: 16px;
	border-radius: 5px;
	box-shadow: 3px 0 6px 0 ${({theme: {primary}}) => primary}29;
	border: 1px solid ${({theme: {primary}}) => primary}4C;
	background-color: ${({theme: {background}}) => background};
	margin-bottom: 10px;
`;

const InputContainer = styled.div`
	padding: 10px 0;

	& > * {
		width: 100%;
	}
`;

const Main = styled.div`
	height: 360px;
	border-radius: 0 0 5px 5px;
	overflow-x: hidden;
	overflow-y: auto;
`;

const GifsContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-auto-rows: 1fr;
`;

const Gif = styled.div`
	position: relative;
	height: 144px;
	margin: 4px;
	border-radius: 5px;
	overflow: hidden;
	border: 2px solid ${({theme: {foreground}}) => foreground}4C;

	& > div:last-child {
		opacity: 0;
	}

	&:hover {
		box-shadow: 3px 0 6px 0 ${({theme: {primary}}) => primary}29;
		border-color: ${({theme: {primary}}) => primary}4C;

		& > div:last-child {
			opacity: 1;
		}
	}
`;

const GifData = styled.div<StyledProps>`
	width: 100%;
	position: absolute;
	bottom: 5px;
	text-align: center;
	background-color: ${({theme: {background}}) => background}80;
	color: ${({theme: {foreground}}) => foreground};
	font-size: 12px;
`;

const MessageContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 20px;
	font-size: 16px;
`;

interface Props {
	onSelect?: (gif: GifResult) => void;
}

export const Gifs: FC<Props> = ({onSelect}) => {
	const [trendingPage, setTrendingPage] = useState(1);
	const [findPage, setFindPage] = useState(1);
	const [query, setQuery] = useState('');
	const [trendingGifs, setTrendingGifs] = useState<GifResult[]>([]);
	const [findGifs, setFindGifs] = useState<GifResult[]>([]);

	const {data: trendingData, loading: trendingLoading} = useQuery<
		TrendingGifsData,
		TrendingGifsVariables
	>(TRENDING_GIFS_QUERY, {
		variables: {
			page: trendingPage,
		},
	});
	const {data: findData, loading: findLoading} = useQuery<
		FindGifsData,
		FindGifsVariables
	>(FIND_GIFS_QUERY, {
		variables: {
			query,
			page: findPage,
		},
	});

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
				<Image src={`/image/gif/${gif.url}`} width="180px" height="180px" />
				<GifData>{gif.title}</GifData>
			</Gif>
		));

	useEffect(() => {
		setFindPage(1);
		setFindGifs([]);
	}, [query]);

	useEffect(() => {
		if (
			trendingData &&
			trendingGifs[trendingGifs.length - 1]?.id !==
				trendingData.trendingGifs[trendingData.trendingGifs.length - 1]?.id
		)
			setTrendingGifs((gifs) => [...gifs, ...trendingData.trendingGifs]);
	}, [trendingData]);

	useEffect(() => {
		if (
			findData &&
			findGifs[findGifs.length - 1]?.id !==
				findData.findGifs[findData.findGifs.length - 1]?.id
		)
			setFindGifs((gifs) => [...gifs, ...findData.findGifs]);
	}, [findData]);

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
