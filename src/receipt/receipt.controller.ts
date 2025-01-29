import { Controller, Post, Body, Query, Version } from '@nestjs/common';
import { ReceiptDTO } from './dto/receipt.dto';
import { ReceiptService } from './receipt.service';
@Controller('receipts')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  @Post('generate')
  @Version('1')
  async generateReceipt(
    @Body() receiptData: ReceiptDTO,
    @Query('email') email: string,
    @Query('title') title: string,
  ) {
    console.log('Received data:', receiptData);

    return this.receiptService.generateReceipt(receiptData, email, title);
  }
}
