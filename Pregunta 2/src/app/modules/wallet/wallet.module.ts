import { Module } from '@nestjs/common';
import { ExchangeRateService } from './services/exchange-rate.service.ts';
import { WalletService } from './services/wallet.service.ts';
import { WalletController } from './wallet.controller.ts';

@Module({
	providers: [WalletService, ExchangeRateService],
	controllers: [WalletController],
})
export class WalletModule {}
