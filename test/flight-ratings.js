const assert = require( 'assert' )
const util = require( 'util' )

function inspect( value ) {
  return util.inspect( value, {
    depth: null,
    colors: true,
  })
}

suite( 'Ratings', function() {

  test( 'Flight ratings', function( done ) {
    client.flightRatings({
      carrier: 'LH',
      flightNumber: '2054',
    }, function( error, data ) {
      // console.log( inspect( error || data ) )
      done( error )
    })
  })

  test( 'Route ratings', function( done ) {
    client.routeRatings({
      departureAirport: 'TXL',
      arrivalAirport: 'MUC',
    }, function( error, data ) {
      // console.log( inspect( error || data ) )
      done( error )
    })
  })

})
