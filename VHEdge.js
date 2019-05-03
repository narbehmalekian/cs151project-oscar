'use strict'

class VHEdge
{
    constructor(s, e){
        this.start = s;
        this.end = e;
        this.ENDSIZE = 10;
    }

    draw()
    {
        let panel = document.getElementById('graphpanel');
        let l1 = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        l1.setAttribute('x1', this.getStart().getConnectionPoint(this.getEnd()).getX())
        l1.setAttribute('y1', this.getStart().getConnectionPoint(this.getEnd()).getY())
        l1.setAttribute('x2', this.getStart().getConnectionPoint(this.getEnd()).getX())
        l1.setAttribute('y2', this.getEnd().getConnectionPoint(this.getStart()).getY())
        l1.setAttribute('style','stroke:rgb(0,0,0);stroke-width:2')
		let l2 = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        l2.setAttribute('x1', this.getStart().getConnectionPoint(this.getEnd()).getX())
        l2.setAttribute('y1', this.getEnd().getConnectionPoint(this.getStart()).getY())
        l2.setAttribute('x2', this.getEnd().getConnectionPoint(this.getStart()).getX())
        l2.setAttribute('y2', this.getEnd().getConnectionPoint(this.getStart()).getY())
        l2.setAttribute('style','stroke:rgb(0,0,0);stroke-width:2')
        panel.appendChild(l1)
		panel.appendChild(l2)   
    }

    drawIcon(){
		let poly = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
		poly.setAttribute('points', '0 0, 0 20, 20 20')
		poly.setAttribute('stroke', 'black')
		poly.setAttribute('fill', 'none')
        poly.setAttribute('stroke-width','3')
        return poly;
    }
    
    getConnectionPoints(){
        var line = new Line();
        line.setPoints(50,50,200,200);
        return line//(new Line()).setPoints(this.start.getConnectionPoint(this.end),this.end.getConnectionPoint(this.start));
    }

    getStart(){ // start node
        return this.start;
    }

    getEnd(){ // end node
        return this.end;
    }

    connect(n1, n2){
        this.start = n1;
        this.end = n2;
        this.start.addEdge(this);
        this.end.addEdge(this);
        this.draw();
    }

    contains(aPoint){
      const MAX_DIST = 5
	  let connectionPoints = this.getConnectionPoints()
      let p1 = connectionPoints.getPoint1()
      let p2 = connectionPoints.getPoint2()
      let p = new Point()
	  p.setPoint(p1.getX(), p2.getY())
	  let line1 = new Line()
	  line1.setPoints(p1, p)
	  let line2 = new Line()
	  line2.setPoints(p, p2)
	  return line1.ptSegDist(line1.getX1(), line1.getY1(), line1.getX2(), line1.getY2(), aPoint.getX(), aPoint.getY()) <
		MAX_DIST || line2.ptSegDist(line2.getX1(), line2.getY1(), line2.getX2(), line2.getY2(), aPoint.getX(), aPoint.getY()) < MAX_DIST
	}

    getBounds(){
        let rect = new Rectangle(Math.min(this.startX(),this.endX()),Math.min(this.startY(),this.endY()),Math.abs(this.startX()-this.endX()),Math.abs(this.startY()-this.endY()));
        return rect;
    }

    startX(){
        this.start.getConnectionPoint(this.end).getX();
    }

    startY(){
        this.start.getConnectionPoint(this.end).getY();
    }

    endX(){
        this.end.getConnectionPoint(this.start).getX();
    }

    endY(){
        this.end.getConnectionPoint(this.start).getY();
    }


    clone(){
        let clone = new VHEdge();
        return clone;
    }

    getIconWidth(){
        return 20;
    }

    getIconHeight(){
        return 20;
    }
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