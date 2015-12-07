/**
 * The category of operation of the airline
 * @type {Object}
 */
module.exports = {
  A: {
    description: 'Scheduled Passenger Carrier',
    passenger: true,
    cargo: false,
  },
  B: {
    description: 'Non-Scheduled Passenger Carrier',
    passenger: true,
    cargo: false,
  },
  C: {
    description: 'Scheduled Cargo Carrier',
    passenger: false,
    cargo: true,
  },
  D: {
    description: 'Non-scheduled Cargo Carrier',
    passenger: false,
    cargo: true,
  },
  I: {
    description: 'Scheduled Passenger/Cargo Carrier',
    passenger: true,
    cargo: true,
  },
  J: {
    description: 'Non-scheduled Passenger/Cargo Carrier',
    passenger: true,
    cargo: true,
  },
  K: {
    description: 'Railway Service',
    passenger: true,
    cargo: true,
  },
}
