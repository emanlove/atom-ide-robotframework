atom-ide-robotframework is an Atom LSP package providing language support.

Architecture consideration
--------------------------
async vs not

debug timing

debug like lang client, i.e. https://github.com/atom/atom-languageclient#debugging or `atom.config.set('core.debugLSP', true)`

	should LanguageName be `RobotFramework` or `Robot Framework` or some other varient? Note ide-bash does have a space in it's LanguageName

Do we want to be able to get or detect configured python exectuable from other packages?

On configuration of python executable can we do a check then and indicate to user whether successful or not?

useful models
-------------
atom-python-run
 - requires child_process uses spawn
 - uses terminal from windows, macos, linux
 - has functions around configuration and config object, logging, arguments and more ..	
Ref: https://github.com/foreshadow/atom-python-run

atom-script
 - used BufferedProcess from Atom
 - has runner and functions around runtime instances, context, error handling, and more ..
Ref: https://github.com/rgbkrk/atom-script

ide-csharp
 - model held up by atom-languageclient
 - extremely small and not very complex
 - use spawnChildNode
Ref: https://github.com/atom/ide-csharp

ide-python
 - python lsp
 - requires child_process uses spawn
 - uses shell from electron for only downloading python if not installed
 - has functions to detect virtualenv and pipenv
 - overrides getSuggestions
 - has functionality around timing out(?) on shutdown of server
Ref: https://github.com/lgeiger/ide-python


future model
------------
ide-powershell
 - written in typescript instead of javascript
Ref: https://github.com/daviwil/ide-powershell


not as useful
-------------
atom-nosetests    - reason coffee script
atom-python-debugger    - reason coffee script
atom-build-python     - condensed

full list: https://github.com/atom/atom-languageclient/wiki/List-of-Atom-packages-using-Atom-LanguageClient


Other Considerations
--------------------
Provide in depth intructions for setup and testing of setup. Reference useful tutorials for each editor

add ability to install via pip(?)


Instructions for setting up python-lsp within Atom
--------------------------------------------------
Install Atom

[Instructions from lgeiger  / ide-python ]
Add atom-ide-ui
setup virtualenv / activate virtualenv
pip install python-language-server[all]
Add ide-python
set Python Executable - C:\Sandbox\lsp\cl-py36-env\Scripts\python.exe
