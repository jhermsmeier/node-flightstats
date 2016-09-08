const assert = require( 'assert' )
const util = require( 'util' )

function inspect( value ) {
  return util.inspect( value, {
    depth: null,
    colors: true,
  })
}

suite( 'Flight Connections', function() {

  test.skip( 'First flight in', function( done ) {

    client.connections({
      type: 'firstflightin',
      departureAirport: 'TXL',
      arrivalAirport: 'MUC',
      date: new Date( '2016-08-25T15:00:00' ),
      numHours: 6,
      maxResults: 25,
      maxConnections: 2,
      minimumConnectTime: null,
      payloadType: 'passenger', // passenger|cargo|all
      includeAirlines: [ 'LH' ],
      excludeAirlines: [],
      includeAirports: [],
      excludeAirports: [],
      includeSurface: false,
      includeCodeshares: true,
      includeMultipleCarriers: true,
    }, function( error, data ) {
      // console.log( inspect( error || data ) )
      done( error )
    })

  })

})
