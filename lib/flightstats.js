var package = require( '../package' )
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
    'AppId': this.options.appId,
    'AppKey': this.options.apiKey,
    'User-Agent': this.options.userAgent,
  }

}

/**
 * Default options
 * @type {Object}
 */
FlightStats.defaults = {
  appId: '',
  apiKey: '',
  userAgent: process.release.name + ' ' +
    package.name + '/' + package.version,
}

FlightStats.userAgent = process.release.name + ' ' + package.name + '/' + package.version
FlightStats.baseUrl = 'https://api.flightstats.com/flex'

FlightStats.AirlineCategory = require( './airline-category' )
FlightStats.FlightStatus = require( './flight-status' )
FlightStats.ServiceType = require( './service-type' )
FlightStats.StatusUpdate = require( './status-update' )
FlightStats.IrregularOperation = require( './irregular-operation' )
FlightStats.CodeshareType = require( './codeshare-type' )

/**
 * FlightStats prototype
 * @type {Object}
 */
FlightStats.prototype = {

  constructor: FlightStats,

  getAirlines: function( options, callback ) {

    if( typeof options === 'function' ) {
      callback = options
      options = null
    }

    options = options != null ? options : {}

    var self = this
    var baseUrl = `${FlightStats.baseUrl}/airlines/rest/v1/json`
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

      baseUrl += `/${year}/${month}/${day}`

    }

    return request({
      headers: Object.assign( {}, this.headers, options.headers || void 0 ),
      url: baseUrl,
      qs: {
        extendedOptions: [
          'useHttpErrors',
          'includeNewFields'
        ].join( '+' )
      }
    }, function( error, data ) {

      // Patch inconsistent behavior of the API,
      // which returns a single object under an `airline` key
      // when looking up by ICAO airline code
      if( data && data.airline ) {
        data.airlines = [].concat( data.airline )
        data.airline = void 0
        delete data.airline
      }

      if( options.expandCategory && data && data.airlines ) {
        data.airlines = data.airlines.map( function( airline ) {
          airline.category = FlightStats.AirlineCategory[ airline.category ] ?
            Object.assign( {}, FlightStats.AirlineCategory[ airline.category ] ) :
            { code: airline.category }
          return airline
        })
      }

      callback.call( self, error, data )

    })

  },

  lookup: function( options, callback ) {

    debug( 'lookup' )

    var now = Date.now()
    var target = options.date.getTime()

    // TODO: Fast-error without hitting FlightStats,
    // when outside of time boundaries (?)
    var time = {
      // NOTE: `.status()` is only available within a window of -7 to +3 days
      min: now - ( 8 * 24 ) * 60 * 60 * 1000,
      max: now + ( 3 * 24 ) * 60 * 60 * 1000,
      // NOTE: `.schedule()` can go up to 30 days into the future
      // (apparently more, as experimentally proven)
      schedMax: now + ( 30 * 24 ) * 60 * 60 * 1000,
    }

    var method = target < time.min || target > time.max ?
      'schedule' : 'status'

    debug( 'lookup:time:target ', target )
    debug( 'lookup:time:window', time )
    debug( 'lookup:type', method )

    return this[ method ]( options, callback )

  },

  status: function( options, callback ) {

    debug( 'status', options )

    var self = this

    var protocol = options.protocol || 'rest'
    var format = options.format || 'json'
    var baseUrl = `${FlightStats.baseUrl}/flightstatus/${protocol}/v2/${format}/flight/status`

    var carrier = options.airlineCode
    var flightNumber = options.flightNumber
    var year = options.date.getFullYear()
    var month = options.date.getMonth() + 1
    var day = options.date.getDate()
    var direction = /^dep/i.test( options.direction ) ?
      'dep' : 'arr'

    return request({
      headers: Object.assign( {}, this.headers, options.headers || void 0 ),
      url: `${baseUrl}/${carrier}/${flightNumber}/${direction}/${year}/${month}/${day}`,
      qs: {
        airport: options.airport || void 0,
        extendedOptions: [
          'includeNewFields',
          'useHttpErrors',
          'useInlinedReferences'
        ].join( '+' )
      }
    }, function( error, data ) {
      // data = data ? FlightStats.formatStatus( data ) : data
      callback.call( self, error, data )
    })

  },

  schedule: function( options, callback ) {

    debug( 'schedule', options )

    var self = this

    var protocol = options.protocol || 'rest'
    var format = options.format || 'json'
    var baseUrl = `${FlightStats.baseUrl}/schedules/${protocol}/v1/${format}/flight`

    var carrier = options.airlineCode
    var flightNumber = options.flightNumber
    var year = options.date.getFullYear()
    var month = options.date.getMonth() + 1
    var day = options.date.getDate()
    var direction = /^dep/i.test( options.direction ) ?
      'departing' : 'arriving'

    return request({
      headers: Object.assign( {}, this.headers, options.headers || void 0 ),
      url: `${baseUrl}/${carrier}/${flightNumber}/${direction}/${year}/${month}/${day}`,
      qs: {
        extendedOptions: [
          'includeDirects',
          'includeCargo',
          'useInlinedReferences'
        ].join( '+' )
      }
    }, function( error, data ) {
      // data = data ? FlightStats.formatSchedule( data ) : data
      callback.call( self, error, data )
    })

  },

}

// Exports
module.exports = FlightStats
