import {createContext} from 'react';

import {Process} from '../../../types';

export interface StateContextType {
	processes: Process[];
	loading: boolean;
	addProcess: (process: Process) => void;
	removeProcess: (process: Process) => void;
}

export const StateContext = createContext<StateContextType>({
	processes: [Process.AUTH],
	loading: false,
	addProcess: () => {},
	removeProcess: () => {},
});
