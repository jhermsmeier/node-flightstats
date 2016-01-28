# Changelog

## 0.4.0
- Added `CODES.md`
- Enabled `category` in response data of `.getAirlines()`
- Added boolean `scheduled` key to `FlightStats.AirlineCategory` data
- Added `code` key (category code) to `FlightStats.AirlineCategory` data
- Patched inconsistent API response on ICAO airline code lookups
- Reworded `Data needed` -> `Data Not Available`

## 0.3.0
- Fix `/airlines` request URL construction
- Return the `request` object from a method call (instead of `this`)

## 0.2.0
- Enhanced request error message with URL in question
- Implemented `#getAirlines()` and added tests for it
- Extracted `#_request()` to `lib/request`
- Rephrased DN status in `lib/flight-status.js`

## 0.1.0
  - Initial publication
