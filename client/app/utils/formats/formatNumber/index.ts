//#region formatNumber
/**
 * Cleans up a string by removing all non-numeric characters.
 * @function formatNumber
 * @param value - the input value as a string to clean.
 * @returns the cleaned value with only numeric characters.
 */
export const formatNumber = (value: string): string => {
  const cleanedValue = value.replace(/\D/g, '');

  return cleanedValue;
};
//#endregion
