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

    contains(p){
        if(this.startX()<this.endX()){
            var p1 = new Point(this.startX(),this.startY());
            var p2 = new Point(this.endX(),this.endY());
        }
        else{
            var p1 = new Point(this.endX(),this.endY());
            var p2 = new Point(this.startX(),this.startY());
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
}