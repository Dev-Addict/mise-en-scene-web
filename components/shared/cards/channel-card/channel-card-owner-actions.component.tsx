import React, {FC} from 'react';
import {useRouter} from 'next/router';

import {Button} from '../../native';
import {Color} from '../../../../data';

interface Props {
	verified?: boolean;
	handle?: string;
}

export const ChannelCardOwnerActions: FC<Props> = ({verified, handle}) => {
	const router = useRouter();

	const onManageClick = () => () =>
		verified && router.push(`/channels/${handle || 'no'}/manage`);

	return (
		<Button
			primary
			fill
			disabled={!verified}
			onClick={onManageClick()}
			color={Color.GHOST_WHITE}>
			مدیریت
		</Button>
	);
};
