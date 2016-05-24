# Changelog

## 0.12.0
- Fixed credential parameters
- Fixed error response handling
- Updated dependencies

## 0.11.1
- Fixed `ReferenceError: dir is not defined`

## 0.11.0
- Updated `request` to `~2.70.0`
- Added additional filtering by `airport` parameter, in case the API ignores the parameter

## 0.10.0
- Make `getAirlines()` return an array
- Trim excessive whitespace in airline names

## 0.9.0
- Add irregular operation updates
- Improve status update structure
- Add `nsp` known vulnerabilities check to `test`

## 0.8.0
- Impl formatted `includeDeltas` status update events
- Fix `airportResources` in `format/status`

## 0.7.0
- Add `extendedOptions` option for `lookup`, `status` and `schedule`
- Simplify time window check in `lookup`
- Add docblocks in code, usage and testing section to README

## 0.6.0
- Add lib/format: Custom, consolidated response format
- Enable trim_whitespace

## 0.5.0
- Update .npmignore: Add `test` directory
- Add test/data/*.json
- Update lib/flightstats.js: Fix schedule/status lookup time range
- Update lib/service-type.js: Add `code` key
- Update lib/codeshare-type.js: Add `code` key

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
