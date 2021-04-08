import React from 'react';
import {NextPage} from 'next';

import Conversations from './index';
import {Props} from '../../types';

interface InitialProps {}

const All: NextPage<Props & InitialProps, InitialProps> = (props) => {
	return <Conversations {...props} />;
};

export default All;
