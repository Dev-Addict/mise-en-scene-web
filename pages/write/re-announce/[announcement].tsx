import React, {useEffect} from 'react';
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import Error from 'next/error';
import styled from 'styled-components';

import {Announce, AnnouncementCard, Header} from '../../../components';
import {Announcement, Props} from '../../../types';
import {useAuth, useWindowSize} from '../../../hooks';
import {cookieParser} from '../../../utils';
import Cookie from 'js-cookie';
import {
	ANNOUNCEMENT_QUERY,
	AnnouncementQueryData,
	AnnouncementQueryVariables,
	apolloClient,
} from '../../../api';

interface ContainerProps {
	height: number;
}

const Container = styled.div<ContainerProps>`
	width: 1000px;
	height: ${({height}) => height - 80}px;
	margin: auto;
	display: flex;
	flex-direction: column;
`;

interface InitialProps {
	announcement?: Announcement;
}

const ReAnnounce: NextPage<Props & InitialProps, InitialProps> = ({
	setTheme,
	announcement,
}) => {
	const router = useRouter();

	const {isSigned, isLoading, user} = useAuth();

	const {height} = useWindowSize();

	if (!announcement)
		return <Error statusCode={404} title="گفت و گو پیدا نشد!" />;

	const onAnnounce = () => () => router.push(`/users/${user?.username}`);

	useEffect(() => {
		if (!isLoading && !isSigned) router.push('/sign?callback=/write');
	}, []);

	return (
		<div>
			<Header setTheme={setTheme} />
			<Container height={height}>
				<AnnouncementCard announcement={announcement} border />
				<Announce onAnnounce={onAnnounce()} reAnnouncement={announcement.id} />
			</Container>
		</div>
	);
};

ReAnnounce.getInitialProps = async ({query: {announcement: id}, req}) => {
	let announcement: Announcement | undefined = undefined;

	const token =
		cookieParser(req?.headers?.cookie || '')['auth-token'] ||
		Cookie.get('auth-token');

	try {
		const {data} = await apolloClient.query<
			AnnouncementQueryData,
			AnnouncementQueryVariables
		>({
			query: ANNOUNCEMENT_QUERY,
			variables: {
				id: id as string,
			},
			context: {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		});

		announcement = data.announcement || undefined;
	} catch (error) {}

	return {
		announcement,
	};
};

export default ReAnnounce;
