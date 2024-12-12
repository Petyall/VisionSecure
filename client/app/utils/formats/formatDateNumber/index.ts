//#region formatDateNumber
/**
 * Formats a date number by adding dots for better readability.
 * @function formatDateNumber
 * @param value - the date number to format as a string.
 * @returns the formatted date number with dots.
 */
export const formatDateNumber = (value: string): string => {
  let formattedValue = value.replace(/\D/g, '');

  if (formattedValue.length > 2) {
    if (formattedValue.length >= 4) {
      formattedValue = `${formattedValue.slice(0, 2)}.${formattedValue.slice(2, 4)}.${formattedValue.slice(4, 8)}`;
    } else {
      formattedValue = `${formattedValue.slice(0, 2)}.${formattedValue.slice(2)}`;
    }
  }

  if (value.length < formattedValue.length) {
    formattedValue = formattedValue.replace(/\.$/, '');
  }

  if (formattedValue.endsWith('.') && formattedValue.length < 7) {
    formattedValue = formattedValue.slice(0, formattedValue.length - 1);
  }

  return formattedValue;
};
//#endregion
