import React, {FC, useEffect, useRef, useState} from 'react';

import {FileInput} from './file-input.component';
import {Image as ImageView} from '../../view';
import {Image} from '../../../../types';
import {uploadImage} from '../../../../helpers';
import {useComponentSize, useThemeImage} from '../../../../hooks';

interface Props {
	disabled?: boolean;
	value?: Image | undefined;
	onImageChange?: (image: Image | undefined) => void;
}

export const ImageInput: FC<Props> = ({
	disabled = false,
	value,
	onImageChange,
}) => {
	const logo = useThemeImage('/assets/logo/mes-$mode.svg');

	const inputRef = useRef<HTMLInputElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const [image, setImage] = useState<Image | undefined>(undefined);
	const [loading, setLoading] = useState<boolean>(false);

	const {width} = useComponentSize(containerRef);

	const onImageClick = () => () =>
		!(disabled || loading) && inputRef.current?.click();
	const onFileSelect = () => async (files: File[]) => {
		if (files[0]) {
			setLoading(true);

			const image = await uploadImage({image: files[0]});

			setImage(image);
			onImageChange && onImageChange(image);

			setLoading(false);
		}
	};

	useEffect(() => {
		setImage(value);
	}, [value]);

	return (
		<>
			<FileInput
				onFilesSelect={onFileSelect()}
				disabled={disabled || loading}
				inputRef={inputRef}
			/>
			<div onClick={onImageClick()} ref={containerRef}>
				<ImageView
					image={image}
					defaultSrc={logo}
					width={image ? undefined : width}
					height={image ? undefined : width}
					disabled={disabled || loading}
					active
				/>
			</div>
		</>
	);
};
