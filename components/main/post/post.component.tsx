import React, {FC} from 'react';
import {Post as PostModel, Size} from '../../../types';
import {Editor, Image, Text} from '../../shared';
import {useThemeImage} from '../../../hooks';
import {convertFromRaw, EditorState} from 'draft-js';
import {editorStateFromRawDataParser} from '../../../utils';

interface Props {
	post: PostModel;
}

export const Post: FC<Props> = ({
	post: {coverData, title, subtitle, description, bodyData},
}) => {
	const logo = useThemeImage('/assets/logo/mes-$mode.svg');

	const body = bodyData
		? editorStateFromRawDataParser(bodyData)
		: EditorState.createEmpty();

	return (
		<div>
			<Image image={coverData || undefined} defaultSrc={logo} />
			<Text size={Size.HUGE} text={title} />
			<Text text={subtitle || undefined} size={Size.LARGE} />
			<Text text={description || undefined} lowOpacity />
			<Editor value={body} readOnly />
		</div>
	);
};
