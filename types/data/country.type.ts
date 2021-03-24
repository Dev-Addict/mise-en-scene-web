export interface Country {
	countryNameEn: string;
	countryNameFa: string;
	countryNameLocal: string;
	countryCode: string;
	currencyCode: string;
	currencyNameEn: string;
	tinType: string;
	tinName: string;
	officialLanguageCode: string;
	officialLanguageNameEn: string;
	officialLanguageNameFa: string;
	officialLanguageNameLocal: string;
	countryCallingCode: string;
	region: string;
	flag: string;
}

export type Countries = Country[];
