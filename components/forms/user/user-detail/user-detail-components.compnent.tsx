import React, {FC} from 'react';
import styled from 'styled-components';
import {Field} from 'formik';

import {FormikInput, SelectItem} from '../../../shared';
import {Gender} from '../../../../types';

export const genderItems: SelectItem[] = [
	{
		value: Gender.MALE,
		key: Gender.MALE,
		text: 'مرد',
	},
	{
		value: Gender.FEMALE,
		key: Gender.FEMALE,
		text: 'زن',
	},
	{
		value: Gender.CUSTOM,
		key: Gender.CUSTOM,
		text: 'خاص',
	},
	{
		value: undefined,
		key: 'NONE',
		text: 'ترجیح میدهم نگویم',
	},
];

interface InputContainerProps {
	flex?: number;
}

export const InputContainer = styled.div<InputContainerProps>`
	margin: 0 10px;
	flex: ${({flex}) => flex || 0};

	& > * > * {
		width: 100%;
	}
`;

export const UserMainDetail = styled.div`
	direction: rtl;
	display: flex;
	flex-direction: row;
	width: 100%;
	margin-bottom: 10px;

	@media only screen and (max-width: 650px) {
		flex-direction: column;
	}
`;

export const UserMainDetailInputs = styled.div`
	flex: 1;
`;

export const UserBodyDetail = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

interface TextInputProps {
	label?: string;
	icon?: string;
	name?: string;
	editable?: boolean;
}

export const TextInput: FC<TextInputProps> = ({
	label,
	icon,
	name,
	editable = true,
}) => (
	<InputContainer flex={1}>
		<Field
			label={label}
			placeholder={`${label} شما`}
			icon={icon}
			primary
			type="text"
			name={name}
			component={FormikInput}
			editable={editable}
		/>
	</InputContainer>
);
