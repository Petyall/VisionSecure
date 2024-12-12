//#region formatAmount
/**
 * Formats a numeric value as an amount by adding thousands separators.
 * @function formatAmount
 * @param value - the numeric value as a string to format.
 * @returns the formatted amount value with thousands separators.
 */
export const formatAmount = (value: string): string => {
  const cleanedValue = value.replace(/\D/g, '');
  let formattedValue = '';

  for (let i = cleanedValue.length - 1; i >= 0; i--) {
    const digit = cleanedValue[i];
    const insertSpace =
      (cleanedValue.length - i - 1) % 3 === 0 && i !== cleanedValue.length - 1;

    if (insertSpace) {
      formattedValue = ' ' + formattedValue;
    }

    formattedValue = digit + formattedValue;
  }

  return formattedValue.trim();
};
//#endregion
