var assert = require( 'assert' )

suite( 'Airlines', function() {

  test( 'All airlines (active and inactive)', function( done ) {
    client.getAirlines({
      all: true,
    }, function( error, data ) {
      assert.ok( Array.isArray( data ) )
      done( error )
    })
  })

  test( 'Active airlines', function( done ) {
    client.getAirlines( function( error, data ) {
      assert.ok( Array.isArray( data ) )
      done( error )
    })
  })

  test( 'Active airlines for date', function( done ) {
    client.getAirlines({
      date: new Date( '1994-01-01' ),
    }, function( error, data ) {
      assert.ok( Array.isArray( data ) )
      done( error )
    })
  })

  test( 'Airline by FlightStats code' )

  test( 'Airline by IATA code', function( done ) {
    client.getAirlines({
      iata: 'LH'
    }, function( error, data ) {
      assert.ok( Array.isArray( data ) )
      done( error )
    })
  })

  test( 'Airline by IATA code on date', function( done ) {
    client.getAirlines({
      iata: 'LH',
      date: new Date('2016-09-08'),
    }, function( error, data ) {
      assert.ok( Array.isArray( data ) )
      done( error )
    })
  })

  test( 'Airline by ICAO code', function( done ) {
    client.getAirlines({
      icao: 'EZY',
    }, function( error, data ) {
      assert.ok( Array.isArray( data ) )
      done( error )
    })
  })

  test( 'Airline by ICAO code on date', function( done ) {
    client.getAirlines({
      icao: 'EZY',
      date: new Date('2016-09-08'),
    }, function( error, data ) {
      assert.ok( Array.isArray( data ) )
      done( error )
    })
  })

})
