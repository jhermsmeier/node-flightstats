/**
 * The current status of the flight
 * @name FlightStatus
 * @memberOf FlightStats
 * @type {Object<String,String>}
 */
module.exports = {
  A: 'En route',
  C: 'Canceled',
  D: 'Landed elsewhere',
  DN: 'Data Not Available',
  L: 'Landed',
  NO: 'Not Operational',
  R: 'Redirected',
  S: 'Scheduled',
  U: 'Unknown',
}
