'use strict'

/**
   A class that supplies convenience implementations for 
   a number of methods in the Edge interface
*/
class AbstractEdge {
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
	   this.start = s
	   this.end = e
   }

   getStart(){ return this.start }
   getEnd(){ return this.end }

   getBounds()
   {
      let conn = getConnectionPoints()
      let r = new Rectangle()
	  r.setFrameFromDiagonal(conn.getX1(), conn.getY1(),
         conn.getX2(), conn.getY2());
      return r
   }

   getConnectionPoints()
   {
      let startBounds = start.getBounds()
      let endBounds = end.getBounds()
      let startCenter = new Point()
	  startCenter.setPoint(startBounds.getX() + (startBounds.getWidth() / 2), startBounds.getY() + (startBounds.getHeight() / 2) 
	  let endCenter = new Point()
	  endCenter.setPoint(endBounds.getX() + (endBounds.getWidth() / 2), endBounds.getY() + (endBounds.getHeight() / 2) }
	  let toEnd = new Direction(startCenter, endCenter);
	  let returnLine = new Line()
	  returnLine.setPoints(this.start.getConnectionPoint(toEnd),
         this.end.getConnectionPoint(toEnd.turn(180)))
	  return returnLine
   }
   
   draw(){
	   throw new Error('This must be implemented in a subclass!')
   }
   contains(p){}
}