import { Module } from '@nestjs/common';
import { ReceiptController } from './receipt.controller';
import { ReceiptService } from './receipt.service';

@Module({
  controllers: [ReceiptController],
  providers: [ReceiptService]
})
export class ReceiptModule {}
