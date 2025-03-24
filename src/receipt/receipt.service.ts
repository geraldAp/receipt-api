import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DynamicReceiptDTO } from './dto/dynamicReceipt.dto';
import { PdfService } from 'src/pdf/pdf.service';
import { MailerService } from 'src/mailer/mailer.service';
import { DatabaseService } from 'src/database/database.service';
import * as ejs from 'ejs';
import * as fs from 'fs-extra';
import * as path from 'path';
@Injectable()
export class ReceiptService {
  constructor(
    private readonly pdfService: PdfService,
    private readonly mailto: MailerService,
    private readonly db: DatabaseService,
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

      (async () => {
        try {
          const pdfBuffer = await this.pdfService.generatePdf(emailHtml);
          console.log('Buffer Completed', pdfBuffer);
        } catch (e) {
          console.error('Background PDF process failed:', e);
        }
      })();

      return { message: 'Email sent successfully' };
    } catch (error) {
      throw new HttpException(
        `Failed to send email: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR, // Sends a 500 response
      );
    }
  }
}
