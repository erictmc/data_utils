import { convertObjToCamelCase }  from "./utils"
import camelCase from "lodash.camelcase";

describe("convertObjToCamelCase", () => {
  const inputObj = { "start_time": "foo_bar",  "end_time": "foo_bar" };
  const outputObj = { "startTime": "foo_bar",  "endTime": "foo_bar" };

  it(" should handle basic objects", () => {
    expect(convertObjToCamelCase(inputObj)).toEqual(outputObj)
  });

  it(" should handle arrays of objects", () => {
    const inputArr = [inputObj, inputObj];
    const outputArr = [outputObj, outputObj];
    expect(convertObjToCamelCase(inputArr)).toEqual(outputArr);
  });

  it(" should handle empty arrays", () => {
    expect(convertObjToCamelCase([])).toEqual([]);
  })
});

describe("convertObjToCamelCase", () => {
  const inputObj = { "start_time": "foo_bar",  "end_time": "foo_bar" };
  const outputObj = { "startTime": "foo_bar",  "endTime": "foo_bar" };

  it(" should handle basic objects", () => {
    expect(convertObjToCamelCase(inputObj)).toEqual(outputObj)
  });

  it(" should handle basic objects", () => {
    const inputArr = [inputObj, inputObj];
    const outputArr = [outputObj, outputObj];
    expect(convertObjToCamelCase(inputArr)).toEqual(outputArr);
  })
});

describe("camelCase", () => {
  it(" should correctly handle field names", () => {
    expect(camelCase("start_datetime")).toEqual("startDatetime");
    expect(camelCase("created_at")).toEqual("createdAt");
    expect(camelCase("user_id")).toEqual("userId");
    expect(camelCase("place_id")).toEqual("placeId");
  });
});