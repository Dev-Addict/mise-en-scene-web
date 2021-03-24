import {Document, model, Schema, Types} from 'mongoose';

const userFollowSchema = new Schema({
	follower: {
		type: Types.ObjectId,
		required: [true, ''],
	},
	following: {
		type: Types.ObjectId,
		required: [true, ''],
	},
});

export interface UserFollowModel {
	follower: string;
	following: string;
}

export interface IUserFollow extends UserFollowModel, Document {}

export const UserFollow = model<IUserFollow>('UserFollow', userFollowSchema);
