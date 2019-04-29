'use strict'

class FieldNode{

constructor(){
	let name = MultiLineString();
	name.setJustification(MultiLineString.RIGHT);
	let value = MultiLineString();
	setBounds(0, 0, DEFAULT_WIDTH, DEFAULT_HEIGHT);
	} 

draw(g2){
	let panel = document.getElementByID('graphpanel');
	let b = getBounds();
	let leftWidth = name.getBounds(g2).getWidth();
	let equal = MultiLineString();
	equal.setText(" = ");
	let midWidth = equal.getBounds(g2).getWidth();

	let rightWidth = value.getBounds(g2).getWidth();
	if( rightWidth == 0){
		rightWidth = DEFAULT_WIDTH/2;
	}
	rightWidth = Math.max(rightWidth, boxWidth - midWidth/2);

	let nameBounds = b.getX(), b.getY(), leftWidth, b.getHeight(); 
	name.draw(g2, nameBounds);
	let mid = b.getX() + leftWidth, b.getY(), midWidth, b.getHeight();
	equal.draw(g2, mid); 
	let valueBounds = b.getMaxX() - rightWidth, b.getY(), rightWidth, b.getHeight(); 
	if( boxedValue){
		value.setJustification(MultiLineString.CENTER);
	}
	else{
		name.setJustification(MultiLineString.LEFT);
	}
	value.draw(g2, valueBounds);
	if(boxedValue){
		g2.draw(valueBounds);
	}
}

addEdge(e, p1, p2){
	if(e instanceof ObjectReferenceEdge && e.getEnd() instanceof ObjectNode){
		value.setText('');
		return true;
	}
	return false;
}

addNode(n, p){
	return n instanceof PointNode;
}

getConnectionPoint(d){
	let b = getBounds();
	return (b.getMaxX() + b.getX() + axisX)/2, b.getCenterY();
}

layout(g, g2, grid){
	let nameBounds = name.getBounds(g2); 
	let valueBounds = value.getBounds(g2);
	let equal = MultiLineString(); 
	equal.setText('=');
	let e = equal.getBounds(g2);
	let leftWidth = nameBounds.getWidth();
	let midWidth = e.getWidth();
	let rightWidth = valueBounds.getWidth();
	if(rightWidth == 0){
		rightWidth = DEFAULT_WIDTH/2; 
	}
	let rightWidth = Math.max(rightWidth, boxWidth - midWidth / 2);
	let width = leftWidth + midWidth + rightWidth;
	let height = Math.max(nameBounds.getHeight(), Math.max(valueBounds.getHeight(), e.getHeight()));

	let b = getBounds();
	setBounds(b.getX(), b.getY(), width, height); 
	axisX = leftWidth + midWidth /2 ;
}

setName(newValue){
	let name = newValue;
}

getName(){
	return name;
}

setValue(newValue){
	let value = newValue;
}

getValue(){
	return value;
}

setBoxWidth(newValue){
	let boxWidth = newValue;
}

isBoxedValue(){
	return boxedValue;
}

clone(){
	let cloned = clone(); 
      cloned.name = (MultiLineString)name.clone();
      cloned.value = (MultiLineString)value.clone();
      return cloned;
}

getAxisX(){
	return axisX;
}

getShape(){
	if(boxedValue){
		return valueBounds;
	}
	else{
		return undefined;
	}
}

}






































