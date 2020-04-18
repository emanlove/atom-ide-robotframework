const cp = require('child_process')
const {AutoLanguageClient} = require('atom-languageclient')

class RobotFrameworkLangaugeClient extends AutoLanguageClient {
    getGrammarScopes () { return [ 'source.robot' ] }
    getLanguageName () { return 'RobotFramework' }
    getServerName () { return 'ToBeNamed' }

    startServerProcess () {
	const options = {};
	options.env = Object.create(process.env);
	const lsProcess = cp.spawn ('C:\Sandbox\lsp\cl-py36-env\Scripts\python.exe', ['-m', 'robotframework_ls'], options);

	lsProcess.on('error', (err) => {
	    atom.notifications.addError(
		'Error starting Robot Framework language server!',
		{
		    dismissable: true,
		    detail: err.toString()
		}
	    );
	});
	//lsProcess.on('exit', /* ..do something.. */);
	return lsProcess
    }
}

module.exports = new RobotFrameworkLangaugeClient()
