import camelCase from "lodash.camelcase";
import isObject from "lodash.isobject";
import snakeCase from "lodash.snakecase";


const applyFuncToObjectFields = (o, func) => {
  let newO, origKey, newKey, value;
  if (o instanceof Array) {
    return o.map(function(value) {
      if (isObject(value)) {
        value = applyFuncToObjectFields(value, func);
      }
      return value;
    });
  } else {
    newO = {};
    for (origKey in o) {
      if (o.hasOwnProperty(origKey)) {
        newKey = func(origKey);
        value = o[origKey];
        if (
          value instanceof Array ||
          (value !== null && value !== undefined && value.constructor === Object)
        ) {
          value = applyFuncToObjectFields(value, func);
        }
        newO[newKey] = value;
    }
  }
}
return newO;
};

export const convertObjToCamelCase = obj => {
  return applyFuncToObjectFields(obj, camelCase)
};

export const convertObjToSnakeCase = obj => {
  return applyFuncToObjectFields(obj, snakeCase)
};

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


export const passwordPassesComplexityRules = password => {
  if (password.includes(" ")) {
    return false;
  }

  const IS_LONG_ENOUGH = password.length > 7;
  const HAS_LETTERS = /[A-Za-z]/.test(password);
  const HAS_NUMBER = /[0-9]/.test(password);

  // TODO/ Make sure there are no spaces
  return (
    IS_LONG_ENOUGH &&
    HAS_LETTERS &&
    HAS_NUMBER
  );
};

export const isValidEmail = email => {
  let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.exec(email) !== null;
};