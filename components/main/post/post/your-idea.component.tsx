import React, {Dispatch, FC, SetStateAction} from 'react';
import {useMutation} from '@apollo/client';
import styled from 'styled-components';

import {Rating, Text} from '../../../shared';
import {Post, Size} from '../../../../types';
import {
	RATE_POST_MUTATION,
	RatePostMutationData,
	RatePostMutationVariables,
} from '../../../../api';
import {useAuth} from '../../../../hooks';
import {useRouter} from 'next/router';

const RatingContainer = styled.div`
	margin: 20px 0;
	display: flex;
	flex-direction: row;
	justify-content: center;
`;

interface Props {
	post: Post;
	setPost: Dispatch<SetStateAction<Post | undefined>>;
}

export const YourIdea: FC<Props> = ({
	post: {id, raters, rating: postRating, myRating},
	setPost,
}) => {
	const router = useRouter();
	const {asPath} = router;

	const {token, isSigned} = useAuth();

	const [ratePost, {loading}] = useMutation<
		RatePostMutationData,
		RatePostMutationVariables
	>(RATE_POST_MUTATION, {
		context: {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	});

	const onRatingChange = () => async (rating: number) => {
		if (loading) return;

		if (!isSigned) return router.push(`/sign?callback=${asPath}`);

		try {
			const {data} = await ratePost({
				variables: {
					rating,
					post: id || '',
				},
			});

			setPost((post) => ({
				...post,
				myRating: data?.ratePost,
				raters: (raters || 0) + (myRating ? 0 : 1),
				rating: myRating
					? ((raters || 0) * (postRating || 0) -
							(myRating?.rating || 0) +
							rating) /
					  (raters || 0)
					: ((raters || 0) * (postRating || 0) + rating) / ((raters || 0) + 1),
			}));
		} catch (error) {}
	};

	return (
		<div>
			<Text text="نظر شما:" size={Size.LARGE} />
			<RatingContainer>
				<Rating
					ratio={2}
					ratable
					rating={myRating?.rating || 0}
					onChange={onRatingChange()}
					disabled={loading}
				/>
			</RatingContainer>
		</div>
	);
};
