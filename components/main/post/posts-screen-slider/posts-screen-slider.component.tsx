import React, {FC, useEffect, useState} from 'react';
import {useKeenSlider} from 'keen-slider/react';
import styled from 'styled-components';
import 'keen-slider/keen-slider.min.css';

import {PostItem} from './post-item.component';
import {Post} from '../../../../types';
import {SliderController} from './slider-controller.component';

const Container = styled.div`
	position: relative;
`;

const Slider = styled.div`
	height: calc(100vh - 80px);
	overflow: hidden;
	position: relative;

	&,
	& * {
		transition: none;
	}
`;

const Controller = styled.div`
	position: absolute;
	left: 5%;
	top: 50%;
	transform: translate(-50%, -50%);
	height: 80%;
`;

interface Props {
	posts: Post[];
}

export const PostsScreenSlider: FC<Props> = ({posts}) => {
	const [pause, setPause] = useState(false);
	const [dragging, setDragging] = useState(false);
	const [currentSlide, setCurrentSlide] = React.useState(0);

	const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
		initial: 0,
		loop: true,
		duration: 1000,
		dragStart: () => {
			setPause(true);
			setDragging(true);
		},
		dragEnd: () => {
			setPause(false);
			setDragging(false);
		},
		slideChanged(slider) {
			setCurrentSlide(slider.details().relativeSlide);
		},
	});

	useEffect(() => {
		sliderRef.current?.addEventListener('mouseover', () => {
			setPause(true);
		});
		sliderRef.current?.addEventListener('mouseout', () => {
			setPause(false);
		});
	}, [sliderRef]);

	React.useEffect(() => {
		const intervalId = setInterval(() => {
			if (!pause && slider) {
				slider.next();
			}
		}, 8000);

		return () => {
			clearInterval(intervalId);
		};
	}, [pause, slider]);

	const renderPosts = () =>
		posts.map((post, i) => (
			<PostItem post={post} key={post.id} active={i === currentSlide} />
		));

	return (
		<Container>
			<Slider ref={sliderRef} className="keen-slider">
				{renderPosts()}
			</Slider>
			{!dragging && (
				<Controller>
					<SliderController
						length={posts.length}
						active={currentSlide}
						moveToSlide={slider?.moveToSlide}
					/>
				</Controller>
			)}
		</Container>
	);
};
