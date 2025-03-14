import * as puppeteer from 'puppeteer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PdfService {
  async generatePdf(emailTemaplate: string) {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setContent(emailTemaplate);
      const pdfBuffer = await page.pdf({ format: 'A4' });
      await browser.close();
      return pdfBuffer;
    } catch (error) {
      console.error(error);
    }
  }
}
