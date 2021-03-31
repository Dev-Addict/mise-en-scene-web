import styled from 'styled-components';

interface FillerProps {
	flex?: number;
	minWidth?: number;
	minHeight?: number;
}

export const Row = styled.div`
	display: flex;
	flex-direction: row;
`;

export const Filler = styled.div<FillerProps>`
	flex: ${({flex = 1}) => flex};
	min-height: ${({minHeight}) => minHeight}px;
	min-width: ${({minWidth}) => minWidth}px;
`;
