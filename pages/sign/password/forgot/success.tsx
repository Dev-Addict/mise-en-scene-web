import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import {useThemeImage, useWindowSize} from '../../../../hooks';
import {SignHeader} from '../../../../components';

const Title = styled.div`
	direction: rtl;
	display: inline-block;
	font-size: 30px;
	max-width: 1000px;
	position: relative;
	left: 50%;
	transform: translateX(-50%);
	padding: 10px 20px;
`;

const MailSent = styled.div`
	width: 30%;
	position: relative;
	left: 50%;
	transform: translateX(-50%);
	padding: 10px 20px;

	& > * {
		width: 100%;
	}

	@media only screen and (max-width: 1200px) {
		width: 40%;
	}

	@media only screen and (max-width: 800px) {
		width: 60%;
	}

	@media only screen and (max-width: 400px) {
		width: 80%;
	}
`;

const Success = () => {
	const mailSent = useThemeImage(
		'/assets/illustrations/mail-sent/email-sent-$mode.svg'
	);

	const {width} = useWindowSize();

	const illustrationWidth =
		width * (width > 1200 ? 0.3 : width > 800 ? 0.4 : width > 400 ? 0.6 : 0.8);

	return (
		<div>
			<SignHeader />
			<div>
				<Title>ایمیل تغییر رمز عبور با موفقیت ارسال شد!</Title>
				<MailSent>
					<Image
						src={mailSent}
						width={illustrationWidth}
						height={illustrationWidth}
					/>
				</MailSent>
			</div>
		</div>
	);
};

export default Success;
