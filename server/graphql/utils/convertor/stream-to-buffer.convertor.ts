import {ReadStream} from 'fs';

export const streamToBufferConvertor = async (stream: ReadStream) => {
	const chunks: Uint8Array[] = [];

	for await (let chunk of stream) {
		chunks.push(chunk);
	}

	return Buffer.concat(chunks);
};
