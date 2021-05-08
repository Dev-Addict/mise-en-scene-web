import React, {Dispatch, FC, SetStateAction} from 'react';

import {Header} from '../header';
import {ThemeMode} from '../../../types';
import {useErrorValue} from '../../../hooks';
import {IllustrationMessage} from '../../shared';

interface Props {
	setTheme: Dispatch<SetStateAction<ThemeMode>>;
	code: number;
	title?: string;
}

export const ErrorPage: FC<Props> = ({setTheme, code, title}) => {
	const {image, message} = useErrorValue(code, title);

	return (
		<div>
			<Header setTheme={setTheme} />
			<IllustrationMessage message={message} image={image} />
		</div>
	);
};
