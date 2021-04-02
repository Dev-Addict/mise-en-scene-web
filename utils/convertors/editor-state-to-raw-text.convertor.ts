import {convertToRaw, EditorState} from 'draft-js';

export const editorStateToRawText = (editorState: EditorState) =>
	convertToRaw(editorState.getCurrentContent())
		.blocks.map(({text}) => (!text.trim() && '\n') || text)
		.join('\n');
