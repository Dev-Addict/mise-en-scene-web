import React from 'react';
import {NextPage} from 'next';
import {ErrorProps} from 'next/error';

import {Error} from '../components';
import {Props} from '../types';

const Error403: NextPage<ErrorProps & Props> = (props) => {
	return <Error {...props} code={403} />;
};

export default Error403;
