import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ConvertDto } from './models/convert.dto.ts';
import { WalletService } from './services/wallet.service.ts';

// todo: Implement access control features for this to the controller. Use a JWT for app authentication and JWKS service for public key verification (service providers such as AWS, Azure, Google, etc.)
/**
 * Controller handling wallet operations
 * @class WalletController
 */
@Controller({
	path: 'wallet',
	version: '1',
})
export class WalletController {
	/**
	 * Retrieves the balance for a specific user
	 * @param {string} userId - The ID of the user
	 * @returns {Promise<any>} The user's balance information
	 */
	@Get(':userId')
	getBalance(@Param('userId') userId: string) {
		return this._walletService.getBalance(userId);
	}

	/**
	 * Retrieves current exchange rates
	 * @returns {Promise<any>} The current exchange rates
	 */
	@Get('exchange-rates')
	getExchangeRates() {
		return this._walletService.getExchangeRates();
	}

	/**
	 * Converts an amount to a destination currency and updates the user's wallet
	 * @param {string} userId - The ID of the user
	 * @param {ConvertDto} body - Contains the amount to convert and the destination currency
	 * @param {number} body.monto - The amount to convert
	 * @param {exchangeRateSymbols} body.monedaDestino - The destination currency
	 * @returns {Promise<any>} The result of the currency conversion operation
	 */
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

	/**
	 * Creates an instance of WalletController
	 * @param {WalletService} _walletService - The wallet service
	 */
	constructor(private readonly _walletService: WalletService) {}
}
