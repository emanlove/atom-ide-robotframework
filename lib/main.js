const cp = require('child_process')
const {AutoLanguageClient} = require('atom-languageclient')

class RobotFrameworkLangaugeClient extends AutoLanguageClient {
    getGrammerScopes () { return [ 'source.robot' ] }
    getLangaugeName () { return 'RobotFramework' }
    getServerName () { return 'ToBeNamed' }

    startServerProcess () {
	// do something ..
	const lsProcess = cp.spawn ('python', ['-m', 'robotframework_ls'], {
	});

	return lsProcess
    }
}

module.exports = new RobotFrameworkLangaugeClient()
