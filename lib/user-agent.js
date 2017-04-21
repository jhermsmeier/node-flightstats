var pkg = require( '../package.json' )
var os = require( 'os' )

module.exports = pkg.name + '/' + pkg.version + ' ' +
  '(' + os.platform() + '/' + os.release() + '; ' + os.arch() + '; +' + pkg.homepage + ') ' +
  process.release.name + '/' + process.versions[process.release.name]
