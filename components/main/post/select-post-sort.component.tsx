import React from 'react';
import {Dropdown, DropdownOption} from '../../shared';
import {PostSort} from '../../../types';
import {usePosts} from '../../../hooks';

const options: DropdownOption[] = [
	{
		key: PostSort.LAST,
		value: PostSort.LAST,
		text: 'تاریخ انتشار(جدید)',
	},
	{
		key: PostSort.FIRST,
		value: PostSort.FIRST,
		text: 'تاریخ انتشار(قدیمی)',
	},
	{
		key: PostSort.VIEW,
		value: PostSort.VIEW,
		text: 'بیشترین بازدید',
	},
	{
		key: PostSort.VIEW_DAY,
		value: PostSort.VIEW_DAY,
		text: 'بیشترین بازدید(روز)',
	},
	{
		key: PostSort.VIEW_WEEK,
		value: PostSort.VIEW_WEEK,
		text: 'بیشترین بازدید(هفته)',
	},
	{
		key: PostSort.VIEW_MONTH,
		value: PostSort.VIEW_MONTH,
		text: 'بیشترین بازدید(ماه)',
	},
	{
		key: PostSort.RATING,
		value: PostSort.RATING,
		text: 'بیشترین امتیاز',
	},
	{
		key: PostSort.RATING_DAY,
		value: PostSort.RATING_DAY,
		text: 'بیشترین امتیاز(روز)',
	},
	{
		key: PostSort.RATING_WEEK,
		value: PostSort.RATING_WEEK,
		text: 'بیشترین امتیاز(هفته)',
	},
	{
		key: PostSort.RATING_MONTH,
		value: PostSort.RATING_MONTH,
		text: 'بیشترین امتیاز(ماه)',
	},
];

export const SelectPostSort = () => {
	const {setSort, sort} = usePosts();

	const onChange = () => ({value}: DropdownOption) => {
		setSort(value as PostSort);
	};

	return (
		<Dropdown
			options={options}
			onChange={onChange()}
			initialValue={options.find(({value}) => value === sort)}
		/>
	);
};
