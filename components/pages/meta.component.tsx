import React, {FC} from 'react';
import Head from 'next/head';

interface Props {
	title?: string;
	description?: string;
	keywords?: string[];
}

export const Meta: FC<Props> = ({title, description, keywords}) => {
	return (
		<Head>
			<meta charSet="UTF-8" />
			<title>میزانسن - {title}</title>
			{description && <meta name="description" content={description} />}
			{keywords && <meta name="keywords" content={keywords.join(', ')} />}
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		</Head>
	);
};
