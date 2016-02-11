var airlineCategory = require( '../airline-category' )
var flightStatus = require( '../flight-status' )
var serviceType = require( '../service-type' )
var codeshareType = require( '../codeshare-type' )

/**
 * Generates a proper Date from a
 * date string and UTC TZ offset
 * @param  {String} dateString
 * @param  {Number} utcOffset
 * @return {Date}
 */
function getUTCTime( dateString, utcOffset ) {

  var sign = utcOffset < 0 ? '-' : '+'

  utcOffset = Math.abs( utcOffset )

  var offset = ( '00' + utcOffset.toFixed() ).slice( -2 ) + ':' +
    ( '00' + ((utcOffset - (utcOffset|0)) * 60).toFixed() ).slice( -2 )

  return new Date( dateString + sign + offset ).toISOString()

}

function formatCodeShare( codeShare ) {

  var data = {}

  data.flightNumber = codeShare.flightNumber
  data.airline = codeShare.carrier
  data.relationship = codeShare.relationship &&
    codeshareType[ codeShare.relationship ] ||
    { code: codeShare.relationship }

  return data

}

function formatFlight( flight ) {

  var data = {
    flightId: flight.flightId,
    flightNumber: flight.flightNumber,
    flightType: serviceType[ flight.serviceType ] || { code: flight.serviceType },
    serviceClasses: [],
    restrictions: [],
    status: {
      code: 'S',
      description: flightStatus[ 'S' ],
    },
    arrival: {
      date: getUTCTime( flight.arrivalTime, flight.arrivalAirport.utcOffsetHours ),
      tzRegion: flight.arrivalAirport.timeZoneRegionName,
      tzOffset: flight.arrivalAirport.utcOffsetHours,
      gateDelay: 0,
      gateTime: {},
      runwayDelay: 0,
      runwayTime: {},
      gate: flight.arrivalGate,
      terminal: flight.arrivalTerminal,
      baggageClaim: flight.arrivalBaggage,
      airport: flight.arrivalAirport,
    },
    departure: {
      date: getUTCTime( flight.departureTime, flight.departureAirport.utcOffsetHours ),
      tzRegion: flight.departureAirport.timeZoneRegionName,
      tzOffset: flight.departureAirport.utcOffsetHours,
      gateDelay: 0,
      gateTime: {},
      runwayDelay: 0,
      runwayTime: {},
      gate: flight.departureGate,
      terminal: flight.departureTerminal,
      airport: flight.departureAirport,
    },
    carrier: {
      airline: flight.carrier,
      primary: flight.primaryCarrier && flight.primaryCarrier,
      operating: flight.operatingCarrier && flight.operatingCarrier,
    },
    codeshares: ( flight.codeshares || [] ).map( formatCodeShare ),
    duration: {},
  }

  // TODO:
  data.serviceClasses = flight.serviceClasses
    // .map( function( serviceClass ) {
    //   return serviceType[ serviceClass ] || { code: serviceClass }
    // })

  // TODO:
  data.restrictions = flight.trafficRestrictions
    // .map( function( restrictionClass ) {
    //   return restrictionType[ restrictionClass ] || { code: restrictionClass }
    // })

  if( flight.flightEquipment ) {

    data.equipment = {}

    if( flight.flightEquipment ) {
      data.equipment.scheduled = {
        iata: flight.flightEquipment.iata,
        name: flight.flightEquipment.name,
        turboProp: flight.flightEquipment.turboProp,
        jet: flight.flightEquipment.jet,
        widebody: flight.flightEquipment.widebody,
        regional: flight.flightEquipment.regional,
      }
    }

  }

  return data

}

function formatSchedule( data ) {

  var schedule = {}

  schedule.flightNumber = data.request.flightNumber.interpreted
  schedule.airline = data.request.carrier.airline
  schedule.flights = ( data.scheduledFlights || [] ).map( formatFlight )

  return schedule

}

module.exports = formatSchedule
