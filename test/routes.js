const assert = require( 'assert' )
const util = require( 'util' )

function inspect( value ) {
  return util.inspect( value, {
    depth: null,
    colors: true,
  })
}

suite( 'Flight Routes', function() {

  test.skip( 'works', function( done ) {

    client.routes({
      date: new Date( '2016-09-01T15:00:00' ),
      direction: 'dep',
      departureAirport: 'TXL',
      arrivalAirport: 'MUC',
      maxFlights: 5,
    }, function( error, data ) {
      // console.log( inspect( error || data ) )
      done( error )
    })

  })

})
