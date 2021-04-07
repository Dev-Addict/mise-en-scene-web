import React, {FC, useRef, useState} from 'react';
import NImage from 'next/image';

import {Text} from '../../text.component';
import {Image} from '../../../../types';
import {useComponentSize, useFitSize, useThemeImage} from '../../../../hooks';
import {
	Container,
	MainImageContainer,
	MoreContainer,
	SideContainer,
} from './image-gallery-components.component';
import {ImagesGalleryOpen} from './images-gallery-open';

interface Props {
	images: Image[];
}

export const ImagesGallery: FC<Props> = ({images}) => {
	const [mainImage, secondaryImage] = images;

	const gallery = useThemeImage('/assets/icons/gallery/gallery-$mode.svg');

	const containerRef = useRef<HTMLDivElement>(null);

	const [open, setOpen] = useState(false);

	const {width: containerWidth} = useComponentSize(containerRef);

	const {width: mainImageWidth, height: mainImageHeight} = useFitSize(
		(mainImage.width || 0) / (mainImage.height || 0),
		containerWidth,
		(containerWidth / 3) * 2
	);
	const {width: secondaryImageWidth, height: secondaryImageHeight} = useFitSize(
		(secondaryImage.width || 0) / (secondaryImage.height || 0),
		containerWidth / 2,
		containerWidth / 3
	);

	const onGalleryClick = () => () => setOpen(true);
	const onCloseClick = () => () => setOpen(false);

	return (
		<>
			<ImagesGalleryOpen
				open={open}
				images={images}
				onCloseClick={onCloseClick()}
			/>
			<Container ref={containerRef} width={containerWidth}>
				<MainImageContainer containerWidth={containerWidth}>
					<NImage
						src={`/image/${mainImage.directory}/${mainImage.image}`}
						width={mainImageWidth}
						height={mainImageHeight}
						layout="fixed"
					/>
				</MainImageContainer>
				<SideContainer containerWidth={containerWidth}>
					<div>
						<NImage
							src={`/image/${secondaryImage.directory}/${secondaryImage.image}`}
							width={secondaryImageWidth}
							height={secondaryImageHeight}
							layout="fixed"
						/>
					</div>
					<div onClick={onGalleryClick()}>
						<MoreContainer>
							<NImage src={gallery} width="30px" height="30px" />
							<Text>باز کردن گالری</Text>
						</MoreContainer>
					</div>
				</SideContainer>
			</Container>
		</>
	);
};
