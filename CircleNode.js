'use strict'

class CircleNode {
    
    constructor() { 
		this.x = 0
		this.y = 0
		this.iconHeight = 0
		this.iconWidth = 0
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
	
	drawIcon()
	{
		this.iconHeight = this.size
		this.iconWidth = this.size
		const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
		circle.setAttribute('cx', this.x + this.size / 2)
		circle.setAttribute('cy', this.y + this.size / 2)
		circle.setAttribute('r', this.size / 2)
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
   addEdge(e, p1, p2){
		if (e.getEnd() !== null){
			return true
		}
		else return false;
   }
 }