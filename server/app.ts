import express from 'express';
import cookieParser from 'cookie-parser';
import {json, urlencoded} from 'body-parser';
import cors from 'cors';
import useragent from 'express-useragent';
import requestIp from 'request-ip';

import {useragentParser} from './middlewares';

export const app = express();

app.use(cors());
app.use(urlencoded({extended: true}));
app.use(json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(useragent.express());
app.use(requestIp.mw());
app.use(useragentParser);
app.use(express.static('dynamic'));
