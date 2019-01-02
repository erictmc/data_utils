
export const deepCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// Trims any leading zero from a string
export const trimLeadingZeros = str => {
  return str.replace(/^0+(?!\.|$)/, "");
};


// Checks if a string is non-negative integer
export const isStrNonNegInt = str => {
  if (isEmptyValue(str) || isNaN(Number(str))) {
    return false;
  }

  // Attempt to strip leading zeros
  const newStr = trimLeadingZeros(str);
  const n = Math.floor(Number(newStr));

  return n !== Infinity && String(n) === newStr && n >= 0;
};


export const isEmptyObject = obj => {
  return obj.constructor === Object && Object.keys(obj).length === 0;
};

export const isEmptyArray = arr => {
  return arr.constructor === Array && arr.length === 0;
};

export const isEmptyValue = x => {
  return (
    x === undefined ||
    x === "" ||
    x === null ||
    x === "null" ||
    isEmptyObject(x) ||
    isEmptyArray(x)
  );
};
