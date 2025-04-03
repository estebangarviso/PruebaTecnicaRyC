export interface Wallet {
	/**
	 * Currency balance in the wallet by currency code.
	 * For example, if the wallet has 100 USD and 200 EUR, the object would look like:
	 */
	[currency: string]: number;
}
