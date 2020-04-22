atom-ide-robotframework is an Atom LSP package providing language support.

## Architecture Consideration ##
**What is the difference between atom-ide-ui and atom-languageclient? What does it mean that atom-ide-ui is now depreciated?** There are references [ide-elm-issue](https://github.com/atom/atom-languageclient/issues/273) to the fact that atom-ide-ui is depreciated or abandoned.

**async vs not?**  Several language clients are using async in their calls. Due to consideration of timing and the unknown response time from server should we consider this too?

**debug timing**  Jedi,a "static analysis tool for Python" , has an interesting code [jedi-debug](https://github.com/davidhalter/jedi/blob/master/jedi/debug.py#L123) for debugging around timing. There might be similar code with Atom as it reports the time it takes packages to load.
   
**debug like lang client, i.e. https://github.com/atom/atom-languageclient#debugging or `atom.config.set('core.debugLSP', true)`** The atom-languageclient README references [how to debug](https://github.com/atom/atom-languageclient#debugging). How should we use this and pigback off of it?

**should LanguageName be `RobotFramework` or `Robot Framework` or some other varient?** Note ide-bash does have a space in it's LanguageName

**Do we want to be able to get or detect configured python exectuable from other packages?** TBD

**On configuration of python executable can we do a check then and indicate to user whether successful or not?** TBD

**Bind to running server** The existing model and implementation has the RF client starting up the ls. Is is possible to have it instead talk to an already running server? In part I want to do this for debugging purposes. Run the server independentally and where I can debug separate from the client.

## On consumedServices and providedServices ##
Within the package.json files of all the other ide-clients there is a list of consumedServices and providedServices. My initial assumption was that these were language server specifc services but I now see they are shared functions within other Atom packages. This functionality is outlined in the "[Interacting With Other Packages Via Services](https://flight-manual.atom.io/behind-atom/sections/interacting-with-other-packages-via-services/)" section of the Atom documentation with the introduction announcement can be found [here](https://blog.atom.io/2015/03/25/new-services-API.html). With this correct understanding of the services I will list all those provide in the atom-languageclient package, which we inherit.

#### Provided Services ####
- provideAutocomplete - Autocomplete+ via LS completion
- provideDefinitions - Definitions via LS documentHighlight and gotoDefinition
- provideOutlines - Outline View via LS documentSymbol
- provideFindReferences - Find References via LS findReferences
- provideCodeFormat - Code Format via LS formatDocument & formatDocumentRange
- provideRangeCodeFormat
- provideFileCodeFormat
- provideOnSaveCodeFormat
- provideOnTypeCodeFormat
- provideCodeHighlight
- provideCodeActions
- provideRefactor

### Consumed Services ####
- consumeLinterV2 - Linter push v2 API via LS publishDiagnostics
- consumeDatatip - Datatip via LS textDocument/hover
- consumeConsole - Console via LS logging

Although these are within atom-languageclient that package does not define them as providedServies within its package.json file but all the end clients seem to. It is not immediately clear to which version these get set to or where that information comes from.


## Useful Models ##
#### atom-python-run ####
- requires child_process uses spawn
- uses terminal from windows, macos, linux
- has functions around configuration and config object, logging, arguments and more ..	

Ref: [repo](https://github.com/foreshadow/atom-python-run)

#### atom-script ####
- used BufferedProcess from Atom
- has runner and functions around runtime instances, context, error handling, and more ..

Ref: [repo](https://github.com/rgbkrk/atom-script)

#### ide-csharp ####
- model held up by atom-languageclient
- extremely small and not very complex
- use spawnChildNode

Ref: [repo](https://github.com/atom/ide-csharp)

#### ide-python ####
- python lsp
- requires child_process uses spawn
- uses shell from electron for only downloading python if not installed
- has functions to detect virtualenv and pipenv
- overrides getSuggestions
- has functionality around timing out(?) on shutdown of server

Ref: [repo](https://github.com/lgeiger/ide-python)

child_process:  [doc](https://nodejs.org/api/child_process.html)

## Future Model ##
ide-powershell
 - written in typescript instead of javascript

Ref: [repo](https://github.com/daviwil/ide-powershell)


## Not as useful ##
atom-nosetests    - reason coffee script *

atom-python-debugger    - reason coffee script *

atom-build-python     - condensed

Others: [List of Atom packages using Atom LanguageClient](https://github.com/atom/atom-languageclient/wiki/List-of-Atom-packages-using-Atom-LanguageClient)

* This is my, Ed Manlove, bias for not wanting to learn another language although this doesn't hold water because I have suggested typescript for future versions of this ls client.

## Other Considerations ##
Provide in depth intructions for setup and testing of setup. Reference useful tutorials for each editor

add ability to install via pip(?)

how do we balance the "ide that does everything for you" with the "need of the end user to understand and learn how things work"?

how does the colorification and customization work with other packages?

## spawnChildNode (from Atom) verses childProcess with spawn
Correction: spawnChildNode comes from atom-languageclient not Atom. It in fact just calls spawn from childProcess.

childProcess.spawn takes arguments as the python executable, python options and then spawned process options. At this time it is not clear what those spawned process options are and what affect they have or even why they may be needed.

Lookslike we could try simply childProcess.spawn('C:\Path\to\python\python.exe',["-m", "pyls"])

## Instructions for setting up python-lsp within Atom ##

1. Install Atom

_Instructions from lgeiger  / ide-python_
2. Add atom-ide-ui
1. setup virtualenv / activate virtualenv
1. pip install python-language-server[all]
1. Add ide-python
1. set Python Executable - C:\Sandbox\lsp\cl-py36-env\Scripts\python.exe

1. \[within Atom] View > Developer > Toggle Developer Tools
1. Within the console window tab at the prompt, type `atom.config.set('core.debugLSP', true)`. This adds to ~/.atom/config.cson
1. Add verbose to log level. By default the console log default log level does not include verbose under which the python lsp messages are logged.

1. pip install -e D:\path\to\folder\
1. At the cmd propmt `python -m robotframework_ls`
