<a name="FlightStats"></a>

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


-

<a name="new_FlightStats_new"></a>

### new FlightStats(options)
**Params**

- options <code>Object</code>
    - [.baseUrl] <code>String</code> <code> = &#x27;https://api.flightstats.com/flex&#x27;</code> - optional
    - .userAgent <code>String</code> - optional
    - .appId <code>String</code>
    - .appKey <code>String</code>


-

<a name="FlightStats+getAirlines"></a>

### flightStats.getAirlines(options, callback) ⇒ <code>Request</code>
Retrieve a list of airlines

**Kind**: instance method of <code>[FlightStats](#FlightStats)</code>  
**Params**

- options <code>Object</code>
    - [.all] <code>Boolean</code> <code> = false</code> - optional
    - [.date] <code>Date</code> - optional
    - [.iata] <code>String</code> - optional
    - [.icao] <code>String</code> - optional
    - [.fs] <code>String</code> - optional
- callback <code>function</code>


-

<a name="FlightStats+getAirports"></a>

### flightStats.getAirports(options, callback) ⇒ <code>Request</code>
Retrieve a list of airports

**Kind**: instance method of <code>[FlightStats](#FlightStats)</code>  
**Params**

- options <code>Object</code>
    - [.all] <code>Boolean</code> <code> = false</code> - optional
    - [.date] <code>Date</code> - optional
    - [.iata] <code>String</code> - optional
    - [.icao] <code>String</code> - optional
    - [.fs] <code>String</code> - optional
    - [.city] <code>String</code> - optional
    - [.country] <code>String</code> - optional
    - [.latitude] <code>Number</code> - optional
    - [.longitude] <code>Number</code> - optional
    - [.radius] <code>Number</code> - optional
- callback <code>function</code>


-

<a name="FlightStats+lookup"></a>

### flightStats.lookup(options, callback) ⇒ <code>Request</code>
Look up a flight

**Kind**: instance method of <code>[FlightStats](#FlightStats)</code>  
**Params**

- options <code>Object</code>
    - .date <code>Date</code>
    - .airlineCode <code>String</code>
    - .flightNumber <code>String</code>
    - [.airport] <code>String</code> - optional
    - [.direction] <code>String</code> <code> = &#x27;arr&#x27;</code> - optional
    - [.extendedOptions] <code>Array.&lt;String&gt;</code> - optional
- callback <code>function</code>


-

<a name="FlightStats+status"></a>

### flightStats.status(options, callback) ⇒ <code>Request</code>
Get the live status of a flight

**Kind**: instance method of <code>[FlightStats](#FlightStats)</code>  
**Params**

- options <code>Object</code> - see [.lookup()](#FlightStats+lookup)
- callback <code>function</code>


-

<a name="FlightStats+schedule"></a>

### flightStats.schedule(options, callback) ⇒ <code>Request</code>
Get a flight's schedule status information

**Kind**: instance method of <code>[FlightStats](#FlightStats)</code>  
**Params**

- options <code>Object</code> - see [.lookup()](#FlightStats+lookup)
- callback <code>function</code>


-

<a name="FlightStats+firstFlightIn"></a>

### flightStats.firstFlightIn(options, callback) ⇒ <code>Request</code>
Get the first inbound flight between two airports

**Kind**: instance method of <code>[FlightStats](#FlightStats)</code>  
**Params**

- options <code>Object</code> - see [.connections()](#FlightStats+connections)
- callback <code>function</code>


-

<a name="FlightStats+firstFlightOut"></a>

### flightStats.firstFlightOut(options, callback) ⇒ <code>Request</code>
Get the first outbound flight between two airports

**Kind**: instance method of <code>[FlightStats](#FlightStats)</code>  
**Params**

- options <code>Object</code> - see [.connections()](#FlightStats+connections)
- callback <code>function</code>


-

<a name="FlightStats+lastFlightIn"></a>

### flightStats.lastFlightIn(options, callback) ⇒ <code>Request</code>
Get the last inbound flight between two airports

**Kind**: instance method of <code>[FlightStats](#FlightStats)</code>  
**Params**

- options <code>Object</code> - see [.connections()](#FlightStats+connections)
- callback <code>function</code>


-

<a name="FlightStats+lastFlightOut"></a>

### flightStats.lastFlightOut(options, callback) ⇒ <code>Request</code>
Get the last outbound flight between two airports

**Kind**: instance method of <code>[FlightStats](#FlightStats)</code>  
**Params**

- options <code>Object</code> - see [.connections()](#FlightStats+connections)
- callback <code>function</code>


-

<a name="FlightStats+connections"></a>

### flightStats.connections(options, callback) ⇒ <code>Request</code>
Get connecting flights between two airports

**Kind**: instance method of <code>[FlightStats](#FlightStats)</code>  
**Internal**: used by {first,last}Flight{In,Out} methods  
**Params**

- options <code>Object</code>
    - [.type] <code>String</code> - optional, only used by `.connections()`
    - .departureAirport <code>String</code>
    - .arrivalAirport <code>String</code>
    - .date <code>Date</code>
    - [.numHours] <code>Number</code> <code> = 6</code> - optional
    - [.maxResults] <code>Number</code> <code> = 25</code> - optional
    - [.maxConnections] <code>Number</code> <code> = 2</code> - optional
    - [.minimumConnectTime] <code>Number</code> - optional
    - [.payloadType] <code>String</code> <code> = &#x27;passenger&#x27;</code> - optional
    - [.includeAirlines] <code>Array.&lt;String&gt;</code> - optional
    - [.excludeAirlines] <code>Array.&lt;String&gt;</code> - optional
    - [.includeAirports] <code>Array.&lt;String&gt;</code> - optional
    - [.excludeAirports] <code>Array.&lt;String&gt;</code> - optional
    - [.includeSurface] <code>Boolean</code> <code> = false</code> - optional
    - [.includeCodeshares] <code>Boolean</code> <code> = true</code> - optional
    - [.includeMultipleCarriers] <code>Boolean</code> <code> = true</code> - optional
    - [.extendedOptions] <code>Array.&lt;String&gt;</code>
- callback <code>function</code>


-

<a name="FlightStats+flightRatings"></a>

### flightStats.flightRatings(options, callback) ⇒ <code>Request</code>
Get ratings for a specified flight

**Kind**: instance method of <code>[FlightStats](#FlightStats)</code>  
**Params**

- options <code>Object</code>
    - .carrier <code>String</code>
    - .flightNumber <code>String</code> | <code>Number</code>
    - [.extendedOptions] <code>Array.&lt;String&gt;</code>
- callback <code>function</code>


-

<a name="FlightStats+routeRatings"></a>

### flightStats.routeRatings(options, callback) ⇒ <code>Request</code>
Get ratings for a route between airports

**Kind**: instance method of <code>[FlightStats](#FlightStats)</code>  
**Params**

- options <code>Object</code>
    - .departureAirport <code>String</code>
    - .arrivalAirport <code>String</code>
    - [.extendedOptions] <code>Array.&lt;String&gt;</code>
- callback <code>function</code>


-

<a name="FlightStats+flightsNear"></a>

### flightStats.flightsNear(options, callback) ⇒ <code>Request</code>
Get flights near a given (lat,lng) coordinate, within a radius

**Kind**: instance method of <code>[FlightStats](#FlightStats)</code>  
**Params**

- options <code>Object</code>
    - .lat <code>Number</code>
    - .lng <code>Number</code>
    - .radius <code>Number</code>
    - [.extendedOptions] <code>Array.&lt;String&gt;</code>
- callback <code>function</code>


-

<a name="FlightStats+flightsWithin"></a>

### flightStats.flightsWithin(options, callback) ⇒ <code>Request</code>
Get flights within a given bounding box (lat,lng,lat,lng)

**Kind**: instance method of <code>[FlightStats](#FlightStats)</code>  
**Params**

- options <code>Object</code>
    - .coords <code>Array</code> - [lat,lng,lat,lng]
    - .sourceType <code>String</code> - (raw|derived|all)
    - .maxFlights <code>Number</code>
    - [.extendedOptions] <code>Array.&lt;String&gt;</code>
- callback <code>function</code>


-

<a name="FlightStats+routes"></a>

### flightStats.routes(options, callback) ⇒ <code>Request</code>
Get routes between two airports

**Kind**: instance method of <code>[FlightStats](#FlightStats)</code>  
**Params**

- options <code>Object</code>
    - .date <code>Date</code>
    - .departureAirport <code>String</code>
    - .arrivalAirport <code>String</code>
    - .codeType <code>String</code>
    - .maxFlights <code>Number</code>
    - .numHours <code>Number</code>
    - .hourOfDay <code>Number</code>
    - .utc <code>Boolean</code>
    - [.extendedOptions] <code>Array.&lt;String&gt;</code>
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

