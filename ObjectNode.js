'use strict';

class ObjectNode{ 

    constructor(){
        this.height = 150;
        this.width = 100;
        this.iconHeight = 20;
        this.iconWidth = 20;
        this.x = 50;
        this.y = 50;
        this.children = [];
        this.edges = [];
        this.color = '#ffffff';
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
        rect.setAttribute('fill',this.color);
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
                var p = new Point();
                p.setPoint(this.x+this.width, this.y+(this.height/2))
                return p;
            }
            else{// left
                var p = new Point();
                p.setPoint(this.x, this.y+(this.height/2))
                return p;
            }
        }
        else{// vertical
            if(dy < 0){// up
                var p = new Point();
                p.setPoint(this.x+(this.width/2), this.y)
                return p;
            }
            else{// down
                var p = new Point();
                p.setPoint(this.x+(this.width/2), this.y+this.height)
                return p;
            }
        }
    }

    drawIcon(){
        this.iconWidth = this.width;
        this.iconHeight = this.height;
        const panel = document.getElementById('graphpanel');
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', 0);
        rect.setAttribute('y', 0);
        rect.setAttribute('height', this.iconHeight);
        rect.setAttribute('width', this.iconWidth);
        rect.setAttribute('stroke-width', '3');
        rect.setAttribute('stroke','black');
        rect.setAttribute('fill','white');
        panel.appendChild(rect);
        return rect;
    }

    getIconHeight(){
        return 20;
    }

    getIconWidth(){
        return 20;
    }

    addNode(node,p){ // not doing anything with p right now
        for(var i = 0; i<this.children.length; i++){
            if(this.children[i]===node){
                return true; // node is already a child
            }
        }
        this.children.push(node);
        return true;
    }

    addEdge(e){
        if(e !== undefined){

            this.edges.push(e);
            return true
        }
        return false
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
