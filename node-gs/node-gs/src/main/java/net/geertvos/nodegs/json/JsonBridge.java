package net.geertvos.nodegs.json;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;

import net.geertvos.gvm.core.Value;
import net.geertvos.gvm.lang.GVMPlainObject;
import net.geertvos.gvm.lang.bridge.RequiresGVMContext;
import net.geertvos.gvm.lang.types.ArrayObject;
import net.geertvos.gvm.lang.types.ArrayType;
import net.geertvos.gvm.lang.types.ObjectType;
import net.geertvos.gvm.program.GVMContext;

public class JsonBridge implements RequiresGVMContext {

	private GVMContext context;
	private Gson gson = new Gson();
	
	public void setContext(GVMContext context) {
		this.context = context;
	}
	
	public Value parse(String script) {
		Object input = gson.fromJson(script, Object.class);
		return convert(input);
	}
	
	public String render(Value input) {
		Object output = convertFromGVM(input);
		return gson.toJson(output);
	}
	
	private Object convertFromGVM(Value value) {
		if(value.getType().isInstance(new ObjectType())) {
			Object o = context.getHeap().getObject(value.getValue());
			if(o instanceof GVMPlainObject) {
				
				Map<String,Object> objectMap = new HashMap<String,Object>();
				for(String key : ((GVMPlainObject)o).getKeys()) {
					Value fieldValue = ((GVMPlainObject)o).getValue(key);
					objectMap.put(key, convertFromGVM(fieldValue));
				}
				return objectMap;
			}
			throw new IllegalArgumentException("Cannot render JSON for type: "+value.getType());
		}
		else if(value.getType().isInstance(new ArrayType())) {
			Object o = context.getHeap().getObject(value.getValue());
			if(o instanceof ArrayObject) {
				ArrayObject arrayObject = (ArrayObject)o;
				List<Object> objectList = new LinkedList<Object>();
				for(int i=0;i<arrayObject.getLength();i++) {
					objectList.add(convertFromGVM(arrayObject.getValue(i)));
				}
				return objectList;
			}
			throw new IllegalArgumentException("Cannot render JSON for type: "+value.getType());
		}
		return context.getProgram().getConverter().convertFromGVM(context, value);
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	private Value convert(Object input) {
		Value returnValue = null;
		if(input instanceof List) {
			List inputList = (List)input;
			ArrayObject array = new ArrayObject();
			int index = context.getHeap().addObject(array);
			returnValue = new Value(index, new ArrayType());
			for(int i=0;i<inputList.size();i++) {
				array.setValue(i, convert(inputList.get(i)));
			}
		}
		else if(input instanceof Map) {
			GVMPlainObject plain = new GVMPlainObject();
			int index = context.getHeap().addObject(plain);
			returnValue = new Value(index, new ObjectType());
			Map<String,Object> inputmap = (Map)input;
			for(String key : inputmap.keySet()) {
				Object value = inputmap.get(key);
				plain.setValue(key, convert(value));
			}
		} else {
			returnValue = context.getProgram().getConverter().convertToGVM(context, input);
		}
		return returnValue;
	}

}
