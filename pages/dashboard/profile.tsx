import React, {useEffect} from 'react';
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import styled from 'styled-components';

import {Props} from '../../types';
import {
	ChangeEmail,
	ChangePassword,
	Header,
	ProfileDetail,
} from '../../components';
import {useAuth} from '../../hooks';

const Body = styled.div`
	padding: 10px 20px;
	width: 700px;
	margin: auto auto 80px;

	@media only screen and (max-width: 800px) {
		width: auto;
	}
`;

const Profile: NextPage<Props> = ({setTheme}) => {
	const router = useRouter();
	const {asPath} = router;

	const {isSigned, isLoading} = useAuth();

	useEffect(() => {
		if (!isLoading && !isSigned) router.push(`/sign?callback=${asPath}`);
	}, [isSigned]);

	return (
		<div>
			<Header setTheme={setTheme} />
			<Body>
				<ProfileDetail />
				<ChangePassword />
				<ChangeEmail />
			</Body>
		</div>
	);
};

export default Profile;
