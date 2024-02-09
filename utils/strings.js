const ALPHA2CODE_REGEX = /^[A-Z]{2}$/;
const ALPHA3CODE_REGEX = /^[A-Z]{3}$/;

export const validateRegex = (code, type) => {
  if (type === "alpha2Code") {
    return ALPHA2CODE_REGEX.test(code);
  }
  if (type === "alpha3Code") {
    return ALPHA3CODE_REGEX.test(code);
  }
  return false;
};