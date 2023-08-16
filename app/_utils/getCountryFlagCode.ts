import getUnicodeFlagIcon from "country-flag-icons/unicode";

export const getCountryFlagByCode = (country: string) => {
  // edge cases not correctly formatted for i18n-iso-countries
  if (country === "UAE" || country === "Abu Dhabi") country = "United Arab Emirates";

  const countries = require("i18n-iso-countries");
  countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
  return getUnicodeFlagIcon(countries.getAlpha2Code(country, "en"));
};
