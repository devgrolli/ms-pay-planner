import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js';

export const formatCNPJ = (cnpj: string): string => {
    const numericCNPJ = cnpj.replace(/\D/g, '');
    return numericCNPJ.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
}

export const formatToE164 = (phone: string, countryCode: CountryCode = 'BR'): string => {
  const phoneNumber = parsePhoneNumberFromString(phone, countryCode);
  if (!phoneNumber) {
    throw new Error('Invalid phone number');
  }
  return phoneNumber.format('E.164');
}