/**
 * Alerts
 * @constructor
 * @memberOf FlightStats
 * @param {FlightStats} client
 * @return {Alerts}
 */
function Alerts( client ) {

  if( !(this instanceof Alerts) )
    return new Alerts( client )

  this.client = client

}

/**
 * Alerts prototype
 * @type {Object}
 * @ignore
 */
Alerts.prototype = {

  constructor: Alerts,

  /**
   * List all registered rule IDs,
   * optionally only up to a given `maxId`
   * @param {String} maxId - optional, list only rules that are less than the specified max Rule ID
   * @param {Function} callback( error, rules )
   * @return {Request}
   */
  list: function( maxId, callback ) {

    if( typeof maxId === 'function' ) {
      callback = maxId
      maxId = null
    }

    var self = this
    var id = maxId ? '/' + maxId : ''

    return this.client._clientRequest({
      url: '/alerts/rest/v1/json/list' + id,
    }, function( error, data ) {
      callback.call( self.client, error, data )
    })

  },

  /**
   * Retrieve a registered rule by it's ID
   * @param {String} id
   * @param {Function} callback( error, result )
   * @return {Request}
   */
  get: function( id, callback ) {
    var self = this
    return this.client._clientRequest({
      url: '/alerts/rest/v1/json/get/' + id,
    }, function( error, data ) {
      callback.call( self.client, error, data )
    })
  },

  /**
   * Delete a registered rule by it's ID
   * @param {String} id
   * @param {Function} callback( error, result )
   * @return {Request}
   */
  remove: function( id, callback ) {
    var self = this
    return this.client._clientRequest({
      url: '/alerts/rest/v1/json/delete/' + id,
    }, function( error, data ) {
      callback.call( self.client, error, data )
    })
  },

  /**
   * Simulate a fake event for a fake flight
   * @param {Object} options
   * @param {String} options.airlineCode
   * @param {String} options.arrivalAirport
   * @param {String} options.deliverTo (can be smtp://username@domain.com for testing)
   * @param {String} options.departureAirport
   * @param {String} options.flightNumber
   * @param {?Array<String>} [options.extendedOptions] optional
   * @param {String} options.type - optional (JSON|XML), defaults to JSON
   * @param {Function} callback( error, result )
   * @return {Request}
   */
  simulate: function( options, callback ) {

    var self = this

    var path = '/alerts/rest/v1/json/testdelivery/' +
      options.airlineCode + '/' + options.flightNumber +
      '/from/' + options.departureAirport +
      '/to/' + options.arrivalAirport

    var extensions = [
      'includeNewFields',
      'useInlinedReferences'
    ]

    if( Array.isArray( options.extendedOptions ) ) {
      extensions = extensions.concat( options.extendedOptions )
    }

    return this.client._clientRequest({
      url: path,
      extendedOptions: extensions,
      qs: {
        deliverTo: options.deliverTo,
        type: options.type || 'JSON',
      },
    }, function( error, data ) {
      callback.call( self.client, error, data )
    })

  },

  /**
   * Create an flight alert rule
   * @param {Object} options
   * @param {String} options.airlineCode
   * @param {String} options.arrivalAirport
   * @param {String} options.codeType
   * @param {String} options.data - optional, custom key/value pairs to be included in delivered alerts
   * @param {String} options.date
   * @param {String} options.deliverTo - where alert will be delivered to, must accept POST data
   * @param {String} options.departureAirport
   * @param {String} options.desc - optional, description of the rule
   * @param {String} options.direction - optional (arr|dep), defaults to arriving
   * @param {String} options.events - comma separated list of events that should be emitted for the flight, defaults to [all]
   * @param {String} options.flightNumber
   * @param {String} options.name - optional, defaults to "Default"
   * @param {String} options.type - optional (JSON|XML), defaults to JSON
   * @param {?Array<String>} [options.extendedOptions] optional
   * @param {Function} callback( error, result )
   * @return {Request}
   */
  create: function( options, callback ) {

    var self = this
    var events = options.events || [ 'all' ]
    var year = options.date.getFullYear()
    var month = options.date.getMonth() + 1
    var day = options.date.getDate()
    var direction = /^dep/i.test( options.direction ) ?
      'departing' : 'arriving'

    var path = '/alerts/rest/v1/json/create/' +
      options.airlineCode + '/' + options.flightNumber +
      '/from/' + options.departureAirport +
      '/to/' + options.arrivalAirport +
      '/' + direction + '/' + year + '/' + month + '/' + day

    var extensions = [
      'includeNewFields',
      'useInlinedReferences'
    ]

    if( Array.isArray( options.extendedOptions ) ) {
      extensions = extensions.concat( options.extendedOptions )
    }

    var query = {
      name: options.name,
      desc: options.desc,
      codeType: options.codeType,
      events: events.join(),
      deliverTo: options.deliverTo,
      type: options.type || 'JSON',
    }

    // Add underscore-prefixed custom data
    // key-value pairs to query parameters
    if( options.data != null ) {
      Object.keys( options.data ).forEach( function( k ) {
        query[ '_' + k ] = options.data[k]
      })
    }

    return this.client._clientRequest({
      url: path,
      extendedOptions: extensions,
      qs: query,
    }, function( error, data ) {
      callback.call( self.client, error, data )
    })

  },

}

// Exports
module.exports = Alerts
