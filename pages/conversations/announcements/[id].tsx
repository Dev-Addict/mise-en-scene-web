import React, {useEffect} from 'react';
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import Cookie from 'js-cookie';
import styled from 'styled-components';

import {Announcement as AnnouncementModel, Props} from '../../../types';
import {
	Announce,
	AnnouncementCard,
	AnnouncementProvider,
	Announcements,
	ErrorPage,
	Header,
	Meta,
} from '../../../components';
import {cookieParser} from '../../../utils';
import {useAuth} from '../../../hooks';
import {getAnnouncement} from '../../../helpers';

const Container = styled.div`
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
	announcement: AnnouncementModel | undefined;
}

const Announcement: NextPage<Props & InitialProps, InitialProps> = ({
	setTheme,
	announcement,
}) => {
	const router = useRouter();
	const {asPath} = router;

	const {isSigned, isLoading} = useAuth();

	if (!announcement)
		return (
			<ErrorPage code={404} title="گفت و گو پیدا نشد!" setTheme={setTheme} />
		);

	useEffect(() => {
		if (!isLoading && !isSigned) router.push(`/sign?callback=${asPath}`);
	}, []);

	return (
		<div>
			<Meta title="گفت و گو" />
			<Header setTheme={setTheme} />
			<Container>
				<AnnouncementCard announcement={announcement} border />
				<AnnouncementProvider
					filter={{
						comment: announcement.id,
					}}>
					<Announce
						comment={announcement.id}
						onAnnounce={() => console.log('comment')}
					/>
					<Announcements />
				</AnnouncementProvider>
			</Container>
		</div>
	);
};

Announcement.getInitialProps = async ({query: {id}, req}) => {
	const token =
		cookieParser(req?.headers?.cookie || '')['auth-token'] ||
		Cookie.get('auth-token');

	return {
		announcement: await getAnnouncement(id as string, token || ''),
	};
};

export default Announcement;
