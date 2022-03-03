export const randomString = length => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789-';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += alphabet.charAt(randomInteger(alphabet.length));
  }
  return result;
};

export const randomInteger = max => 1 + Math.floor(Math.random() * (max - 1));
