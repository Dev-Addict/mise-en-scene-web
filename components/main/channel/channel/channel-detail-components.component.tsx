import React from 'react';
import styled from 'styled-components';

import {Button} from '../../../shared';

export const Container = styled.div`
	width: 250px;
	display: flex;
	flex-direction: column;

	@media only screen and (max-width: 1000px) {
		flex-direction: row;
		width: 100%;
	}

	@media only screen and (max-width: 600px) {
		flex-direction: column;
		align-items: center;
		width: 100%;
	}
`;

export const Detail = styled.div`
	display: flex;
	flex-direction: column;
	margin-right: 10px;
	flex: 1;

	@media only screen and (max-width: 600px) {
		width: 100%;
	}
`;

export const Controls = styled.div`
	display: flex;
	flex-direction: column;

	@media only screen and (max-width: 1000px) {
		flex-direction: row;
	}

	@media only screen and (max-width: 600px) {
		flex-direction: column;
	}
`;

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
