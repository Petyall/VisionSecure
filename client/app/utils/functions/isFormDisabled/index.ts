export function isFormDisabled<T extends Record<string, unknown>>(
  data: T,
  validation: { [K in keyof T]: boolean }
): boolean {
  return Object.keys(data).some((key) => {
    const value = data[key as keyof T];
    const isValidField = validation[key as keyof T];

    const isEmptyString = typeof value === 'string' && value === '';

    return isEmptyString || !isValidField;
  });
}
