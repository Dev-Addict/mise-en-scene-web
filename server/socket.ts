import {Server} from 'socket.io';

import {IView, View} from './models';
import {Types} from 'mongoose';

export const socket = (io: Server) => {
	io.on('connection', (socket) => {
		let view: IView | null = null;
		const start = new Date();

		socket.on('view', async (id: string, page: string) => {
			start.setTime(Date.now());
			view = await View.findById({_id: Types.ObjectId(id), ended: false, page});
		});

		socket.on('leave', async () => {
			if (view) {
				view.ended = true;
				view.timeSpent = Date.now() - start.getTime();

				await view.save();

				view = null;
			}
		});

		socket.on('disconnect', async () => {
			if (view) {
				view.ended = true;
				view.timeSpent = Date.now() - start.getTime();

				await view.save();

				view = null;
			}
		});
	});
};
