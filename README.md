# FlightStats
[![npm](https://img.shields.io/npm/v/flightstats.svg?style=flat-square)](https://npmjs.com/flightstats)
[![npm license](https://img.shields.io/npm/l/flightstats.svg?style=flat-square)](https://npmjs.com/flightstats)
[![npm downloads](https://img.shields.io/npm/dm/flightstats.svg?style=flat-square)](https://npmjs.com/flightstats)
[![build status](https://img.shields.io/travis/jhermsmeier/node-flightstats.svg?style=flat-square)](https://travis-ci.org/jhermsmeier/node-flightstats)

## Install via [npm](https://npmjs.com)

```sh
$ npm install --save flightstats
```

## Index
<!-- MarkdownTOC depth=2 -->

- [Usage](#usage)
  - [Testing](#testing)
- [API Reference](#api-reference)
  - [FlightStats](#flightstats)
  - [getUTCTime\(dateString, utcOffset\) ⇒ Date](#getutctimedatestring-utcoffset-⇒-date)

<!-- /MarkdownTOC -->

# Usage

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

## FlightStats
**Kind**: global class

* [FlightStats](#FlightStats)
    * [new FlightStats(options)](#new_FlightStats_new)
    * _instance_
        * [.getAirlines(options, callback)](#FlightStats+getAirlines) ⇒ <code>Request</code>
        * [.getAirports(options, callback)](#FlightStats+getAirports) ⇒ <code>Request</code>
        * [.lookup(options, callback)](#FlightStats+lookup) ⇒ <code>Request</code>
        * [.status(options, callback)](#FlightStats+status) ⇒ <code>Request</code>
        * [.schedule(options, callback)](#FlightStats+schedule) ⇒ <code>Request</code>
        * [.firstFlightIn(options, callback)](#FlightStats+firstFlightIn) ⇒ <code>Request</code>
        * [.firstFlightOut(options, callback)](#FlightStats+firstFlightOut) ⇒ <code>Request</code>
        * [.lastFlightIn(options, callback)](#FlightStats+lastFlightIn) ⇒ <code>Request</code>
        * [.lastFlightOut(options, callback)](#FlightStats+lastFlightOut) ⇒ <code>Request</code>
        * [.connections(options, callback)](#FlightStats+connections) ⇒ <code>Request</code>
        * [.flightRatings(options, callback)](#FlightStats+flightRatings) ⇒ <code>Request</code>
        * [.routeRatings(options, callback)](#FlightStats+routeRatings) ⇒ <code>Request</code>
        * [.flightsNear(options, callback)](#FlightStats+flightsNear) ⇒ <code>Request</code>
        * [.flightsWithin(options, callback)](#FlightStats+flightsWithin) ⇒ <code>Request</code>
        * [.routes(options, callback)](#FlightStats+routes) ⇒ <code>Request</code>
    * _static_
        * [.defaults](#FlightStats.defaults) : <code>Object</code>
        * [.filterByAirport(flights, airport, direction)](#FlightStats.filterByAirport) ⇒ <code>Array</code>
    * _inner_
        * [~ConstructorOptions](#FlightStats..ConstructorOptions) : <code>Object</code>
        * [~AirlineOptions](#FlightStats..AirlineOptions) : <code>Object</code>
        * [~AirportOptions](#FlightStats..AirportOptions) : <code>Object</code>
        * [~LookupOptions](#FlightStats..LookupOptions) : <code>Object</code>
        * [~ConnectionOptions](#FlightStats..ConnectionOptions) : <code>Object</code>


-

<a name="new_FlightStats_new"></a>

### new FlightStats(options)
FlightStats

**Params**

- options <code>[ConstructorOptions](#FlightStats..ConstructorOptions)</code>


-

<a name="FlightStats+getAirlines"></a>

### flightStats.getAirlines(options, callback) ⇒ <code>Request</code>
Retrieve a list of airlines

**Kind**: instance method of <code>[FlightStats](#FlightStats)</code>
**Params**

- options <code>[AirlineOptions](#FlightStats..AirlineOptions)</code>
- callback <code>function</code>


-

<a name="FlightStats+getAirports"></a>

### flightStats.getAirports(options, callback) ⇒ <code>Request</code>
Retrieve a list of airports

**Kind**: instance method of <code>[FlightStats](#FlightStats)</code>
**Params**

- options <code>[AirportOptions](#FlightStats..AirportOptions)</code>
- callback <code>function</code>


-

<a name="FlightStats+lookup"></a>

### flightStats.lookup(options, callback) ⇒ <code>Request</code>
Look up a flight

**Kind**: instance method of <code>[FlightStats](#FlightStats)</code>
**Params**

- options <code>[LookupOptions](#FlightStats..LookupOptions)</code>
- callback <code>function</code>


-

<a name="FlightStats+status"></a>

### flightStats.status(options, callback) ⇒ <code>Request</code>
Get the live status of a flight

**Kind**: instance method of <code>[FlightStats](#FlightStats)</code>
**Params**

- options <code>[LookupOptions](#FlightStats..LookupOptions)</code>
- callback <code>function</code>


-

<a name="FlightStats+schedule"></a>

### flightStats.schedule(options, callback) ⇒ <code>Request</code>
Get a flight's schedule status information

**Kind**: instance method of <code>[FlightStats](#FlightStats)</code>
**Params**

- options <code>[LookupOptions](#FlightStats..LookupOptions)</code>
- callback <code>function</code>


-

<a name="FlightStats+firstFlightIn"></a>

### flightStats.firstFlightIn(options, callback) ⇒ <code>Request</code>
Get the first inbound flight between two airports

**Kind**: instance method of <code>[FlightStats](#FlightStats)</code>
**Params**

- options <code>[ConnectionOptions](#FlightStats..ConnectionOptions)</code>
- callback <code>function</code>


-

<a name="FlightStats+firstFlightOut"></a>

### flightStats.firstFlightOut(options, callback) ⇒ <code>Request</code>
Get the first outbound flight between two airports

**Kind**: instance method of <code>[FlightStats](#FlightStats)</code>
**Params**

- options <code>[ConnectionOptions](#FlightStats..ConnectionOptions)</code>
- callback <code>function</code>


-

<a name="FlightStats+lastFlightIn"></a>

### flightStats.lastFlightIn(options, callback) ⇒ <code>Request</code>
Get the last inbound flight between two airports

**Kind**: instance method of <code>[FlightStats](#FlightStats)</code>
**Params**

- options <code>[ConnectionOptions](#FlightStats..ConnectionOptions)</code>
- callback <code>function</code>


-

<a name="FlightStats+lastFlightOut"></a>

### flightStats.lastFlightOut(options, callback) ⇒ <code>Request</code>
Get the last outbound flight between two airports

**Kind**: instance method of <code>[FlightStats](#FlightStats)</code>
**Params**

- options <code>[ConnectionOptions](#FlightStats..ConnectionOptions)</code>
- callback <code>function</code>


-

<a name="FlightStats+connections"></a>

### flightStats.connections(options, callback) ⇒ <code>Request</code>
Get connecting flights between two airports

**Kind**: instance method of <code>[FlightStats](#FlightStats)</code>
**Internal**: used by {first,last}Flight{In,Out} methods
**Params**

- options <code>[ConnectionOptions](#FlightStats..ConnectionOptions)</code>
- callback <code>function</code>


-

<a name="FlightStats+flightRatings"></a>

### flightStats.flightRatings(options, callback) ⇒ <code>Request</code>
Get ratings for a specified flight

**Kind**: instance method of <code>[FlightStats](#FlightStats)</code>
**Params**

- options <code>Object</code>
- callback <code>function</code>


-

<a name="FlightStats+routeRatings"></a>

### flightStats.routeRatings(options, callback) ⇒ <code>Request</code>
Get ratings for a route between airports

**Kind**: instance method of <code>[FlightStats](#FlightStats)</code>
**Params**

- options <code>Object</code>
- callback <code>function</code>


-

<a name="FlightStats+flightsNear"></a>

### flightStats.flightsNear(options, callback) ⇒ <code>Request</code>
Get flights near a given (lat,lng) coordinate, within a radius

**Kind**: instance method of <code>[FlightStats](#FlightStats)</code>
**Params**

- options <code>Object</code>
- callback <code>function</code>


-

<a name="FlightStats+flightsWithin"></a>

### flightStats.flightsWithin(options, callback) ⇒ <code>Request</code>
Get flights within a given bounding box (lat,lng,lat,lng)

**Kind**: instance method of <code>[FlightStats](#FlightStats)</code>
**Params**

- options <code>Object</code>
- callback <code>function</code>


-

<a name="FlightStats+routes"></a>

### flightStats.routes(options, callback) ⇒ <code>Request</code>
Get routes between two airports

**Kind**: instance method of <code>[FlightStats](#FlightStats)</code>
**Params**

- options <code>Object</code>
- callback <code>function</code>


-

<a name="FlightStats.defaults"></a>

### FlightStats.defaults : <code>Object</code>
Default options

**Kind**: static property of <code>[FlightStats](#FlightStats)</code>

-

<a name="FlightStats.filterByAirport"></a>

### FlightStats.filterByAirport(flights, airport, direction) ⇒ <code>Array</code>
Filter an array of flights by airport & direction

**Kind**: static method of <code>[FlightStats](#FlightStats)</code>
**Returns**: <code>Array</code> - flights
**Params**

- flights <code>Array</code>
- airport <code>String</code>
- direction <code>String</code>


-

<a name="FlightStats..ConstructorOptions"></a>

### FlightStats~ConstructorOptions : <code>Object</code>
Available options for [FlightStats](#FlightStats)

**Kind**: inner typedef of <code>[FlightStats](#FlightStats)</code>
**Properties**

| Name | Type |
| --- | --- |
| baseUrl | <code>String</code> |
| userAgent | <code>String</code> |
| appId | <code>String</code> |
| appKey | <code>String</code> |


-

<a name="FlightStats..AirlineOptions"></a>

### FlightStats~AirlineOptions : <code>Object</code>
Available options for [.getAirlines()](#FlightStats+getAirlines)

**Kind**: inner typedef of <code>[FlightStats](#FlightStats)</code>
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| all | <code>Boolean</code> | <code>false</code> |
| date | <code>Date</code> |  |
| iata | <code>String</code> |  |
| icao | <code>String</code> |  |
| fs | <code>String</code> |  |


-

<a name="FlightStats..AirportOptions"></a>

### FlightStats~AirportOptions : <code>Object</code>
Available options for [.getAirports()](#FlightStats+getAirports)

**Kind**: inner typedef of <code>[FlightStats](#FlightStats)</code>
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| all | <code>Boolean</code> | <code>false</code> |
| date | <code>Date</code> |  |
| iata | <code>String</code> |  |
| icao | <code>String</code> |  |
| fs | <code>String</code> |  |
| city | <code>String</code> |  |
| country | <code>String</code> |  |
| latitude | <code>Number</code> |  |
| longitude | <code>Number</code> |  |
| radius | <code>Number</code> |  |


-

<a name="FlightStats..LookupOptions"></a>

### FlightStats~LookupOptions : <code>Object</code>
Available options for [.lookup()](#FlightStats+lookup),
[.schedule()](#FlightStats+schedule) and [.status()](#FlightStats+status)

**Kind**: inner typedef of <code>[FlightStats](#FlightStats)</code>
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| date | <code>Date</code> |  |
| airlineCode | <code>String</code> |  |
| flightNumber | <code>String</code> |  |
| airport | <code>String</code> |  |
| direction | <code>String</code> | <code>&#x27;arr&#x27;</code> |
| extendedOptions | <code>Array.&lt;String&gt;</code> |  |


-

<a name="FlightStats..ConnectionOptions"></a>

### FlightStats~ConnectionOptions : <code>Object</code>
Available options for [.firstFlightIn()](#FlightStats+firstFlightIn),
[.firstFlightOut()](#FlightStats+firstFlightOut),
[.lastFlightIn()](#FlightStats+lastFlightIn),
[.lastFlightOut()](#FlightStats+lastFlightOut)

**Kind**: inner typedef of <code>[FlightStats](#FlightStats)</code>
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| type | <code>String</code> |  |
| departureAirport | <code>String</code> |  |
| arrivalAirport | <code>String</code> |  |
| date | <code>Date</code> |  |
| numHours | <code>Number</code> | <code>6</code> |
| maxResults | <code>Number</code> | <code>25</code> |
| maxConnections | <code>Number</code> | <code>2</code> |
| minimumConnectTime | <code>Number</code> |  |
| payloadType | <code>String</code> | <code>&#x27;passenger&#x27;</code> |
| includeAirlines | <code>Array.&lt;String&gt;</code> |  |
| excludeAirlines | <code>Array.&lt;String&gt;</code> |  |
| includeAirports | <code>Array.&lt;String&gt;</code> |  |
| excludeAirports | <code>Array.&lt;String&gt;</code> |  |
| includeSurface | <code>Boolean</code> | <code>false</code> |
| includeCodeshares | <code>Boolean</code> | <code>true</code> |
| includeMultipleCarriers | <code>Boolean</code> | <code>true</code> |


-

<a name="getUTCTime"></a>

## getUTCTime(dateString, utcOffset) ⇒ <code>Date</code>
Generates a proper Date from a
date string and UTC TZ offset

**Kind**: global function
**Params**

- dateString <code>String</code>
- utcOffset <code>Number</code>
