import React, {FC} from 'react';
import Lottie from 'react-lottie';

interface Props {
	autoplay?: boolean;
	data: any;
	height?: number;
	loop?: boolean;
	width?: number;
}

export const Animation: FC<Props> = ({
	autoplay = true,
	data,
	height = 200,
	loop = true,
	width = 200,
}) => {
	return (
		<Lottie
			height={height}
			options={{
				animationData: data,
				autoplay,
				loop,
				rendererSettings: {
					preserveAspectRatio: 'xMidYMid slice',
				},
			}}
			width={width}
		/>
	);
};
