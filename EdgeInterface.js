'use strict'

class EdgeInterface {
	/**
      Connect this edge to two nodes.
      @param aStart the starting node
      @param anEnd the ending node
   */
	connect(s, e) {
		throw new Error('Must be implmented by a subclass!')
	}
	/**
      Gets the smallest rectangle that bounds this edge.
      The bounding rectangle contains all labels.
      @return the bounding rectangle
   */
	getBounds() {
		throw new Error('Must be implmented by a subclass!')
	}
	/**
	  clone the edge
	  @return the copy of the edge
	*/
	clone() {
		throw new Error('Must be implmented by a subclass!')
	}
	
	/**
      Gets the starting node.
      @return the starting node
   */
	getStart() {
		throw new Error('Must be implmented by a subclass!')
	}
	
	/**
      Gets the ending node.
      @return the ending node
   */
	getEnd() {
		throw new Error('Must be implmented by a subclass!')
	}
	/**
      Gets the points at which this edge is connected to
      its nodes.
      @return a line joining the two connection points
   */
	getConnectionPoints() {
		throw new Error('Must be implmented by a subclass!')
	}
	/**
      Draw the edge.
    */
	draw(){
		throw new Error('Must be implmented by a subclass!')
	}
	/**
      Tests whether the edge contains a point.
      @param p the point to test
      @return true if this edge contains aPoint
   */
	contains(p){
		throw new Error('Must be implemented by a subclass!')
	}
}

/**
  Determines if an object is an EdgeInterface
  @return boolean value
*/
function isEdge(){
	function can(obj, methodName){
		return ((typeof obj[methodName]) === "function")
	}

	let edge = false
	let edgeCounter = 0
	if (can(someObject, "connect")){
		edgeCounter++
	}
	if (can(someObject, "contains")){
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
	if (edgeCounter === 7) edge = true
	return edge	
}

module.exports = { EdgeInterface: EdgeInterface, isEdge: isEdge }