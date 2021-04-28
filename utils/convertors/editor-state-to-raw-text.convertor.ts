import {convertToRaw, EditorState} from 'draft-js';

export const editorStateToRawText = (
	editorState: EditorState,
	lineConnector = '\n'
) =>
	convertToRaw(editorState.getCurrentContent())
		.blocks.map(({text}) => (!text.trim() && '\n') || text)
		.join(lineConnector);
