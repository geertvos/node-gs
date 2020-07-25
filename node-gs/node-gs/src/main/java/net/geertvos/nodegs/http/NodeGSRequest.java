package net.geertvos.nodegs.http;

public interface NodeGSRequest {

	String getURL();

	String getHeader(String header);
	
	String getContentType();
	
	String getQueryString();
	
	String getContextPath();
	
	String getParameter(String name);
	
	String getMethod();
}


