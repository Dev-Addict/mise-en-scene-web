import React, {Dispatch, FC, SetStateAction} from 'react';
import {convertFromRaw, EditorState} from 'draft-js';

import {Generics, RatingContainer} from './post-components.component';
import {YourIdea} from './your-idea.component';
import {
	Editor,
	Filler,
	Image,
	Rating,
	Row,
	Text,
	YnView,
} from '../../../shared';
import {Post as PostModel, Size, Theme, ThemeMode} from '../../../../types';
import {useAuth, useDate, useThemeImage} from '../../../../hooks';
import {AnnouncementProvider} from '../../../contexts';
import {Announce} from '../../announce';
import {Announcements} from '../../user';
import {PostChannel} from './post-channel.component';
import {useTheme} from 'styled-components';

interface Props {
	post: PostModel;
	setPost: Dispatch<SetStateAction<PostModel | undefined>>;
	preview?: boolean;
}

export const Post: FC<Props> = ({
	post: {
		id,
		coverData,
		title,
		subtitle,
		description,
		bodyData,
		rating,
		raters,
		publishedAt,
		channelData,
		view,
	},
	post,
	setPost,
	preview = false,
}) => {
	const {mode} = useTheme() as Theme;

	const logo = useThemeImage('/assets/logo/mes-$mode.svg');

	const {isSigned} = useAuth();

	const time = useDate(publishedAt);

	const body = bodyData
		? EditorState.createWithContent(convertFromRaw(bodyData as any))
		: EditorState.createEmpty();

	return (
		<div>
			<Image image={coverData || undefined} defaultSrc={logo} />
			<Generics>
				<Row>
					<Text size={Size.SMALL} text={time} />
					&nbsp;-&nbsp;
					<Text size={Size.SMALL} text={`${view || 0} بازدید`} />
				</Row>
				<RatingContainer>
					<Text
						size={Size.SMALL}
						text={raters ? `از ${raters} نظر` : 'بدون نظر'}
					/>
					<Rating rating={rating} />
				</RatingContainer>
			</Generics>
			<Text size={Size.HUGE} text={title} />
			<Text text={subtitle || undefined} size={Size.LARGE} />
			<Text text={description || undefined} lowOpacity />
			{channelData && <PostChannel channel={channelData} setPost={setPost} />}
			<Editor value={body} readOnly />
			<Filler minHeight={50} />
			{!preview && (
				<>
					<YourIdea post={post} setPost={setPost} />
					<Filler minHeight={50} />
					<YnView
						id={
							mode === ThemeMode.LIGHT
								? 'pos-article-display-24166'
								: 'pos-article-display-24167'
						}
					/>
					<Filler minHeight={50} />
					<Text size={Size.BIG} text="گفت و گو" />
					<Filler minHeight={20} />
					<AnnouncementProvider filter={{reply: id}}>
						{isSigned && <Announce reply={id} />}
						<Announcements reply={false} />
					</AnnouncementProvider>
				</>
			)}
		</div>
	);
};
