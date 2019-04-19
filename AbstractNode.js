'use strict'

const nodeModule = require('./NodeInterface')
/**
   A class that supplies convenience implementations for 
   a number of methods in the Node interface
*/
class AbstractNode extends nodeModule.NodeInterface{
   constructor(){
      this.children = []
      this.parentNode = null
   }

   clone()
   {
      try
      {
         let clone = new AbstractEdge()
		 clone.children = this.children
		 clone.parentNode = this.parentNode
		 return clone
      }
      catch
      {
         return null
      }
   }

   translate(dx, dy)
   {
      for (let i = 0; i < this.children.length; i++)
      {
         let n = children[i]
         n.translate(dx, dy)
      }
   }

   addEdge(e, p1, p2)
   {
	   if (e.isEdge() && p1.isPoint() && p2.isPoint()) 
	   {
		   return (e.getEnd() !== null)
	   }
	   else throw new Error('Parameters must be an edge, point and point respectively')
   }

   removeEdge(g, e)
   {
   }

   removeNode(g, n)
   {
	  if (g.isGraph() && n.isNode())
      if (n === this.parentNode) parentNode = null 
      if (n.getParent() === this){
		  let i = children.indexOf(n)
		  children.splice(i, 1)
	  }
	  else throw new Error('Parameters must be graph, and node respectively')
   }

   layout(g, grid)
   {
   }

   addNode(n, p)
   {
      return false
   }

   getParent() { return this.parentNode }

   setParent(node) 
   { 
	  if (node.isNode) this.parentNode = node
	  else throw new Error('Paramter must be a node') 
   }

   getChildren() { return children }

   addChild(index, node) 
   {
      let oldParent = node.getParent()
      if (oldParent !== null)
         oldParent.removeChild(node)
      children.splice(index, 0, node)
      node.setParent(this)
   }

   addChild(node)
   {
      if (node.isNode()) addChild(children.length, node)
	  else throw new Error('Parameter must be a node')
   }

   removeChild(node)
   {
	  if (node.isNode()){
		  if (node.getParent() === this){
			 let index = children.indexOf(node)
			 children.splice(index, 0)
			 node.setParent(null)
		  }
	  }
	  else throw new Error('Parameter must be a node')
   }

   draw()
   {
   }
   static getShadowGap(){
	   return 'gray'
   }
   static getShadowGap(){
	   return 4
   }
}

