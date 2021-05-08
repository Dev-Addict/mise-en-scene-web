import {useContext} from 'react';

import {SocketContext} from '../../components';

export const useSocket = () => useContext(SocketContext);
