import React from 'react';
import {NextPage} from 'next';
import Link from 'next/link';
import styled from 'styled-components';

import {Button, Dashboard, OwnedChannels, Text} from '../../components';
import {Props, Size} from '../../types';

const Body = styled.div`
	margin: auto auto 80px;
	padding: 10px;
	width: 700px;

	@media only screen and (max-width: 800px) {
		width: auto;
	}
`;

const Header = styled.div`
	align-items: center;
	direction: rtl;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

const Channels: NextPage<Props> = ({setTheme}) => {
	return (
		<Dashboard setTheme={setTheme}>
			<Body>
				<Header>
					<Text size={Size.HUGE} text="کانال های شما" />
					<Link href="/channels/request">
						<Button primary circular type="button">
							درخواست کانال
						</Button>
					</Link>
				</Header>
				<OwnedChannels />
			</Body>
		</Dashboard>
	);
};

export default Channels;
