import React, {FC} from 'react';
import styled, {useTheme} from 'styled-components';

import {useAdmins} from '../../../../hooks';
import {Channel, Size, Theme, ThemeMode} from '../../../../types';
import {movieLoaderDark, movieLoaderLight} from '../../../../assets';
import {AdminCard, Animation, Button, Text} from '../../../shared';

const Container = styled.div`
	margin: 10px 0;
`;

interface Props {
	channel: Channel;
}

export const ChannelAdmins: FC<Props> = ({channel}) => {
	const {admins, loadMore, loading, results} = useAdmins({channel: channel.id});

	const {mode} = useTheme() as Theme;

	const animationData =
		mode === ThemeMode.LIGHT ? movieLoaderLight : movieLoaderDark;

	const onLoadMoreClick = () => () => !loading && loadMore();

	const renderAdmins = () =>
		admins.map((admin) => (
			<AdminCard admin={admin} key={admin.id} channel={channel} />
		));

	return (
		<Container>
			<div>{renderAdmins()}</div>
			{loading && (
				<div>
					<Animation data={animationData} />
					<Text size={Size.MASSIVE} center text="در حال بارگذاری مدیر ها..." />
				</div>
			)}
			{!loading && !admins.length && (
				<Text size={Size.MASSIVE} center text="این کانال هیج مدیری ندارد!" />
			)}
			{!!admins.length && admins.length !== results && (
				<Button outline disabled={loading} primary onClick={onLoadMoreClick()}>
					بارگذاری بیشتر
				</Button>
			)}
		</Container>
	);
};
