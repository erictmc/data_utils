import { getDistanceFromLatLonInMiles } from "./geo";

describe("getDistanceFromLatLonInMiles", () => {
  it(" should correctly calculate distance between two points less than a mile apart", () => {
    const lat1 = 38.898556,
      lon1 = -77.037852,
      lat2 = 38.897147,
      lon2 = -77.043934;

    const distance = getDistanceFromLatLonInMiles(lat1, lon1, lat2, lon2);
    expect(distance).toEqual(0.3);

  });

  it(" should correctly calculate distance between points more than 20 miles apart", () => {
    const lat1 = 38.669350,
      lon1 = -122.633316,
      lat2 = 38.297539,
      lon2 = -122.286865;

    const distance = getDistanceFromLatLonInMiles(lat1, lon1, lat2, lon2);
    expect(distance).toEqual(31.8);
  });



  it(" should correctly calculate distance between two identical points", () => {
    const lat1 = 38.898556,
      lon1 = -77.037852,
      lat2 = 38.898556,
      lon2 = -77.037852;

    const distance = getDistanceFromLatLonInMiles(lat1, lon1, lat2, lon2);
    expect(distance).toEqual(0);
  });

  it(" should handle cases where one lat or long is null ", () => {
    const lat1 = null,
      lon1 = -77.037852,
      lat2 = 38.898556,
      lon2 = -77.037852;

    const distance = getDistanceFromLatLonInMiles(lat1, lon1, lat2, lon2);
    expect(distance).toEqual(undefined);
  });

  it(" should handle cases where one lat or long is undefined ", () => {
    const lat1 = null,
      lon1 = -77.037852,
      lat2 = 38.898556,
      lon2 = -77.037852;

    const distance = getDistanceFromLatLonInMiles(lat1, lon1, lat2, lon2);
    expect(distance).toEqual(undefined);
  });
});