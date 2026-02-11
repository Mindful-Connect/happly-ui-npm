export type Currency = {
  code: string;
  symbol: string;
  label: string;
  flag: string; // ISO2 for flag-icons
};

export const currencies: Currency[] = [
  { code: 'cad', symbol: '$', label: 'CAD', flag: 'ca' },
  { code: 'usd', symbol: '$', label: 'USD', flag: 'us' },
  { code: 'eur', symbol: '€', label: 'EUR', flag: 'eu' },
];
