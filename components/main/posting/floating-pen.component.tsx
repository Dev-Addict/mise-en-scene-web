import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

import {Button} from '../../shared';
import {useAuth} from '../../../hooks';
import {useRouter} from 'next/router';

const Container = styled(Button)`
	width: 50px;
	height: 50px;
`;

const FeatherContainer = styled.div`
	position: relative;
`;

const Feather = styled.div`
	width: 30px;
	height: 30px;
	border-radius: 15px;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
`;

export const FloatingPen = () => {
	const router = useRouter();
	const {asPath} = router;

	const {isSigned, user} = useAuth();

	const link = isSigned ? '/write' : '/sign?callback=/write';

	const writingPaths = ['/write', `/users/${user?.username || 'no'}`];

	return (
		<>
			{!(
				writingPaths.includes(asPath) ||
				writingPaths.some((path) => asPath.startsWith(path))
			) && (
				<Link href={link}>
					<Container floating circular right={20} bottom={20} primary>
						<FeatherContainer>
							<Feather>
								<Image
									src="/assets/icons/feather/feather-dark.svg"
									width="30px"
									height="30px"
								/>
							</Feather>
						</FeatherContainer>
					</Container>
				</Link>
			)}
		</>
	);
};
