'use strict';

class ObjectNode{ 

    constructor(){
        this.height = 150;
        this.width = 100;
        this.iconHeight = 10;
        this.iconWidth = 10;
        this.x = 50;
        this.y = 50;
        this.children = [];
    }

    draw(){
        const panel = document.getElementById('graphpanel');
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', this.x);
        rect.setAttribute('y', this.y);
        rect.setAttribute('height', this.height);
        rect.setAttribute('width', this.width);
        rect.setAttribute('stroke-width', '3');
        rect.setAttribute('stroke','black');
        rect.setAttribute('fill','white');
        panel.appendChild(rect);
    }

    translate(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    contains(p){
        return p.getX()>this.x && p.getX()<(this.x+this.width) && p.getY()>this.y && p.getY()<(this.y+this.height);
    }

    getBounds(){
        let rect = new Rectangle()
        rect.setRect(this.x, this.y, this.width, this.height);
        return rect
    }

    clone(){
        let clone = new ObjectNode();
        return clone;
    }

    getConnectionPoint(other){
        let dx = other.x - this.x;
        let dy = other.y - this.y;
        if(Math.abs(dx) > Math.abs(dy)){// horizontal
            if(dx > 0){// right
                return new Point(this.x+this.width, this.y+(this.height/2));
            }
            else{// left
                return new Point(this.x, this.y+(this.height/2));
            }
        }
        else{// vertical
            if(dy > 0){// up
                return new Point(this.x+(this.width/2), this.y);
            }
            else{// down
                return new Point(this.x+(this.width/2), this.y+this.height);
            }
        }
    }

    drawIcon(){
        this.iconWidth = this.width;
        this.iconHeight = this.height;
        const panel = document.getElementById('graphpanel');
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', this.x);
        rect.setAttribute('y', this.y);
        rect.setAttribute('height', this.height);
        rect.setAttribute('width', this.width);
        rect.setAttribute('stroke-width', '3');
        rect.setAttribute('stroke','black');
        rect.setAttribute('fill','white');
        panel.appendChild(rect);
    }

    getIconHeight(){
        return this.iconHeight;
    }

    getIconWidth(){
        return this.iconWidth;
    }

    addNode(node,p){// not doing anything with p right now
        for(var i = 0; i<this.children.length; i++){
            if(this.children[i]===node){
                return true; // node is already a child
            }
        }
        this.children.push(node);
        return true;
    }

    addEdge(){
        
    }

    removeNode(node){
        for(var i = 0; i<this.children.length; i++){
            if(this.children[i]===node){
                
            }
        }
    }

    removeEdge(){
        
    }

    setName(n){
        this.name = n;
    }

    getName(){
        return name;
    }
}
