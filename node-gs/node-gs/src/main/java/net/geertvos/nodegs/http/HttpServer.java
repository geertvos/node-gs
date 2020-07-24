package net.geertvos.nodegs.http;

import org.eclipse.jetty.server.Server;

public class HttpServer {

	private Server server;

	public HttpServer(int port) {
		server = new Server(port);
	}

	public void setHandler(NodeGSHttpHandler handler) {
		server.setHandler(new WrapperHandler(handler));
	}

	public void start() throws Exception {
		server.start();
		server.join();
	}

}
