import { zxcvbn } from '@zxcvbn-ts/core';

//#region validationPassword
/**
 * Validates a password.
 * @function validationPassword
 * @param {string} value - The password to validate.
 * @returns {string} An error message if validation fails, otherwise an empty string.
 */
export const validationPassword = (value: string): string => {
  // Check if the password value is empty
  if (!value || value.trim() === '') {
    return 'Поле обязательно для заполнения';
  }

  // Check for Russian alphabet characters and spaces
  const russianAlphabetRegex = /[а-яА-Я\s]/;
  if (russianAlphabetRegex.test(value)) {
    return 'Присутствуют недопустимые символы';
  }

  // Check if the password length is less than 8 characters
  if (value.length < 8) {
    return 'Длинна пароля не может быть меньше 8 символов';
  }

  // Check if the password contains at least one letter
  const letterRegex = /[a-zA-Z]/;
  if (!letterRegex.test(value)) {
    return 'Пароль должен содержать хотя бы одну букву';
  }

  // Check if the password contains at least one digit
  const digitRegex = /\d/;
  if (!digitRegex.test(value)) {
    return 'Пароль должен содержать хотя бы одну цифру';
  }

  // Check if the password contains at least one special character
  const specialCharacterRegex = /[-_!@#$%^&№*?:./,>♪*+`'"|;<=]/;
  if (!specialCharacterRegex.test(value)) {
    return 'Пароль должен содержать как минимум один специальный символ';
  }

  // Check if the password is in the list of unsafe passwords
  const unsafePasswords = [
    'password',
    'password1',
    '00000000',
    '12345678',
    'qwerty',
    'qwerty123',
    'admin',
    'root123',
    'admin123',
    'letmein',
    'letmein123',
    '11111111',
    '123456789',
    'abc12345',
    '12341234',
    'iloveyou',
    'welcome',
    'monkey',
    'sunshine',
    'princess',
    'football',
    'baseball',
    'superman',
    'dragon12',
    '1234567890',
    '987654321',
    'master123',
  ];

  if (unsafePasswords.includes(value.toLowerCase())) {
    return 'Слишком простой пароль или опасный. Возможно он уже есть в базе злоумышленников';
  }

  // Check the password strength using zxcvbn library
  const passwordStrength = zxcvbn(value).score;
  if (passwordStrength < 3) {
    return 'Слабый пароль';
  }

  // Return an empty string if all checks pass
  return '';
};
//#endregion

export const validationPasswordAuth = (value: string): string => {
  // Check if the password value is empty
  if (!value || value.trim() === '') {
    return 'Поле обязательно для заполнения';
  }

  return '';
};
