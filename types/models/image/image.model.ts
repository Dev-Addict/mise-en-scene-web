import {None} from '../../none.type';

export interface Image {
	id?: string;
	image?: string;
	directory?: string;
	width?: number;
	height?: number;
	alt?: None<string>;
}
