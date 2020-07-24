package net.geertvos.nodegs.http;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

public class WrappedResponse implements NodeGSResponse {

	private HttpServletResponse response;
	
	public WrappedResponse(HttpServletResponse response) {
		this.response = response;
	}

	public void setHeader(String header, String value) {
		response.setHeader(header, value);
	}

	public void setStatusCode(Integer code) {
		response.setStatus(code);
	}
	
	public void write(String body) throws IOException {
		response.getWriter().write(body);
	}

}
