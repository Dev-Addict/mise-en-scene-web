import React, {useEffect, useState} from 'react';
import {NextPage} from 'next';
import styled from 'styled-components';

import {
	Announce,
	AnnouncementProvider,
	Announcements,
	Header,
	Tabs,
} from '../../components';
import {useAuth} from '../../hooks';
import {Props} from '../../types';
import {useRouter} from 'next/router';
import {conversationsTabs} from '../../data';

const Body = styled.div`
	width: 1000px;
	margin: auto auto 70px;

	@media only screen and (max-width: 1000px) {
		width: auto;
		margin: auto 10px 70px;
	}
`;

const Controller = styled.div`
	position: fixed;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 2;
`;

interface PageProps {
	my?: boolean;
}

interface InitialProps {}

const Conversations: NextPage<
	Props & PageProps & InitialProps,
	InitialProps
> = ({setTheme, my = false}) => {
	const router = useRouter();
	const {asPath} = router;

	const {isSigned} = useAuth();

	const [isMy, setMy] = useState(my);

	const onTab = () => (tab: string) => setMy(tab === 'my');

	useEffect(() => {
		if (isMy && !isSigned) router.push(`/sign?callback=${asPath}`);
	}, [isMy]);

	useEffect(() => {
		setMy(my);
	}, [my]);

	return (
		<AnnouncementProvider
			my={isMy}
			filter={{
				comment: {
					exists: false,
				},
			}}>
			<div>
				<Header setTheme={setTheme} />
				<Body>
					{isSigned && <Announce />}
					<Announcements />
				</Body>
				<Controller>
					<Tabs
						tabs={conversationsTabs}
						activeCode={isMy ? 'my' : 'all'}
						onTab={onTab()}
					/>
				</Controller>
			</div>
		</AnnouncementProvider>
	);
};

export default Conversations;
