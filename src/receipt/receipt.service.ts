import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { ReceiptDTO } from './dto/receipt.dto';
import { DynamicReceiptDTO } from './dto/dynamicReceipt.dto';
import { PdfService } from 'src/pdf/pdf.service';
import { MailerService } from 'src/mailer/mailer.service';
import * as ejs from 'ejs';
import * as fs from 'fs-extra';
import * as path from 'path';
@Injectable()
export class ReceiptService {
  constructor(
    private readonly pdfService: PdfService,
    private readonly mailto: MailerService,
  ) {}

  async generateDynamicReceipt(
    receiptData: DynamicReceiptDTO,
    email: string,
    title: string,
  ) {
    try {
      const templatePath = path.join(
        process.cwd(),
        'src',
        'templates',
        'receipt.ejs',
      );
      const htmlTemplate = await fs.readFile(templatePath, 'utf-8');

      const emailHtml = ejs.render(htmlTemplate, { title, ...receiptData });
      this.mailto.sendMail(
        email,
        'Your Invoice from Quick Hub',
        'Thank you for shopping with us ',
        emailHtml,
      );

      return { message: 'Email sent successfully' };
    } catch (error) {
      throw new HttpException(
        `Failed to send email: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR, // Sends a 500 response
      );
    }
  }
}
