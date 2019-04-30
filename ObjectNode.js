'use strict';

class ObjectNode{ 

    constructor(){
        this.XGAP = 5;
        this.YGAP = 5; 
        this.DEFAULT_HEIGHT = 60;
        this.DEFAULT_WIDTH = 80; 
        this.topHeight = undefined; 
        this.name = undefined;
        let name = new MultiLineString();
        name.setUnderlined(true);
        name.setSize(MultiLineString.LARGE);
        this.parent= new Node();
        this.children = [];
        //add setBound method from Node
        setBounds(0, 0, DEFAULT_WIDTH, DEFAULT_HEIGHT);
    }

    draw(){
        let panel = document.getElementByID('graphpanel');
        //change to javascript
        var top = getTopRectangle();
        panel.appendChild(top);
        panel.appendChild(getBounds()); 
    }

    getTopRectangle(){
        //change later after getBounds method
        return new Rectangle2D.Double(getBounds().getX(),
                                      getBounds().getY(), getBounds().getWidth(), topHeight);
    }

    addEdge(e, p1, p2){
        return e instanceof ClassRelationshipEdge && e.getEnd() != undefined; 
    }

    getConnectionPoint(d){
        if (d.getX() > 0)
            //change to point later
            return new Point2D.Double(getBounds().getMaxX(),
                                      getBounds().getMinY() + topHeight / 2);
        else
            return new Point2D.Double(getBounds().getX(),
                                      getBounds().getMinY() + topHeight / 2);
    }

    setName(n){
        let name = n; 
    }

    getName(){
        return name; 
    }

    clone(){
        //copy node clone method
        let cloned = clone(); 
        cloned.name = name.clone(); 
        return cloned; 
    }

    addNode(n, p){
        let fields = getChildren();
        if (n instanceof PointNode) {
            return true;
        }
        if (!(n instanceof FieldNode)){
            return false;
        }
        if (fields.contains(n)) {
            return true;
        }
        for(let i = 0; i < fields.size() && fields.get(i).getBounds().getY() < p.getY(); i++ ){
            addChild(i, n); 
        }
        return true;
    }

    removeNode(g, n){
        let fields = getChildren(); 
        if (n == this){
            for (let i = fields.size() - 1; i >= 0; i--){
                g.removeNode(fields.get(i));
            }
        }
    }

    addChild(n){
        addChild(n);
        let b = getBounds();
        //make rectangle
        b.add(b.getX(), b.getY() + b.getHeight(),FieldNode.DEFAULT_WIDTH, FieldNode.DEFAULT_HEIGHT);
        setBounds(b);
    }
    
    drawIcon(){
        
    }
    
    getIconHeight(){
        
    }
    
    getIconWidth(){
        
    }

}
