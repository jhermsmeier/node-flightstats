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

# API Reference

<a name="FlightStats"></a>

## FlightStats
**Kind**: global class

* [FlightStats](#FlightStats)
    * [new FlightStats(options)](#new_FlightStats_new)
    * _instance_
        * [.getAirlines(options, callback)](#FlightStats+getAirlines)
        * [.getAirports(options, callback)](#FlightStats+getAirports)
        * [.lookup(options, callback)](#FlightStats+lookup)
        * [.status(options, callback)](#FlightStats+status) ⇒ <code>Request</code>
        * [.schedule(options, callback)](#FlightStats+schedule) ⇒ <code>Request</code>
    * _static_
        * [.defaults](#FlightStats.defaults) : <code>Object</code>

<a name="new_FlightStats_new"></a>

### new FlightStats(options)
FlightStats


| Param | Type |
| --- | --- |
| options | <code>Object</code> |

<a name="FlightStats+getAirlines"></a>

### flightStats.getAirlines(options, callback)
Retrieve a list of airlines

**Kind**: instance method of <code>[FlightStats](#FlightStats)</code>

| Param | Type |
| --- | --- |
| options | <code>Object</code> |
| callback | <code>function</code> |

**Options**

| Name | Type |
| --- | --- |
| all | <code>Boolean</code> |
| date | <code>Date</code> |
| iata | <code>String</code> |
| icao | <code>String</code> |
| fs | <code>String</code> |

<a name="FlightStats+getAirports"></a>

### flightStats.getAirports(options, callback)
Retrieve a list of airports

**Kind**: instance method of <code>[FlightStats](#FlightStats)</code>

| Param | Type |
| --- | --- |
| options | <code>Object</code> |
| callback | <code>function</code> |

**Options**

| Name | Type |
| --- | --- |
| all | <code>Boolean</code> |
| date | <code>Date</code> |
| iata | <code>String</code> |
| icao | <code>String</code> |
| fs | <code>String</code> |
| city | <code>String</code> |
| country | <code>String</code> |
| latitude | <code>Number</code> |
| longitude | <code>Number</code> |
| radius | <code>Number</code> |

<a name="FlightStats+lookup"></a>

### flightStats.lookup(options, callback)
Look up a flight

**Kind**: instance method of <code>[FlightStats](#FlightStats)</code>

| Param | Type |
| --- | --- |
| options | <code>Object</code> |
| callback | <code>function</code> |

**Options**

| Name | Type | Description |
| --- | --- | --- |
| date | <code>Date</code> |  |
| airlineCode | <code>String</code> |  |
| flightNumber | <code>String</code> |  |
| airport | <code>String</code> | (optional) |
| direction | <code>String</code> | (optional) |
| extendedOptions | <code>Array</code> | (optional) |

<a name="FlightStats+status"></a>

### flightStats.status(options, callback) ⇒ <code>Request</code>
Get the live status of a flight

**Kind**: instance method of <code>[FlightStats](#FlightStats)</code>
**See**: FlightStats#lookup()

| Param | Type |
| --- | --- |
| options | <code>Object</code> |
| callback | <code>function</code> |

<a name="FlightStats+schedule"></a>

### flightStats.schedule(options, callback) ⇒ <code>Request</code>
Get a flight's schedule status information

**Kind**: instance method of <code>[FlightStats](#FlightStats)</code>
**See**: FlightStats#lookup()

| Param | Type |
| --- | --- |
| options | <code>Object</code> |
| callback | <code>function</code> |

<a name="FlightStats.defaults"></a>

### FlightStats.defaults : <code>Object</code>
Default options

**Kind**: static property of <code>[FlightStats](#FlightStats)</code>
