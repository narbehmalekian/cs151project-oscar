'use strict'

function isNode(){
	function can(obj, methodName)
	{
		return ((typeof obj[methodName]) === "function")
	}

	let node = false
	if (can(someObject, "draw")){
		node = true
	}
	if (can(someObject, "translate")){
		node = true
	}
	if (can(someObject, "contains")){
		node = true
	}
	if (can(someObject, "getBounds")){
		node = true
	}
	if (can(someObject, "clone")){
		node = true
	}
	if (can(someObject, "getConnectionPoint")){
		node = true
	}
		
	return node	
}