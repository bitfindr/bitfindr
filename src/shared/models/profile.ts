export interface UserProfile {
  firstName: string;
  lastName: string;
  wallets: Wallet[];
}

export interface Broker {
  name: string;
  currencies: Currency[];
}

export interface Currency {
  name: string;
  shortName: string;
  iconUrl: string;
}

export interface Wallet {
  brokerId: string;
  hash: string;
  currencyId: string;
}
