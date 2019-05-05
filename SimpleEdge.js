'use strict'

/**
* A simple edge class
* @author Narbeh Malekian
*/
class SimpleEdge
{
    /** 
    * Constructs a new SimpleEdge
    * @param s the starting node
    * @param e the ending node
    */
    constructor(s, e){
        this.start = s
        this.end = e
        this.ENDSIZE = 10
    }

    /**
    * Draws the Simple Edge on the graphpanel context
    */

    draw()
    {
        let panel = document.getElementById('graphpanel');
        let l = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        l.setAttribute('x1', this.getStart().getConnectionPoint(this.getEnd()).getX());
        l.setAttribute('y1', this.getStart().getConnectionPoint(this.getEnd()).getY());
        l.setAttribute('x2', this.getEnd().getConnectionPoint(this.getStart()).getX());
        l.setAttribute('y2', this.getEnd().getConnectionPoint(this.getStart()).getY());
        l.setAttribute('style','stroke:rgb(0,0,0);stroke-width:2');
        panel.appendChild(l);   
    }
    /**
    * Returns a graphic of the Simple edge object
    * @return an SVG element
    */
    drawIcon(){
        let panel = document.getElementById('graphpanel');
        let l = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        l.setAttribute('x1', 0);
        l.setAttribute('y1', 0);
        l.setAttribute('x2', 20);
        l.setAttribute('y2', 20);
        l.setAttribute('stroke', 'black');
        l.setAttribute('stroke-width','2');
        panel.appendChild(l);
        return l;
    }

    /**
    * Returns the starting node for this edge
    * @return a node object
    */
    getStart(){ // start node
        return this.start;
    }
    /**
    * Returns the ending node for this edge
    * @return a node object
    */
    getEnd(){ // end node
        return this.end;
    }
    /**
    * Sets the starting and end nodes that are connected by this edge
    * @param n1 the first node
    * @param n2 the second node
    */
    connect(n1, n2){
        this.start = n1
        this.end = n2
        this.start.addEdge(this)
        this.end.addEdge(this)
        this.draw()
    }
    /**
    * Returns true if a point is inside the Simple Edge object
    * @param p a point object
    * @return a boolean value
    */
    contains(p){
      const MAX_DIST = 5
	  let line = this.getConnectionPoints()
	  let dist = line.ptSegDist(line.getX1(), line.getY1(), line.getX2(), line.getY2(), p.getX(), p.getY()) 
	  if (dist < MAX_DIST){
		  console.log('test')
		  return true
	  }
	  return false
	}
    /**
    * Gets the bounding rectangle for the Simple Edge shape
    * @return a rectangle object
    */
    getBounds(){
        let rect = new Rectangle(Math.min(this.startX(),this.endX()),Math.min(this.startY(),this.endY()),Math.abs(this.startX()-this.endX()),Math.abs(this.startY()-this.endY()));
        return rect;
    }
    /** 
    * Returns the starting point x-coordinate
    * @return a number
    */
    startX(){
        this.start.getConnectionPoint(this.end).getX();
    }
    /** 
    * Returns the starting point y-coordinate
    * @return a number
    */
    startY(){
        this.start.getConnectionPoint(this.end).getY();
    }
    /** 
    * Returns the ending point x-coordinate
    * @return a number
    */
    endX(){
        this.end.getConnectionPoint(this.start).getX();
    }
    /** 
    * Returns the ending point y-coordinate
    * @return a number
    */
    endY(){
        this.end.getConnectionPoint(this.start).getY();
    }
    /**
    * Creates a new Simple Edge object and returns that new object
    * @return a SimpleEdge object
    */
    clone(){
        let clone = new SimpleEdge()
        return clone
    }
    /**
    * Returns the width of the SimpleEdge graphic
    * @return a number
    */
    getIconWidth(){
        return 20;
    }
    /**
    * Returns the height of the SimpleEdge graphic
    * @return a number
    */
    getIconHeight(){
        return 20;
    }
    /**
    * Returns the connections points for the edge based on the node connection points 
    * @return a line from one node to another
    */
   getConnectionPoints()
   {
      let startBounds = this.start.getBounds()
      let endBounds = this.end.getBounds()
      let startCenter = new Point()
	  startCenter.setPoint(startBounds.getCenterX(), startBounds.getCenterY())
      let endCenter = new Point()
	  endCenter.setPoint(endBounds.getCenterX(), endBounds.getCenterY())
      let l = new Line()
	  l.setPoints(this.start.getConnectionPoint(endCenter), this.end.getConnectionPoint(startCenter))
	  return l
   }
}