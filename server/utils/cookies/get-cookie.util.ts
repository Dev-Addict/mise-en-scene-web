import {Request} from 'express';

export const getCookie = (req: Request, name: string) => req.cookies[name];
