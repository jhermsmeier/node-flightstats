/**
 * The codeshare relationship between this carrier and the operating carrier 
 * @type {Object}
 */
module.exports = {
  L: {
    description: 'Commercial duplicate: Flight is sold by one airline, but other airline(s) sell tickets to provide same-carrier connections. Customers will see use the operator\'s counter and gate at the airport.'
  },
  Z: this.L,
  S: {
    description: 'Shared airline designator or wet lease: Flight is marketed by one airline and operated by another, but under the name of the marketing carrier. The operating carrier does not sell tickets under their own name.'
  },
  X: this.S,
  C: {
    description: 'Special case of commercial duplicate: a distinct flight number, with the same carrier as the operating carrier.'
  },
}
