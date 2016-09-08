const assert = require( 'assert' )
const util = require( 'util' )

function inspect( value ) {
  return util.inspect( value, {
    depth: null,
    colors: true,
  })
}

suite( 'Near Flights', function() {

  test( 'Flights within radius of coordinate', function( done ) {

    client.flightsNear({
      lat: 52.345,
      lng: 13.123,
      radius: 25, // miles
    }, function( error, data ) {
      // console.log( inspect( error || data ) )
      done( error )
    })

  })

  test( 'Flight within a bounding rectangle', function( done ) {

    client.flightsWithin({
      // top(lat), left(lng), bottom(lat), right(lng)
      coords: [ 52, 125, 57, 120 ],
    }, function( error, data ) {
      // console.log( inspect( error || data ) )
      done( error )
    })

  })

})
