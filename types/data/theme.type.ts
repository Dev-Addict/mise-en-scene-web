import {Color} from '../../data';

export enum ThemeMode {
	LIGHT = 'LIGHT',
	DARK = 'DARK',
}

export interface Theme {
	foreground: Color;
	background: Color;
	accent: Color;
	primary: Color;
	error: Color;
	link: Color;
	mode: ThemeMode;
}
