import React, {FC, useEffect, useRef, useState} from 'react';
import NImage from 'next/image';

import {useComponentSize, useThemeImage} from '../../../../hooks';
import {BlobImage, Close, Container} from './file-image-components.component';

interface Props {
	file?: File;
	controls?: boolean;
	disabled?: boolean;
	onDeleteClick?: () => void;
	initialSrc?: string;
}

export const FileImage: FC<Props> = ({
	file,
	controls = true,
	disabled,
	onDeleteClick,
	initialSrc,
}) => {
	const logo = useThemeImage('/assets/logo/mes-$mode.svg');

	const containerRef = useRef<HTMLDivElement>(null);

	const [src, setSrc] = useState(logo);
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

	const {width: containerWidth} = useComponentSize(containerRef);

	const onCloseClick = () => () =>
		!disabled && onDeleteClick && onDeleteClick();

	useEffect(() => {
		if (file) {
			const image = new Image();
			const reader = new FileReader();

			image.onload = function () {
				setWidth((this as any).width || 0);
				setHeight((this as any).height || 0);
			};

			reader.onload = ({target}) => {
				image.src =
					(target?.result as string | undefined) || initialSrc || logo;
				setSrc((target?.result as string | undefined) || initialSrc || logo);
			};

			reader.readAsDataURL(file);
		}
	}, [file]);

	useEffect(() => {
		if (!file && initialSrc) setSrc(initialSrc);
	}, [file, initialSrc]);

	return (
		<Container ref={containerRef}>
			<BlobImage
				src={src || initialSrc || ''}
				width={containerWidth}
				height={(containerWidth / width) * height || containerWidth}
			/>
			{controls && (
				<Close disabled={disabled} onClick={onCloseClick()}>
					<NImage src="/assets/icons/close/close.svg" width={25} height={25} />
				</Close>
			)}
		</Container>
	);
};
