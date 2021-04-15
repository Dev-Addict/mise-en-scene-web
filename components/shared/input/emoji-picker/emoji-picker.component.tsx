import React, {FC, useEffect, useState} from 'react';
import Image from 'next/image';
import {Picker, EmojiData} from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

import {useThemeImage} from '../../../../hooks';
import {
	Container,
	Emoji,
	PickerContainer,
} from './emoji-picker-components.component';

interface Props {
	onSelect?: (emoji: EmojiData) => void;
	disabled?: boolean;
}

export const EmojiPicker: FC<Props> = ({onSelect, disabled = false}) => {
	const [isActive, setActive] = useState(false);

	const emoji = useThemeImage('/assets/icons/emoji/emoji-$mode.svg');

	const onEmojiClick = () => () =>
		!disabled && setActive((isActive) => !isActive);

	useEffect(() => {
		if (disabled) setActive(false);
	}, [disabled]);

	return (
		<Container>
			<Emoji onClick={onEmojiClick()} disabled={disabled}>
				<Image src={emoji} width="25px" height="25px" />
			</Emoji>
			<PickerContainer active={isActive}>
				<Picker
					emoji="point_up"
					title="شکلک را انتخاب کنید"
					i18n={{
						search: 'جستجو',
						notfound: 'شکلکی پیدا نکردیم.',
						categories: {
							activity: 'فعالیت',
							search: 'نتیجه جستجو',
							custom: 'سفارشی',
							flags: 'پرچم',
							foods: 'خوراکی ها',
							nature: 'طبیعت',
							objects: 'اشیاء',
							people: 'مردم',
							places: 'مکان',
							recent: 'اخیر',
							symbols: 'نمادها',
						},
					}}
					enableFrequentEmojiSort
					emojiSize={30}
					perLine={7}
					onSelect={onSelect}
					native
				/>
			</PickerContainer>
		</Container>
	);
};
