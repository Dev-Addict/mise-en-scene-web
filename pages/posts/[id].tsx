import React, {useEffect, useState} from 'react';
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import Cookie from 'js-cookie';
import styled from 'styled-components';

import {Post as PostModel, Process, Props} from '../../types';
import {ErrorPage, Header, Meta, Post} from '../../components';
import {useAppState, useView} from '../../hooks';
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

const PostPage: NextPage<Props> = ({setTheme}) => {
	const router = useRouter();
	const {id} = router.query;

	const [post, setPost] = useState<PostModel | undefined>(undefined);

	const {addProcess, removeProcess} = useAppState();

	useView({
		page: `/posts/${post?.id}`,
		post: post?.id,
		channel: post?.channelData?.id,
	});

	useEffect(() => {
		const token = Cookie.get('auth-token');

		(async () => {
			addProcess(Process.POST);

			setPost(await getPost(id as string, token || ''));

			removeProcess(Process.POST);
		})();
	}, [id]);

	if (!post)
		return <ErrorPage code={404} title="پست پیدا نشد!" setTheme={setTheme} />;

	return (
		<div>
			<Meta title="گفت و گو" />
			<Header setTheme={setTheme} />
			<Container>
				<Post post={post} setPost={setPost} />
			</Container>
		</div>
	);
};

export default PostPage;
