import {useTheme} from 'styled-components';
import {Theme} from '../types';

export const useThemeImage = (src: string) => {
	const {mode} = useTheme() as Theme;

	return src.replace('$mode', mode.toLowerCase());
};
