import React, {Dispatch, FC, SetStateAction} from 'react';

import {Header} from '../header';
import {ErrorMessage} from './error-message.component';
import {ThemeMode} from '../../../types';

interface Props {
	setTheme: Dispatch<SetStateAction<ThemeMode>>;
	code: number;
	title?: string;
}

export const Error: FC<Props> = ({setTheme, code, title}) => {
	return (
		<div>
			<Header setTheme={setTheme} />
			<ErrorMessage code={code} title={title} />
		</div>
	);
};
