import { Injectable } from '@nestjs/common';
import { PDFDocument, rgb } from 'pdf-lib';

@Injectable()
export class PdfService {
  async generatePdf(
    receiptData: {
      // Optional title for branding
      heading: string[];
      data: { name: string; value: string | number }[];
      footer: { name: string; value: string | number }[];
    },
    title: string,
  ) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]); // Width: 600, Height: 400

    let y = 380; // Start from the top of the page
    const { heading, data, footer } = receiptData;

    // Add Title (Optional Branding)
    if (title) {
      page.drawText(title, {
        x: 50,
        y,
        size: 18,
        color: rgb(0, 0.53, 0.71), // Blue-ish color
      });
      y -= 30; // Add spacing after the title
    }

    // Add Heading
    page.drawText(`${heading[0]}: ${heading[1]}`, {
      x: 50,
      y,
      size: 14,
      color: rgb(0, 0, 0), // Black
    });
    y -= 20; // Spacing after the heading

    // Add Data Rows
    data.forEach((item) => {
      // Draw item name on the left
      page.drawText(`${item.name}`, {
        x: 50,
        y,
        size: 12,
        color: rgb(0, 0, 0),
      });

      // Draw item value on the right
      page.drawText(`${item.value}`, {
        x: 500, // Align value to the right
        y,
        size: 12,
        color: rgb(0, 0, 0),
      });

      y -= 20; // Move to the next row
    });

    // Add Footer
    y -= 20; // Add extra spacing before footer
    footer.forEach((item) => {
      page.drawText(`${item.name}: ${item.value}`, {
        x: 50,
        y,
        size: 12,
        color: rgb(0.53, 0, 0), // Dark red for footer
      });
      y -= 20;
    });

    // Save the PDF and return its bytes
    return await pdfDoc.save();
  }
}
