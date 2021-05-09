import React, {Dispatch, FC, SetStateAction} from 'react';
import styled from 'styled-components';

import {Channel as ChannelModel} from '../../../../types';
import {ChannelDetail} from './channel-detail.component';
import {ManagerPosts} from './manager-posts.component';
import {AdminsControl} from './admins-control.component';
import {Posts, SelectPostSort} from '../../post';
import {PostProvider} from '../../../contexts';
import {Filler} from '../../../shared';

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
	channel: ChannelModel;
	setChannel: Dispatch<SetStateAction<ChannelModel | undefined>>;
	manage?: boolean;
}

export const Channel: FC<Props> = ({channel, manage, setChannel}) => {
	return (
		<PostProvider filter={{channel: channel.id}}>
			<Container>
				<ChannelDetail
					channel={channel}
					manage={manage}
					setChannel={setChannel}
				/>
				<Body>
					{manage && <AdminsControl channel={channel} />}
					{manage && <ManagerPosts channel={channel} />}
					<SelectPostSort />
					<Posts />
					<Filler minHeight={80} />
				</Body>
			</Container>
		</PostProvider>
	);
};
