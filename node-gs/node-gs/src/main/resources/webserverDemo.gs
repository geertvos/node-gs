module WebserverDemo;
import http;
import json;


/*
* Provide an interface similar to NodeJS http module
*/

names = new ["Jonhy", "Clara"];
server = http.createServer((req, res) -> {
		try {
			url = req.url;
			if(req.getMethod() == http.METHOD_PUT || req.getMethod() == http.METHOD_POST)
			{
				body = json.bridge.parse(req.getBodyAsString());
			    names[names.length] = body.name;
			    response = new {
			    	response = "OK";
			    	code = http.STATUS_OK;
			    };
			    res.setHeader(http.HEADER_CONTENT_TYPE, http.MIME_APPLICATION_JSON);
			    res.write(json.bridge.render(response));
			}
			else if( url == "/names" && req.getMethod() == http.METHOD_GET ) {
			    res.setHeader(http.HEADER_CONTENT_TYPE, http.MIME_TEXT_HTML);
			    res.setStatusCode(http.STATUS_OK);
			    for(i=0;i<names.length;i++) {
			    	res.write("<center><b>Hello: "+names[i]+"</b></center>");
			    }
			} else {
			    res.setHeader(http.HEADER_CONTENT_TYPE, http.MIME_TEXT_HTML);
			    res.setStatusCode(http.STATUS_NOT_FOUND);
			    res.write("<center><b>Internal Server Error</b></center>");
		    }
		} catch(e){
		    res.setStatusCode(http.STATUS_INTERNAL_SERVER_ERROR);
		    res.setHeader(http.HEADER_CONTENT_TYPE, http.MIME_TEXT_HTML);
		    res.write("<center><b>Internal Server Error</b></center>");
		    res.write("<center>"+json.bridge.render(e)+"</center>");
		};
    
}, 8080);

server.start();
