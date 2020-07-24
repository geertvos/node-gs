module http;
import System;

STATUS_OK = 200;
STATUS_NOT_FOUND = 404;
STATUS_INTERNAL_SERVER_ERROR = 500;

HEADER_CONTENT_TYPE = "Content-Type";

MIME_APPLICATION_JSON = "application/json";
MIME_TEXT_HTML = "text/html";

METHOD_GET = "GET";
METHOD_PUT = "PUT";
METHOD_POST = "POST";

createServer = (callback, port) -> {
	server = native("net.geertvos.nodegs.http.HttpServer","HttpServer", port);
	
	//In Java the function is not an object, so we need to wrap the callback in an object.
	serverHandler = new {
		handle = (req,res) -> {
			callback(req,res);		
		}
	};
	//The callback is missing the call stack when being called back from Java and needs access to the callback obect.
	serverHandler.callback = callback;
	server.setHandler(serverHandler);
	return server;
}