module WebserverDemo;
import http;
import json;
import webframework;

/*
* Internal data store
*/
names = new [];

renderNames = (req, res) -> {
    for(i=0 ; i < names.length ; i++) {
    	res.write("<center><b>Hello: " + names[i] + "</b></center>");
    };
};

storeName = (req, res) -> {
	/**
	* Demonstrate how to parse the request body from Json into a gscript object structure.
	*/
	body = json.bridge.parse(req.getBodyAsString());
    names[names.length] = body.name;
	
	/**
	* Demonstrate how to return a gscript object structure as json.
	*/
    res.setHeader(http.HEADER_CONTENT_TYPE, http.MIME_APPLICATION_JSON);
    response = new {
    	this.msg = "OK";
    	this.code = http.STATUS_OK;
    };
    res.write(json.bridge.render(response));
    return;
}

webframework.registerHandler( http.METHOD_GET, "/names", renderNames );
webframework.registerHandler( http.METHOD_PUT, "/", storeName );
webframework.registerHandler( http.METHOD_GET, "/hello", (req,res) -> { res.write("Hello world"); } );
webframework.registerHandler( http.METHOD_GET, "/version", (req,res) -> { res.write("1.0"); } );
webframework.server.start();