import React from 'react';
import {NextPage} from 'next';
import {ErrorProps} from 'next/error';

import {Error} from '../components';
import {Props} from '../types';

const ErrorPage: NextPage<ErrorProps & Props> = ({
	statusCode,
	title,
	setTheme,
}) => {
	return <Error setTheme={setTheme} code={statusCode} title={title} />;
};

export default ErrorPage;
