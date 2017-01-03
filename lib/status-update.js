/**
 * The short name of the field that was updated
 * @name ServiceType
 * @memberOf FlightStats
 * @type {Object<String,Object>}
 */
module.exports = {
  // Text field changes:
  STS: {
    code: 'STS',
    field: 'status',
    description: 'Status of the flight'
  },
  DGT: {
    code: 'DGT',
    field: 'departure.gate',
    description: 'Departure gate'
  },
  DTM: {
    code: 'DTM',
    field: 'departure.terminal',
    description: 'Departure terminal'
  },
  AGT: {
    code: 'AGT',
    field: 'arrival.gate',
    description: 'Arrival gate'
  },
  ATM: {
    code: 'ATM',
    field: 'arrival.terminal',
    description: 'Arrival terminal'
  },
  BGG: {
    code: 'BGG',
    field: 'arrival.baggageClaim',
    description: 'Baggage claim information'
  },
  TAL: {
    code: 'TAL',
    field: 'equipment.tailNumber',
    description: 'Tail number of the flight'
  },
  // NOTE: Used to populate the scheduled equipment
  SQP: {
    code: 'SQP',
    field: 'equipment.scheduled.iata',
    description: 'Scheduled IATA aircraft type code'
  },
  // NOTE: Used to populate the actual equipment
  AQP: {
    code: 'AQP',
    field: 'equipment.actual.iata',
    description: 'Actual IATA aircraft type code'
  },
  // Date field changes:
  SGD: {
    code: 'SGD',
    field: 'departure.gateTime.scheduled',
    description: 'Scheduled gate departure'
  },
  EGD: {
    code: 'EGD',
    field: 'departure.gateTime.estimated',
    description: 'Estimated gate departure'
  },
  AGD: {
    code: 'AGD',
    field: 'departure.gateTime.actual',
    description: 'Actual gate departure'
  },
  SGA: {
    code: 'SGA',
    field: 'arrival.gateTime.scheduled',
    description: 'Scheduled gate arrival'
  },
  EGA: {
    code: 'EGA',
    field: 'arrival.gateTime.estimated',
    description: 'Estimated gate arrival'
  },
  AGA: {
    code: 'AGA',
    field: 'arrival.gateTime.actual',
    description: 'Actual gate arrival'
  },
  SRD: {
    code: 'SRD',
    field: 'departure.runwayTime.scheduled',
    description: 'Scheduled runway departure'
  },
  ERD: {
    code: 'ERD',
    field: 'departure.runwayTime.estimated',
    description: 'Estimated runway departure'
  },
  ARD: {
    code: 'ARD',
    field: 'departure.runwayTime.actual',
    description: 'Actual runway departure'
  },
  SRA: {
    code: 'SRA',
    field: 'arrival.runwayTime.scheduled',
    description: 'Scheduled runway arrival'
  },
  ERA: {
    code: 'ERA',
    field: 'arrival.runwayTime.estimated',
    description: 'Estimated runway arrival'
  },
  ARA: {
    code: 'ARA',
    field: 'arrival.runwayTime.actual',
    description: 'Actual runway arrival'
  },

}
