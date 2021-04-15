import React, {FC} from 'react';
import Image from 'next/image';

import {useThemeImage} from '../../../../../hooks';
import styled, {css} from 'styled-components';
import {FieldProps} from 'formik';
import {Poll} from '../../../../../types';

interface ContainerProps {
	disabled?: boolean;
}

const Container = styled.div<ContainerProps>`
	width: 25px;
	height: 25px;
	cursor: pointer;

	&:hover {
		opacity: 0.5;
	}

	${({disabled}) =>
		disabled &&
		css`
			opacity: 0.5;
		`}
`;

export const FormikPollTrigger: FC<FieldProps<Poll | undefined>> = ({
	field: {name},
	form: {isSubmitting, setFieldValue},
}) => {
	const poll = useThemeImage('/assets/icons/poll/poll-$mode.svg');

	const onPollClick = () => () => {
		!isSubmitting &&
			setFieldValue(name, {
				question: '',
				options: [''],
			});
	};

	return (
		<Container disabled={isSubmitting} onClick={onPollClick()}>
			<Image src={poll} width="25px" height="25px" />
		</Container>
	);
};
