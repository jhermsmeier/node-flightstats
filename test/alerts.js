var assert = require( 'assert' )
var util = require( 'util' )

const DELIVER_TO_ADDRESS = 'smtp://flightstats-sample-alert@mailinator.com'

function inspect( value ) {
  return util.inspect( value, {
    depth: null,
    colors: true,
  })
}

suite( 'Alerts', function() {

  var ruleId = null

  test( 'list rules', function( done ) {
    client.alerts.list( function( error, data ) {
      // console.log( inspect( error || data ) )
      done( error )
    })
  })

  test( 'create rule', function( done ) {
    client.alerts.create({
      date: new Date( '2016-12-07' ),
      airlineCode: 'LH',
      flightNumber: '2054',
      departureAirport: 'MUC',
      arrivalAirport: 'TXL',
      deliverTo: DELIVER_TO_ADDRESS,
    }, function( error, data ) {
      if( data && data.rule ) {
        ruleId = data.rule.id
      }
      // console.log( inspect( error || data ) )
      done( error )
    })
  })

  test( 'get rule', function( done ) {
    client.alerts.get( ruleId, function( error, data ) {
      // console.log( inspect( error || data ) )
      done( error )
    })
  })

  test( 'simulate', function( done ) {
    client.alerts.simulate({
      airlineCode: 'LH',
      flightNumber: '2054',
      departureAirport: 'MUC',
      arrivalAirport: 'TXL',
      deliverTo: DELIVER_TO_ADDRESS,
    }, function( error, data ) {
      // console.log( inspect( error || data ) )
      done( error )
    })
  })

  test( 'delete rule', function( done ) {
    client.alerts.remove( ruleId, function( error, data ) {
      // console.log( inspect( error || data ) )
      done( error )
    })
  })

})
