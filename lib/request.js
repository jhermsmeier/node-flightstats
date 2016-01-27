var URL = require( 'url' )
var request = require( 'request' )
var debug = require( 'debug' )( 'flightstats' )

module.exports = function( options, callback ) {
  
  options.method = ( options.method || 'GET' ).toUpperCase()
  
  debug( 'request:method', options.method || 'GET' )
  debug( 'request:url', options.url )
  debug( 'request:query', options.qs )
  debug( 'request', options.headers )
  
  var req = request({
    method: options.method || 'GET',
    headers: Object.assign( {}, options.headers || {}, this.headers ),
    url: options.url,
    qs: options.qs,
  }, function( error, response, body ) {
    
    if( error && !response ) {
      error = error || new Error( 'Unknown Error' )
      debug( 'response:error', error )
      return callback( error )
    }
    
    if( error || ( response && response.statusCode !== 200 ) ) {
      
      // NOTE: Only god knows why they return JSON
      // to browsers, but not API clients – parsing strings FTW!
      var data = null
      try {
        data = response.body.split( /\r?\n/g )
          .reduce( function( err, line ) {
            var parts = line.split( ': ' )
            err[ parts.shift() ] = parts.join()
            return err
          }, {})
      } catch( e ) {}
      
      if( data ) {
        error = error || new Error( data.message )
        error.id = data.id
        error.code = data.code
        error.message = data.message
      }
      
      error = error || new Error( response.statusMessage )
      error.statusCode = response.statusCode
      error.statusMessage = response.statusMessage
      error.url = URL.format( req.url )
      error.headers = response.headers
      
      error.message += '\n' + error.url
      
      debug( 'response:error', error )
      
      return callback( error )
      
    }
    
    debug( 'response', response.statusCode, response.statusMessage )
    debug( 'response', response.headers )
    
    var data = null
    
    try {
      data = JSON.parse( body )
    } catch( error ) {
      debug( 'response:error:body', error )
      error.statusCode = 500
      return callback( error )
    }
    
    callback( null, data )
    
  })
  
  req.on( 'error', function( error ) {
    debug( 'request:error', error )
    error.statusCode = 500
    callback( error )
  })
  
}
