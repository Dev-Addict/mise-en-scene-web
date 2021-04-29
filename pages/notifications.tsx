import React from 'react';
import {NextPage} from 'next';
import styled from 'styled-components';

import {Props, Size} from '../types';
import {Header, Notifications, Text} from '../components';

const Body = styled.div`
	margin: auto auto 80px;
	padding: 10px;
	width: 700px;

	@media only screen and (max-width: 800px) {
		width: auto;
	}
`;

const NotificationsPage: NextPage<Props> = ({setTheme}) => {
	return (
		<div>
			<Header setTheme={setTheme} />
			<Body>
				<Text size={Size.HUGE} text="اطلاعیه ها" />
				<Notifications />
			</Body>
		</div>
	);
};

export default NotificationsPage;
