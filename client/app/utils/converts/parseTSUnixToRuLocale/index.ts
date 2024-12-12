//#region parseTSUnixToRuLocale
/**
 *
 * @function parseTSUnixToRuLocale
 * @param dateTimeString
 * @param lang
 * @returns
 */
export const parseTSUnixToRuLocale = (dateTimeString: string): string => {
  const dateObj = dateTimeString?.split('T');
  if (dateObj) {
    let date = dateObj[0].split('-').slice(1, 3).toString().replace(',', '.');
    date = dateObj[0]
      .split('-')
      .slice(1, 3)
      .reverse()
      .toString()
      .replace(',', '.');
    const time = dateObj[1]
      .split('.')[0]
      .split(':')
      .slice(0, 2)
      .toString()
      .replace(',', ':');
    return `${date} | ${time}`;
  }
  return '';
};
//#endregion
