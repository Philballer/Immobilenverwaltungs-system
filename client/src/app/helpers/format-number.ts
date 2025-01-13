function formatToGermanMobileNumber(number: string): string {
  const cleanedNumber = number.replace(/\D/g, '');

  if (
    cleanedNumber.length < 10 ||
    cleanedNumber.length > 11 ||
    !cleanedNumber.startsWith('0')
  ) {
    return 'Invalid number';
  }

  const internationalNumber = '+49' + cleanedNumber.slice(1);

  return internationalNumber.replace(
    /(\+49)(\d{3})(\d{3})(\d{2})(\d{2})/,
    '$1 $2 $3 $4 $5'
  );

  return number;
}
