//#region validationWords
/**
 *
 * @function validationWords
 * @param value
 * @param lang
 * @returns
 */
export const validationWords = (value: string) => {
  if (!value) {
    return 'Поле обязательно для заполнения';
  }

  const wordsRegex = /^[A-Za-zА-Яа-яЁё]+$/;
  if (!wordsRegex.test(value)) {
    return 'Недопустимые символы';
  }

  return '';
};
//#endregion
