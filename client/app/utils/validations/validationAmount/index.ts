//#region validationAmount
/**
 * Validates the format and range of a monetary amount.
 * @param {string} value The monetary amount to validate.
 * @param {langEnum} lang The language used for error messages.
 * @returns {string} An error message if the amount is invalid, otherwise an empty string.
 */
export const validationAmount = (value: string): string => {
  if (!value) {
    return 'Присутствуют недопустимые символы';
  }

  // Regular expression to match valid monetary amounts
  const amountRegex = /^(?!0)(?=.*\d)\d{1,3}(?: \d{3})*(?:,\d{2})?$/;
  if (!amountRegex.test(value)) {
    return 'Неверная сумма';
  }

  // Remove non-numeric characters and parse the amount as an integer
  const numericValue = value.replace(/[^\d]/g, '');
  const amount = parseInt(numericValue);

  // Check if the amount is within the valid range
  if (amount < 100 || amount > 1000000) {
    return 'Интервал суммы может быть только от 100 до 1 000 000';
  }

  // Return an empty string if the amount is valid
  return '';
};
//#endregion
