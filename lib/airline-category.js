/**
 * The category of operation of the airline
 * @name AirlineCategory
 * @memberOf FlightStats
 * @type {Object<String,Object>}
 */
module.exports = {
  A: {
    code: 'A',
    description: 'Scheduled Passenger Carrier',
    scheduled: true,
    passenger: true,
    cargo: false,
  },
  B: {
    code: 'B',
    description: 'Non-Scheduled Passenger Carrier',
    scheduled: false,
    passenger: true,
    cargo: false,
  },
  C: {
    code: 'C',
    description: 'Scheduled Cargo Carrier',
    scheduled: true,
    passenger: false,
    cargo: true,
  },
  D: {
    code: 'D',
    description: 'Non-scheduled Cargo Carrier',
    scheduled: false,
    passenger: false,
    cargo: true,
  },
  I: {
    code: 'I',
    description: 'Scheduled Passenger/Cargo Carrier',
    scheduled: true,
    passenger: true,
    cargo: true,
  },
  J: {
    code: 'J',
    description: 'Non-scheduled Passenger/Cargo Carrier',
    scheduled: false,
    passenger: true,
    cargo: true,
  },
  K: {
    code: 'K',
    description: 'Railway Service',
    passenger: true,
    cargo: true,
  },
}
