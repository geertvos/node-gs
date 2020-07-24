package net.geertvos.nodegs.http;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

public class WrappedRequest implements NodeGSRequest {

	private final HttpServletRequest request;
	public final String url;
	
	public WrappedRequest(String target, HttpServletRequest request) {
		this.request = request;
		this.url = target;
	}

	public String getURL() {
		return url;
	}
	
	public String getHeader(String header) {
		return request.getHeader(header);
	}
	
	public String getContentType() {
		return request.getContentType();
	}
	
	public String getQueryString() {
		return request.getQueryString();
	}

	public String getContextPath() {
		return request.getContextPath();
	}

	public String getParameter(String name) {
		return request.getParameter(name);
	}
	
	public String getMethod() {
		return request.getMethod();
	}
	
	public String getBodyAsString() throws IOException {
		return new BufferedReader(
			      new InputStreamReader(request.getInputStream(), StandardCharsets.UTF_8))
			        .lines()
			        .collect(Collectors.joining("\n"));
	}
	
	
}
