'use strict'

class CircleNode {
    constructor() { 
		this.x = 0
		this.y = 0
		this.size = 20
	}
    getBounds(){
        let rect = new Rectangle()
		rect.setRect(this.x, this.y, this.size, this.size)
		return rect
      }
	clone() { 
	 let clone = new CircleNode()
	 return clone
	}
    contains(p){
      return (this.x + this.size / 2 - p.getX()) ** 2 + (this.y + this.size / 2 - p.getY()) ** 2 <= this.size ** 2 / 4
    }
    translate(dx, dy) {
      this.x += dx
      this.y += dy
    }
    draw(){
      const panel = document.getElementById('graphpanel')
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      circle.setAttribute('cx', this.x + this.size / 2)
      circle.setAttribute('cy', this.y + this.size / 2)
      circle.setAttribute('r', this.size / 2)
      circle.setAttribute('fill', 'goldenrod')
      panel.appendChild(circle)
    }
	getConnectionPoint(other){
	  let centerX = x + this.size / 2
      let centerY = y + this.size / 2
      let dx = other.getX() - centerX
      let dy = other.getY() - centerY
      let distance = Math.sqrt(dx * dx + dy * dy)
      if (distance === 0) return other
      else {
		  let p = new Point()
		   p.setPoint(centerX + dx * (this.size / 2) / distance, centerY + dy * (this.size / 2) / distance)
		   return p
	  }
	}
 }