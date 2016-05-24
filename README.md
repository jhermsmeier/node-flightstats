# FlightStats
[![npm](https://img.shields.io/npm/v/flightstats.svg?style=flat-square)](https://npmjs.com/flightstats)
[![npm license](https://img.shields.io/npm/l/flightstats.svg?style=flat-square)](https://npmjs.com/flightstats)
[![npm downloads](https://img.shields.io/npm/dm/flightstats.svg?style=flat-square)](https://npmjs.com/flightstats)
[![build status](https://img.shields.io/travis/jhermsmeier/node-flightstats.svg?style=flat-square)](https://travis-ci.org/jhermsmeier/node-flightstats)

## Install via [npm](https://npmjs.com)

```sh
$ npm install flightstats
```

## Usage

```js
var FlightStatsAPI = require( 'flightstats' )
```

```js
var api = new FlightStatsAPI({
  appId: 'xxxxxxxxxx',
  apiKey: 'xxxxxxxxxxxxxxxxxxxxxxxxx',
  // optional, defaults to `node flightstats/{package.version}`
  userAgent: 'FlightBot',
})
```

Get a list of airlines
```js
// Options are optional;
// defaults to retrieve all currently active airlines
api.getAirlines( options, callback )
// Options (iata, icao, fs are mutually exclusive):
var options = {
  all: {Boolean},
  date: {Date},
  iata: {String},
  icao: {String},
  fs: {String},
}
```

Look up a flight by airline & flight number
```js
api.lookup( options, callback )
// Options:
var options = {
  date: {Date},
  airlineCode: {String},
  flightNumber: {String},
  airport: {String}, // optional
  direction: {String}, // optional, defaults to `arriving`
  extendedOptions: {Array}, // optional
}
```

## Testing

You'll need FlightStats API credentials to run the tests;
Save them to an `.env` file in the repository root:
```ini
FLIGHTSTATS_APP_ID = xxxxxxxxxx
FLIGHTSTATS_API_KEY = xxxxxxxxxxxxxxxxxxxxxxxxx
```

Running the tests:
```sh
$ npm test
```
