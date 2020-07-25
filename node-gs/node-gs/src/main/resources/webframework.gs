module webframework;
import http;
import json;

System.print("Loading weframework");

methodHandlers = new {};
methodHandlers[http.METHOD_GET] = new {};
methodHandlers[http.METHOD_POST] = new {};
methodHandlers[http.METHOD_PUT] = new {};

server = http.createServer((req, res) -> {
		try {
			url = req.url;
			handlers = webframework.methodHandlers[req.getMethod()];
			handler = handlers[req.url];
			if( handler != null ) {
				handler(req, res);
			    return;
			}
		    res.setHeader(http.HEADER_CONTENT_TYPE, http.MIME_TEXT_HTML);
		    res.setStatusCode(http.STATUS_NOT_FOUND);
		    res.write("<center><b>No mapping for: "+req.url+"</b></center>");
		    
		} catch( e ) {
		    res.setStatusCode(http.STATUS_INTERNAL_SERVER_ERROR);
		    res.setHeader(http.HEADER_CONTENT_TYPE, http.MIME_TEXT_HTML);
		    res.write("<center><b>Internal Server Error</b></center>");
		    if(e != null) {
		    	res.write("<center>"+json.bridge.render(e)+"</center>");
		    }
		};
    
}, 8080);

registerHandler = (method, path, callback) -> {
	this.handlers = methodHandlers[method];
	this.handlers[path] = callback;
	return;
};

System.print("weframework loaded");


