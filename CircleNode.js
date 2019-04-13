'use strict'

const static DEFAULT_SIZE = 20

/**
   A circular node that is filled with a color.
*/
class CircleNode {
   constructor(aColor){
      this.#size = DEFAULT_SIZE
      this.#x = 0
      this.#y = 0
      this.#color = aColor
   }
   setColor(aColor){ this.#color = aColor }
   Color getColor(){ return this.#color }
   clone(){
      try
      {
        let clone = new CircleNode(this.#color)
		Object.assign(clone, this)
		return clone
      }
      catch { return null }
   }

   draw(Graphics2D g2)
   {
	  const panel = document.getElementById('graphpanel')
	  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
	  circle.setAttribute('cx', this.#x + this.#size / 2)
      circle.setAttribute('cy', this.#y + this.#size / 2)
      circle.setAttribute('r', this.#size / 2)
      circle.setAttribute('fill', this.#color)
      panel.appendChild(circle)
   }

   translate(dx, dy){
      this.#x = this.# + dx
      this.#y = this.#y + dy
   }

   contains(p) { return (this.#x + this.#size / 2 - p.x) ** 2 + (this.#y + this.#size / 2 - p.y) ** 2 <= size ** 2 / 4 }

   getBounds(){  
      return {
        x: this.#x,
        y: this.#y,
        width: this.#size,
        height: this.#size
      }
   }

   getConnectionPoint(other)
   {
      let centerX = this.#x + this.#size / 2;
      let centerY = this.#y + this.#size / 2;
      let dx = other.x - centerX;
      let dy = other.y - centerY;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance === 0) return other
      else return {
            x: centerX + dx * (this.#size / 2) / distance,
            y: centerY + dy * (this.#size / 2) / distance)
	  }
   }
}
