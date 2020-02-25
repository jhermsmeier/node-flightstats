# Changelog

## 0.21.0

* 63282a77232e1e814a3ae094dfb35282b6ce09f2 - lib: Remove use of deprecated `request` module
* d2431b48cdd67b074686ae083d56978bbaa86013 - package: Update dependencies
* 969a8a83ca7f3473e619e71794aa7983303971d5 - remove config key config
* e6c759ec11eaef69d00dd70f4a4290801aaaf012 - :fire: modify init config for flightstate

## 0.20.0

* 09a128cbb3e5b38095b83531fcf34c309dafd66f - Revert change to local date
* 0b802633d49b54b16f5f66cf4928b6df30b47986 - Fix formatting for updatedDateFields

## 0.19.3

- Update dependencies
- Regenerate API documentation

## 0.19.2

- Update dependencies

## 0.19.1

- Fix verbs for use with the four connection queries (@estesp, [#8](https://github.com/jhermsmeier/node-flightstats/pull/8))
- Skip alerts API tests due to missing fixtures

## 0.19.0

- Add support for Alerts API
- Remove `description` properties from responses

## 0.18.0

- Fix formatting on error
- Fix a timezone offset bug

## 0.17.1

- Fix use of dynamic Date in tests
- Fix `extendedOptions` being joined in `.schedule()`

## 0.17.0

- Implement HTTP request mocking in tests
- Remove use of `useHttpErrors` for better error messages
- Keep `delayIndexUrl`, `weatherUrl` for flights / airports

## 0.16.0

- Add `.routes()`
- Add `.flightsWithin()`
- Add `.flightsNear()`
- Add `.routeRatings()`
- Add `.flightRatings()`
- Add connections endpoint
  - `.firstFlightIn()`
  - `.firstFlightOut()`
  - `.lastFlightIn()`
  - `.lastFlightOut()`

## 0.15.0

- Improve request handling (gzip, json, http agent)
- Remove `FlightStats.userAgent` (duplicate of `FlightStats.defaults.userAgent`)
- Move `FlightStats.baseUrl` to `FlightStats.defaults.baseUrl`
- Remove `nsp check`, update `mocha`
- Update test setup: Prerequire `dotenv/config`

## 0.14.6

- Remove unused `flight-designator`

## 0.14.5

- Update dependencies

## 0.14.4

- Fix ReferenceError caused by adding `.filterByAirport()`

## 0.14.3

- Favour error message supplied by FlightStats response
- Add `.filterByAirport( flights, airport, direction )`

## 0.14.2

- Add API reference to `README.md`
- Remove use of future reserved word `package`

## 0.14.1

- Fix TypeError on `flight.schedule`

## 0.14.0

- Change airport data formatting to not be exclusive

## 0.13.0

- Add `.getAirports( options )`

## 0.12.1

- Remove ES6 interpolated strings (@michaelkitson, [#2](https://github.com/jhermsmeier/node-flightstats/pull/2))

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
