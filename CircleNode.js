'use strict'

class CircleNode {
    
    constructor() { 
		this.x = 0
		this.y = 0
		this.iconHeight = 0
		this.iconWidth = 0
		this.size = 40
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
	  let centerX = this.x + this.size / 2
      let centerY = this.y + this.size / 2
      let dx = other.x - centerX
      let dy = other.y - centerY
      let distance = Math.sqrt(dx * dx + dy * dy)
	  let point  = new Point()
	  point.setPoint(other.x, other.y)
      if (distance === 0) return point
      else {
		  let p = new Point()
		   p.setPoint(centerX + dx * (this.size / 2) / distance, centerY + dy * (this.size / 2) / distance)
		   return p
	  }
	}
	
	drawIcon()
	{
		let size = this.size / 2
		this.iconHeight = size
		this.iconWidth = size
		const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
		circle.setAttribute('cx', this.x + size / 2)
		circle.setAttribute('cy', this.y + size / 2)
		circle.setAttribute('r', size / 2)
		circle.setAttribute('fill', 'goldenrod')
		return circle
	}
	
	getIconHeight(){
		 return this.iconHeight
	}
	
	getIconWidth(){ return this.iconWidth }
	

   /**
      Adds a node as a child node to this node.
      @param n the child node
      @param p the point at which the node is being added
      @return true if this node accepts the given node as a child
   */
    addNode(n, p) { return false; } 


   /**
      Notifies this node that a node is being removed.
      @param g the ambient graph
      @param n the node to be removed
   */
   removeNode(g, n) { }
   
   removeEdge(g, e) { }
   
   /**
      Adds an edge that originates at this node.
      @param p the point that the user selected as
      the starting point. This may be used as a hint if 
      edges are ordered.
      @param e the edge to add
      @return true if the edge was added
   */
   addEdge(e){
		if (e.getEnd() !== undefined){
			return true
		}
		else return false;
   }
 }