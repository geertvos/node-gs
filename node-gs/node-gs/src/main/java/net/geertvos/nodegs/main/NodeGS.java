package net.geertvos.nodegs.main;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import com.google.common.base.Charsets;

import net.geertvos.gvm.core.GVM;
import net.geertvos.gvm.lang.demo.GVMRuntime;

public class NodeGS {

	public static void main(String[] args) throws IOException {
		if(args.length == 0) {
			System.out.print("NodeGS requires a gscipt file as argument.");
			return;
		}
		String filename = args[0];
		String sourceCode = new String(Files.readAllBytes(Paths.get(filename)), Charsets.UTF_8); 
		GVMRuntime runtime = new GVMRuntime();
		GVM gvm = runtime.load(sourceCode);
		gvm.run();

	}
	
}
