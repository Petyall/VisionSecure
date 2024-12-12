//#region validationDate
/**
 * Validates the format and validity of a date string.
 * @function validationDate
 * @param {string} value The date string to validate.
 * @returns {string} An error message if the date is invalid, otherwise an empty string.
 */
export const validationAnyDate = (value: string): string => {
  if (!value) {
    return 'Поле обязательно для заполнения';
  }

  // Regular expression to match valid date formats (dd.mm.yyyy)
  const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
  if (!dateRegex.test(value)) {
    return 'Формат даты неверный';
  }

  // Parse the components of the date string
  const year = parseInt(value.substring(6), 10);
  const month = parseInt(value.substring(3, 5), 10);
  const day = parseInt(value.substring(0, 2), 10);

  // Check if the parsed components represent a valid date
  if (
    isNaN(year) ||
    isNaN(month) ||
    isNaN(day) ||
    year < new Date().getFullYear() ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31 ||
    !isValidDayOfMonth(year, month, day)
  ) {
    return 'Несуществующая дата';
  }

  // Return an empty string if the date is valid
  return '';
};

/**
 * Checks if a given day is valid for the specified month and year.
 * @param {number} year The year of the date.
 * @param {number} month The month of the date.
 * @param {number} day The day of the date.
 * @returns {boolean} True if the day is valid for the specified month and year, otherwise false.
 */
function isValidDayOfMonth(year: number, month: number, day: number): boolean {
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}
//#endregion
