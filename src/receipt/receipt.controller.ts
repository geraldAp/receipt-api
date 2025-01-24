import { Controller, Post, Body, Query } from '@nestjs/common';
import { ReceiptDTO } from './dto/receipt.dto';
import { ReceiptService } from './receipt.service';
@Controller('receipts')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  @Post('generate')
  async generateReceipt(
    @Body() receiptData: ReceiptDTO,
    @Query('email') email: string,
  ) {
    console.log('Received data:', receiptData);

    return this.receiptService.generateReceipt(receiptData, email);
  }
}
