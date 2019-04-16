'use strict'
const edgeModule = require('./EdgeInterface')

/**
   A class that supplies convenience implementations for 
   a number of methods in the Edge interface
*/
class AbstractEdge extends edgeModule.EdgeInterface {
   constructor() {
	   this.start = undefined
	   this.end = undefined
   }
   clone()
   {
      try
      {
         let clone = new AbstractEdge()
		 clone.start = this.start
		 clone.end = this.end
		 return clone
      }
      catch
      {
         return null
      }
   }
   connect(s, e)
   {
	   if (s.isNode() && e.isNode)
	   {
		  this.start = s
		  this.end = e
	   }
   }

   getStart(){ return this.start }
   getEnd(){ return this.end }

   getBounds()
   {
      let conn = getConnectionPoints()
      let r = { x1: undefined, y1: undefined, x2: undefined, y2: undefined,
		x3: undefined, y3: undefined, x4: undefined, y4: undefined }
      r.x1 = conn.x1
	  r.x2 = conn.x1
	  r.x3 = conn.x2
	  r.x4 = conn.x2
	  r.y1 = conn.y1
	  r.y2 = conn.y1
	  r.y3 = conn.y2
	  r.y4 = conn.y2
      return r
   }

   getConnectionPoints()
   {
      let startBounds = start.getBounds()
      let endBounds = end.getBounds()
      let startCenter = { x: startBounds.x + (startBounds.width / 2), y: startBounds.y + (startBounds.height / 2) }
	  let startCenter = { x: endBounds.x + (endBounds.width / 2), y: endBounds.y + (endBounds.height / 2) }
      return { x1: start.getConnectionPoint(endCenter).x, y1: start.getConnectionPoint(endCenter).y, x2: end.getConnectionPoint(startCenter).x,
		y2: end.getConnectionPoint(startCenter).y }
   }
   
   draw(){
	   throw new Error('This must be implemented in a subclass!')
   }
}