var dotenv = require( 'dotenv' ).config()
var FlightStats = require( '..' )
var assert = require( 'assert' )

suite( 'FlightStats', function() {

  var api = null

  this.timeout( 5000 )

  suiteSetup( 'FlightStats credentials', function() {

    assert.ok( process.env[ 'FLIGHTSTATS_APP_ID' ], 'Missing App ID' )
    assert.ok( process.env[ 'FLIGHTSTATS_API_KEY' ], 'Missing API key' )

    api = new FlightStats({
      appId: process.env[ 'FLIGHTSTATS_APP_ID' ],
      apiKey: process.env[ 'FLIGHTSTATS_API_KEY' ]
    })

  })

  suite( '#getAirlines()', function() {

    test( 'All airlines (active and inactive)', function( next ) {
      api.getAirlines({
        all: true,
      }, function( error, data ) {
        assert.ifError( error )
        assert.ok( Array.isArray( data ) )
        next()
      })
    })

    test( 'Active airlines', function( next ) {
      api.getAirlines( function( error, data ) {
        assert.ifError( error )
        assert.ok( Array.isArray( data ) )
        next()
      })
    })

    test( 'Active airlines for date', function( next ) {
      api.getAirlines({
        date: new Date( '1994-01-01' ),
      }, function( error, data ) {
        assert.ifError( error )
        assert.ok( Array.isArray( data ) )
        next()
      })
    })

    test( 'Airline by FlightStats code' )

    test( 'Airline by IATA code', function( next ) {
      api.getAirlines({
        iata: 'LH'
      }, function( error, data ) {
        assert.ifError( error )
        assert.ok( Array.isArray( data ) )
        next()
      })
    })

    test( 'Airline by IATA code on date', function( next ) {
      api.getAirlines({
        iata: 'LH',
        date: new Date(),
      }, function( error, data ) {
        assert.ifError( error )
        assert.ok( Array.isArray( data ) )
        next()
      })
    })

    test( 'Airline by ICAO code', function( next ) {
      api.getAirlines({
        icao: 'EZY',
      }, function( error, data ) {
        assert.ifError( error )
        assert.ok( Array.isArray( data ) )
        next()
      })
    })

    test( 'Airline by ICAO code on date', function( next ) {
      api.getAirlines({
        icao: 'EZY',
        date: new Date(),
      }, function( error, data ) {
        assert.ifError( error )
        assert.ok( Array.isArray( data ) )
        next()
      })
    })

  })

})
