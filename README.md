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
        * [.filterByAirport(flights, airport, [direction])](#FlightStats.filterByAirport) ⇒ <code>Array.&lt;Flight&gt;</code>
    * _inner_
        * [~ConstructorOptions](#FlightStats..ConstructorOptions) : <code>Object</code>
        * [~AirlineOptions](#FlightStats..AirlineOptions) : <code>Object</code>
        * [~AirportOptions](#FlightStats..AirportOptions) : <code>Object</code>
        * [~LookupOptions](#FlightStats..LookupOptions) : <code>Object</code>
        * [~ConnectionOptions](#FlightStats..ConnectionOptions) : <code>Object</code>


-

<a name="new_FlightStats_new"></a>

### new FlightStats(options)
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

### FlightStats.filterByAirport(flights, airport, [direction]) ⇒ <code>Array.&lt;Flight&gt;</code>
Filter an array of flights by airport & direction

**Kind**: static method of <code>[FlightStats](#FlightStats)</code>  
**Returns**: <code>Array.&lt;Flight&gt;</code> - flights  
**Params**

- flights <code>Array.&lt;Flight&gt;</code>
- airport <code>String</code>
- [direction] <code>String</code> <code> = &#x27;arrival&#x27;</code>


-

<a name="FlightStats..ConstructorOptions"></a>

### FlightStats~ConstructorOptions : <code>Object</code>
Available options for [FlightStats](#FlightStats)

**Kind**: inner typedef of <code>[FlightStats](#FlightStats)</code>  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| baseUrl | <code>String</code> | <code>&#x27;https://api.flightstats.com/flex&#x27;</code> | optional |
| userAgent | <code>String</code> |  | optional |
| appId | <code>String</code> |  |  |
| appKey | <code>String</code> |  |  |


-

<a name="FlightStats..AirlineOptions"></a>

### FlightStats~AirlineOptions : <code>Object</code>
Available options for [.getAirlines()](#FlightStats+getAirlines)

**Kind**: inner typedef of <code>[FlightStats](#FlightStats)</code>  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| all | <code>Boolean</code> | <code>false</code> | optional |
| date | <code>Date</code> |  | optional |
| iata | <code>String</code> |  | optional |
| icao | <code>String</code> |  | optional |
| fs | <code>String</code> |  | optional |


-

<a name="FlightStats..AirportOptions"></a>

### FlightStats~AirportOptions : <code>Object</code>
Available options for [.getAirports()](#FlightStats+getAirports)

**Kind**: inner typedef of <code>[FlightStats](#FlightStats)</code>  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| all | <code>Boolean</code> | <code>false</code> | optional |
| date | <code>Date</code> |  | optional |
| iata | <code>String</code> |  | optional |
| icao | <code>String</code> |  | optional |
| fs | <code>String</code> |  | optional |
| city | <code>String</code> |  | optional |
| country | <code>String</code> |  | optional |
| latitude | <code>Number</code> |  | optional |
| longitude | <code>Number</code> |  | optional |
| radius | <code>Number</code> |  | optional |


-

<a name="FlightStats..LookupOptions"></a>

### FlightStats~LookupOptions : <code>Object</code>
Available options for [.lookup()](#FlightStats+lookup),
[.schedule()](#FlightStats+schedule) and [.status()](#FlightStats+status)

**Kind**: inner typedef of <code>[FlightStats](#FlightStats)</code>  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| date | <code>Date</code> |  |  |
| airlineCode | <code>String</code> |  |  |
| flightNumber | <code>String</code> |  |  |
| airport | <code>String</code> |  | optional |
| direction | <code>String</code> | <code>&#x27;arr&#x27;</code> | optional |
| extendedOptions | <code>Array.&lt;String&gt;</code> |  | optional |


-

<a name="FlightStats..ConnectionOptions"></a>

### FlightStats~ConnectionOptions : <code>Object</code>
Available options for [.firstFlightIn()](#FlightStats+firstFlightIn),
[.firstFlightOut()](#FlightStats+firstFlightOut),
[.lastFlightIn()](#FlightStats+lastFlightIn),
[.lastFlightOut()](#FlightStats+lastFlightOut),
[.connections()](#FlightStats+connections)

**Kind**: inner typedef of <code>[FlightStats](#FlightStats)</code>  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>String</code> |  | optional, only used by `.connections()` |
| departureAirport | <code>String</code> |  |  |
| arrivalAirport | <code>String</code> |  |  |
| date | <code>Date</code> |  |  |
| numHours | <code>Number</code> | <code>6</code> | optional |
| maxResults | <code>Number</code> | <code>25</code> | optional |
| maxConnections | <code>Number</code> | <code>2</code> | optional |
| minimumConnectTime | <code>Number</code> |  | optional |
| payloadType | <code>String</code> | <code>&#x27;passenger&#x27;</code> | optional |
| includeAirlines | <code>Array.&lt;String&gt;</code> |  | optional |
| excludeAirlines | <code>Array.&lt;String&gt;</code> |  | optional |
| includeAirports | <code>Array.&lt;String&gt;</code> |  | optional |
| excludeAirports | <code>Array.&lt;String&gt;</code> |  | optional |
| includeSurface | <code>Boolean</code> | <code>false</code> | optional |
| includeCodeshares | <code>Boolean</code> | <code>true</code> | optional |
| includeMultipleCarriers | <code>Boolean</code> | <code>true</code> | optional |


-

<a name="getUTCTime"></a>

## getUTCTime(dateString, utcOffset) ⇒ <code>Date</code>
Generates a proper Date from a
date string and UTC TZ offset

**Kind**: global function  
**Params**

- dateString <code>String</code>
- utcOffset <code>Number</code>
