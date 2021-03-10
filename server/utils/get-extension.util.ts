export const getExtension = (filename: string) => {
	const parts = filename.split('.');

	return parts[parts.length - 1];
};
