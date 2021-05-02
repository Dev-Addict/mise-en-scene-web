import {useContext} from 'react';

import {PostContext} from '../../components';

export const usePosts = () => useContext(PostContext);
