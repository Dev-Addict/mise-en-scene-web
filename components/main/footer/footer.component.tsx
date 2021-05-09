import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;

const BottomBar = styled.div`
	padding: 10px;
	text-align: center;
	background-color: ${({theme: {accent}}) => accent}40;
`;

export const Footer = () => {
	return (
		<Container>
			<BottomBar>
				© 2021 | تمامی حقوق این وبسایت متعلق یه تیم میزانسن می باشد
			</BottomBar>
		</Container>
	);
};
