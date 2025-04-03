import { Injectable } from '@nestjs/common';

// todo: fetch exchange rates from an external API, save them in a database and update them periodically with a cron job

/**
 * Service for handling exchange rates between different currencies.
 *
 * The exchange rates are stored with USD as the base currency (1 USD).
 */
@Injectable()
export class ExchangeRateService {
	/**
	 * Dictionary of exchange rates for various currencies.
	 * Key is the currency symbol and value is the exchange rate relative to USD.
	 *
	 * @privateRemarks USD is the base currency with a value of 1.
	 */
	private exchangeRates: Record<exchangeRateSymbols, number> = {
		BTC: 0.000_023,
		EUR: 0.92,
		MXN: 17.54,
		USD: 1, // base
	};

	/**
	 * Gets all available exchange rates.
	 *
	 * @returns A dictionary of all currency exchange rates.
	 */
	getRates(): Record<string, number> {
		return this.exchangeRates;
	}

	/**
	 * Gets the exchange rate for a specific currency.
	 *
	 * @param currency - The currency symbol to get the exchange rate for.
	 * @returns The exchange rate for the specified currency, or null if the currency is not found.
	 */
	getRate(currency: exchangeRateSymbols): number | null {
		return this.exchangeRates[currency] || null;
	}
}
