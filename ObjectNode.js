'use strict'

class ObjectNode{ 
	let children = []; 
	let parent = new Node(); 


constructor(){
	let name = new MultiLineString();
 	name.setUnderlined(true);
    name.setSize(MultiLineString.LARGE); 

    //add setBound method from Node
    setBounds(0, 0, DEFAULT_WIDTH, DEFAULT_HEIGHT);
}

draw(){
	let panel = document.getElementByID('graphpanel');
	//change to javascript
	Rectangle2D top = getTopRectangle();
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

layout(g, grid){
	let b = name.getBounds();
	//double check this
	b.add(0, 0, DEFAULT_WIDTH, DEFAULT_HEIGHT - YGAP); 
	let leftWidth = 0;
	let rightWidth = 0; 
	let fields = getChildren();
	if(field.size() == 0){
		let height = 0; 
	}
	else { 
		let height = YGAP; 
	}
	for (let i = 0; i < fields.size(); i++) {
		let f = fields.get(i); 
		f.layout(g, grid);
		let b2 = getBounds();
		height += b2.getBounds().getHeight() + YGAP; 
		let axis = getAxisX();
		leftWidth = Math.max(leftWidth, axis);
        rightWidth = Math.max(rightWidth, b2.getWidth() - axis);
	}

	let width = 2 * Math.max(leftWidth, rightWidth) + 2 * XGAP;
	width = Math.max(width, b.getWidth());
    width = Math.max(width, DEFAULT_WIDTH);
    //create new Rectangle using javascript
    let b = getBounds().getX(), getBounds().getY(), width, b.getHeight() + height;
    grid.snap(b);
    setBounds(b);
    topHeight = b.getHeight() - height;
    let ytop = b.getY() + topHeight + YGAP;
    let xmid = b.getCenterX();
    for (let i = 0; i < fields.size(); i++){
    	let f = fields.get(i);
    	let b2 = f.getBounds();
    	f.setBounds(xmid - f.getAxisX(), ytop, f.getAxisX() + rightWidth, b2.getHeight()); 
    	f.setBoxWidth(rightWidth);
      	ytop += f.getBounds().getHeight() + YGAP;
	}
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

removeNode(g, n){
	let fields = getChildren(); 
	if (n == this){
       	for (let i = fields.size() - 1; i >= 0; i--){
            g.removeNode(fields.get(i));
         }
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

let XGAP = 5;
let YGAP = 5; 
let DEFAULT_HEIGHT = 60;
let DEFAULT_WIDTH = 80; 
let topHeight = undefined; 
let name = undefined;


