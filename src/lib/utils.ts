type Data = {
  [key: string]: string;
};

// temporarily allow key and value to be any as part of TS migration
export const isFound = (data: Data, key: any, value: any): boolean => data.hasOwnProperty(key) && data[key] === value;

const toTitleCase = (str: string): string => {
  const s = str.toLowerCase().split(' ');
  for (var i = 0; i < s.length; i++) {
    s[i] = s[i].charAt(0).toUpperCase() + s[i].slice(1);
  }
  return s.join(' ');
};

export const snakeCaseToTitleCase = (snakeStr: string): string => {
  return snakeStr
    .split('_')
    .map((str) => toTitleCase(str))
    .join(' ');
};
