import {Document, model, Schema, Types} from 'mongoose';

const userFollowSchema = new Schema({
	follower: {
		type: Types.ObjectId,
		required: [true, '0xE000089'],
	},
	following: {
		type: Types.ObjectId,
		required: [true, '0xE00008A'],
	},
});

export interface UserFollowModel {
	follower: string;
	following: string;
}

export interface IUserFollow extends UserFollowModel, Document {}

export const UserFollow = model<IUserFollow>('UserFollow', userFollowSchema);
