import {mutationField, nonNull} from 'nexus';

import {PostRating} from '../../models';
import {RatePostData} from '../inputs';
import {protect} from '../../../../utils';

export const RatePostMutation = mutationField('ratePost', {
	type: nonNull(PostRating),
	args: {
		data: nonNull(RatePostData),
	},
	async resolve(
		_root,
		{data: {post, rating}},
		{req, models: {User, PostRating}}
	) {
		const user = (await protect(req, User))!;

		const postRating = await PostRating.findOne({post, user: user._id});

		if (!postRating)
			return <any>PostRating.create({user: user._id, post, rating});

		postRating.rating = rating;

		await postRating.save();
		return <any>postRating;
	},
});
