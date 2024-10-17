export const API_URLS = {
  ALL_COUNTRIES: 'https://restcountries.com/v2/all?fields=alpha3Code,name,flag',
  COUNTRY_INFO: (countryCode: string) => `https://restcountries.com/v2/alpha/${countryCode}`,
  BORDER_COUNTRIES: (borderCodes: string[]) => `https://restcountries.com/v2/alpha?codes=${borderCodes.join(',')}`
};
