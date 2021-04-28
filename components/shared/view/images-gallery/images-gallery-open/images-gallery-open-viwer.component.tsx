import React, {FC} from 'react';
import {
	Close,
	CurrentImage,
	CurrentImageContainer,
	LeftCurrentImageController,
	RightCurrentImageController,
	Viewer,
	Zoom,
	ZoomContainer,
	ZoomController,
} from './image-gallery-open-viewer-components.component';
import {Image} from '../../image.component';
import NImage from 'next/image';
import {Image as ImageModel} from '../../../../../types';
import {useThemeImage} from '../../../../../hooks';

interface Props {
	currentIndex: number;
	zoom: number;
	currentImage: ImageModel;
	onZoomClick: (effect: number) => () => void;
	onCurrentIndexControllerClick: (effect: number) => () => void;
	length: number;
	onCloseClick: () => void;
}

export const ImagesGalleryOpenViewer: FC<Props> = ({
	currentIndex,
	zoom,
	currentImage,
	onZoomClick,
	onCurrentIndexControllerClick,
	length,
	onCloseClick,
}) => {
	const close = useThemeImage('/assets/icons/close/close-$mode.svg');
	const minus = useThemeImage('/assets/icons/minus/minus-$mode.svg');
	const arrowShortLeft = useThemeImage(
		'/assets/icons/arrows/short/left/arrow-short-left-$mode.svg'
	);
	const arrowShortRight = useThemeImage(
		'/assets/icons/arrows/short/right/arrow-short-right-$mode.svg'
	);
	return (
		<Viewer>
			<CurrentImageContainer>
				<CurrentImage
					width={zoom * (currentImage.width || 0)}
					height={zoom * (currentImage.height || 0)}>
					<Image
						image={currentImage}
						width={zoom * (currentImage.width || 0)}
						height={zoom * (currentImage.height || 0)}
					/>
				</CurrentImage>
			</CurrentImageContainer>
			<ZoomContainer>
				<ZoomController rotate disabled={zoom >= 5}>
					<NImage
						src={close}
						width="20px"
						height="20px"
						onClick={onZoomClick(0.05)}
					/>
				</ZoomController>
				<Zoom text={zoom?.toString()} />
				<ZoomController disabled={zoom <= 0.5}>
					<NImage
						src={minus}
						width="20px"
						height="20px"
						onClick={onZoomClick(-0.05)}
					/>
				</ZoomController>
			</ZoomContainer>
			<RightCurrentImageController
				onClick={onCurrentIndexControllerClick(1)}
				disabled={currentIndex === length - 1}>
				<NImage src={arrowShortRight} width="30px" height="30px" />
			</RightCurrentImageController>
			<LeftCurrentImageController
				onClick={onCurrentIndexControllerClick(-1)}
				disabled={currentIndex === 0}>
				<NImage src={arrowShortLeft} width="30px" height="30px" />
			</LeftCurrentImageController>
			<Close onClick={onCloseClick}>
				<NImage
					src="/assets/icons/close/close.svg"
					width="40px"
					height="40px"
				/>
			</Close>
		</Viewer>
	);
};
