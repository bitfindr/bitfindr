export interface BaseUserProfile {
  firstName: string;
  lastName: string;
}

export interface UserProfile extends BaseUserProfile {
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
