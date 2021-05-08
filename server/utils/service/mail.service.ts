import {Transporter} from 'nodemailer';
import {compileTemplate as CompileTemplate} from 'pug';
import {htmlToText} from 'html-to-text';

import {AppError} from '../app-error.util';
import {createTransporter} from '../create-transporter.util';
import {Mail} from '../../../types';

export interface EmailFile {
	filename: string;
	path: string;
}

export interface SendMailOptions {
	attachments?: EmailFile[];
	senderEmail?: string;
	senderName?: string;
	mail?: Mail;
	subject: string;
	to: string;
}

export class MailService {
	private static instance: MailService;

	private readonly adminTransporter: Transporter;
	private readonly infoTransporter: Transporter;
	private readonly noreplyTransporter: Transporter;
	private readonly supportTransporter: Transporter;
	private readonly teamTransporter: Transporter;

	private constructor() {
		this.adminTransporter = createTransporter('admin');
		this.infoTransporter = createTransporter('info');
		this.noreplyTransporter = createTransporter('noreply');
		this.supportTransporter = createTransporter('support');
		this.teamTransporter = createTransporter('team');
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
			senderName = 'میزانسن',
			mail = Mail.NOREPLY,
			senderEmail = `${mail.toLowerCase()}@miseenscene.ir`,
			to,
			subject,
		}: SendMailOptions
	) {
		const html = compileTemplate(properties);
		const text = htmlToText(html);

		try {
			await this.getTransporter(mail).sendMail({
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

	private getTransporter(mail: Mail): Transporter {
		switch (mail) {
			case Mail.ADMIN:
				return this.adminTransporter;
			case Mail.INFO:
				return this.infoTransporter;
			case Mail.SUPPORT:
				return this.supportTransporter;
			case Mail.NOREPLY:
			default:
				return this.noreplyTransporter;
		}
	}
}
