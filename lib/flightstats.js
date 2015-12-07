var package = require( '../package' )
var request = require( 'request' )
var URL = require( 'url' )
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
  
  _request: function( options, callback ) {
    
    var self = this
    
    debug( 'request:method', options.method || 'GET' )
    debug( 'request:url', options.url )
    debug( 'request:query', options.qs )
    debug( 'request', this.headers )
    
    var req = request({
      method: options.method || 'GET',
      headers: Object.assign( {}, options.headers || {}, this.headers ),
      url: options.url,
      qs: options.qs,
    }, function( error, response, body ) {
      
      if( error && !response ) {
        error = error || new Error( 'Unknown Error' )
        debug( 'response:error', error )
        return callback.call( self, error )
      }
      
      if( error || ( response && response.statusCode !== 200 ) ) {
        
        // NOTE: Only god knows why they return JSON
        // to browsers, but not API clients – parsing strings FTW!
        var data = null
        try {
          data = response.body.split( /\r?\n/g )
            .reduce( function( err, line ) {
              var parts = line.split( ': ' )
              err[ parts.shift() ] = parts.join()
              return err
            }, {})
        } catch( e ) {}
        
        if( data ) {
          error = error || new Error( data.message )
          error.id = data.id
          error.code = data.code
          error.message = data.message
        }
        
        error = error || new Error( response.statusMessage )
        error.statusCode = response.statusCode
        error.statusMessage = response.statusMessage
        error.url = response.url
        error.headers = response.headers
        
        debug( 'response:error', error )
        
        return callback.call( self, error )
        
      }
      
      debug( 'response', response.statusCode, response.statusMessage )
      debug( 'response', response.headers )
      
      var data = null
      
      try {
        data = JSON.parse( body )
      } catch( error ) {
        debug( 'response:error:body', error )
        error.statusCode = 500
        return callback.call( self, error )
      }
      
      callback.call( self, null, data )
      
    })
    
    req.on( 'error', function( error ) {
      debug( 'request:error', error )
      error.statusCode = 500
      callback.call( self, error )
    })
    
  },
  
  lookup: function( options, callback ) {
    
    var now = Date.now()
    var target = options.date.getTime()
    
    // TODO: Fast-error without hitting FlightStats,
    // when outside of time boundaries (?)
    var time = {
      // NOTE: `.status()` is only available within a window of -7 to +3 days
      min: now - ( 7 * 24 ) * 60 * 60 * 1000,
      max: now + ( 3 * 24 ) * 60 * 60 * 1000,
      // NOTE: `.schedule()` can go up to 30 days into the future
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
    
    this._request({
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
      callback.call( this, error, data )
    })
    
    return this
    
  },
  
  schedule: function( options, callback ) {
    
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
    
    this._request({
      url: `${baseUrl}/${carrier}/${flightNumber}/${direction}/${year}/${month}/${day}`,
      qs: {
        extendedOptions: [
          'includeDirects',
          'includeCargo',
          'useInlinedReferences'
        ].join( '+' )
      }
    }, function( error, data ) {
      callback.call( this, error, data )
    })
    
    return this
    
  },
  
}

// Exports
module.exports = FlightStats
