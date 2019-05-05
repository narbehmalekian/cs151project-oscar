/**
* Author: Narbeh Malekian
*/

'use strict';

class ObjectNode{ 

    constructor(){
        this.height = 50;
        this.width = 100;
        this.iconHeight = 20;
        this.iconWidth = 20;
        this.x = 50;
        this.y = 50;
        this.children = [];
        this.edges = [];
        this.color = '#ffffbb';
        this.name = 'Name me!';
        this.methods = '';
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

        const title = document.createElementNS('http://www.w3.org/2000/svg','text');
        title.setAttribute('x',this.x+this.width/2);
        title.setAttribute('y',this.y+20);
        title.setAttribute('fill','black');
        title.setAttribute('font-size','20px');
        title.setAttribute('text-anchor','middle');
        title.innerHTML = this.name;
        panel.appendChild(title);
        let largest = title.getBoundingClientRect().width;
        console.log('title: '+title.getBoundingClientRect().width)

        const body = document.createElementNS('http://www.w3.org/2000/svg','text');
        panel.appendChild(body);
        
        let rows = this.methods.split(/\n|\r/);
        for(let i=0; i<rows.length; i++){
            let row = document.createElementNS('http://www.w3.org/2000/svg','tspan');
            row.setAttribute('x',this.x+this.width/2);
            row.setAttribute('y',this.y+50+i*18);
            row.setAttribute('fill','black');
            row.setAttribute('font-size','16px');
            row.setAttribute('text-anchor','middle');
            row.innerHTML = rows[i];
            body.appendChild(row);
            largest = Math.max(largest,row.getBoundingClientRect().width);
            console.log('row: '+row.getBoundingClientRect().width);
        }
        console.log('largest: '+largest);
        if(Math.abs(largest+20-this.width)>1){
            this.width = largest+20;
            panel.removeChild(rect);
            panel.removeChild(title);
            panel.removeChild(body);
            this.draw();
        }
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

    removeEdge(g,e){

    }

    setColor(c){
        this.color = c;
    }

    getColor(){
        return this.color;
    }

    setName(n){
        this.name = n;
        this.autoResize();
    }

    getName(){
        return this.name;
    }

    getMethods(){
        return this.methods;
    }

    setMethods(m){
        this.methods = m;
        this.autoResize();
    }
    
    autoResize(){
        this.height = this.methods.split(/\n|\r/).length*18+45;
    }
}
