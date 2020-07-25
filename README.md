# node-gs
Run gscript as a single process similar to what is NodeJS for Javascript. Based on the gscript implementation provided by the gs-lang project: https://github.com/geertvos/gs-lang
The goal is to provide a full framework to build serverside gscript web apps.
# modules
The project comes with extra modules that implement server side functionality that allows you to build web applications in gscript.

### webframework
A small module that creates a small webframework that wraps around the http module. It makes it easy to register functions for a path and a HTTP method.
```
webframework.registerHandler( http.METHOD_GET, "/version", (req,res) -> { res.write("1.0"); } );
webframework.server.start();
```


### http module
This implementation also adds two modules to the gscript environment that allow it to run as a HTTP server with JSON support. 

```
server = http.createServer( (req, res) -> {
        res.setHeader( http.HEADER_CONTENT_TYPE, http.MIME_TEXT_HTML );
        res.setStatusCode( http.STATUS_OK );
        res.write( "Hello world!" );
   
}, 8080 );

server.start();

```

### json module
The JSON module provides a full JSON bridge that allows the converstion of gscript objects to json and vice versa. 

```
jsonObject = json.bridge.parse( "{ \"name\": \"Jason\"}" );
System.print( jsonObject.name );
jsonText = json.bridge.render( jsonObject );
```
