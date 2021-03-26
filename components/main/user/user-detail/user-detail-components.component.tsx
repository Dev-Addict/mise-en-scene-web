import styled from 'styled-components';

import {Button} from '../../../shared';

export const Control = styled(Button)`
	width: 100%;

	@media only screen and (max-width: 1000px) {
		width: 150px;
		margin: 0 10px;

		&:first-child {
			margin-right: 0;
		}

		&:last-child {
			margin-left: 0;
		}
	}

	@media only screen and (max-width: 600px) {
		width: 100%;
		margin: 0;
	}
`;
