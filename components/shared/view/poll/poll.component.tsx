import React, {Dispatch, FC, SetStateAction} from 'react';
import {useMutation} from '@apollo/client';

import {Container, Votes} from './poll-components.component';
import {Text} from '../../text.component';
import {Announcement, AnnouncementPoll, Size} from '../../../../types';
import {
	VOTE_MUTATION,
	VoteMutationData,
	VoteMutationVariables,
} from '../../../../api';
import {useAuth} from '../../../../hooks';
import {PollOption} from './poll-option.component';
import {useRouter} from 'next/router';

interface Props {
	poll: AnnouncementPoll;
	setAnnouncement: Dispatch<SetStateAction<Announcement>>;
}

export const Poll: FC<Props> = ({
	poll: {question, optionsData, votes, myVote, id},
	setAnnouncement,
	poll,
}) => {
	const router = useRouter();
	const {asPath} = router;

	const {token, isSigned} = useAuth();

	const [vote, {loading}] = useMutation<
		VoteMutationData,
		VoteMutationVariables
	>(VOTE_MUTATION, {
		context: {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	});

	const onOptionClick = (option: number) => async () => {
		if (myVote) return;

		if (!isSigned) await router.push(`/sign?callback=${asPath}`);

		try {
			const {data} = await vote({
				variables: {
					poll: id || '',
					option,
				},
			});

			const options = [...(optionsData || [])];

			options[option] = {...options[option]};
			options[option].votes = (options[option].votes || 0) + 1;

			setAnnouncement((announcement) => ({
				...announcement,
				pollData: {
					...poll,
					votes: (votes || 0) + 1,
					optionsData: options,
					myVote: {
						...data?.vote,
						option,
					},
				},
			}));
		} catch (error) {}
	};

	const renderOptions = () =>
		optionsData?.map((option) => (
			<PollOption
				option={option}
				onOptionClick={onOptionClick}
				disabled={loading}
				myVote={myVote || undefined}
				pollVotes={votes}
			/>
		));

	return (
		<Container>
			<Text size={Size.HUGE} text={question} />
			{renderOptions()}
			<Votes size={Size.LARGE} text={votes?.toString()} />{' '}
			<Votes lowOpacity text="رای" />
		</Container>
	);
};
