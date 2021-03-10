import express from 'express';
import cookieParser from 'cookie-parser';
import {json, urlencoded} from 'body-parser';
import cors from 'cors';

export const app = express();

app.use(cors());
app.use(urlencoded({extended: true}));
app.use(json());
app.use(cookieParser(process.env.COOKIE_SECRET));
