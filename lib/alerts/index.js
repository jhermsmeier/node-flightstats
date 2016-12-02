/**
 * Alerts
 * @constructor
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
   * @param {String} maxId
   * @param {Function} callback( error, rules )
   * @return {Request}
   */
  listRules: function( maxId, callback ) {
    setImmediate( () => callback( new Error( 'Not implemented' ) ) )
  },

  /**
   * Retrieve a registered rule by it's ID
   * @param {String} id
   * @param {Function} callback( error, result )
   * @return {Request}
   */
  getRule: function( id, callback ) {
    setImmediate( () => callback( new Error( 'Not implemented' ) ) )
  },

  /**
   * Delete a registered rule by it's ID
   * @param {String} id
   * @param {Function} callback( error, result )
   * @return {Request}
   */
  deleteRule: function( id, callback ) {
    setImmediate( () => callback( new Error( 'Not implemented' ) ) )
  },

  /**
   * Simulate a fake event for a fake flight
   * @param {Object} options
   * @param {String} options.airlineCode
   * @param {String} options.arrivalAirport
   * @param {String} options.deliverTo
   * @param {String} options.departureAirport
   * @param {String} options.flightNumber
   * @param {?Array<String>} [options.extendedOptions] optional (skipValidation|testRun)
   * @param {Function} callback( error, result )
   * @return {Request}
   */
  simulate: function( options, callback ) {
    setImmediate( () => callback( new Error( 'Not implemented' ) ) )
  },

  /**
   * Create an flight alert rule
   * @param {Object} options
   * @param {String} options.airlineCode
   * @param {String} options.arrivalAirport
   * @param {String} options.date
   * @param {String} options.deliverTo - where alert will be delivered to, must accept POST data
   * @param {String} options.departureAirport
   * @param {String} options.desc - optional, description of the rule
   * @param {String} options.direction - optional (arr|dep)
   * @param {String} options.events - comma separated list of events that should be emitted for the flight
   * @param {String} options.flightNumber
   * @param {String} options.name - optional, defaults to "Default"
   * @param {String} options.name - optional, custom key/value pairs to be included in delivered alerts
   * @param {?Array<String>} [options.extendedOptions] optional
   * @param {Function} callback( error, result )
   * @return {Request}
   */
  createRule: function( options, callback ) {
    setImmediate( () => callback( new Error( 'Not implemented' ) ) )
  },

}

// Exports
module.exports = Alerts
