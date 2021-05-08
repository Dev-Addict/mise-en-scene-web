import React, {FC, ReactElement} from 'react';

interface Props {
	adId: string;
	items: ReactElement[];
	pos?: number;
	interval?: number;
}

export const AdInjector: FC<Props> = ({
	adId,
	items,
	pos = 10,
	interval = 10,
}) => {
	if (items.length <= pos) return <>{items}</>;

	items.splice(pos, 0, <div id={adId} key={adId + pos} />);
	return (
		<AdInjector
			adId={adId}
			items={items}
			interval={interval}
			pos={pos + interval}
		/>
	);
};
