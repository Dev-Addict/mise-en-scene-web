import React, {FC, useState} from 'react';

import {SignHeader} from '../../main';
import {SwitchItem} from '../../shared';
import {SignInBody} from './sign-in-body.component';
import {SignUpBody} from './sign-up-body.component';
import {Meta} from '../meta.component';

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
			<Meta title={localState === SignState.SIGN_UP ? 'ثبت نام' : 'ورود'} />
			<SignHeader
				showSwitch
				onSwitchClick={onSignItemClick()}
				switchValue={localState}
			/>
			{localState === SignState.SIGN_UP ? (
				<SignUpBody switchSign={switchSign(SignState.SIGN_IN)} />
			) : (
				<SignInBody switchSign={switchSign(SignState.SIGN_UP)} />
			)}
		</div>
	);
};
