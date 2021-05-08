import {Browser, Device, OS, Platform} from '../enums';
import {Unknown} from '../unknown.type';

export interface UserDetailBase {
	authed: boolean;
	bot: boolean;
	city: string | Unknown;
	country: string | Unknown;
	device: Device;
	ip: string | Unknown;
	latitude: string | Unknown;
	longitude: string | Unknown;
	os: OS;
	platform: Platform;
	user: string | Unknown;
	version: string | Unknown;
	timeSpent: number;
}

export interface UserWebDetail extends UserDetailBase {
	browser: Browser;
	platform: Platform.WEB;
}

export interface UserAppDetail extends UserDetailBase {
	platform: Platform.APP;
}

export type UserDetail = UserWebDetail | UserAppDetail;
