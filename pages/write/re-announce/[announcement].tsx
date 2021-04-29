import React, {useEffect} from 'react';
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import styled from 'styled-components';
import Cookie from 'js-cookie';

import {
	Announce,
	AnnouncementCard,
	ErrorPage,
	Header,
	Meta,
} from '../../../components';
import {Announcement, Props} from '../../../types';
import {useAuth, useWindowSize} from '../../../hooks';
import {cookieParser} from '../../../utils';
import {getAnnouncement} from '../../../helpers';

interface ContainerProps {
	height: number;
}

const Container = styled.div<ContainerProps>`
	width: 800px;
	margin: 10px auto;
	display: flex;
	flex-direction: column;

	@media only screen and (max-width: 1000px) {
		width: auto;
		margin: 10px 20px;
	}
`;

interface InitialProps {
	announcement?: Announcement;
}

const ReAnnounce: NextPage<Props & InitialProps, InitialProps> = ({
	setTheme,
	announcement,
}) => {
	const router = useRouter();
	const {asPath} = router;

	const {isSigned, isLoading, user} = useAuth();

	const {height} = useWindowSize();

	if (!announcement)
		return (
			<ErrorPage code={404} title="گفت و گو پیدا نشد!" setTheme={setTheme} />
		);

	const onAnnounce = () => () => router.push(`/users/${user?.username}`);

	useEffect(() => {
		if (!isLoading && !isSigned) router.push(`/sign?callback=${asPath}`);
	}, []);

	return (
		<div>
			<Meta title="بازگویی گفت و گو" />
			<Header setTheme={setTheme} />
			<Container height={height}>
				<AnnouncementCard announcement={announcement} border />
				<Announce onAnnounce={onAnnounce()} reAnnouncement={announcement.id} />
			</Container>
		</div>
	);
};

ReAnnounce.getInitialProps = async ({query: {announcement: id}, req}) => {
	const token =
		cookieParser(req?.headers?.cookie || '')['auth-token'] ||
		Cookie.get('auth-token');

	return {
		announcement: await getAnnouncement(id as string, token || ''),
	};
};

export default ReAnnounce;
