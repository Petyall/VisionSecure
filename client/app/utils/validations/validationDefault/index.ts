//#region validationDefault
/**
 * Validates a default input value.
 * @function validationDefault
 * @param {string} value The value to validate.
 * @param {langEnum} lang The language used for error messages.
 * @returns {string} An error message if the value is empty, otherwise an empty string.
 */
export const validationDefault = (value: string): string => {
  if (!value) {
    return 'Присутствуют недопустимые символы';
  }

  // Return an empty string if the value is not empty
  return '';
};
//#endregion
