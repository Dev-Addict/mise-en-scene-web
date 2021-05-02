import React, {Dispatch, FC, SetStateAction} from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import {Username} from './username.component';
import {UserFollowControl} from './user-follow-control.component';
import {Control} from './user-detail-components.component';
import {FollowDetail, SpaceDivider, Text} from '../../../shared';
import {useAuth} from '../../../../hooks';
import {Size, User} from '../../../../types';

const Container = styled.div`
	padding: 10px;
	flex: 1;

	@media only screen and (max-width: 600px) {
		width: 100%;
	}
`;

const Controls = styled.div`
	display: flex;
	flex-direction: column;

	@media only screen and (max-width: 1000px) {
		flex-direction: row;
	}

	@media only screen and (max-width: 600px) {
		flex-direction: column;
	}
`;

interface Props {
	user: User;
	setUser: Dispatch<SetStateAction<User | undefined>>;
}

export const UserDetailBody: FC<Props> = ({user, setUser}) => {
	const {user: authUser, signOut} = useAuth();

	return (
		<Container>
			<Username user={user} />
			<Text text={user.bio || ''} />
			<SpaceDivider size={Size.SMALL} />
			<FollowDetail followings={user.followings} followers={user.followers} />
			<SpaceDivider size={Size.SMALL} />
			<Controls>
				{user.username !== authUser?.username && (
					<UserFollowControl setUser={setUser} user={user} />
				)}
				{user.username === authUser?.username && (
					<>
						<Link href="/dashboard/profile">
							<Control primary circular outline>
								داشبورد
							</Control>
						</Link>
						<SpaceDivider size={Size.TINY} />
						<Control circular outline danger onClick={signOut}>
							خروج
						</Control>
					</>
				)}
				<SpaceDivider size={Size.TINY} />
			</Controls>
		</Container>
	);
};
