'use strict'

class ImplicitParameterNode{

	constructor(){
		let name = new MultiLineString();
		name.setUnderlined(true);
		setBounds(0,0,DEFAULT_WIDTH,DEFAULT_HEIGHT);
		let topHeight = DEFAULT_TOP_HEIGHT;
	}

	contains(p){
		let bounds = getBounds();
		return bounds.getX() <= p.getX() && p.getX() <= bounds.getX() + bounds.getWidth();
	}

	draw(g2){
		let top = getTopRectangle();
		g2.draw(top);
		name.draw(g2,top);
		let xmid = getBounds().getCenterX();
		let line = new Line2D(xmid, top.getMaxY(), xmid, getBounds().getMaxY());
		let oldStroke = g2.getStroke(); 
		g2.draw(line);
		g2.setStroke(oldStroke);
	}

	getTopRectangle(){
		return new Rectangle2D(getBounds().getX(), getBounds().getY(), getBounds().getWidth(), topHeight);
	}

	getShape(){
		return getTopRectangle();
	}

	addEdge(e, p1, p2){
		return false;
	}

	getConnectionPoint(d){
		if(d.getX() > 0){
			return new Point2D(getBounds().getMaxX(), getBounds().getMinY() + topHeight / 2); 
		}
		else{
			return new Point2D(getBounds().getX(), getBounds().getMinY() + topHeight / 2);
		}
	}

	layout(g, g2, grid){
		let b = name.getBounds(g2);
		b.add(new Rectangle2D(0,0,DEFAULT_WIDTH, DEFAULT_TOP_HEIGHT));
		let top = new Rectangle2D(getBounds().getX(), getBounds().getY(),
         b.getWidth(), b.getHeight());
		grid.snap(top);
		setBounds(new Rectangle2D(top.getX(), top.getY(), 
         top.getWidth(), getBounds().getHeight()));
		let topHeight = top.getHeight();
	}

	setName(n){
		let name = n;
	}

	getName(){
		return name;
	}

	clone(){
		let cloned = ImplicitParameterNode.clone();
		cloned.name = MultiLineString.clone();
		return cloned;
	}

	addNode(n, p){
		return n instanceof CallNode || n instanceof PointNode;
	}


}