import React, {FC} from 'react';

import {
	AnnouncementPollOption,
	AnnouncementPollResult,
} from '../../../../types';
import {
	Option,
	OptionBar,
	OptionContainer,
	OptionVotes,
} from './poll-components.component';

interface Props {
	option: AnnouncementPollOption;
	myVote?: AnnouncementPollResult;
	pollVotes?: number;
	onOptionClick: (index: number) => () => void;
	disabled?: boolean;
}

export const PollOption: FC<Props> = ({
	option: {votes, index, option},
	myVote,
	pollVotes,
	onOptionClick,
	disabled,
}) => {
	return (
		<OptionContainer>
			<OptionVotes
				voted={!!myVote}
				text={`${Math.floor(((votes || 0) / (pollVotes || 0) || 0) * 100)} %`}
			/>
			<Option
				voted={!!myVote}
				onClick={onOptionClick(index || 0)}
				disabled={disabled}>
				{option}
				<OptionBar
					voted={!!myVote}
					votePercentage={((votes || 0) / (pollVotes || 0) || 0) * 100}
					myVote={myVote?.option === index}
				/>
			</Option>
		</OptionContainer>
	);
};
