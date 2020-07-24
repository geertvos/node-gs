package net.geertvos.nodegs.http;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.eclipse.jetty.server.Request;
import org.eclipse.jetty.server.handler.AbstractHandler;

public class WrapperHandler extends AbstractHandler {

	private NodeGSHttpHandler wrapped;
	
	public WrapperHandler(NodeGSHttpHandler handler) {
		this.wrapped = handler;
	}

	@Override
	public void handle(String target, Request baseRequest, HttpServletRequest request, HttpServletResponse response)
			throws IOException, ServletException {
		WrappedRequest wrappedRequest = new WrappedRequest(target, request);
		WrappedResponse wrappedResponse = new WrappedResponse(response);
		wrapped.handle(wrappedRequest, wrappedResponse);
		baseRequest.setHandled(true);
	}

}
