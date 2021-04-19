export type QueryResponse<T> = {
	docs: T[];
	results?: number;
	limit?: number;
	page?: number;
};
