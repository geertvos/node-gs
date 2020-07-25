module WebserverDemo;
import http;
import json;
import webframework;

/*
* Internal data store
*/
names = new [];

System.print("Application starting");

renderNames = (req, res) -> {
    res.setHeader(http.HEADER_CONTENT_TYPE, http.MIME_TEXT_HTML);
    res.setStatusCode(http.STATUS_OK);
    for(i=0 ; i < names.length ; i++) {
    	res.write("<center><b>Hello: " + names[i] + "</b></center>");
    };
};
webframework.registerHandler( http.METHOD_GET, "/names", renderNames );

storeName = (req, res) -> {
	body = json.bridge.parse(req.getBodyAsString());
    names[names.length] = body.name;
    response = new {
    	this.msg = "OK";
    	this.code = http.STATUS_OK;
    };
    res.setHeader(http.HEADER_CONTENT_TYPE, http.MIME_APPLICATION_JSON);
    res.write(json.bridge.render(response));
    return;
}
webframework.registerHandler( http.METHOD_PUT, "/", storeName );

webframework.registerHandler( http.METHOD_GET, "/hello", (req,res) -> { res.write("Hello world"); } );

System.print("Application started");
webframework.server.start();