import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Configure the transporter for Gmail
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAILER_EMAIL, // Your Gmail address
        pass: process.env.MAILER_PASSWORD, // Your Gmail App Password
      },
    });
  }

  async sendMail(
    to: string,
    subject: string,
    text: string,
    html?: string,
    attachments?: Array<{ filename: string; content: Buffer }>,
  ) {
    const mailOptions = {
      from: '"Your App Name" justinwahala16@gmail.com', // Sender address
      to, // Recipient email
      subject, // Subject line
      text, // Plain text body
      html, // HTML body (optional)
      attachments, // attachments
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent:', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
