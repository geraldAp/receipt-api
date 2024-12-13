import { Injectable } from '@nestjs/common';
import { ReceiptDTO } from './dto/receipt.dto';
import { PdfService } from 'src/pdf/pdf.service';
@Injectable()
export class ReceiptService {
  constructor(private readonly pdfService: PdfService) {}

  async generateReceipt(receiptDto: ReceiptDTO) {
    const pdfBytes = await this.pdfService.generatePdf(receiptDto);

    // Convert to Buffer if pdfBytes is not a Buffer already
    const buffer = Buffer.from(pdfBytes);

    // Base64 encode the PDF
    const base64Pdf = buffer.toString('base64');
    return {
      message: 'Receipt generated successfully!',
      pdf: base64Pdf,
    };
  }
}
