import styled from 'styled-components';

interface FillerProps {
	flex?: number;
	minWidth?: number;
	minHeight?: number;
}

export const Filler = styled.div<FillerProps>`
	flex: ${({flex}) => flex || 1};
	min-height: ${({minHeight}) => minHeight}px;
	min-width: ${({minWidth}) => minWidth}px;
`;
