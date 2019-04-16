'use strict'

class NodeInterface {
	constructor(){}
	
	/**
      Draw the node.
      @param g2 the graphics context
    */
	draw(panel){
		throw new Error('Must be implmented by subclass!')
	}

   /**
      Translates the node by a given amount
      @param dx the amount to translate in the x-direction
      @param dy the amount to translate in the y-direction
   */
	translate(dx, dy){
		throw new Error('Must be implmented by subclass!')
	}

   /**
      Tests whether the node contains a point.
      @param aPoint the point to test
      @return true if this node contains aPoint
   */
   contains(p){
	   throw new Error('Must be implmented by subclass!')
   }

   /**
      Get the best connection point to connect this node 
      with another node. This should be a point on the boundary
      of the shape of this node.
      @param d the direction from the center 
      of the bounding rectangle towards the boundary 
      @return the recommended connection point
   */
   getConnectionPoint(d){
	   throw new Error('Must be implmented by subclass!')
   }

   /**
      Get the bounding rectangle of the shape of this node
      @return the bounding rectangle
   */
   getBounds(){
	   throw new Error('Must be implmented by subclass!')
   }

   /**
      Adds an edge that originates at this node.
      @param p the point that the user selected as
      the starting point. This may be used as a hint if 
      edges are ordered.
      @param e the edge to add
      @return true if the edge was added
   */
   addEdge(e, p1, p2){
	   throw new Error('Must be implmented by subclass!')
   }

   /**
      Adds a node as a child node to this node.
      @param n the child node
      @param p the point at which the node is being added
      @return true if this node accepts the given node as a child
   */
   addNode(n, p){
	   throw new Error('Must be implmented by subclass!')
   }

   /**
      Notifies this node that an edge is being removed.
      @param g the ambient graph
      @param e the edge to be removed
   */
   removeEdge(g, e){
	   throw new Error('Must be implmented by subclass!')
   }

   /**
      Notifies this node that a node is being removed.
      @param g the ambient graph
      @param n the node to be removed
   */
   removeNode(g, n){
	  throw new Error('Must be implmented by subclass!') 
   }

   /**
      Lays out the node and its children.
      @param g the ambient graph
      @param g2 the graphics context
      @param grid the grid to snap to
   */
   layout(g, panel, grid){
	  throw new Error('Must be implmented by subclass!') 
   }

   /**
      Gets the parent of this node.
      @return the parent node, or null if the node
      has no parent
   */
   getParent(){
	  throw new Error('Must be implmented by subclass!') 
   }

   /**
      Sets the parent of this node.
      @param node the parent node, or null if the node
      has no parent
   */
   setParent(node){
	  throw new Error('Must be implmented by subclass!') 
   }

   /**
      Gets the children of this node.
      @return an unmodifiable list of the children
   */
   getChildren(){
	  throw new Error('Must be implmented by subclass!') 
   }

   /**
      Adds a child node.
      @param index the position at which to add the child
      @param node the child node to add
   */
   addChild(index, node){
	  throw new Error('Must be implmented by subclass!') 
   }

   /**
      Removes a child node.
      @param node the child to remove.
   */
   removeChild(node){
	  throw new Error('Must be implmented by subclass!') 
   }

   clone(){
	  throw new Error('Must be implmented by subclass!') 
   }
}

function isNode(){
	function can(obj, methodName)
	{
		return ((typeof obj[methodName]) === "function")
	}

	let node = false
	let nodeCounter = 0
	if (can(someObject, "draw")){
		nodeCounter++
	}
	if (can(someObject, "translate")){
		nodeCounter++
	}
	if (can(someObject, "contains")){
		nodeCounter++
	}
	if (can(someObject, "getBounds")){
		nodeCounter++
	}
	if (can(someObject, "clone")){
		nodeCounter++
	}
	if (can(someObject, "getConnectionPoint")){
		nodeCounter++
	}
	if (can(someObject, "addEdge")){
		nodeCounter++
	}
	if (can(someObject, "addNode")){
		nodeCounter++
	}
	if (can(someObject, "removeEdge")){
		nodeCounter++
	}
	if (can(someObject, "setParent")){
		nodeCounter++
	}
	if (can(someObject, "addChild")){
		nodeCounter++
	}	
	if (can(someObject, "getParent")){
		nodeCounter++
	}
	if (can(someObject, "removeChild")){
		nodeCounter++
	}
	if (can(someObject, "layout")){
		nodeCounter++
	}
	if (can(someObject, "getChildren")){
		nodeCounter++
	}
	if (nodeCounter === 15) node = true
	return node	
}

module.exports = { NodeInterface: NodeInterface, isNode: isNode }