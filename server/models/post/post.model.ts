import {Document, model, Schema, Types} from 'mongoose';

const postSchema = new Schema(
	{
		cover: {
			type: String,
			default: 'default.svg',
		},
		title: {
			type: String,
			required: [true, ''],
			max: [100, ''],
		},
		subtitle: {
			type: String,
			max: [200, ''],
		},
		description: {
			type: String,
			max: [500, ''],
		},
		tags: {
			type: [String],
			max: [20, ''],
		},
		body: {
			type: [String],
			required: [true, ''],
		},
		publishAt: {
			type: Date,
		},
		published: {
			type: Boolean,
			default: false,
		},
		channel: {
			type: Types.ObjectId,
			required: [true, ''],
		},
		admin: {
			type: Types.ObjectId,
		},
	},
	{timestamps: {updatedAt: 'publishedAt'}}
);

export interface PostModel {
	cover: string;
	title: string;
	subtitle?: string;
	description?: string;
	tags: string[];
	body: string[];
	published: boolean;
	publishedAt: Date | number;
	publishAt?: Date | number;
	channel: string;
	admin?: string;
}

export interface IPost extends PostModel, Document {}

export const Post = model<IPost>('Post', postSchema);

setInterval(async () => {
	try {
		await Post.updateMany(
			{
				publishAt: {
					$lte: Date.now(),
				},
				published: false,
			},
			{
				published: true,
			}
		);
	} catch (error) {}
}, 1000);
