import {enumType} from 'nexus';

import {Device} from '../../../../types';

export const DeviceEnum = enumType({
	name: 'Device',
	members: Object.values(Device),
});
