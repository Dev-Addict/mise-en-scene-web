import React, {FC, useState} from 'react';
import styled from 'styled-components';

import {Logo} from '../../main';
import {Switch, SwitchItem} from '../../shared';
import {Color} from '../../../data';
import {SignInBody} from './sign-in-body.component';
import {SignUpBody} from './sign-up-body.component';

const Header = styled.div`
	padding: 10px 20px;
	margin-bottom: 40px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	direction: rtl;
`;

export enum SignState {
	SIGN_IN = 'SIGN_IN',
	SIGN_UP = 'SIGN_UP',
}

interface Props {
	state?: SignState;
	push?: boolean;
}

export const Sign: FC<Props> = ({state}) => {
	const [localState, setLocalState] = useState(state || SignState.SIGN_UP);

	const onSignItemClick = () => ({value}: SwitchItem) =>
		setLocalState(value as SignState);

	const switchSign = (state: SignState) => () => setLocalState(state);

	return (
		<div>
			<Header>
				<Logo />
				<Switch
					items={[
						{
							key: SignState.SIGN_IN,
							value: SignState.SIGN_IN,
							text: 'ورود',
						},
						{
							key: SignState.SIGN_UP,
							value: SignState.SIGN_UP,
							text: 'ثبت نام',
						},
					]}
					value={localState}
					circular
					primary
					unselectedItemColor={Color.GHOST_WHITE}
					onClick={onSignItemClick()}
				/>
			</Header>
			{localState === SignState.SIGN_UP ? (
				<SignUpBody switchSign={switchSign(SignState.SIGN_IN)} />
			) : (
				<SignInBody switchSign={switchSign(SignState.SIGN_UP)} />
			)}
		</div>
	);
};
