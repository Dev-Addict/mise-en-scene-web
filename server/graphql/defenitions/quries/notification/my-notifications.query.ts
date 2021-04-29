import {queryField} from 'nexus';

import {JSONScalar} from '../../scalars';
import {NotificationsResponse} from '../../types';
import {protect} from '../../../../utils';
import {findModels} from '../../../utils';

export const MyNotificationsQuery = queryField('myNotifications', {
	type: NotificationsResponse,
	args: {
		page: 'Int',
		limit: 'Int',
		sort: JSONScalar,
	},
	async resolve(
		_root,
		{page, limit = 10, sort = {updatedAt: 1}},
		{req, models: {User, Notification}}
	) {
		const {id} = (await protect(req, User))!;

		await Notification.updateMany({to: id}, {seen: true});

		return <any>(
			findModels(Notification, page || 1, limit || 10, sort, {to: id})
		);
	},
});
