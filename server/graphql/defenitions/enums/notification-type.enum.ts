import {enumType} from 'nexus';

import {NotificationType} from '../../../../types';

export const NotificationTypeEnum = enumType({
	name: 'NotificationType',
	members: Object.values(NotificationType),
});
