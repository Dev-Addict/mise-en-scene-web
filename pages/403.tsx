import React from 'react';
import {NextPage} from 'next';
import {ErrorProps} from 'next/error';

import {ErrorPage} from '../components';
import {Props} from '../types';

const ErrorPage403: NextPage<ErrorProps & Props> = (props) => {
	return <ErrorPage {...props} code={403} />;
};

export default ErrorPage403;
