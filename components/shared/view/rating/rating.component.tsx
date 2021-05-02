import React, {FC, MouseEventHandler, useEffect, useState} from 'react';
import Image from 'next/image';

import {
	Container,
	RatedBar,
	RatingTemplate,
} from './rating-components.component';
import {useThemeImage} from '../../../../hooks';

interface Props {
	ratable?: boolean;
	rating?: number;
	ratio?: number;
	onChange?: (rating: number) => void;
	disabled?: boolean;
}

export const Rating: FC<Props> = ({
	rating = 0,
	ratable,
	ratio = 1,
	onChange,
	disabled,
}) => {
	const ratingSrc = useThemeImage('/assets/icons/rating/rating-$mode.svg');

	const [localRating, setLocalRating] = useState(rating);

	const width = localRating * 16 + (Math.ceil(localRating || 1) - 1) * 4 + 2;

	const onRatingClick = (): MouseEventHandler<HTMLDivElement> => (event) => {
		if (!ratable) return;
		if (disabled) return;

		const position =
			event.currentTarget.getBoundingClientRect().right - event.clientX;
		const rating = Math.ceil(position / 20 / ratio);

		setLocalRating(rating);
		onChange && onChange(rating);
	};

	useEffect(() => {
		setLocalRating(rating);
	}, [rating]);

	return (
		<Container ratio={ratio} disabled={disabled}>
			<RatedBar width={width * ratio} ratio={ratio} />
			<RatingTemplate onClick={onRatingClick()} ratable={ratable} ratio={ratio}>
				<Image src={ratingSrc} width={100 * ratio} height={20 * ratio} />
			</RatingTemplate>
		</Container>
	);
};
