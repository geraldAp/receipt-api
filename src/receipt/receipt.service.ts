import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DynamicReceiptDTO } from './dto/dynamicReceipt.dto';
import { PdfService } from 'src/pdf/pdf.service';
import { MailerService } from 'src/mailer/mailer.service';
import { DatabaseService } from 'src/database/database.service';
import { S3Service } from 'src/s3/s3.service';
import * as ejs from 'ejs';
import * as fs from 'fs-extra';
import * as path from 'path';

@Injectable()
export class ReceiptService {
  constructor(
    private readonly pdfService: PdfService,
    private readonly mailto: MailerService,
    private readonly db: DatabaseService,
    private readonly s3Service: S3Service,
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

      const file = await this.db.receipt.create({ data: {} });

      const emailHtml = ejs.render(htmlTemplate, { title, ...receiptData });

      this.mailto.sendMail(
        email,
        'Your Invoice from Quick Hub',
        'Thank you for shopping with us ',
        emailHtml,
      );

      (async () => {
        try {
          const { pdfBuffer, fileName } =
            await this.pdfService.generatePdf(emailHtml);
          const pdfUrl = await this.s3Service.uploadFile(pdfBuffer, fileName);
          await this.updateReceiptUrlInDB(fileName, pdfUrl, file.id);
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

  async downloadReceipt(id: string) {
    try {
    } catch (error) {}
  }

  async updateReceiptUrlInDB(fileName: string, pdfUrl: string, id: string) {
    try {
      await this.db.receipt.update({
        where: {
          id,
        },
        data: {
          filename: fileName,
          s3Url: pdfUrl,
        },
      });

      console.log('UPDATE completed');
    } catch (error) {
      throw Error(error);
    }
  }
}
