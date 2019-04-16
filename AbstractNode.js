'use strict'

const nodeModule = require('./NodeInterface')
/**
   A class that supplies convenience implementations for 
   a number of methods in the Node interface
*/
class AbstractNode extends nodeModule.NodeInterface{
   static DEFAULT_SIZE() { return 20 }
   constructor(aColor){
      this.size = DEFAULT_SIZE()
      this.x = 0
      this.y = 0
      this.color = aColor
   }
   setColor(aColor){ this.color = aColor }
   getColor(){ return this.color }
   clone(){
      try
      {
        let clone = new CircleNode(this.color)
		clone.x = x
		clone.y = y
		return clone
      }
      catch { return null }
   }

   draw(panel)
   {
	  circle.setAttribute('cx', this.x + this.size / 2)
      circle.setAttribute('cy', this.y + this.size / 2)
      circle.setAttribute('r', this.size / 2)
      circle.setAttribute('fill', this.color)
      panel.appendChild(circle)
   }

   translate(dx, dy){
      this.x = this.x + dx
      this.y = this.y + dy
   }

   contains(p) { return (this.x + this.size / 2 - p.x) ** 2 + (this.y + this.size / 2 - p.y) ** 2 <= size ** 2 / 4 }

   getBounds(){  
      return {
        x: this.x,
        y: this.y,
        width: this.size,
        height: this.size
      }
   }

   getConnectionPoint(other)
   {
      let centerX = this.x + this.size / 2
      let centerY = this.y + this.size / 2
      let dx = other.x - centerX
      let dy = other.y - centerY
      let distance = Math.sqrt(dx * dx + dy * dy)
      if (distance === 0) return other
      else return {
            x: centerX + dx * (this.size / 2) / distance,
            y: centerY + dy * (this.size / 2) / distance
	  }
   }
}

