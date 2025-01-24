import { Injectable } from '@nestjs/common';
import { ReceiptDTO } from './dto/receipt.dto';
import { PdfService } from 'src/pdf/pdf.service';
import { MailerService } from 'src/mailer/mailer.service';
@Injectable()
export class ReceiptService {
  constructor(
    private readonly pdfService: PdfService,
    private readonly mailto: MailerService,
  ) {}

  async generateReceipt(receiptDto: ReceiptDTO, email: string) {
    console.log('the email', email);
    const pdfBytes = await this.pdfService.generatePdf(receiptDto);

    // Convert to Buffer if pdfBytes is not a Buffer already
    const buffer = Buffer.from(pdfBytes);

    // // Base64 encode the PDF
    // const base64Pdf = buffer.toString('base64');
    try {
      const subject = 'Your Receipt from [Your App Name]';
      const text = 'Please find your receipt attached.';
      const html = `<p>Dear Customer,</p><p>Thank you for your purchase. Attached is your receipt.</p>`;

      const attachments = [
        {
          filename: 'receipt.pdf', // Name of the file to be sent
          content: buffer, // The Buffer containing the PDF
        },
      ];

      await this.mailto.sendMail(email, subject, text, html, attachments);

      return { message: 'Receipt sent successfully!' };
    } catch (error) {
      throw new Error(`Failed to send receipt: ${error.message}`);
    }
  }
}
