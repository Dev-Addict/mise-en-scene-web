import React, {FC} from 'react';
import Link from 'next/link';
import styled, {css} from 'styled-components';

interface ContainerProps {
	size: number;
	src?: string;
	active?: boolean;
}

const Container = styled.div<ContainerProps>`
	width: ${({size}) => size}px;
	height: ${({size}) => size}px;
	overflow: hidden;
	cursor: pointer;
	border: 3px solid ${({theme: {link}}) => link};
	border-radius: ${({size}) => size / 2}px;
	background-image: url('${({src}) => src}');
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center center;

	${({active}) =>
		active &&
		css`
			&:hover {
				opacity: 0.5;
			}
		`}
`;

interface CoverLinkProps {
	link?: string;
}

const CoverLink: FC<CoverLinkProps> = ({link, children}) => {
	return link ? <Link href={link}>{children}</Link> : <>{children}</>;
};

interface Props {
	size?: number;
	src?: string;
	link?: string;
}

export const Cover: FC<Props> = ({size = 200, src, link}) => {
	return (
		<CoverLink link={link}>
			<Container size={size} src={src} />
		</CoverLink>
	);
};
