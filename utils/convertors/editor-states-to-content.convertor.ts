import {List, Map} from 'immutable';
import {
	CharacterMetadata,
	DraftBlockType,
	DraftEntityMutability,
	DraftEntityType,
	EditorState,
	Entity,
} from 'draft-js';

interface EntityData {
	type: DraftEntityType;
	mutability: DraftEntityMutability;
	data: any;
}

interface Block {
	key: string;
	type: DraftBlockType;
	text: string;
	characterList: List<CharacterMetadata>;
	depth: number;
	data: Map<any, any>;
	entityRanges: {
		offset: number;
		length: number;
		key: number;
	}[];
}

type GetEntities = (
	editorState: EditorState,
	entityType?: string | null
) => Entity[];

const getEntities: GetEntities = (
	editorState: EditorState,
	entityType: string | null = null
): EntityData[] => {
	const content = editorState.getCurrentContent();
	const entities: Entity[] = [];

	content.getBlocksAsArray().forEach((block) => {
		let selectedEntity: Entity | null = null;

		block.findEntityRanges(
			(character) => {
				if (character.getEntity() !== null) {
					const entity = content.getEntity(character.getEntity());

					if (!entityType || (entityType && entity.getType() === entityType)) {
						selectedEntity = {
							entityKey: character.getEntity(),
							blockKey: block.getKey(),
							entity: content.getEntity(character.getEntity()),
						};

						return true;
					}
				}

				return false;
			},
			(start, end) => {
				entities.push({...selectedEntity, start, end});
			}
		);
	});

	return entities.map(({entity}: any) => ({
		type: entity.getType(),
		mutability: entity.getMutability(),
		data: entity.getData(),
	}));
};

type GetBlocks = (editorState: EditorState) => Block[];

const getBlocks: GetBlocks = (editorState) => {
	const blocks: Block[] = [];

	editorState
		.getCurrentContent()
		.getBlocksAsArray()
		.forEach((block) =>
			blocks.push({
				key: block.getKey(),
				type: block.getType(),
				text: block.getText(),
				characterList: block.getCharacterList(),
				depth: block.getDepth(),
				data: block.getData(),
			})
		);

	return blocks;
};

export const editorStatesToContentConvertor = (editorState: EditorState) => {
	return {
		entities: getEntities(editorState),
		blocks: getBlocks(editorState),
	};
};
