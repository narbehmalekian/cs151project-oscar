'use strict'
/**
* A horizontal-vertical graph edge line
* @author Jeren Mckey
*/
class HVEdge
{
	/** 
	* Constructs a new HVEdge
	* @param s the starting node
	* @param e the ending node
	*/
	
    constructor(s, e){
        this.start = s;
        this.end = e;
        this.ENDSIZE = 10;
    }

	/**
	* Draws the HVEdge on the graphpanel context
	*/
    draw()
    {
        let panel = document.getElementById('graphpanel');
        let l1 = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        l1.setAttribute('x1', this.getStart().getConnectionPoint(this.getEnd()).getX())
        l1.setAttribute('y1', this.getStart().getConnectionPoint(this.getEnd()).getY())
        l1.setAttribute('x2', this.getEnd().getConnectionPoint(this.getStart()).getX())
        l1.setAttribute('y2', this.getStart().getConnectionPoint(this.getEnd()).getY())
        l1.setAttribute('style','stroke:rgb(0,0,0);stroke-width:2')
		let l2 = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        l2.setAttribute('x1', this.getEnd().getConnectionPoint(this.getStart()).getX())
        l2.setAttribute('y1', this.getStart().getConnectionPoint(this.getEnd()).getY())
        l2.setAttribute('x2', this.getEnd().getConnectionPoint(this.getStart()).getX())
        l2.setAttribute('y2', this.getEnd().getConnectionPoint(this.getStart()).getY())
        l2.setAttribute('style','stroke:rgb(0,0,0);stroke-width:2')
        panel.appendChild(l1)
		panel.appendChild(l2)   
    }

	/**
	* Returns a graphic of the HVEdge object
	* @return an SVG element
	*/
    drawIcon(){
		let poly = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
		poly.setAttribute('points', '0 0, 20 0, 20 20')
		poly.setAttribute('stroke', 'black')
		poly.setAttribute('fill', 'none')
        poly.setAttribute('stroke-width','3')
        return poly;
    }
    
	/**
	* Returns the starting node for this edge
	* @return a node object
	*/
    getStart(){ // start node
        return this.start;
    }

	/**
	* Returns the starting node for this edge
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
        this.start = n1;
        this.end = n2;
        this.start.addEdge(this);
        this.end.addEdge(this);
        this.draw();
    }

	/**
	* Returns true if a point is inside the HVEdge object
	* @param aPoint a point object
	* @return a boolean value
	*/
    contains(aPoint){
      const MAX_DIST = 5
	  let connectionPoints = this.getConnectionPoints()
      let p1 = connectionPoints.getPoint1()
      let p2 = connectionPoints.getPoint2()
      let p = new Point()
	  p.setPoint(p2.getX(), p1.getY())
	  let line1 = new Line()
	  line1.setPoints(p1, p)
	  let line2 = new Line()
	  line2.setPoints(p, p2)
	  return line1.ptSegDist(line1.getX1(), line1.getY1(), line1.getX2(), line1.getY2(), aPoint.getX(), aPoint.getY()) <
		MAX_DIST || line2.ptSegDist(line2.getX1(), line2.getY1(), line2.getX2(), line2.getY2(), aPoint.getX(), aPoint.getY()) < MAX_DIST
	}

	/**
	* Gets the bounding rectangle for the HVEdge shape
	* @return a rectangle object
	*/
    getBounds(){
        let rect = new Rectangle()
		return rect
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
	* Creates a new HVEdge object and returns that new object
	* @return a HVEdge object
	*/
    clone(){
        let clone = new HVEdge();
        return clone;
    }

	/**
	* Returns the width of the HVEdge graphic
	* @return a number
	*/
    getIconWidth(){
        return 20;
    }

	/**
	* Returns the height of the HVEdge graphic
	* @return a number
	*/
    getIconHeight(){
        return 20;
    }
	
	/**
	* Returns the height of the HVEdge Node graphic
	* @return a number
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