import {createTransport, Transporter} from 'nodemailer';
import {compileTemplate as CompileTemplate} from 'pug';
import {htmlToText} from 'html-to-text';
import logger from 'node-color-log';

import {AppError} from '../app-error.util';

export interface EmailFile {
	filename: string;
	path: string;
}

export interface SendMailOptions {
	attachments?: EmailFile[];
	senderEmail?: string;
	senderName?: string;
	subject: string;
	to: string;
}

export class MailService {
	private static instance: MailService;

	private transporter: Transporter;

	private constructor() {
		this.transporter = createTransport({
			service: 'gmail',
			auth: {
				user: process.env.NODE_MAILER_USER,
				pass: process.env.NODE_MAILER_PASS,
			},
		});

		this.transporter.verify((error) => {
			if (error) logger.error('💥 failed to connect to mail service.');
			else logger.info('🔥 successfully connected to mail service.');
		});
	}

	public static getInstance(): MailService {
		if (!MailService.instance) MailService.instance = new MailService();

		return MailService.instance;
	}

	public async sendMail(
		compileTemplate: CompileTemplate,
		properties: {[key: string]: any},
		{
			attachments,
			senderEmail = 'noreply@miseenscene.ir',
			senderName = 'میزانسن',
			to,
			subject,
		}: SendMailOptions
	) {
		const html = compileTemplate(properties);
		const text = htmlToText(html);

		try {
			await this.transporter.sendMail({
				attachments,
				from: `${senderName} <${senderEmail}>`,
				html,
				subject,
				text,
				to,
			});
		} catch (error) {
			throw new AppError('0xE000059', 500);
		}
	}
}
