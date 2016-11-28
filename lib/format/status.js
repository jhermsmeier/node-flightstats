var airlineCategory = require( '../airline-category' )
var flightStatus = require( '../flight-status' )
var serviceType = require( '../service-type' )
var statusUpdate = require( '../status-update' )
var codeshareType = require( '../codeshare-type' )

function formatAirline( airline ) {
  airline.category = airlineCategory[ airline.category ] ||
    { code: airline.category }
  return airline
}

function formatCodeShare( codeShare ) {

  var data = {}

  data.flightNumber = codeShare.flightNumber
  data.airline = formatAirline( codeShare.carrier )
  data.relationship = codeShare.relationship &&
    codeshareType[ codeShare.relationship ] ||
    { code: codeShare.relationship }

  return data

}

function formatStatusUpdate( data ) {

  var event = {
    date: new Date( data.updatedAt.dateUtc ),
    source: data.source,
    changes: [],
  }

  if( data.updatedTextFields ) {

    data.updatedTextFields.forEach( function( data ) {

      var updateType = statusUpdate[ data.field ]

      event.changes.push({
        code: data.field,
        field: updateType && updateType.field,
        description: updateType && updateType.description,
        originalValue: data.originalText || data.originalDateUtc,
        value: data.newText || data.newDateUtc,
      })

    })

  }

  return event

}

function formatIrregularOperation( data ) {
  return {
    code: data.type,
    date: new Date( data.dateUtc ),
    newArrival: data.newArrivalAirportFsCode,
    relatedFlight: data.relatedFlightId,
    message: data.message
  }
}

function formatFlight( flight ) {

    var data = {
      flightId: flight.flightId,
      flightNumber: flight.flightNumber,
      flightType: null,
      serviceClasses: [],
      restrictions: [],
      status: {
        code: flight.status,
        description: flightStatus[ flight.status ],
      },
      statusUpdates: [],
      arrival: {
        date: flight.arrivalDate.dateUtc,
        dateLocal: flight.arrivalDate.dateLocal,
        tzRegion: flight.arrivalAirport.timeZoneRegionName,
        tzOffset: flight.arrivalAirport.utcOffsetHours,
        gateDelay: void 0,
        gateTime: {},
        runwayDelay: void 0,
        runwayTime: {},
        gate: void 0,
        terminal: void 0,
        baggageClaim: void 0,
        airport: flight.arrivalAirport,
      },
      departure: {
        date: flight.departureDate.dateUtc,
        dateLocal: flight.departureDate.dateLocal,
        tzRegion: flight.departureAirport.timeZoneRegionName,
        tzOffset: flight.departureAirport.utcOffsetHours,
        gateDelay: void 0,
        gateTime: {},
        runwayDelay: void 0,
        runwayTime: {},
        gate: void 0,
        terminal: void 0,
        airport: flight.departureAirport,
      },
      carrier: {
        airline: formatAirline( flight.carrier ),
        primary: flight.primaryCarrier && formatAirline( flight.primaryCarrier ),
        operating: flight.operatingCarrier && formatAirline( flight.operatingCarrier ),
      },
      codeshares: ( flight.codeshares || [] ).map( formatCodeShare ),
      duration: {},
      irregularOperations: []
    }

    if( flight.airportResources ) {
      data.arrival.gate = flight.airportResources.arrivalGate
      data.arrival.terminal = flight.airportResources.arrivalTerminal
      data.arrival.baggageClaim = flight.airportResources.arrivalBaggage
      data.departure.gate = flight.airportResources.departureGate
      data.departure.terminal = flight.airportResources.departureTerminal
    }

    data.statusUpdates = ( flight.flightStatusUpdates || [] )
      .map( formatStatusUpdate )

    if( flight.schedule ) {

      data.flightType = serviceType[ flight.schedule.flightType ] ||
        { code: flight.schedule.flightType }

      // TODO:
      data.serviceClasses = flight.schedule.serviceClasses.split( '' )
        // .map( function( serviceClass ) {
        //   return serviceType[ serviceClass ] || { code: serviceClass }
        // })

      // TODO:
      data.restrictions = flight.schedule.restrictions.split( '' )
        // .map( function( restrictionClass ) {
        //   return restrictionType[ restrictionClass ] || { code: restrictionClass }
        // })

    }

    // Times: Gate
    if( flight.operationalTimes ) {

      if( flight.operationalTimes.flightPlanPlannedArrival )
        data.arrival.gateTime.planned = flight.operationalTimes.flightPlanPlannedArrival.dateUtc

      if( flight.operationalTimes.publishedArrival )
        data.arrival.gateTime.published = flight.operationalTimes.publishedArrival.dateUtc

      if( flight.operationalTimes.scheduledGateArrival )
        data.arrival.gateTime.scheduled = flight.operationalTimes.scheduledGateArrival.dateUtc

      if( flight.operationalTimes.estimatedGateArrival )
        data.arrival.gateTime.estimated = flight.operationalTimes.estimatedGateArrival.dateUtc

      if( flight.operationalTimes.actualGateArrival )
        data.arrival.gateTime.actual = flight.operationalTimes.actualGateArrival.dateUtc

      if( flight.operationalTimes.flightPlanPlannedDeparture )
        data.departure.gateTime.planned = flight.operationalTimes.flightPlanPlannedDeparture.dateUtc

      if( flight.operationalTimes.publishedDeparture )
        data.departure.gateTime.published = flight.operationalTimes.publishedDeparture.dateUtc

      if( flight.operationalTimes.scheduledGateDeparture )
        data.departure.gateTime.scheduled = flight.operationalTimes.scheduledGateDeparture.dateUtc

      if( flight.operationalTimes.estimatedGateDeparture )
        data.departure.gateTime.estimated = flight.operationalTimes.estimatedGateDeparture.dateUtc

      if( flight.operationalTimes.actualGateDeparture )
        data.departure.gateTime.actual = flight.operationalTimes.actualGateDeparture.dateUtc

    }

    // Times: Runway
    if( flight.operationalTimes ) {

      if( flight.operationalTimes.estimatedRunwayArrival )
        data.arrival.runwayTime.estimated = flight.operationalTimes.estimatedRunwayArrival.dateUtc

      if( flight.operationalTimes.actualRunwayArrival )
        data.arrival.runwayTime.actual = flight.operationalTimes.actualRunwayArrival.dateUtc

      if( flight.operationalTimes.estimatedRunwayDeparture )
        data.departure.runwayTime.estimated = flight.operationalTimes.estimatedRunwayDeparture.dateUtc

      if( flight.operationalTimes.actualRunwayDeparture )
        data.departure.runwayTime.actual = flight.operationalTimes.actualRunwayDeparture.dateUtc

    }

    if( flight.flightDurations ) {
      if( flight.flightDurations.scheduledBlockMinutes ) {
        data.duration.scheduled = {
          block: flight.flightDurations.scheduledBlockMinutes,
          air: flight.flightDurations.scheduledAirMinutes,
          taxiOut: flight.flightDurations.scheduledTaxiOutMinutes,
          taxiIn: flight.flightDurations.scheduledTaxiInMinutes,
        }
      }
      if( flight.flightDurations.blockMinutes ) {
        data.duration.actual = {
          block: flight.flightDurations.blockMinutes,
          air: flight.flightDurations.airMinutes,
          taxiOut: flight.flightDurations.taxiOutMinutes,
          taxiIn: flight.flightDurations.taxiInMinutes,
        }
      }
    }

    data.arrival.gateDelay = flight.delays &&
      flight.delays.arrivalGateDelayMinutes || 0
    data.arrival.runwayDelay = flight.delays &&
      flight.delays.arrivalRunwayDelayMinutes || 0

    data.departure.gateDelay = flight.delays &&
      flight.delays.departureGateDelayMinutes || 0
    data.departure.runwayDelay = flight.delays &&
      flight.delays.departureRunwayDelayMinutes || 0

    if( flight.flightEquipment ) {

      data.equipment = {
        tailNumber: flight.flightEquipment.tailNumber,
      }

      if( flight.flightEquipment.scheduledEquipment ) {
        data.equipment.scheduled = {
          iata: flight.flightEquipment.scheduledEquipment.iata,
          name: flight.flightEquipment.scheduledEquipment.name,
          turboProp: flight.flightEquipment.scheduledEquipment.turboProp,
          jet: flight.flightEquipment.scheduledEquipment.jet,
          widebody: flight.flightEquipment.scheduledEquipment.widebody,
          regional: flight.flightEquipment.scheduledEquipment.regional,
        }
      }

      if( flight.flightEquipment.actualEquipment ) {
        data.equipment.actual = {
          iata: flight.flightEquipment.actualEquipment.iata,
          name: flight.flightEquipment.actualEquipment.name,
          turboProp: flight.flightEquipment.actualEquipment.turboProp,
          jet: flight.flightEquipment.actualEquipment.jet,
          widebody: flight.flightEquipment.actualEquipment.widebody,
          regional: flight.flightEquipment.actualEquipment.regional,
        }
      }

    }

    if( flight.irregularOperations ) {
      data.irregularOperations = flight.irregularOperations
        .map( formatIrregularOperation )
    }

    // TODO:
    if( flight.schedule && flight.schedule.uplines ) {
      data.uplines = flight.schedule.uplines
    }

    // TODO:
    if( flight.schedule && flight.schedule.downlines ) {
      data.downlines = flight.schedule.downlines
    }

    return data

  }

function formatStatus( data ) {

  var status = {}

  status.flightNumber = data.request.flight.interpreted
  status.airline = formatAirline( data.request.airline.airline )
  status.flights = ( data.flightStatuses || [] ).map( formatFlight )

  return status

}

module.exports = formatStatus
