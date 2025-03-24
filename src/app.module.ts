import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReceiptModule } from './receipt/receipt.module';
import { DatabaseModule } from './database/database.module';
import { MailerService } from './mailer/mailer.service';
import { PdfService } from './pdf/pdf.service';
import { S3Service } from './s3/s3.service';

@Module({
  imports: [ReceiptModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService, MailerService, PdfService, S3Service],
})
export class AppModule {}
