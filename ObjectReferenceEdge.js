'use strict'

class ObjectReferenceEdge
{
    constructor(s, e){
        this.end = e;
        this.start = s;
        this.ENDSIZE = 10;
    }

    draw()
    {
        let panel = document.getElementById('graphpanel');
        let line = getConnectionPoints();
        let l = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        l.setAttribute('x1', line.getX1);
        l.setAttribute('y1', line.getY1);
        l.setAttribute('x2', line.getX2);
        l.setAttribute('y2', line.getY2);
        l.setAttribute('stroke', 'black');
        panel.appendChild(l);
        let line = getConnectionPoints();
        let x1 = undefined;
        let x2 = line.getX2();
        let y = line.getY2();
        if (isSShaped())
            x1 = x2 - ENDSIZE;
        else
            x1 = x2 + ENDSIZE;
        ArrowHead.BLACK_TRIANGLE.draw(new Point().setPoint(x1, y), 
                                      new Point().setPoint(x2, y));      
    }


    getConnectionPoints()
    {
        let a = getStart().getConnectionPoint();
        let b = getEnd().getConnectionPoint();
        return new Line(a, b);
    }

    getStart()
    {
        return start;
    }

    getEnd()
    {
        return end;
    }
}