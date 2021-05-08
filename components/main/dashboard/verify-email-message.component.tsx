import React from 'react';
import styled from 'styled-components';

import {useAuth} from '../../../hooks';

const Container = styled.div`
	margin: 10px auto;
	background-color: ${({theme: {error}}) => error}40;
	border: 2px solid ${({theme: {error}}) => error};
	padding: 10px;
	max-width: 700px;
	border-radius: 10px;
	direction: rtl;
	text-align: center;
`;

export const VerifyEmailMessage = () => {
	const {user} = useAuth();

	return (
		<>
			{!user?.verifiedEmail && (
				<Container>لطفا ایمیل خود را در اسرع وقت تایید کنید.</Container>
			)}
		</>
	);
};
