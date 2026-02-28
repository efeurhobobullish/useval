// app/src/utils/generateCodes.js

export const generateCodes = (length = 4) => {
  const digits = "0123456789";
  let code = "";

  for (let i = 0; i < length; i += 1) {
    const index = Math.floor(Math.random() * digits.length);
    code += digits[index];
  }

  return code;
};
