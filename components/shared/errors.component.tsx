import React, {FC} from 'react';
import styled from 'styled-components';

import {StyledProps} from '../../types';

export const ErrorContainer = styled.div<StyledProps>`
	width: 100%;
	padding: 0 20px;
	direction: rtl;
	border: 3px solid ${({theme: {error}}) => error};
	background-color: ${({theme: {error}}) => error}22;
	border-radius: 10px;
	margin-bottom: 30px;
`;

export const Error = styled.div<StyledProps>`
	margin: 10px 0;
	color: ${({theme: {error}}) => error};
	position: relative;
`;

export const ErrorBullet = styled.div`
	position: absolute;
	right: -15px;
	top: 50%;
	transform: translateY(-50%);
	width: 10px;
	height: 10px;
	border-radius: 5px;
	background-color: ${({theme: {error}}) => error};
`;

interface Props {
	errors: string[];
}

export const Errors: FC<Props> = ({errors}) => {
	const renderErrors = () =>
		errors.map((error) => (
			<Error>
				<ErrorBullet />
				{error}
			</Error>
		));

	return (
		<>
			{(errors.length || '') && (
				<ErrorContainer>{renderErrors()}</ErrorContainer>
			)}
		</>
	);
};
