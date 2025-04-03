import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import type { Wallet } from '../wallet.interface.ts';
import { ExchangeRateService } from './exchange-rate.service';

/**
 * Service that manages user wallets and currency conversions.
 *
 * This service allows users to:
 * - Check their current wallet balance
 * - Convert USD to other currencies
 */
@Injectable()
export class WalletService {
	/**
	 * Map of user IDs to their respective wallet balances
	 * @remarks This is a simple in-memory store for demonstration purposes.
	 * In a real-world application, this should be replaced with a database.
	 * @private
	 */
	private usersWallets: Record<string, Wallet> = {
		// example user wallets
		user1: { EUR: 500, USD: 1000 },
		user2: { BTC: 0.5, USD: 2000 },
		user3: { MXN: 10_000, USD: 3000 },
	};

	/**
	 * Retrieves the current exchange rates for all currencies
	 *
	 * @returns A dictionary of all currency exchange rates
	 */
	getExchangeRates(): Record<string, number> {
		return this.exchangeRateService.getRates();
	}

	/**
	 * Retrieves the wallet balance for a specific user
	 *
	 * @param userId - The unique identifier of the user
	 * @returns The user's wallet with their currency balances, or a new wallet with 0 USD if not found
	 */
	getBalance(userId: string): Wallet {
		const wallet = this.usersWallets[userId];
		if (!wallet) {
			return { USD: 0 }; // return a new wallet with 0 USD if not found
		}
		return wallet;
	}

	/**
	 * Converts a specified amount of USD to another currency and updates the user's wallet
	 *
	 * @param userId - The unique identifier of the user
	 * @param amount - The amount in USD to convert
	 * @param targetCurrency - The target currency symbol to convert to
	 * @returns The updated wallet after the currency conversion
	 * @throws {NotFoundException} If the exchange rate for the target currency is not found
	 * @throws {BadRequestException} If the user does not have sufficient USD balance
	 */
	convertAndUpdateCurrency(
		userId: string,
		amount: number,
		targetCurrency: exchangeRateSymbols,
	): Wallet {
		if (!this.usersWallets[userId]) {
			throw new NotFoundException(
				`Billetera no encontrada para el usuario ${userId}.`,
			);
		}

		const wallet = this.usersWallets[userId];

		// validar que la moneda destino exista
		const rate = this.exchangeRateService.getRate(targetCurrency);
		if (rate === null) {
			throw new NotFoundException(
				`Tasa de cambio para ${targetCurrency} no encontrada.`,
			);
		}

		// validar saldo suficiente
		if (wallet.USD < amount) {
			throw new BadRequestException('Saldo insuficiente en USD.');
		}

		// convertir el monto y actualizar saldo
		const convertedAmount = amount * rate;
		wallet.USD -= amount;
		wallet[targetCurrency] =
			(wallet[targetCurrency] || 0) + convertedAmount;

		return wallet;
	}

	/**
	 * @param exchangeRateService - Service to retrieve currency exchange rates
	 */
	constructor(private readonly exchangeRateService: ExchangeRateService) {}
}
