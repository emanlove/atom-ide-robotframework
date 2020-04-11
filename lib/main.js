const {AutoLanguageClient} = require('atom-languageclient')

class RobotFrameworkLangaugeClient extends AutoLanguageClient {
    getGrammerScopes () { return [ 'source.robot' ] }
    getLangaugeName () { return 'RobotFramework' }
    getServerName () { return 'ToBeNamed' }

    startServerProcess () {
	// do something ..
    }
}

module.exports = new RobotFrameworkLangaugeClient()
