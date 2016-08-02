var FlightStats = require( '..' )

global.assert = require( 'assert' )
global.client = null
global.scope = null

suite( 'FlightStats', function() {

  suiteSetup( 'init client', function() {

    client = new FlightStats({
      appId: process.env['FLIGHTSTATS_APP_ID'] || 'xxxxxxxxxx',
      apiKey: process.env['FLIGHTSTATS_API_KEY'] || 'xxxxxxxxxxxxxxxxxxxxxxxxx',
    })

    assert.ok( client )
    assert.ok( client instanceof FlightStats )

  })

  suiteSetup( 'init http', function() {
    var nock = require( 'nock' )
    scope = nock( client.options.baseUrl )
  })

  require( './airlines' )

})
