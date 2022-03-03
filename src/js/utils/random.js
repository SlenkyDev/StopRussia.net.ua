/**
 * @param {number} length 
 * @returns {string}
 */
export const randomString = (length) => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789-';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += alphabet.charAt(randomInteger(alphabet.length));
    }
    return result;
}


/**
 * @param {number} max 
 * @returns {number}
 */
export const randomInteger = (max) => {
    return 1 + Math.floor(Math.random() * (max - 1));
}