import React, {FC, useEffect, useState} from 'react';
import Image from 'next/image';
import styled, {css} from 'styled-components';
import {Picker, EmojiData} from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

import {useThemeImage} from '../../../hooks';
import {StyledProps} from '../../../types';

const Container = styled.div`
	position: relative;
`;

interface EmojiProps {
	disabled?: boolean;
}

const Emoji = styled.div<EmojiProps>`
	width: 40px;
	height: 40px;
	overflow: hidden;
	cursor: pointer;

	&:hover {
		opacity: 0.5;
	}

	${({disabled}) =>
		disabled &&
		css`
			opacity: 0.5;
		`}
`;

interface PickerContainerProps {
	active?: boolean;
}

const PickerContainer = styled.div<StyledProps & PickerContainerProps>`
	position: absolute;
	display: none;
	right: 50%;
	direction: rtl;

	& * {
		direction: rtl;
	}

	& .emoji-mart-preview-data {
		direction: ltr;
	}

	& .emoji-mart-anchor-bar {
		background-color: ${({theme: {primary}}) => primary} !important;
	}

	& .emoji-mart {
		border-color: ${({theme: {primary}}) => primary}4C;
		box-shadow: 3px 0 6px 0 ${({theme: {primary}}) => primary}29;
		background-color: ${({theme: {background}}) => background};
		line-height: 1;
	}

	& .emoji-mart-search input {
		border-color: ${({theme: {primary}}) => primary}4C !important;
		box-shadow: 3px 0 6px 0 ${({theme: {primary}}) => primary}29;
		background-color: ${({theme: {background}}) => background};
	}

	& .emoji-mart-category-label span {
		background-color: ${({theme: {background}}) => background};
	}

	& .emoji-mart-emoji::before {
		background-color: ${({theme: {primary}}) => primary}4C !important;
	}

	& .emoji-mart-skin-swatches {
		border-color: ${({theme: {primary}}) => primary}4C !important;
		box-shadow: 3px 0 6px 0 ${({theme: {primary}}) => primary}29;
		background-color: ${({theme: {background}}) => background} !important;
		padding: 5px;
	}

	${({active}) =>
		active &&
		css`
			display: block;
		`}
`;

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
				<Image src={emoji} width="40px" height="40px" />
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
