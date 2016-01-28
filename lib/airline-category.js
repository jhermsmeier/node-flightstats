/**
 * The category of operation of the airline
 * @type {Object}
 */
module.exports = {
  A: {
    code: 'A',
    description: 'Scheduled Passenger Carrier',
    passenger: true,
    cargo: false,
  },
  B: {
    code: 'B',
    description: 'Non-Scheduled Passenger Carrier',
    passenger: true,
    cargo: false,
  },
  C: {
    code: 'C',
    description: 'Scheduled Cargo Carrier',
    passenger: false,
    cargo: true,
  },
  D: {
    code: 'D',
    description: 'Non-scheduled Cargo Carrier',
    passenger: false,
    cargo: true,
  },
  I: {
    code: 'I',
    description: 'Scheduled Passenger/Cargo Carrier',
    passenger: true,
    cargo: true,
  },
  J: {
    code: 'J',
    description: 'Non-scheduled Passenger/Cargo Carrier',
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
