import {createContext} from 'react';

export interface CopyContextType {
	copy: (text: string) => void;
}

export const CopyContext = createContext<CopyContextType>({
	copy: () => {},
});
