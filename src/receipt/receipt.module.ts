import { Module } from '@nestjs/common';
import { ReceiptController } from './receipt.controller';
import { ReceiptService } from './receipt.service';
import { PdfService } from 'src/pdf/pdf.service';
import { MailerService } from 'src/mailer/mailer.service';
@Module({
  controllers: [ReceiptController],
  providers: [ReceiptService, PdfService, MailerService],
})
export class ReceiptModule {}
