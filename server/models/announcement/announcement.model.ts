import {Document, model, Schema, Types} from 'mongoose';

const announcementSchema = new Schema(
	{
		user: {
			type: Types.ObjectId,
			required: [true, '0xE000054'],
		},
		text: {
			type: String,
			max: [2000, '0xE00004B'],
		},
		publishAt: {
			type: Date,
		},
		gif: {
			type: Types.ObjectId,
			ref: 'Gif',
		},
		images: {
			type: [Types.ObjectId],
			ref: 'Image',
		},
		poll: {
			type: Types.ObjectId,
			ref: 'AnnouncementPoll',
		},
		published: {
			type: Boolean,
			default: true,
		},
		reAnnouncement: {
			type: Types.ObjectId,
			ref: 'Announcement',
		},
	},
	{timestamps: {updatedAt: 'publishedAt'}}
);

export interface AnnouncementModel {
	text: string;
	user: string;
	publishAt?: Date | number;
	gif?: string;
	images?: string[];
	poll?: string;
	published: boolean;
	publishedAt: Date | number;
	reAnnouncement?: string;
}

export interface IAnnouncement extends AnnouncementModel, Document {}

export const Announcement = model<IAnnouncement>(
	'Announcement',
	announcementSchema
);

setInterval(async () => {
	try {
		await Announcement.updateMany(
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
