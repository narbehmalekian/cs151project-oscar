'use strict'

/**
   A class that supplies convenience implementations for 
   a number of methods in the Node interface
*/
class AbstractNode {
   constructor(){
	  this.x = 0
	  this.y = 0
	  this.size = 20
   }

   clone()
   {
      try
      {
         let clone = this
		 return clone
      }
      catch
      {
         return null
      }
   }

   translate(dx, dy)
   {

   }

   draw()
   {
   }
   
   getConnectionPoint(other){}
   contains(p){}
   getBounds(){}
   
   static getShadowGap(){
	   return 'gray'
   }
   static getShadowGap(){
	   return 4
   }
   
}

module.exports = { AbstractNode }