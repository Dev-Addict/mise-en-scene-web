import React from 'react';
import {NextPage} from 'next';
import {ErrorProps} from 'next/error';

import {ErrorPage} from '../components';
import {Props} from '../types';

const Error: NextPage<ErrorProps & Props> = ({statusCode, title, setTheme}) => {
	return <ErrorPage setTheme={setTheme} code={statusCode} title={title} />;
};

export default Error;
