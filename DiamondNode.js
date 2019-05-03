'use strict'

class DiamondNode {
    
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
	 let clone = new DiamondNode
	 return clone
	}
    
    /**
    * Checks whether a point is to the right of a given line
    * @param p1 The first point on the line
    * @param p2 The second point on the line
    * @param p the point to test
    * @return true if p lies to the right of the line traversing p1, then p2
    */
   toRightOf(p1, p2, p)
   {
      let nx = p2.getY() - p1.getY()
      let ny = p1.getX() - p2.getX() 
      let vx = p.getX() - p1.getX()
      let vy = p.getY() - p1.getY()
      let s = nx * vx + ny * vy
      return s < 0
   }

   contains(aPoint)
   {
      let top = new Point()
	  top.setPoint(this.x + this.size / 2, this.y)
      let right = new Point()
	  right.setPoint(this.x + this.size, this.y + this.size / 2)
      let bottom = new Point()
	  bottom.setPoint(this.x + this.size / 2, this.y + this.size)
      let left = new Point()
	  left.setPoint(this.x, this.y + this.size / 2)

      return this.toRightOf(top, right, aPoint)
         && this.toRightOf(right, bottom, aPoint)
         && this.toRightOf(bottom, left, aPoint)
         && this.toRightOf(left, top, aPoint)
   }
    
    translate(dx, dy) {
      this.x += dx
      this.y += dy
    }
    
    draw(){
      const panel = document.getElementById('graphpanel')
      const diamond = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
	  let xMid = this.x + (this.size / 2)
      let yMid = this.y + (this.size / 2)
	  let xLong = this.x + this.size
	  let yLong = this.y + this.size
	  let str = String(xMid) + ' ' + String(this.y) + ', ' + String(xLong) + ' ' + String(yMid) + ', ' + String(xMid) + ' ' + String(yLong) + ', ' + String(this.x) + ' ' + String(yMid)
	  diamond.setAttribute('points', str) 
	  diamond.setAttribute('fill', 'blue')
      panel.appendChild(diamond)
    }
    
	getConnectionPoint(other){
	  let centerX = this.x + this.size / 2
      let centerY = this.y + this.size / 2
      let dx = other.getX() - centerX
      let dy = other.getY() - centerY
      let distance = Math.sqrt(dx * dx + dy * dy)
	  let newPoint = new Point()
      if (dx >= dy && dx >= -dy) return newPoint.setPoint(this.x + this.size, centerY)
      if (dx < dy && dx >= -dy) return newPoint.setPoint(centerX, this.y + this.size)
      if (dx >= dy && dx < -dy) return newPoint.setPoint(centerX, this.y)
	  return newPoint.setPoint(this.x, centerY)
	}
	
	drawIcon()
	{
		let size = this.size / 2
		this.iconHeight = size
		this.iconWidth = size
		const diamond = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
		let xMid = this.x + (size / 2)
		let yMid = this.y + (size / 2)
		let xLong = this.x + size
		let yLong = this.y + size
		let str = String(xMid) + ' ' + String(this.y) + ', ' + String(xLong) + ' ' + String(yMid) + ', ' + String(xMid) + ' ' + String(yLong) + ', ' + String(this.x) + ' ' + String(yMid)
	    diamond.setAttribute('points', str) 
		diamond.setAttribute('fill', 'blue')
		return diamond
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