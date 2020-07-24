package net.geertvos.nodegs.http;

public interface NodeGSResponse {

	void setHeader(String header, String value);
	
	void setStatusCode(Integer code);
	
	
}
