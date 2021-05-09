import React, {FC, useState} from 'react';
import {StateContext} from './state.context';

import {Process} from '../../../types';
import {Loading} from '../../pages';

export const StateProvider: FC = ({children}) => {
	const [processes, setProcesses] = useState<Process[]>([Process.AUTH]);

	const addProcess = (process: Process) =>
		setProcesses((processes) => Array.from(new Set([...processes, process])));

	const removeProcess = (process: Process) =>
		setProcesses((processes) => processes.filter((p) => p !== process));

	return (
		<StateContext.Provider
			value={{
				processes,
				loading: !!processes.length,
				addProcess,
				removeProcess,
			}}>
			<Loading active={!!processes.length} />
			{children}
		</StateContext.Provider>
	);
};
