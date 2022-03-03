import { randomString, randomInteger } from './random';

export const createTargetUrl = target => {
  if (!target) return target;

  const STR = randomString(3 + randomInteger(7));
  const NUM = randomInteger(1e9);
  const date = new Date();
  const YYYY = date.getFullYear();
  const MM = date.getMonth() + 1;
  const DD = date.getDate();

  target = target
    .replace('%STR', STR)
    .replace('%NUM', NUM.toString())
    .replace('%YYYY', YYYY.toString())
    .replace('%MM', MM.toString().padStart(2, '0'))
    .replace('%DD', DD.toString().padStart(2, '0'));

  return target;
};
