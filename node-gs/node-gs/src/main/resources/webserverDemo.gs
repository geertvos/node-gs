module WebserverDemo;
import webframework;

/*
* Internal data store
*/
names = new [];

getNamesHandler = (req, res) -> {
    for(i=0 ; i < names.length ; i++) {
    	res.write("<center><b>Hello: " + names[i] + "</b></center>");
    };
};

storeNameHandler = (req, res) -> {
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

framework = webframework.create(8080);
framework.registerHandler( http.METHOD_GET, "/names", getNamesHandler );
framework.registerHandler( http.METHOD_PUT, "/", storeNameHandler );
framework.registerHandler( http.METHOD_GET, "/hello", (req,res) -> { res.write("Hello world"); } );
framework.registerHandler( http.METHOD_GET, "/version", (req,res) -> { res.write("1.0"); } );
framework.start();