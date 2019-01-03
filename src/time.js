import { isEmptyValue, trimLeadingZeros, isStrNonNegInt } from "./utils";

export class InvalidTimeError extends Error {}

/*
 * Takes string clock time and returns parsed hour and minute
 * values
 *
 * @param { string } clockTime : a string of the format 'HH:mm' or
 * "HH:mm:ss", wherehours can range from 0 - 23 and minutes can
 * range from 1 - 59.
 */
export const parseClockTime = clockTime => {
  if (isEmptyValue(clockTime)) {
    throw new InvalidTimeError();
  }

  const timeComponents = clockTime.split(":");

  if (timeComponents.length < 2 || timeComponents.length > 3) {
    throw new InvalidTimeError();
  }

  if (
    !isStrNonNegInt(timeComponents[0]) ||
    !isStrNonNegInt(timeComponents[1])
  ) {
    throw new InvalidTimeError();
  }

  if (timeComponents.length === 3 && !isStrNonNegInt(timeComponents[2])) {
    throw new InvalidTimeError();
  }

  const hours = Number(trimLeadingZeros(timeComponents[0]));
  const minutes = Number(trimLeadingZeros(timeComponents[1]));

  const tmpSec =
    timeComponents.length === 3 ? Number(timeComponents[2]) : undefined;

  if (isNaN(hours) || isNaN(minutes)) {
    throw new InvalidTimeError();
  }

  if (tmpSec !== undefined) {
    if (isNaN(tmpSec)) {
      throw new InvalidTimeError();
    }

    if (!(tmpSec >= 0 && tmpSec <= 59)) {
      throw new InvalidTimeError();
    }
  }

  if (!(hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59)) {
    throw new InvalidTimeError();
  }

  const seconds = tmpSec === undefined ? 0 : tmpSec;

  return { hours, minutes, seconds };
};


export const openAfterCutoff = (hours, cutoff ) => {

  if (!isEmptyValue(hours) && hours.length > 0 ) {
    for (let i = 0; i < hours.length; i++) {
      const { startTime, endTime, open } = hours[i];

      if (!isEmptyValue(startTime) && !isEmptyValue(endTime) && open === true){
        const start = parseClockTime(startTime);
        const end = parseClockTime(endTime);
        const cutoffTime = parseClockTime(cutoff);

        if (end.hours < start.hours || (end.hours <= start.hours && end.minutes < start.minutes)) {
          end.hours += 24;
        }

        if (
          ((cutoffTime.hours < end.hours) || (cutoffTime.hours <= end.hours && cutoffTime.minutes <= end.minutes)) &&
          ((start.hours < cutoffTime.hours) || (start.hours <= cutoffTime.hours && start.minutes <= cutoffTime.minutes))
        ) {
          return true
        }
      }
    }
  }

  return false

};
