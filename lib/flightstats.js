var packageInfo = require( '../package' )
var URL = require( 'url' )
var request = require( 'request' )
var debug = require( 'debug' )( 'flightstats' )

/**
 * @constructor
 * @param {Object} options
 * @param {?String} [options.baseUrl='https://api.flightstats.com/flex'] optional
 * @param {?String} options.userAgent optional
 * @param {String} options.appId
 * @param {String} options.appKey
 * @return {FlightStats}
 */
function FlightStats( options ) {

  if( !(this instanceof FlightStats) )
    return new FlightStats( options )

  this.options = Object.assign( {}, FlightStats.defaults, options || {} )

  /** @type {FlightStats.Alerts} Flight Alerts API */
  this.alerts = new FlightStats.Alerts( this, options )

  this._request = request.defaults({
    json: true,
    gzip: true,
    forever: true,
    baseUrl: this.options.baseUrl,
    headers: {
      'User-Agent': this.options.userAgent,
    },
    qs: {
      appId: this.options.appId,
      appKey: this.options.apiKey,
    },
  })

}

/**
 * Default options
 * @type {Object}
 */
FlightStats.defaults = {
  baseUrl: 'https://api.flightstats.com/flex',
  userAgent: packageInfo.name + '/' + packageInfo.version + ' ' +
    '(' + process.release.name + '/' + process.versions.node + ')',
}

FlightStats.Alerts = require( './alerts' )

FlightStats.AirlineCategory = require( './airline-category' )
FlightStats.FlightStatus = require( './flight-status' )
FlightStats.ServiceType = require( './service-type' )
FlightStats.StatusUpdate = require( './status-update' )
FlightStats.IrregularOperation = require( './irregular-operation' )
FlightStats.CodeshareType = require( './codeshare-type' )

FlightStats.formatStatus = require( './format/status' )
FlightStats.formatSchedule = require( './format/schedule' )

/**
 * Filter an array of flights by airport & direction
 * @param {Array<Flight>} flights
 * @param {String} airport
 * @param {?String} [direction='arrival']
 * @return {Array<Flight>} flights
 */
FlightStats.filterByAirport = function( flights, airport, direction ) {

  airport = ( airport + '' ).toUpperCase()
  direction = /^dep/i.test( direction ) ?
    'departure' : 'arrival'

  return flights.filter( function( flight ) {
    return flight[ direction ].airport.iata === airport ||
      flight[ direction ].airport.icao === airport ||
      flight[ direction ].airport.fs === airport ||
      flight[ direction ].airport.faa === airport
  })

}

/**
 * FlightStats prototype
 * @type {Object}
 */
FlightStats.prototype = {

  constructor: FlightStats,

  _clientRequest: function( options, callback ) {

    var self = this

    options.qs = options.qs || {}

    if( options.extendedOptions && options.extendedOptions.length ) {
      options.qs.extendedOptions = options.extendedOptions.join( '+' )
    }

    var req = this._request( options, function( error, response, body ) {

      if( error && !response ) {
        error = error || new Error( 'Unknown Error' )
        debug( 'http:error', error )
        return callback.call( self, error )
      }

      if( error || ( response && response.statusCode !== 200 ) ) {

        var data = null

        try { data = JSON.parse( response.body ) }
        catch( e ) {}

        if( data && data.error ) {
          error = error || new Error( data.error.errorMessage )
          error.id = data.error.errorId
          error.code = data.error.httpStatusCode
          error.message = data.error.errorMessage || error.message
        }

        error = error || new Error( response.statusMessage )
        error.statusCode = response.statusCode
        error.statusMessage = response.statusMessage
        error.url = URL.format( req.url )
        error.headers = response.headers

        debug( 'http:error', error )

        return callback.call( self, error )

      }

      if( !error && body.error ) {
        error = new Error( body.error.errorMessage )
        error.code = body.error.errorCode
      }

      debug( 'http %s %s', response.request.method, response.request.url.pathname )
      debug( 'http %s %s', response.statusCode, response.statusMessage )
      debug( 'http', response.headers )

      callback.call( self, error, body )

    })

    req.once( 'error', function( error ) {
      debug( 'request:error', error )
      callback.call( self, error )
    })

    return req

  },

  /**
   * Retrieve a list of airlines
   * @param {Object} options
   * @param {Boolean} [options.all=false] optional
   * @param {?Date} [options.date] optional
   * @param {?String} [options.iata] optional
   * @param {?String} [options.icao] optional
   * @param {?String} [options.fs] optional
   * @param {Function} callback
   * @return {Request}
   */
  getAirlines: function( options, callback ) {

    if( typeof options === 'function' ) {
      callback = options
      options = null
    }

    options = options != null ? options : {}

    var self = this
    var baseUrl = 'airlines/rest/v1/json'
    var isCode = options.fs || options.iata || options.icao
    var supportsDate = !options.all || isCode

    if( !options.all && !isCode ) {
      baseUrl += '/active'
    } else if( !isCode ) {
      baseUrl += '/all'
    }

    if( options.fs ) {
      baseUrl += '/fs/' + options.fs
    } else if( options.iata ) {
      baseUrl += '/iata/' + options.iata
    } else if( options.icao ) {
      baseUrl += '/icao/' + options.icao
    }

    if( options.date && supportsDate ) {

      var year = options.date.getFullYear()
      var month = options.date.getMonth() + 1
      var day = options.date.getDate()

      baseUrl += '/' + year + '/' + month + '/' + day

    }

    return this._clientRequest({
      url: baseUrl,
      extendedOptions: [
        'includeNewFields'
      ],
    }, function( error, data ) {

      if( error != null )
        return callback.call( self, error )

      var airlines = [].concat( data.airlines || data.airline || [] )

      // Trim excessive whitespace in airline names
      airlines.forEach( function( airline ) {
        airline.name = airline.name.replace( /^\s|\s$/g, '' )
      })

      // Expand the airline category to a detailed object
      if( options.expandCategory ) {
        airlines.forEach( function( airline ) {

          var info = FlightStats.AirlineCategory[ airline.category ]

          airline.category = {
            code: ( info && info.code ) || airline.category,
            scheduled: info && info.scheduled,
            passenger: info && info.passenger,
            cargo: info && info.cargo,
          }

        })
      }

      callback.call( self, error, airlines )

    })

  },

  /**
   * Retrieve a list of airports
   * @param {Object} options
   * @param {?Boolean} [options.all=false] optional
   * @param {?Date} [options.date] optional
   * @param {?String} [options.iata] optional
   * @param {?String} [options.icao] optional
   * @param {?String} [options.fs] optional
   * @param {?String} [options.city] optional
   * @param {?String} [options.country] optional
   * @param {?Number} [options.latitude] optional
   * @param {?Number} [options.longitude] optional
   * @param {?Number} [options.radius] optional
   * @param {Function} callback
   * @return {Request}
   */
  getAirports: function( options, callback ) {

    if( typeof options === 'function' ) {
      callback = options
      options = null
    }

    options = options != null ? options : {}

    var self = this
    var baseUrl = 'airports/rest/v1/json'
    var isCode = options.fs || options.iata || options.icao
    var isLocationCode = options.city || options.country
    var isLocation = options.latitude && options.longitude && options.radius
    var supportsDate = !options.all && isCode

    if( !options.all && !isCode ) {
      baseUrl += '/active'
    } else if( !isCode && !isLocationCode && !isLocation ) {
      baseUrl += '/all'
    }

    if( isCode || isLocationCode ) {
      if( options.fs ) {
        baseUrl += '/fs/' + options.fs
      } else if( options.iata ) {
        baseUrl += '/iata/' + options.iata
      } else if( options.icao ) {
        baseUrl += '/icao/' + options.icao
      } else if( options.city ) {
        baseUrl += '/cityCode/' + options.city
      } else if( options.country ) {
        baseUrl += '/countryCode/' + options.country
      }
    }

    if( options.date && supportsDate ) {

      var year = options.date.getFullYear()
      var month = options.date.getMonth() + 1
      var day = options.date.getDate()

      baseUrl += '/' + year + '/' + month + '/' + day

    }

    if( isLocation ) {
      baseUrl += '/' + options.longitude + '/' + options.latitude + '/' + options.radius
    }

    return this._clientRequest({
      url: baseUrl,
      extendedOptions: [
        'includeNewFields'
      ],
    }, function( error, data ) {

      if( error != null )
        return callback.call( self, error )

      var airports = [].concat( data.airports || data.airport || [] )
        .map( function( airport ) {

          airport.tzOffset = airport.utcOffsetHours
          airport.tzRegion = airport.timeZoneRegionName
          airport.elevation = airport.elevationFeet * 0.305

          airport.utcOffsetHours = undefined
          delete airport.utcOffsetHours

          airport.timeZoneRegionName = undefined
          delete airport.timeZoneRegionName

          return airport

        })

      callback.call( self, error, airports )

    })

  },

  /**
   * Look up a flight
   * @param {Object} options
   * @param {Date} options.date
   * @param {String} options.airlineCode
   * @param {String} options.flightNumber
   * @param {?String} [options.airport] optional
   * @param {?String} [options.direction='arr'] optional
   * @param {?Array<String>} [options.extendedOptions] optional
   * @param {Function} callback
   * @return {Request}
   */
  lookup: function( options, callback ) {

    debug( 'lookup' )

    var now = Date.now()
    var target = options.date.getTime()

    // NOTE: `.status()` is only available within a window of -7 to +3 days
    var timeMin = now - ( 8 * 24 ) * 60 * 60 * 1000
    var timeMax = now + ( 3 * 24 ) * 60 * 60 * 1000

    var method = target < timeMin || target > timeMax ?
      'schedule' : 'status'

    debug( 'lookup:time:target ', target )
    debug( 'lookup:time:window', timeMin, timeMax )
    debug( 'lookup:type', method )

    return this[ method ]( options, callback )

  },

  /**
   * Get the live status of a flight
   * @param {Object} options - see [.lookup()]{@link FlightStats#lookup}
   * @param {Function} callback
   * @return {Request}
   */
  status: function( options, callback ) {

    debug( 'status', options )

    var self = this

    var protocol = options.protocol || 'rest'
    var format = options.format || 'json'
    var baseUrl = 'flightstatus/' + protocol + '/v2/' + format + '/flight/status'

    var carrier = options.airlineCode
    var flightNumber = options.flightNumber
    var year = options.date.getFullYear()
    var month = options.date.getMonth() + 1
    var day = options.date.getDate()
    var direction = /^dep/i.test( options.direction ) ?
      'dep' : 'arr'

    var extensions = [
      'includeNewFields',
      'useInlinedReferences'
    ]

    if( Array.isArray( options.extendedOptions ) ) {
      extensions = extensions.concat( options.extendedOptions )
    }

    return this._clientRequest({
      url: baseUrl + '/' + carrier + '/' + flightNumber + '/' + direction + '/' + year + '/' + month + '/' + day,
      extendedOptions: extensions,
      qs: {
        airport: options.airport || void 0,
      }
    }, function( error, data ) {

      if( error == null && data != null ) {
        data = FlightStats.formatStatus( data )
        if( options.airport && data.flights ) {
          data.flights = FlightStats.filterByAirport( data.flights, options.airport, options.direction )
        }
      }

      callback.call( self, error, data )

    })

  },

  /**
   * Get a flight's schedule status information
   * @param {Object} options - see [.lookup()]{@link FlightStats#lookup}
   * @param {Function} callback
   * @return {Request}
   */
  schedule: function( options, callback ) {

    debug( 'schedule', options )

    var self = this

    var protocol = options.protocol || 'rest'
    var format = options.format || 'json'
    var baseUrl = 'schedules/' + protocol + '/v1/' + format + '/flight'

    var carrier = options.airlineCode
    var flightNumber = options.flightNumber
    var year = options.date.getFullYear()
    var month = options.date.getMonth() + 1
    var day = options.date.getDate()
    var direction = /^dep/i.test( options.direction ) ?
      'departing' : 'arriving'

    var extensions = [
      'includeDirects',
      'includeCargo',
      'useInlinedReferences'
    ]

    if( Array.isArray( options.extendedOptions ) ) {
      extensions = extensions.concat( options.extendedOptions )
    }

    return this._clientRequest({
      url: baseUrl + '/' + carrier + '/' + flightNumber + '/' + direction + '/' + year + '/' + month + '/' + day,
      extendedOptions: extensions,
    }, function( error, data ) {

      if( data != null ) {
        data = FlightStats.formatSchedule( data )
        if( options.airport && data.flights ) {
          data.flights = FlightStats.filterByAirport( data.flights, options.airport, options.direction )
        }
      }

      callback.call( self, error, data )

    })

  },

  /**
   * Get the first inbound flight between two airports
   * @param {Object} options - see [.connections()]{@link FlightStats#connections}
   * @param {Function} callback
   * @return {Request}
   */
  firstFlightIn: function( options, callback ) {
    options = Object.assign({ type: 'firstflightin' }, options )
    return this.connections( options, callback )
  },

  /**
   * Get the first outbound flight between two airports
   * @param {Object} options - see [.connections()]{@link FlightStats#connections}
   * @param {Function} callback
   * @return {Request}
   */
  firstFlightOut: function( options, callback ) {
    options = Object.assign({ type: 'firstflightout' }, options )
    return this.connections( options, callback )
  },

  /**
   * Get the last inbound flight between two airports
   * @param {Object} options - see [.connections()]{@link FlightStats#connections}
   * @param {Function} callback
   * @return {Request}
   */
  lastFlightIn: function( options, callback ) {
    options = Object.assign({ type: 'lastflightin' }, options )
    return this.connections( options, callback )
  },

  /**
   * Get the last outbound flight between two airports
   * @param {Object} options - see [.connections()]{@link FlightStats#connections}
   * @param {Function} callback
   * @return {Request}
   */
  lastFlightOut: function( options, callback ) {
    options = Object.assign({ type: 'lastflightout' }, options )
    return this.connections( options, callback )
  },

  /**
   * Get connecting flights between two airports
   * @internal used by {first,last}Flight{In,Out} methods
   * @param {Object} options
   * @param {?String} [options.type] optional, only used by `.connections()`
   * @param {String} options.departureAirport
   * @param {String} options.arrivalAirport
   * @param {Date} options.date
   * @param {?Number} [options.numHours=6] optional
   * @param {?Number} [options.maxResults=25] optional
   * @param {?Number} [options.maxConnections=2] optional
   * @param {?Number} [options.minimumConnectTime] optional
   * @param {?String} [options.payloadType='passenger'] optional
   * @param {?Array<String>} [options.includeAirlines] optional
   * @param {?Array<String>} [options.excludeAirlines] optional
   * @param {?Array<String>} [options.includeAirports] optional
   * @param {?Array<String>} [options.excludeAirports] optional
   * @param {?Boolean} [options.includeSurface=false] optional
   * @param {?Boolean} [options.includeCodeshares=true] optional
   * @param {?Boolean} [options.includeMultipleCarriers=true] optional
   * @param {Array<String>} [options.extendedOptions]
   * @param {Function} callback
   * @return {Request}
   */
  connections: function( options, callback ) {

    var self = this

    var year = options.date.getFullYear()
    var month = options.date.getMonth() + 1
    var day = options.date.getDate()
    var hour = options.date.getHours()
    var minute = options.date.getMinutes()

    var url = '/connections/rest/v2/json/' + options.type + '/' + options.departureAirport + '/to/' + options.arrivalAirport +
      '/arriving_before/' + year + '/' + month + '/' + day + '/' + hour + '/' + minute

    var extensions = []

    if( Array.isArray( options.extendedOptions ) ) {
      extensions = extensions.concat( options.extendedOptions )
    }

    var query = {
      numHours: options.numHours,
      maxResults: options.maxResults,
      maxConnections: options.maxConnections,
      minimumConnectTime: options.minimumConnectTime,
      payloadType: options.payloadType,
      includeAirlines: options.includeAirlines,
      excludeAirlines: options.excludeAirlines,
      includeAirports: options.includeAirports,
      excludeAirports: options.excludeAirports,
      includeSurface: options.includeSurface,
      includeCodeshares: options.includeCodeshares,
      includeMultipleCarriers: options.includeMultipleCarriers,
    }

    Object.keys( query ).forEach( function( key ) {
      query[key] = query[key] != null ?
        query[key] : undefined
    })

    return this._clientRequest({
      url: url,
      qs: query,
      extendedOptions: extensions,
    }, function( error, data ) {
      callback.call( self, error, data )
    })

  },

  /**
   * Get ratings for a specified flight
   * @param {Object} options
   * @param {String} options.carrier
   * @param {String|Number} options.flightNumber
   * @param {Array<String>} [options.extendedOptions]
   * @param {Function} callback
   * @return {Request}
   */
  flightRatings: function( options, callback ) {

    var self = this
    var url = '/ratings/rest/v1/json/flight/' + options.carrier + '/' + options.flightNumber

    var extensions = []

    if( Array.isArray( options.extendedOptions ) ) {
      extensions = extensions.concat( options.extendedOptions )
    }

    return this._clientRequest({
      url: url,
      extendedOptions: extensions,
      qs: {
        departureAirport: options.departureAirport,
        codeType: options.codeType,
      }
    }, function( error, data ) {
      callback.call( self, error, data )
    })

  },

  /**
   * Get ratings for a route between airports
   * @param {Object} options
   * @param {String} options.departureAirport
   * @param {String} options.arrivalAirport
   * @param {Array<String>} [options.extendedOptions]
   * @param {Function} callback
   * @return {Request}
   */
  routeRatings: function( options, callback ) {

    var self = this
    var url = '/ratings/rest/v1/json/route/' + options.departureAirport + '/' + options.arrivalAirport

    var extensions = []

    if( Array.isArray( options.extendedOptions ) ) {
      extensions = extensions.concat( options.extendedOptions )
    }

    return this._clientRequest({
      url: url,
      extendedOptions: extensions,
      qs: {
        codeType: options.codeType,
      }
    }, function( error, data ) {
      callback.call( self, error, data )
    })

  },

  /**
   * Get flights near a given (lat,lng) coordinate, within a radius
   * @param {Object} options
   * @param {Number} options.lat
   * @param {Number} options.lng
   * @param {Number} options.radius
   * @param {Array<String>} [options.extendedOptions]
   * @param {Function} callback
   * @return {Request}
   */
  flightsNear: function( options, callback ) {

    var self = this
    var url = '/flightstatus/rest/v2/json/flightsNear/' +
      options.lat + '/' + options.lng + '/' + options.radius

    var extensions = []

    if( Array.isArray( options.extendedOptions ) ) {
      extensions = extensions.concat( options.extendedOptions )
    }

    return this._clientRequest({
      url: url,
      extendedOptions: extensions,
      qs: {
        sourceType: options.sourceType, // raw|derived|all
        maxFlights: options.maxFlights,
      }
    }, function( error, data ) {
      callback.call( self, error, data )
    })

  },

  /**
   * Get flights within a given bounding box (lat,lng,lat,lng)
   * @param {Object} options
   * @param {Array} options.coords [lat,lng,lat,lng]
   * @param {String} options.sourceType (raw|derived|all)
   * @param {Number} options.maxFlights
   * @param {Array<String>} [options.extendedOptions]
   * @param {Function} callback
   * @return {Request}
   */
  flightsWithin: function( options, callback ) {

    var self = this
    var url = '/flightstatus/rest/v2/json/flightsNear/' + options.coords.join( '/' )

    var extensions = []

    if( Array.isArray( options.extendedOptions ) ) {
      extensions = extensions.concat( options.extendedOptions )
    }

    return this._clientRequest({
      url: url,
      extendedOptions: extensions,
      qs: {
        sourceType: options.sourceType, // raw|derived|all
        maxFlights: options.maxFlights,
      }
    }, function( error, data ) {
      callback.call( self, error, data )
    })

  },

  /**
   * Get routes between two airports
   * @param {Object} options
   * @param {Date} options.date
   * @param {String} options.departureAirport
   * @param {String} options.arrivalAirport
   * @param {String} options.codeType
   * @param {Number} options.maxFlights
   * @param {Number} options.numHours
   * @param {Number} options.hourOfDay
   * @param {Boolean} options.utc
   * @param {Array<String>} [options.extendedOptions]
   * @param {Function} callback
   * @return {Request}
   */
  routes: function( options, callback ) {

    debug( 'route', options )

    var self = this

    var year = options.date.getFullYear()
    var month = options.date.getMonth() + 1
    var day = options.date.getDate()
    var direction = /^dep/i.test( options.direction ) ?
      'dep' : 'arr'

    var url = 'flightstatus/rest/v2/json/route/status/' + options.departureAirport + '/' + options.arrivalAirport +
      '/' + direction + '/' + year + '/' + month + '/' + day

    var extensions = [
      'useInlinedReferences'
    ]

    if( Array.isArray( options.extendedOptions ) ) {
      extensions = extensions.concat( options.extendedOptions )
    }

    return this._clientRequest({
      url: url,
      extendedOptions: extensions,
      qs: {
        maxFlights: options.maxFlights,
        codeType: options.codeType,
        numHours: options.numHours,
        utc: options.utc,
        hourOfDay: options.hourOfDay,
      }
    }, function( error, data ) {
      callback.call( self, error, data )
    })

  },

}

// Exports
module.exports = FlightStats
