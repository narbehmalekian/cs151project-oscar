/**
* Author: Narbeh Malekian
*/

'use strict';

class ObjectNode{ 

    /**
    * Constructs a new object node 
    */
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
    /**
    * Draws the object node on the graph panel context
    */

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
        }
        if(Math.abs(largest+20-this.width)>5){ //if width is not matching the text resize
            this.width = largest+20;
            panel.removeChild(rect);
            panel.removeChild(title);
            panel.removeChild(body);
            this.draw();
            console.log('Resizing ObjectNode');
        }
    }
    /** 
    *Translates the location of the shape
    *@param dx the change in x
    *@param dy the change in y
    */ 

    translate(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
    /**
    *Returns true if a point inside Object Node 
    *@param p a point object
    *@return a boolean value
    */
    contains(p){
        return p.getX()>this.x && p.getX()<(this.x+this.width) && p.getY()>this.y && p.getY()<(this.y+this.height);
    }

    /**
    * Gets the bounding rectangle for the Object Node shape
    @return rectangle node
    */ 
    getBounds(){
        let rect = new Rectangle()
        rect.setRect(this.x, this.y, this.width, this.height);
        return rect
    }
    /**
    * Creates a new Object Node object and returns the new object
    */
    clone(){
        let clone = new ObjectNode();
        return clone;
    }
    /** 
    *Returns the connection point from this object node to another node
    *@param other the other node
    */
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
    /**
    *Returns a graphic of the Object node object
    *@return an SVG element
    */

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
    /**
    *Returns the height of Object Node graphic
    *@return a number
    */
    getIconHeight(){
        return 20;
    }
    /**
    *Returns the width of Object Node graphic
    *@return a number
    */
    getIconWidth(){
        return 20;
    }
    /**
    * Adds a node as a child node to this node
    * @param node the child node
    * @param p the point at which the node is being added
    * @return true if this node accepts the given node as a child
   */

    addNode(node,p){ // not doing anything with p right now
        for(var i = 0; i<this.children.length; i++){
            if(this.children[i]===node){
                return true; // node is already a child
            }
        }
        this.children.push(node);
        return true;
    }
    /**
    * Adds an edge that originates at this node
    * @param p the point that the user selected as
    * the starting point. This may be used as a hint if 
    * edges are ordered.
    * @param e the edge to add
    * @return true if the edge was added
   */
    addEdge(e){
        if(e !== undefined){

            this.edges.push(e);
            return true
        }
        return false
    }
    /**
    *Notifies this node that a node is being removed.
    *@param g the ambient graph
    *@param n the node to be removed
   */
    removeNode(node){
        for(var i = 0; i<this.children.length; i++){
            if(this.children[i]===node){

            }
        }
    }
    /**
    *Notifies this node that an edge is being removed.
    *@param g the ambient graph
    *@param e the edge to be removed
   */

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
