import React, {useEffect, useState} from 'react';
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import Cookie from 'js-cookie';
import styled from 'styled-components';

import {
	Announcement as AnnouncementModel,
	Process,
	Props,
} from '../../../types';
import {
	Announce,
	AnnouncementCard,
	AnnouncementProvider,
	Announcements,
	ErrorPage,
	Header,
	Meta,
} from '../../../components';
import {useAppState, useAuth} from '../../../hooks';
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

const Announcement: NextPage<Props> = ({setTheme}) => {
	const router = useRouter();
	const {asPath} = router;
	const {id} = router.query;

	const [announcement, setAnnouncement] =
		useState<AnnouncementModel | undefined>(undefined);

	const {isSigned, isLoading} = useAuth();

	const {addProcess, removeProcess} = useAppState();

	useEffect(() => {
		if (!isLoading && !isSigned) router.push(`/sign?callback=${asPath}`);
	}, []);

	useEffect(() => {
		const token = Cookie.get('auth-token');

		(async () => {
			addProcess(Process.ANNOUNCEMENT);

			setAnnouncement(await getAnnouncement(id as string, token || ''));

			removeProcess(Process.ANNOUNCEMENT);
		})();
	}, []);

	if (!announcement)
		return (
			<ErrorPage code={404} title="گفت و گو پیدا نشد!" setTheme={setTheme} />
		);

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

export default Announcement;
