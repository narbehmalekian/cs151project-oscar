'use strict'

class EdgeInterface {
	connect(s, e) {
		throw new Error('Must be implmented by subclass!')
	}
	getBounds() {
		throw new Error('Must be implmented by subclass!')
	}
	clone() {
		throw new Error('Must be implmented by subclass!')
	}
	getStart() {
		throw new Error('Must be implmented by subclass!')
	}
	getEnd() {
		throw new Error('Must be implmented by subclass!')
	}
	
	getConnectionPoints() {
		throw new Error('Must be implmented by subclass!')
	}
	draw(){
		throw new Error('Must be implmented by subclass!')
	}
}

function isEdge(){
	function can(obj, methodName){
		return ((typeof obj[methodName]) === "function")
	}

	let edge = false
	let edgeCounter = 0
	if (can(someObject, "connect")){
		edgeCounter++
	}
	if (can(someObject, "getBounds")){
		edgeCounter++
	}
	if (can(someObject, "clone")){
		edgeCounter++
	}
	if (can(someObject, "getStart")){
		edgeCounter++
	}
	if (can(someObject, "getEnd")){
		edgeCounter++
	}
	if (can(someObject, "draw")){
		edgeCounter++
	}
	if (edgeCounter === 6) edge = true
	return edge	
}

module.exports = { EdgeInterface: EdgeInterface, isEdge: isEdge }