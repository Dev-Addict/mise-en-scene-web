import React, {useEffect, useState} from 'react';
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
import {Announcement, Process, Props} from '../../../types';
import {useAppState, useAuth, useWindowSize} from '../../../hooks';
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

const ReAnnounce: NextPage<Props> = ({setTheme}) => {
	const router = useRouter();
	const {asPath} = router;
	const {announcement: announcementId} = router.query;

	const [announcement, setAnnouncement] =
		useState<undefined | Announcement>(undefined);

	const {isSigned, isLoading, user} = useAuth();

	const {addProcess, removeProcess} = useAppState();

	const {height} = useWindowSize();

	const onAnnounce = () => () => router.push(`/users/${user?.username}`);

	useEffect(() => {
		if (!isLoading && !isSigned) router.push(`/sign?callback=${asPath}`);
	}, []);

	useEffect(() => {
		const token = Cookie.get('auth-token');

		(async () => {
			addProcess(Process.RE_ANNOUNCEMENT);

			setAnnouncement(
				await getAnnouncement(announcementId as string, token || '')
			);

			removeProcess(Process.RE_ANNOUNCEMENT);
		})();
	}, [announcementId]);

	if (!announcement)
		return (
			<ErrorPage code={404} title="گفت و گو پیدا نشد!" setTheme={setTheme} />
		);

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

export default ReAnnounce;
