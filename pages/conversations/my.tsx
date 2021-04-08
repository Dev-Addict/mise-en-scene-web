import React from 'react';
import {NextPage} from 'next';

import Conversations from './index';
import {Props} from '../../types';

interface InitialProps {}

const My: NextPage<Props & InitialProps, InitialProps> = (props) => {
	return <Conversations {...props} my />;
};

export default My;
