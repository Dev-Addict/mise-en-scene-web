import React, {Dispatch, FC, SetStateAction} from 'react';
import {useRouter} from 'next/router';
import styled from 'styled-components';

import {UserDetail} from './user-detail';
import {Announce} from '../announce';
import {FindUserQueryDataFindUser} from '../../../api';
import {useAuth} from '../../../hooks';
import {Announcements} from './announcements';

const Container = styled.div`
	margin: 20px 100px;
	display: flex;
	flex-direction: row;
	direction: rtl;

	@media only screen and (max-width: 1200px) {
		margin: 20px;
	}

	@media only screen and (max-width: 1000px) {
		flex-direction: column;
	}

	@media only screen and (max-width: 600px) {
		margin: 10px;
	}
`;

const Body = styled.div`
	flex: 1;
	padding: 0 20px;
	direction: ltr;

	@media only screen and (max-width: 1000px) {
		padding: 20px 0 0 0;
	}
`;

interface Props {
	user: FindUserQueryDataFindUser;
	setUser: Dispatch<SetStateAction<FindUserQueryDataFindUser | undefined>>;
}

export const User: FC<Props> = ({user, setUser}) => {
	const router = useRouter();
	const {asPath} = router;

	const {user: authUser} = useAuth();

	const onAnnounce = () => () => router.push(asPath);

	return (
		<Container>
			<UserDetail user={user} setUser={setUser} />
			<Body>
				{authUser?.username === user.username && (
					<Announce onAnnounce={onAnnounce()} />
				)}
				<Announcements />
			</Body>
		</Container>
	);
};
