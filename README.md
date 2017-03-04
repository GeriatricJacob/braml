# BRAML
BRAML (Bracket Markup Language) is an alternative to html.

Tags in BRAML are started with a '%'. e.g. '%div'

Which is then followed by parentheses which holds the properties for the tag. e.g. '%div(id='myDiv')'

Which is then followed by Braces that contains what your tag will contain i.e another tag or plain text. e.g. '%div(id='myDiv'){%h1(){\`hello\`}$}$'

The end of the file or  just before anyset of braces that contain something must end in a '$'.

THE FILE MUST END WITH '$' without quotes.

# Usage
To compile a file to HTML simply run 'braml input.braml ouput.html'

or directly

`var braml = require('braml');
braml('%h1(){}$'); //<h1></h1>
`