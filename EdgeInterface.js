'use strict'

function isEdge(){
	function can(obj, methodName){
		return ((typeof obj[methodName]) === "function")
	}

	let edge = false
	if (can(someObject, "draw")){
		edge = true
	}
	if (can(someObject, "connect")){
		edge = true
	}
	if (can(someObject, "getBounds")){
		edge = true
	}
	if (can(someObject, "clone")){
		edge = true
	}
	if (can(someObject, "getStart")){
		edge = true
	}
	if (can(someObject, "getEnd")){
		edge = true
	}
		
	return edge	
}