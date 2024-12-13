import { Injectable } from '@nestjs/common';
import { PDFDocument } from 'pdf-lib';

@Injectable()
export class PdfService {
  async generatePdf(receiptData: {
    heading: string[];
    data: { name: string; value: string | number }[];
    footer: { name: string; value: string | number }[];
  }) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    let y = 350; // Y-coordinate to start drawing text
    const { heading, data, footer } = receiptData;

    // Add heading
    page.drawText(`${heading[0]}: ${heading[1]}`, { x: 50, y });
    y -= 20;

    // Add data rows
    data.forEach((item) => {
      page.drawText(`${item.name}: ${item.value}`, { x: 50, y });
      y -= 20;
    });

    // Add footer
    footer.forEach((item) => {
      page.drawText(`${item.name}: ${item.value}`, { x: 50, y });
      y -= 20;
    });

    // Save the PDF and return its bytes
    return await pdfDoc.save();
  }
}
