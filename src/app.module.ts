import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReceiptModule } from './receipt/receipt.module';

@Module({
  imports: [ReceiptModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
