var packageInfo = require( '../package' )
var request = require( './request' )
var debug = require( 'debug' )( 'flightstats' )

/**
 * FlightStats
 * @constructor
 * @param {Object} options
 * @return {FlightStats}
 */
function FlightStats( options ) {

  if( !(this instanceof FlightStats) )
    return new FlightStats( options )

  this.options = Object.assign( {}, FlightStats.defaults, options || {} )

  this.headers = {
    'User-Agent': this.options.userAgent,
  }

}

/**
 * Default options
 * @type {Object}
 */
FlightStats.defaults = {
  userAgent: packageInfo.name + '/' + packageInfo.version + ' ' +
    '(' + process.release.name + '/' + process.versions.node + ')',
}

FlightStats.userAgent = process.release.name + ' ' + packageInfo.name + '/' + packageInfo.version
FlightStats.baseUrl = 'https://api.flightstats.com/flex'

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
 * @param  {Array}  flights
 * @param  {String} airport
 * @param  {String} direction
 * @return {Array}  flights
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

  /**
   * Retrieve a list of airlines
   * @param  {Object} options
   *   @property {Boolean} all
   *   @property {Date}    date
   *   @property {String}  iata
   *   @property {String}  icao
   *   @property {String}  fs
   * @param  {Function} callback
   * @return {Request}
   */
  getAirlines: function( options, callback ) {

    if( typeof options === 'function' ) {
      callback = options
      options = null
    }

    options = options != null ? options : {}

    var self = this
    var baseUrl = FlightStats.baseUrl + '/airlines/rest/v1/json'
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

    return request({
      headers: Object.assign( {}, this.headers, options.headers || void 0 ),
      url: baseUrl,
      qs: {
        appId: this.options.appId,
        appKey: this.options.apiKey,
        extendedOptions: [
          'useHttpErrors',
          'includeNewFields'
        ].join( '+' )
      }
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
          airline.category = FlightStats.AirlineCategory[ airline.category ] ?
            Object.assign( {}, FlightStats.AirlineCategory[ airline.category ] ) :
            { code: airline.category }
        })
      }

      callback.call( self, error, airlines )

    })

  },

  /**
   * Retrieve a list of airports
   * @param  {Object} options
   *   @property {Boolean} all
   *   @property {Date}    date
   *   @property {String}  iata
   *   @property {String}  icao
   *   @property {String}  fs
   *   @property {String}  city
   *   @property {String}  country
   *   @property {Number}  latitude
   *   @property {Number}  longitude
   *   @property {Number}  radius
   * @param  {Function} callback
   * @return {Request}
   */
  getAirports: function( options, callback ) {

    if( typeof options === 'function' ) {
      callback = options
      options = null
    }

    options = options != null ? options : {}

    var self = this
    var baseUrl = FlightStats.baseUrl + '/airports/rest/v1/json'
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

    return request({
      headers: Object.assign( {}, this.headers, options.headers || void 0 ),
      url: baseUrl,
      qs: {
        appId: this.options.appId,
        appKey: this.options.apiKey,
        extendedOptions: [
          'useHttpErrors',
          'includeNewFields'
        ].join( '+' )
      }
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

          airport.delayIndexUrl = undefined
          delete airport.delayIndexUrl

          airport.weatherUrl = undefined
          delete airport.weatherUrl

          return airport

        })

      callback.call( self, error, airports )

    })

  },

  /**
   * Look up a flight
   * @param {Object} options
   *   @property {Date} date
   *   @property {String} airlineCode
   *   @property {String} flightNumber
   *   @property {String} airport (optional)
   *   @property {String} direction (optional)
   *   @property {Array} extendedOptions (optional)
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
   * @param  {Object} options
   *   @see FlightStats#lookup()
   * @param  {Function} callback
   * @return {Request}
   */
  status: function( options, callback ) {

    debug( 'status', options )

    var self = this

    var protocol = options.protocol || 'rest'
    var format = options.format || 'json'
    var baseUrl = FlightStats.baseUrl + '/flightstatus/' + protocol + '/v2/' + format + '/flight/status'

    var carrier = options.airlineCode
    var flightNumber = options.flightNumber
    var year = options.date.getFullYear()
    var month = options.date.getMonth() + 1
    var day = options.date.getDate()
    var direction = /^dep/i.test( options.direction ) ?
      'dep' : 'arr'

    var extensions = [
      'includeNewFields',
      'useHttpErrors',
      'useInlinedReferences'
    ]

    if( Array.isArray( options.extendedOptions ) ) {
      extensions = extensions.concat( options.extendedOptions )
    }

    return request({
      headers: Object.assign( {}, this.headers, options.headers || void 0 ),
      url: baseUrl + '/' + carrier + '/' + flightNumber + '/' + direction + '/' + year + '/' + month + '/' + day,
      qs: {
        airport: options.airport || void 0,
        appId: this.options.appId,
        appKey: this.options.apiKey,
        extendedOptions: extensions.join( '+' )
      }
    }, function( error, data ) {

      if( data != null ) {
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
   * @param  {Object} options
   *   @see FlightStats#lookup()
   * @param  {Function} callback
   * @return {Request}
   */
  schedule: function( options, callback ) {

    debug( 'schedule', options )

    var self = this

    var protocol = options.protocol || 'rest'
    var format = options.format || 'json'
    var baseUrl = FlightStats.baseUrl + '/schedules/' + protocol + '/v1/' + format + '/flight'

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

    return request({
      headers: Object.assign( {}, this.headers, options.headers || void 0 ),
      url: baseUrl + '/' + carrier + '/' + flightNumber + '/' + direction + '/' + year + '/' + month + '/' + day,
      qs: {
        appId: this.options.appId,
        appKey: this.options.apiKey,
        extendedOptions: extensions.join( '+' )
      }
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

}

// Exports
module.exports = FlightStats
