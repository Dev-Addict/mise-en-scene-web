import {ReadStream} from 'fs';
import probe from 'probe-image-size';

export const imageSize = (stream: ReadStream) => probe(stream);
