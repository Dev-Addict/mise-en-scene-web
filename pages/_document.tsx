import {ReactElement} from 'react';
import NDocument, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
} from 'next/document';
import {ServerStyleSheet} from 'styled-components';

interface Props {
	styleTags: Array<ReactElement<{}>>;
}

class Document extends NDocument<Props> {
	static async getInitialProps({renderPage}: DocumentContext) {
		const sheet = new ServerStyleSheet();

		const page = renderPage((App) => (props) =>
			sheet.collectStyles(<App {...props} />)
		);

		const styleTags = sheet.getStyleElement();

		return {...page, styleTags};
	}

	render(): JSX.Element {
		return (
			<Html>
				<Head>
					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link
						href="https://fonts.googleapis.com/css2?family=Lalezar&display=swap"
						rel="stylesheet"
					/>
					{this.props.styleTags}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default Document;
