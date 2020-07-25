module webframework;
import http;
import json;


create = (port) ->
{
	System.print("Loading webframework on port "+port);

	methodHandlers = new {};
	methodHandlers[http.METHOD_GET] = new {};
	methodHandlers[http.METHOD_POST] = new {};
	methodHandlers[http.METHOD_PUT] = new {};

	mainhandler = (req, res) -> {
		try {
		    res.setHeader(http.HEADER_CONTENT_TYPE, http.MIME_TEXT_HTML);
			handlers = webframework.methodHandlers[req.getMethod()];
			handler = handlers[req.url];
			if( handler != null ) {
			    res.setStatusCode(http.STATUS_OK);
				handler(req, res);
			    return;
			}
		    res.setStatusCode(http.STATUS_NOT_FOUND);
		    res.write("<center><b>No mapping for: "+req.url+"</b></center>");
		    
		} catch( e ) {
		    res.setStatusCode(http.STATUS_INTERNAL_SERVER_ERROR);
		    res.write("<center><b>Internal Server Error</b></center>");
		    if(e != null) {
		    	res.write("<center>"+json.bridge.render(e)+"</center>");
		    }
		};
	}
	
	server = http.createServer(mainhandler, port);
	
	registerHandler = (method, path, callback) -> {
		this.handlers = methodHandlers[method];
		this.handlers[path] = callback;
		return;
	};
	
	start = () -> { server.start(); }
	
	
	return this;
}


