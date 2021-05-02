import React from 'react';
import {NextPage} from 'next';

import Posts from './index';
import {Props} from '../../types';

interface InitialProps {}

const All: NextPage<Props & InitialProps, InitialProps> = (props) => {
	return <Posts {...props} />;
};

export default All;
