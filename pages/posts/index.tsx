import React, {useEffect, useState} from 'react';
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import styled from 'styled-components';

import {Header, Meta, PostProvider, Posts, Tabs} from '../../components';
import {useAuth, useView} from '../../hooks';
import {Props} from '../../types';
import {postTabs} from '../../data';
import {SelectPostSort} from '../../components/main/post/select-post-sort.component';

const Body = styled.div`
	width: 700px;
	margin: auto auto 70px;

	@media only screen and (max-width: 1000px) {
		width: auto;
		margin: auto 10px 70px;
	}
`;

const Controller = styled.div`
	position: fixed;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 2;
`;

interface PageProps {
	my?: boolean;
}

interface InitialProps {}

const PostsPage: NextPage<Props & PageProps & InitialProps, InitialProps> = ({
	setTheme,
	my = false,
}) => {
	const router = useRouter();
	const {asPath} = router;

	const {isSigned} = useAuth();

	const [isMy, setMy] = useState(my);

	useView({page: '/posts', posts: true});

	const onTab = () => (tab: string) => setMy(tab === 'my');

	useEffect(() => {
		if (isMy && !isSigned) router.push(`/sign?callback=${asPath}`);
	}, [isMy]);

	useEffect(() => {
		setMy(my);
	}, [my]);

	return (
		<PostProvider my={isMy}>
			<div>
				<Meta title={isMy ? 'پست های من' : 'همه پست ها'} />
				<Header setTheme={setTheme} />
				<Body>
					<SelectPostSort />
					<Posts />
				</Body>
				<Controller>
					<Tabs
						tabs={postTabs}
						activeCode={isMy ? 'my' : 'all'}
						onTab={onTab()}
					/>
				</Controller>
			</div>
		</PostProvider>
	);
};

export default PostsPage;
