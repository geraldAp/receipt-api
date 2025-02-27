import { Controller, Post, Body, Query, Version } from '@nestjs/common';
import { ReceiptService } from './receipt.service';
import { DynamicReceiptDTO } from './dto/dynamicReceipt.dto';
@Controller('receipts')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  @Post('generate')
  @Version('1')
  async generateReceipt(
    @Body() receiptData: DynamicReceiptDTO,
    @Query('email') email: string,
    @Query('title') title: string,
  ) {
    console.log('Received data:', receiptData);

    return this.receiptService.generateDynamicReceipt(
      receiptData,
      email,
      title,
    );
  }
}
