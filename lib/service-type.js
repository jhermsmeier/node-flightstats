/**
 * The type of service offered for a flight
 * @type {Object}
 */
module.exports = {
  A: { passenger: false, cargo: true, surface: false, description: 'Non-scheduled Cargo/Mail', },
  B: { passenger: true, cargo: false, surface: false, description: 'Non-scheduled Passenger (Shuttle Service)', },
  C: { passenger: true, cargo: false, surface: false, description: 'Charter (Passenger Only)', },
  D: { passenger: null, cargo: null, surface: null, description: 'General Aviation', },
  E: { passenger: null, cargo: null, surface: null, description: 'Special (FAA/Government)', },
  F: { passenger: false, cargo: true, surface: false, description: 'Scheduled Cargo/Mail (Loose loaded cargo and/or preloaded devices)', },
  G: { passenger: true, cargo: false, surface: false, description: 'Non-scheduled Passenger (Normal Service)', },
  H: { passenger: false, cargo: true, surface: false, description: 'Charter (Cargo and/or Mail)', },
  J: { passenger: true, cargo: false, surface: false, description: 'Scheduled Passenger (Normal Service)', },
  K: { passenger: null, cargo: null, surface: null, description: 'Training', },
  L: { passenger: true, cargo: true, surface: false, description: 'Charter (Passenger and Cargo and/or Mail)', },
  M: { passenger: false, cargo: true, surface: false, description: 'Scheduled Cargo/Mail (Mail Only)', },
  O: { passenger: true, cargo: false, surface: false, description: 'Charter (Special handling - Migrants/Immigrants)', },
  P: { passenger: null, cargo: null, surface: null, description: 'Non-revenue', },
  Q: { passenger: true, cargo: true, surface: false, description: 'Scheduled Passenger/Cargo in Cabin', },
  R: { passenger: true, cargo: true, surface: false, description: 'Additional Flights - Passenger/Cargo', },
  S: { passenger: true, cargo: false, surface: false, description: 'Scheduled Passenger (Shuttle Service)', },
  T: { passenger: null, cargo: null, surface: null, description: 'Technical Test', },
  U: { passenger: true, cargo: false, surface: true, description: 'Scheduled Passenger (Service Vehicle)', },
  V: { passenger: false, cargo: true, surface: true, description: 'Scheduled Cargo/Mail (Surface Vehicle)', },
  W: { passenger: null, cargo: null, surface: null, description: 'Military', },
  Y: { passenger: null, cargo: null, surface: null, description: 'IATA Special Internal (Y)', },
  Z: { passenger: null, cargo: null, surface: null, description: 'IATA Special Internal (Z)', },
}
