import React, {FC} from 'react';
import Image from 'next/image';
import {FieldProps} from 'formik';
import styled from 'styled-components';

import {PollError, PollInput} from '..';
import {Poll, StyledProps} from '../../../../types';
import {useThemeImage} from '../../../../hooks';

const CloseContainer = styled.div`
	direction: rtl;
`;

const Close = styled.div<StyledProps>`
	width: 50px;
	height: 50px;
	padding: 10px;
	border: 3px solid ${({theme: {foreground}}) => foreground}4C;
	border-bottom: none;
	border-left: none;
	border-top-right-radius: 10px;
	cursor: pointer;

	&:hover > * {
		opacity: 0.5;
	}
`;

export const FormikPollInput: FC<FieldProps<Poll | undefined>> = ({
	field: {name, value},
	form: {setFieldValue, isSubmitting, errors, touched},
}) => {
	const close = useThemeImage('/assets/icons/close/close-$mode.svg');

	const onChange = () => (poll: Poll) => setFieldValue(name, poll);
	const onCloseClick = () => () => setFieldValue(name, undefined);

	return (
		<>
			{value && (
				<>
					<CloseContainer>
						<Close onClick={onCloseClick()}>
							<Image src={close} width="30px" height="30px" />
						</Close>
					</CloseContainer>
					<PollInput
						value={value}
						onChange={onChange()}
						disabled={isSubmitting}
						error={errors[name] as PollError}
						touched={!!touched[name]}
					/>
				</>
			)}
		</>
	);
};
