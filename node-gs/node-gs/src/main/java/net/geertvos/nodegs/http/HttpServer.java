package net.geertvos.nodegs.http;

import org.eclipse.jetty.server.Server;

public class HttpServer {

	private final Server server;

	public HttpServer(int port) {
		server = new Server(port);
	}

	/**
	 * The Handler is an interface on purpose. The GVM can generate a proxy for it.
	 * @param handler
	 */
	public void setHandler(NodeGSHttpHandler handler) {
		server.setHandler(new WrapperHandler(handler));
	}

	public void start() throws Exception {
		server.start();
		server.join();
	}

}
