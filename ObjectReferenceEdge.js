'use strict'

class ObjectReferenceEdge
{
    constructor(s, e){
        this.start = s
        this.end = e
        this.ENDSIZE = 10
    }

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

    getStart(){ // start node
        return this.start;
    }

    getEnd(){ // end node
        return this.end;
    }

    connect(n1, n2){
        this.start = n1
        this.end = n2
        this.start.addEdge(this)
        this.end.addEdge(this)
        this.draw()
    }

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
        let clone = new ObjectReferenceEdge();
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