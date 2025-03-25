import * as puppeteer from 'puppeteer';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class PdfService {
  async generatePdf(emailTemaplate: string) {
    try {
      const fileName = `receipt-${uuidv4()}.pdf`;
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setContent(emailTemaplate);
      const pdfBuffer = await page.pdf({ format: 'A4' });
      await browser.close();
      return { pdfBuffer: Buffer.from(pdfBuffer), fileName };
    } catch (error) {
      console.error(error);
    }
  }
}
