//#region parseNumberToString
/**
 *
 * @function parseNumberToString
 * @param value
 * @returns
 */
export const parseNumberToString = (value: number): string => {
  return value?.toLocaleString('ru', { useGrouping: true });
};
//#endregion
