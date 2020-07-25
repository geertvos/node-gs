package net.geertvos.nodegs.http;

/**
 * Interface for the HTTP hander. This enabled the GVM to generate a proxy for Gscript callbacks.
 * @author geert
 *
 */
public interface NodeGSHttpHandler {

	void handle(NodeGSRequest request, NodeGSResponse response);
	
}
