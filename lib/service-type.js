/**
 * The type of service offered for a flight
 * @type {Object}
 */
module.exports = {
  A: { code: 'A', description: 'Non-scheduled Cargo/Mail', passenger: false, cargo: true, surface: false },
  B: { code: 'B', description: 'Non-scheduled Passenger (Shuttle Service)', passenger: true, cargo: false, surface: false },
  C: { code: 'C', description: 'Charter (Passenger Only)', passenger: true, cargo: false, surface: false },
  D: { code: 'D', description: 'General Aviation', passenger: null, cargo: null, surface: null },
  E: { code: 'E', description: 'Special (FAA/Government)', passenger: null, cargo: null, surface: null },
  F: { code: 'F', description: 'Scheduled Cargo/Mail (Loose loaded cargo and/or preloaded devices)', passenger: false, cargo: true, surface: false },
  G: { code: 'G', description: 'Non-scheduled Passenger (Normal Service)', passenger: true, cargo: false, surface: false },
  H: { code: 'H', description: 'Charter (Cargo and/or Mail)', passenger: false, cargo: true, surface: false },
  J: { code: 'J', description: 'Scheduled Passenger (Normal Service)', passenger: true, cargo: false, surface: false },
  K: { code: 'K', description: 'Training', passenger: null, cargo: null, surface: null },
  L: { code: 'L', description: 'Charter (Passenger and Cargo and/or Mail)', passenger: true, cargo: true, surface: false },
  M: { code: 'M', description: 'Scheduled Cargo/Mail (Mail Only)', passenger: false, cargo: true, surface: false },
  O: { code: 'O', description: 'Charter (Special handling - Migrants/Immigrants)', passenger: true, cargo: false, surface: false },
  P: { code: 'P', description: 'Non-revenue', passenger: null, cargo: null, surface: null },
  Q: { code: 'Q', description: 'Scheduled Passenger/Cargo in Cabin', passenger: true, cargo: true, surface: false },
  R: { code: 'R', description: 'Additional Flights - Passenger/Cargo', passenger: true, cargo: true, surface: false },
  S: { code: 'S', description: 'Scheduled Passenger (Shuttle Service)', passenger: true, cargo: false, surface: false },
  T: { code: 'T', description: 'Technical Test', passenger: null, cargo: null, surface: null },
  U: { code: 'U', description: 'Scheduled Passenger (Service Vehicle)', passenger: true, cargo: false, surface: true },
  V: { code: 'V', description: 'Scheduled Cargo/Mail (Surface Vehicle)', passenger: false, cargo: true, surface: true },
  W: { code: 'W', description: 'Military', passenger: null, cargo: null, surface: null },
  Y: { code: 'Y', description: 'IATA Special Internal (Y)', passenger: null, cargo: null, surface: null },
  Z: { code: 'Z', description: 'IATA Special Internal (Z)', passenger: null, cargo: null, surface: null },
}
