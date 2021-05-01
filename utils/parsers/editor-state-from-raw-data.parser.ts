import {convertFromRaw, EditorState, RawDraftContentState} from 'draft-js';

export const editorStateFromRawDataParser = ({
	blocks,
	entityMap,
}: {
	[key: string]: any;
}): EditorState => {
	const rawContent: RawDraftContentState = {
		entityMap: {},
		blocks,
	};

	for (const i in entityMap) rawContent.entityMap[i] = entityMap[i];

	return EditorState.createWithContent(convertFromRaw(rawContent));
};
