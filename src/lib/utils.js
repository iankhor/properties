export const isFound = (data, key, value) => data.hasOwnProperty(key) && data[key] === value;

const toTitleCase = str => {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(' ');
};

export const snakeCaseToTitleCase = snakeStr => {
  return snakeStr
    .split('_')
    .map(str => toTitleCase(str))
    .join(' ');
};
