import {Document, model, Schema, Types} from 'mongoose';

const postRatingSchema = new Schema(
	{
		post: {
			type: Types.ObjectId,
			ref: 'Post',
			required: [true, '0xE00008B'],
		},
		user: {
			type: Types.ObjectId,
			ref: 'User',
			required: [true, '0xE00008C'],
		},
		rating: {
			type: Number,
			required: [true, '0xE00008D'],
			min: [1, '0xE00008E'],
			max: [5, '0xE00008F'],
		},
	},
	{timestamps: {updatedAt: 'ratedAt'}}
);

export interface PostRatingModel {
	post: string;
	user: string;
	rating: number;
	ratedAt: Date | number;
}

export interface IPostRating extends PostRatingModel, Document {}

export const PostRating = model<IPostRating>('PostRating', postRatingSchema);
