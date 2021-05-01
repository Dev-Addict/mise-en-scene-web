import {Model} from 'mongoose';

import {AnyModel} from '../../models';

export const findModels = async <T extends AnyModel>(
	Model: Model<T>,
	page = 1,
	limit = 10,
	sort = {updatedAt: 1} as {[key: string]: any},
	filter = {}
) => {
	const skip = (page - 1) * limit;

	const queryFilter = JSON.parse(
		JSON.stringify(filter).replace(
			/\b(eq|gt|gte|in|lt|lte|ne|nin|and|not|nor|or|exists|type|expr|jsonSchema|mod|regex|text|where|geoIntersects|geoWithin|near|nearSphere|all|elemMatch|size|bitsAllClear|bitsAllSet|bitsAnySet|meta|slice)\b/g,
			(match) => `$${match}`
		)
	);

	const docs = await Model.find(queryFilter).skip(skip).limit(limit).sort(sort);

	return {
		results: await Model.countDocuments(queryFilter),
		page,
		limit,
		docs,
	};
};
