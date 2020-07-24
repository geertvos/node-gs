package net.geertvos.nodegs.http;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface NodeGSHttpHandler {

	void handle(NodeGSRequest request, NodeGSResponse response);
	
}
