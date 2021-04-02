import {scalarType} from 'nexus';

export const UploadScalar = scalarType({
	name: 'Upload',
	asNexusMethod: 'upload',
});
