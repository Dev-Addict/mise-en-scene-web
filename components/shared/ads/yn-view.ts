import styled from 'styled-components';

export const YnView = styled.div`
	& * {
		color: ${({theme: {foreground}}) => foreground};
	}

	& *::marker {
		color: ${({theme: {foreground}}) => foreground};
	}
`;
