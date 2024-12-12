//#region validationEmail
/**
 * Validates the format of an email address.
 * @function validationEmail
 * @param {string} value The email address to validate.
 * @returns {string} An error message if the email address is invalid, otherwise an empty string.
 */
export const validationEmail = (value: string): string => {
  if (!value) {
    return 'Поле обязательно для заполнения';
  }

  // Regular expression to match valid email addresses
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(value)) {
    return 'Формат почты некорректный';
  }

  // Return an empty string if the email address is valid
  return '';
};
//#endregion
