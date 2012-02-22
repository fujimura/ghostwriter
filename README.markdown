note: under heavy development

# Ghostwriter

Template engine server by JavaScript, a ghostwriter for your favorite web app framework.

## Why

I think designers in your team don't want to remember #{template-engine-of-your-favorite-language}.

## How to run

    $ git clone git://github.com/fujimura/ghostwriter.git
    $ cd ghostwriter
    $ npm install -d
    $ coffee app.js.coffee

## Example

    $ cat templates/hello.html.ejs
    Hello, my name is <%= name %>
    $ curl -d 'name=Mad Skillz' -i localhost:3000/hello.html
    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: text/html; charset=utf-8
    Content-Length: 29
    Connection: keep-alive

    Hello, my name is Mad Skillz


## Licence

Ghostwriter is released under the MIT license:

* http://www.opensource.org/licenses/MIT
