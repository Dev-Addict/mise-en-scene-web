import React from 'react';
import {NextPage} from 'next';
import {ErrorProps} from 'next/error';

import {ErrorPage} from '../components';
import {Props} from '../types';

const Error404: NextPage<ErrorProps & Props> = (props) => {
	return <ErrorPage {...props} code={404} />;
};

export default Error404;
