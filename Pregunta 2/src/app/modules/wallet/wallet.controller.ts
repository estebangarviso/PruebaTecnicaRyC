import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ConvertDto } from './models/convert.dto.ts';
import { WalletService } from './services/wallet.service.ts';

// todo: Implement access control features for this to the controller. Use a JWT for app authentication and JWKS service for public key verification (service providers such as AWS, Azure, Google, etc.)

@Controller({
	path: 'wallet',
	version: '1',
})
export class WalletController {
	@Get(':userId')
	getBalance(@Param('userId') userId: string) {
		return this._walletService.getBalance(userId);
	}

	@Get('exchange-rates')
	getExchangeRates() {
		return this._walletService.getExchangeRates();
	}

	@Post(':userId/convert')
	convertAndUpdate(
		@Param('userId') userId: string,
		@Body() body: ConvertDto,
	) {
		return this._walletService.convertAndUpdateCurrency(
			userId,
			body.monto,
			body.monedaDestino as exchangeRateSymbols,
		);
	}

	constructor(private readonly _walletService: WalletService) {}
}
