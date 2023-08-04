export const isEmpty = (obj) => {
  if (Array.isArray(obj)) {
    return obj.length === 0;
  } if (obj instanceof Object) {
    return Object.keys(obj).length === 0;
  }
  throw new TypeError('Must be of type <Array type> or <Object type>');
};

export const isNil = (obj) => obj === undefined || obj === null;

/**
 *
 * @param { string } payload
 * @returns
 */
export const toTitle = (payload) => (
  payload
  .split(' ')
  .map(s => `${s.charAt(0).toUpperCase()}${s.substring(1).toLowerCase()}`)
  .join(' ')
);
