import React, {useEffect, useState} from 'react';
import {NextPage} from 'next';
import Cookie from 'js-cookie';
import styled from 'styled-components';

import {Post as PostModel, Props} from '../../types';
import {ErrorPage, Header, Meta, Post} from '../../components';
import {cookieParser} from '../../utils';
import {useView} from '../../hooks';
import {getPost} from '../../helpers';

const Container = styled.div`
	width: 800px;
	margin: 10px auto;
	display: flex;
	flex-direction: column;

	@media only screen and (max-width: 1000px) {
		width: auto;
		margin: 10px 20px;
	}
`;

interface InitialProps {
	post: PostModel | undefined;
}

const PostPage: NextPage<Props & InitialProps, InitialProps> = ({
	setTheme,
	post,
}) => {
	const [localPost, setLocalPost] = useState(post);

	useView({
		page: `/posts/${localPost?.id}`,
		post: localPost?.id,
		channel: localPost?.channelData?.id,
	});

	useEffect(() => {
		setLocalPost(post);
	}, [post]);

	if (!localPost)
		return <ErrorPage code={404} title="پست پیدا نشد!" setTheme={setTheme} />;

	return (
		<div>
			<Meta title="گفت و گو" />
			<Header setTheme={setTheme} />
			<Container>
				<Post post={localPost} setPost={setLocalPost} />
			</Container>
		</div>
	);
};

PostPage.getInitialProps = async ({query: {id}, req}) => {
	const token =
		cookieParser(req?.headers?.cookie || '')['auth-token'] ||
		Cookie.get('auth-token');

	return {
		post: await getPost(id as string, token || ''),
	};
};

export default PostPage;
