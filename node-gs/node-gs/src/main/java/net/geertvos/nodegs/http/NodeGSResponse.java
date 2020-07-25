package net.geertvos.nodegs.http;

import java.io.IOException;

public interface NodeGSResponse {

	void setHeader(String header, String value);
	
	void setStatusCode(Integer code);
	
	void write(String body) throws IOException;
}
