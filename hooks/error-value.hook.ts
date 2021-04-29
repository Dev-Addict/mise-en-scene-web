import {useThemeImage} from './theme-image.hook';

export const useErrorValue = (code: number, title?: string) => {
	const access = useThemeImage('/assets/illustrations/access/access-$mode.svg');
	const brokenServer = useThemeImage(
		'/assets/illustrations/broken-server/broken-server-$mode.svg'
	);
	const inSearch = useThemeImage(
		'/assets/illustrations/in-search/in-search-$mode.svg'
	);
	const unknown = useThemeImage(
		'/assets/illustrations/unknown/unknown-$mode.svg'
	);

	switch (code) {
		case 404:
			return {
				message: title || 'صفحه مورد نظر پیدا نشد!',
				image: inSearch,
			};
		case 403:
			return {
				message: title || 'شما اجازه دسترسی به این صفحه را ندارید!',
				image: access,
			};
		case 500:
			return {
				message: title || 'خطایی در سرور رخ داد!',
				image: brokenServer,
			};
		default:
			return {
				message: title || 'خطایی نامشخص رخ داد!',
				image: unknown,
			};
	}
};
