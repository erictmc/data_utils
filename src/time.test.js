

import {convertToLocalTime} from "./time";

describe("convertToLocalTime", () => {
  it(" should handle basic case converting utc -> local time w/o formatting", () => {
    const timezoneName = "America/Chicago";
    const timestamp = "2019-01-01T06:00:00Z";
    const actualLocalTime = convertToLocalTime(timestamp, timezoneName);
    expect(actualLocalTime).toEqual("2019-01-01T00:00:00-06:00");
  });

  it(" should handle basic case converting utc -> local time with formatting", () => {
    const timezoneName = "America/Chicago";
    const timestamp = "2019-01-01T06:00:00Z";
    const actualLocalTime = convertToLocalTime(timestamp, timezoneName, "YYYY-MM-DDTHH:mm:ss");
    expect(actualLocalTime).toEqual("2019-01-01T00:00:00");
  })

});