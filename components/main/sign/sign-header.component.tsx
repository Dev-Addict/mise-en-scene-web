import React, {FC} from 'react';
import styled from 'styled-components';
import {Logo} from '../header';
import {Switch, SwitchItem} from '../../shared';
import {Color} from '../../../data';
import {SignState} from '../../pages';

const Header = styled.div`
	padding: 10px 20px;
	margin-bottom: 40px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	direction: rtl;
`;

interface Props {
	showSwitch?: boolean;
	switchValue?: string;
	onSwitchClick?: (item: SwitchItem) => void;
}

export const SignHeader: FC<Props> = ({
	showSwitch = false,
	switchValue,
	onSwitchClick,
}) => {
	return (
		<Header>
			<Logo />
			{showSwitch && (
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
					value={switchValue}
					circular
					primary
					unselectedItemColor={Color.GHOST_WHITE}
					onClick={onSwitchClick}
				/>
			)}
		</Header>
	);
};
