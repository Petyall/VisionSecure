//#region parserFileToBase64
/**
 *
 * @function parserFileToBase64
 * @param file '
 * @returns
 */
export const parserFileToBase64 = (file: Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};
//#endregion
