import { isEmptyValue } from "./index";

const deg2rad = (deg) => {
  return deg * (Math.PI/180)
};

export const getDistanceFromLatLonInMiles = (lat1,lon1,lat2,lon2) => {

  if (isEmptyValue(lat1) || isEmptyValue(lon1) || isEmptyValue(lat2) || isEmptyValue(lon2)){
    return undefined
  }

  const R = 3959; // Radius of the earth in miles
  const dLat = deg2rad(lat2-lat1);  // deg2rad below
  const dLon = deg2rad(lon2-lon1);
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
  ;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Math.round(R * c * 10) / 10;
};

