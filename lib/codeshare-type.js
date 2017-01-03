/**
 * The codeshare relationship between this carrier and the operating carrier
 * @name CodeshareType
 * @memberOf FlightStats
 * @type {Object<String,Object>}
 */
module.exports = {
  L: {
    code: 'L',
    type: 'Commercial duplicate',
    description: 'Flight is sold by one airline, but other airline(s) sell tickets to provide same-carrier connections. Customers will see use the operator\'s counter and gate at the airport.'
  },
  Z: {
    code: 'Z',
    type: 'Commercial duplicate',
    description: 'Flight is sold by one airline, but other airline(s) sell tickets to provide same-carrier connections. Customers will see use the operator\'s counter and gate at the airport.'
  },
  S: {
    code: 'S',
    type: 'Shared airline designator or wet lease',
    description: 'Shared airline designator or wet lease: Flight is marketed by one airline and operated by another, but under the name of the marketing carrier. The operating carrier does not sell tickets under their own name.'
  },
  X: {
    code: 'X',
    type: 'Shared airline designator or wet lease',
    description: 'Shared airline designator or wet lease: Flight is marketed by one airline and operated by another, but under the name of the marketing carrier. The operating carrier does not sell tickets under their own name.'
  },
  C: {
    code: 'C',
    type: 'Distinct flight number',
    description: 'Special case of commercial duplicate: a distinct flight number, with the same carrier as the operating carrier.'
  },
}
