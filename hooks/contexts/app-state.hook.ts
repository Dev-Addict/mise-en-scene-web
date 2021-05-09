import {useContext} from 'react';

import {StateContext} from '../../components';

export const useAppState = () => useContext(StateContext);
