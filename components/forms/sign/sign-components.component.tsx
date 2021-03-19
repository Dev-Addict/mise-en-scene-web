import styled from 'styled-components';
import {Form} from 'formik';

import {StyledProps} from '../../../types';

export const Body = styled(Form)`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 700px;
	padding: 10px;
	position: relative;
	left: 50%;
	transform: translateX(-50%);
`;

export const Profile = styled.div`
	width: 200px;
	height: 200px;
	margin: 10px 0;
`;

export const ProfileHeader = styled.div`
	font-size: 24px;
	margin-bottom: 50px;
`;

export const InputContainer = styled.div`
	width: 100%;
	margin: 0 0 10px 0;
`;

export const ConvertText = styled.div`
	width: 100%;
	font-size: 18px;
	direction: rtl;
	margin: 30px 0;
`;

export const ConvertLink = styled.span<StyledProps>`
	color: ${({theme: {link}}) => link};
	text-shadow: 3px 0 6px 0 ${({theme: {link}}) => link};

	&:hover {
		opacity: 0.5;
	}
`;

export const SubmitContainer = styled.div`
	width: 100%;
	margin-bottom: 80px;
`;
