import React, {FC, useEffect, useRef, useState} from 'react';
import {Container, Style} from './image-gallery-open-components.component';
import {Image as ImageModel} from '../../../../../types';
import {useComponentSize} from '../../../../../hooks';
import {ImagesGalleryOpenViewer} from './images-gallery-open-viwer.component';

interface Props {
	open: boolean;
	images: ImageModel[];
	onCloseClick: () => void;
}

export const ImagesGalleryOpen: FC<Props> = ({open, images, onCloseClick}) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [zoom, setZoom] = useState(1);

	const containerRef = useRef<HTMLDivElement>(null);

	const {width: containerWidth, height: containerHeight} = useComponentSize(
		containerRef
	);

	const currentImage = images[currentIndex];

	useEffect(() => {
		const widthRation = (currentImage.width || 0) / containerWidth;
		const heightRation = (currentImage.height || 0) / containerHeight;

		if (Math.max(widthRation, heightRation) > 1)
			setZoom(
				Math.ceil(
					Math.min(
						containerWidth / (currentImage.width || 0),
						containerHeight / (currentImage.height || 0)
					) * 20
				) / 20 || 1
			);
		else setZoom(1);
	}, [currentIndex, images]);

	const onZoomClick = (effect: number) => () =>
		setZoom(Math.floor(Math.min(Math.max(zoom + effect, 0.5), 5) * 100) / 100);
	const onCurrentIndexControllerClick = (effect: number) => () =>
		setCurrentIndex(
			Math.min(Math.max(currentIndex + effect, 0), images.length - 1)
		);

	return (
		<Container open={open} ref={containerRef}>
			<Style open={open} />
			<ImagesGalleryOpenViewer
				currentIndex={currentIndex}
				zoom={zoom}
				currentImage={currentImage}
				onZoomClick={onZoomClick}
				onCurrentIndexControllerClick={onCurrentIndexControllerClick}
				length={images.length}
				onCloseClick={onCloseClick}
			/>
		</Container>
	);
};
