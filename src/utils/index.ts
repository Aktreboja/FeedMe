export const formatPhoneNumber = (number: string) => {
  const countryCode = number.substring(0, 2);
  const areaCode = number.substring(2, 5);
  const starterCode = number.substring(4, 7);
  const secondaryCode = number.substring(6, 10);

  return `${countryCode} (${areaCode}) ${starterCode}-${secondaryCode}`;
};
