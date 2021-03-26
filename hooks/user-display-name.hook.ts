interface ValidUser {
	displayName?: string | null | undefined;
	firstname?: string | null | undefined;
	lastname?: string | null | undefined;
	username?: string | null | undefined;
}

export const useUserDisplayName = <T extends ValidUser>(user: T) => {
	return (
		user.displayName ||
		`${user.firstname || ''} ${user.lastname || ''}`.trim() ||
		user.username
	);
};
