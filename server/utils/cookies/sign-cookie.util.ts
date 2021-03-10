export const signCookie = (req: any, name: string, value: string) => {
	req.cookie(name, value, {
		maxAge: (<number | undefined>process.env.COOKIE_TIME || 0) * 24 * 60 * 60,
		httpOnly: true,
		secure: true,
	});
};
