var FlightStats = require( '..' )
var debug = require( 'debug' )( 'flightstats:test' )
var assert = require( 'assert' )
var nock = require( 'nock' )
var fs = require( 'fs' )
var path = require( 'path' )
var net = require( 'net' )
var url = require( 'url' )

const FIXTURE_PATH = path.join( __dirname, 'fixtures' )

const FLIGHTSTATS_APP_ID = process.env['HTTP_RECORD'] ?
  process.env['FLIGHTSTATS_APP_ID'] : 'xxxxxxxxxx'

const FLIGHTSTATS_API_KEY = process.env['HTTP_RECORD'] ?
  process.env['FLIGHTSTATS_API_KEY'] : 'xxxxxxxxxxxxxxxxxxxxxxxxx'

debug( 'FLIGHTSTATS_APP_ID', FLIGHTSTATS_APP_ID )
debug( 'FLIGHTSTATS_API_KEY', FLIGHTSTATS_API_KEY )

function fixtureFilename( test ) {

  var filename = test.fullTitle().toLowerCase()
    .replace( /[^a-z0-9\(\)\[\]]/gi, ' ' )
    .replace( /^\s+|\s+$/g, '' )
    .replace( /\s+/g, '-' )

  filename += '.json'

  return path.join( FIXTURE_PATH, filename )

}

function saveFixture( test, data, callback ) {
  var filename = fixtureFilename( test )
  var content = JSON.stringify( data, null, 2 )
  fs.writeFile( filename, content, callback )
}

function isLocalhost( value ) {
  var host = url.parse( value ).hostname
  if( net.isIP( host ) ) {
    return host === '127.0.0.1' ||
      host === '[::1]' ||
      host === '::1'
  } else {
    return /^localhost$/i.test( host )
  }
}

suiteSetup( 'HTTP Recording', function() {

  if( !process.env['HTTP_RECORD'] )
    return

  debug( 'nock:rec' )

  nock.recorder.rec({
    dont_print: true,
    output_objects: true,
    enable_reqheaders_recording: true,
  })

})

teardown( 'HTTP Recording', function( done ) {

  if( !process.env['HTTP_RECORD'] )
    return done()

  debug( 'nock:play' )

  var data = nock.recorder.play()
    .filter( function( record ) {
      return !isLocalhost( record.scope )
    })
    .map( function( record ) {
      record.path = record.path
        .replace( FLIGHTSTATS_APP_ID, 'xxxxxxxxxx' )
        .replace( FLIGHTSTATS_API_KEY, 'xxxxxxxxxxxxxxxxxxxxxxxxx' )
      return record
    })

  nock.recorder.clear()

  saveFixture( this.currentTest, data, done )

})

suiteSetup( 'HTTP Replay', function() {

  if( process.env['HTTP_RECORD'] )
    return

  debug( 'network:disable' )
  nock.disableNetConnect()
  nock.enableNetConnect( '127.0.0.1' )

})

setup( 'HTTP Replay', function() {

  if( process.env['HTTP_RECORD'] )
    return

  var filename = fixtureFilename( this.currentTest )

  debug( 'fixture:load', filename )
  nock.load( filename )

})

teardown( 'HTTP Replay', function( done ) {

  if( process.env['HTTP_RECORD'] )
    return done()

  var pending = nock.pendingMocks().slice()
  var error = null

  nock.cleanAll()

  if( pending.length ) {
    error = new Error( 'Pending HTTP requests:\n' + pending.join( '\n' ) )
  }

  done( error )

})

suiteSetup( 'FlightStats.Client', function() {

  global.client = new FlightStats({
    appId: FLIGHTSTATS_APP_ID,
    apiKey: FLIGHTSTATS_API_KEY,
  })

  assert.ok( client )
  assert.ok( client instanceof FlightStats )

  debug( 'client', client )

})
