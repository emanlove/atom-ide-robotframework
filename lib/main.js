const cp = require('child_process')
const {AutoLanguageClient} = require('atom-languageclient')

class RobotFrameworkLangaugeClient extends AutoLanguageClient {
    getGrammarScopes () { return [ 'source.robot' ] }
    getLanguageName () { return 'RobotFramework' }
    getServerName () { return 'ToBeNamed' }

    startServerProcess () {
	// do something ..
	const lsProcess = cp.spawn ('python', ['-m', 'robotframework_ls'], {
	});

	return lsProcess
    }
}

module.exports = new RobotFrameworkLangaugeClient()
