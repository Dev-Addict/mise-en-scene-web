import React, {FC, useRef} from 'react';
import styled from 'styled-components';

import {CopyContext} from './copy.context';

const InvisibleInput = styled.input`
	width: 0;
	height: 0;
	position: fixed;
	top: -100%;
	left: -100%;
	opacity: 0;
`;

export const CopyProvider: FC = ({children}) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const copy = () => (text: string) => {
		if (!inputRef.current) return;

		inputRef.current.value = text;

		inputRef.current.select();
		inputRef.current.setSelectionRange(0, 99999);

		document.execCommand('copy');
	};

	return (
		<>
			<InvisibleInput ref={inputRef} />
			<CopyContext.Provider
				value={{
					copy: copy(),
				}}>
				{children}
			</CopyContext.Provider>
		</>
	);
};
