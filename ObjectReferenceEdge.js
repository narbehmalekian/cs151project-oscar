'use strict'

class ObjectReferenceEdge
{
    constructor(s, e){
        this.start = s;
        this.end = e;
        this.ENDSIZE = 10;
    }

    draw()
    {
        let panel = document.getElementById('graphpanel');
        let l = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        l.setAttribute('x1', getStart().getConnectionPoint().getX());
        l.setAttribute('y1', getStart().getConnectionPoint().getY());
        l.setAttribute('x2', getEnd().getConnectionPoint().getX());
        l.setAttribute('y2', getEnd().getConnectionPoint().getY());
        l.setAttribute('stroke', 'black');
        l.setAttribute('stroke-width','2');
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
        return start;
    }

    getEnd(){ // end node
        return end;
    }

    connect(){
        start.addEdge(this);
        end.addEdge(this);
    }

    contains(p){
        if(startX()<endX()){
            var p1 = new Point(startX(),startY());
            var p2 = new Point(endX(),endY());
        }
        else{
            var p1 = new Point(endX(),endY());
            var p2 = new Point(startX(),startY());
        }
        var dy=p2.getY()-p1.getY();
        var dx=p2.getX()-p1.getX();
        if(dx===0){
            dx=1;
        }
        var m=dy/dx;
        return Math.abs((p.getY()-p2.getY())-(m*(p.getX()-p2.getX())))<1;
    }

    getBounds(){
        let rect = new Rectangle(Math.min(startX(),endX()),Math.min(startY(),endY()),Math.abs(startX()-endX()),Math.abs(startY()-endY()));
        return rect;
    }

    startX(){
        this.start.getConnectionPoint().getX();
    }

    startY(){
        this.start.getConnectionPoint().getY();
    }

    endX(){
        this.end.getConnectionPoint().getX();
    }

    endY(){
        this.end.getConnectionPoint().getY();
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
}