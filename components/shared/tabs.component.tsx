import React, {FC} from 'react';
import styled, {css} from 'styled-components';

import {Text} from './text.component';
import {StyledProps, Tab as TabModel} from '../../types';

const Container = styled.div<StyledProps>`
	align-items: center;
	background-color: ${({theme: {background}}) => background};
	display: flex;
	flex-direction: row;
	position: relative;
`;

interface TabProps {
	active?: boolean;
}

const Tab = styled.div<StyledProps & TabProps>`
	flex: 1;
	padding: 10px;
	background-color: ${({theme: {accent}}) => accent}20;
	cursor: pointer;

	&:hover {
		background-color: ${({theme: {accent}}) => accent}40;
	}

	${({active}) =>
		active &&
		css`
			&:hover {
				background-color: ${({theme: {accent}}) => accent}20;
			}
		`}
`;

interface ActiveBarProps {
	activeTab: number;
	tabs: number;
}

const ActiveBar = styled.div<StyledProps & ActiveBarProps>`
	border-top: 3px solid ${({theme: {primary}}) => primary};
	left: ${({activeTab, tabs}) => (activeTab * 100) / tabs}%;
	position: absolute;
	top: 0;
	bottom: 0;
	width: ${({tabs}) => 100 / tabs}%;
	background-color: ${({theme: {accent}}) => accent}20;
`;

interface Props {
	tabs: TabModel[];
	activeCode: string;
	onTab?: (code: string) => void;
}

export const Tabs: FC<Props> = ({tabs, activeCode, onTab}) => {
	const onTabClick = (code: string) => () => onTab && onTab(code);

	const renderTabs = () =>
		tabs.map(({name, code}) => (
			<Tab key={code} active={code === activeCode} onClick={onTabClick(code)}>
				<Text center text={name} />
			</Tab>
		));

	return (
		<Container>
			{renderTabs()}
			<ActiveBar
				tabs={tabs.length}
				activeTab={tabs.findIndex(({code}) => code === activeCode)}
			/>
		</Container>
	);
};
