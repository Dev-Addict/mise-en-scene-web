import {createTransport} from 'nodemailer';
import logger from 'node-color-log';

export const createTransporter = (name: string) => {
	const transporter = createTransport({
		host: process.env.MAIL_SERVER || '',
		port: process.env.MAIL_PORT || 587,
		source: true,
		auth: {
			user: (process.env.MAIL_USERNAME || '').replace('<name>', name),
			pass: process.env.MAIL_PASSWORD,
		},
		tls: {
			rejectUnauthorized: false,
		},
	} as any);

	transporter.verify((error) => {
		if (error) logger.error(`💥 failed to connect to ${name} mail.`);
		else logger.info(`🔥 successfully connected to ${name} mail.`);
	});

	return transporter;
};
