import React from 'react';
import NDocument, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
} from 'next/document';
import {ServerStyleSheet} from 'styled-components';

class Document extends NDocument {
	static async getInitialProps(ctx: DocumentContext) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) =>
						sheet.collectStyles(<App {...props} />),
				});

			const initialProps = await NDocument.getInitialProps(ctx);
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			};
		} finally {
			sheet.seal();
		}
	}

	render(): JSX.Element {
		const now = new Date();

		return (
			<Html lang="ir-fa">
				<Head>
					{this.props.styles}
					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link
						href="https://fonts.googleapis.com/css2?family=Lalezar&display=swap"
						rel="stylesheet"
					/>
					<script
						async
						src={`https://cdn.yektanet.com/js/miseenscene.ir/native-miseenscene.ir-17194.js?v=${now
							.getFullYear()
							.toString()}0${now.getMonth()}0${now.getDate()}0${now.getHours()}`}
					/>
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
