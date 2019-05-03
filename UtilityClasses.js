'use strict'
/*
These are mostly all reconstructions of utility classes normally found in tha java api or utility
functions that are necessary for providing "interface" functionality for the graph framework and handling
some properties of the graph editor navigation
*/

/**
* A rectangle class based on the java Rectangle2D class
* @author Jeren Mckey
*/
class Rectangle {
	/**
	* Constructs a new Rectangle object
	*/
	constructor() {
		this.x = 0
		this.y = 0
		this.width = 0
		this.height = 0
	}
	
	/**
	* Sets the coordinates and size of the rectangle object
	* @param x the x-coordinate for the rectangle
	* @param y the y-coordinate for the rectangle
	* @param width a number
	* @param height a number
	*/
	setRect(x, y, width, height){
		this.x = x
		this.y = y
		this.width = width
		this.height = height
	}
	
	/**
	* Sets the coordinates for the rectangle object
	* @param x the x-coordinate for the rectangle
	* @param y the y-coordinate for the rectangle
	*/
	setLocation(x, y){
		this.x = x
		this.y = y
	}
	
	/** 
	* Sets the width for the rectangle
	* @param width a number
	*/
	setWidth(width){
		this.width = width
	}
	
	/** 
	* Sets the width for the rectangle
	* @param height a number
	*/
	setHeight(height){
		this.height = height
	}
	
	/** 
	* Returns the width for the rectangle
	* @return a number
	*/
	getWidth(){
		return this.width
	}
	
	/** 
	* Returns the height for the rectangle
	* @return a number
	*/
	getHeight(){ return this.height }
	
	/** 
	* Returns the x-coordinate
	* @return a number
	*/		
	getX(){ return this.x }
	
	/** 
	* Returns the y-coordinate
	* @return a number
	*/	
	getY(){ return this.y }

	/** 
	* Returns the minimum x-coordinate of the entire rectangle
	* @return a number
	*/		
	getMinX(){ return this.x}
	
	/** 
	* Returns the minimum y-coordinate of the entire rectangle
	* @return a number
	*/		
	getMinY(){ return this.y }
	
	/** 
	* Returns the maximum x-coordinate of the entire rectangle
	* @return a number
	*/		
	getMaxX(){ return this.x + this.width }
	
	/** 
	* Returns the maximum y-coordinate of the entire rectangle
	* @return a number
	*/		
	getMaxY(){ return this.y + this.height }
	
	/** 
	* Resets the attributes of this rectangle to be the union of this and another rectangle
	* @param the other rectangle object
	*/		
	add(r){
		let x1 = Math.min(this.x, r.getMinX())
		let x2 = Math.max(this.x + this.width, r.getMaxX())
		let y1 = Math.min(this.y, r.getMinY())
		let y2 = Math.max(this.y + this.height, r.getMaxY())
		this.setRect(x1, y1, x2 - x1, y2 - y1);
	}
	
	/** 
	* Returns the center x-coordinate of the entire rectangle
	* @return a number
	*/		
	getCenterX(){ return this.x + (this.width / 2) }
	
	/** 
	* Returns the center y-coordinate of the entire rectangle
	* @return a number
	*/		
	getCenterY(){ return this.y + (this.height / 2) }
}

/**
* A point class based on the java Point2D class
* @author Jeren Mckey
*/
class Point {
	/**
	* Constructs a new Point object
	*/
	constructor() {
		this.x = 0
		this.y = 0
	}
	
	/**
	* Sets the coordinates for the point object
	* @param x the x-coordinate for the point
	* @param y the y-coordinate for the point
	*/
	setPoint(x, y){
		this.x = x
		this.y = y
	}
	
	/** 
	* Returns the x-coordinate of the point
	* @return a number
	*/
	getX(){
		return this.x
	}
	
	/** 
	* Returns the y-coordinate of the point
	* @return a number
	*/
	getY(){
		return this.y
	}
}

/**
* A line class based on the java Line2D class
* @author Jeren Mckey
*/
class Line {
	/**
	* Constructs a new Line object
	*/
	constructor() {
		this.point1 = new Point()
		this.point2 = new Point()
	}
	
	/**
	* Sets the coordinates for the line object
	* @param p1 the first point
	* @param p2 the second point
	*/
	setPoints(p1, p2){
		this.point1 = p1
		this.point2 = p2
	}
	
	/** 
	* Returns point1 of the line
	* @return a point object
	*/
	getPoint1(){
		return this.point1
	}
	
	/** 
	* Returns point2 of the line
	* @return a point object
	*/
	getPoint2(){
		return this.point2
	}
	
	/** 
	* Returns the x1-coordinate of the line
	* @return a number
	*/
	getX1(){
		return this.point1.getX()
	}
	
	/** 
	* Returns the y1-coordinate of the line
	* @return a number
	*/
	getY1(){
		return this.point1.getY()
	}
	
	/** 
	* Returns the x2-coordinate of the line
	* @return a number
	*/
	getX2(){
		return this.point2.getX()
	}
	
	/** 
	* Returns the y2-coordinate of the line
	* @return a number
	*/
	getY2(){
		return this.point2.getY()
	}
	
	/**
	* Returns the distance from a point to a line segment. The distance measured is the 
	* distance between the specified point and the closest point between the specified end points. 
	* If the specified point intersects the line segment in between the end points, this method returns 0.0.
	* @param x1 the x1-coordinate of the line
	* @param y1 the y1-coordinate of the line
	* @param x2 the x2-coordinate of the line 
	* @param y2 the x2-coordinate of the line
	* @param px the x-coordinate of the point
	* @param py the y-coordinate of the point
	* @return a number representing the distance
	*/
	ptSegDist(x1, y1, x2, y2, px, py) 
	{
        let num = Math.sqrt(this.ptSegDistSq(x1, y1, x2, y2, px, py))
		console.log(num)
		return num
	}
	
	/**
	* Returns the square of the distance from a point to a line segment. The distance measured is the 
	* distance between the specified point and the closest point between the specified end points. 
	* If the specified point intersects the line segment in between the end points, this method returns 0.0.
	* @param x1 the x1-coordinate of the line
	* @param y1 the y1-coordinate of the line
	* @param x2 the x2-coordinate of the line 
	* @param y2 the x2-coordinate of the line
	* @param px the x-coordinate of the point
	* @param py the y-coordinate of the point
	* @return a number representing the square of the distance
	*/
	ptSegDistSq(x1, y1, x2, y2, px, py) 
	{
        // Adjust vectors relative to x1,y1
        // x2,y2 becomes relative vector from x1,y1 to end of segment
        x2 -= x1
        y2 -= y1
        // px,py becomes relative vector from x1,y1 to test point
        px -= x1
        py -= y1
        let dotprod = px * x2 + py * y2
        let projlenSq = null
        if (dotprod <= 0) {
            // px,py is on the side of x1,y1 away from x2,y2
            // distance to segment is length of px,py vector
            // "length of its (clipped) projection" is now 0.0
            projlenSq = 0
        } else {
            // switch to backwards vectors relative to x2,y2
            // x2,y2 are already the negative of x1,y1= >x2,y2
            // to get px,py to be the negative of px,py= >x2,y2
            // the dot product of two negated vectors is the same
            // as the dot product of the two normal vectors
            px = x2 - px
            py = y2 - py
            dotprod = px * x2 + py * y2
            if (dotprod <= 0) {
                // px,py is on the side of x2,y2 away from x1,y1
                // distance to segment is length of (backwards) px,py vector
                // "length of its (clipped) projection" is now 0.0
                projlenSq = 0
            } else {
                // px,py is between x1,y1 and x2,y2
                // dotprod is the length of the px,py vector
                // projected on the x2,y2= >x1,y1 vector times the
                // length of the x2,y2= >x1,y1 vector
                projlenSq = dotprod * dotprod / (x2 * x2 + y2 * y2)
            }
        }
        // Distance to line is now the length of the relative point
        // vector minus the length of its projection onto the line
        // (which is zero if the projection falls outside the range
        //  of the line segment).
        let lenSq = px * px + py * py - projlenSq
        if (lenSq <  0) {
            lenSq = 0
        }
        return lenSq
	}

}

/**
* An ellipse class based on the java Ellipse2D class
* @author Jeren Mckey
*/
class Ellipse {
	/**
	* Constructs a new Ellipse object
	*/
	constructor() {
		this.center = new Point()
		this.width = 0
		this.height = 0
	}
	
	/**
	* Sets the center point of the ellipse object
	* @param x the x-coordinate of the point
	* @param y the y-cooridnate of the pont
	*/
	setCenter(x, y){ this.center.setPoint(x, y) }
	
	/**
	* Sets the width of the ellipse object
	* @param width a number
	*/
	setWidth(width){ this.width = width }
	
	/**
	* Sets the height of the ellipse object
	* @param height a number
	*/
	setHeight(height){ this.height = height }
	
	/**
	* Returns the center of the ellipse object
	* @return a point object
	*/
	getCenter(){ return this.center }
	
	/**
	* Returns the width of the ellipse object
	* @return a number
	*/
	getWidth(){ return this.width }
	
	/**
	* Returns the height of the ellipse object
	* @return a number
	*/
	getHeight(){
		return this.height
	}
}

/**
* Function to test if some object can be considered an "Edge" object
* @param someObject an object to test
* @return a boolean value
*/ 
function isEdge(someObject){
	function can(obj, methodName){
		return ((typeof obj[methodName]) === "function")
	}

	let edge = false
	let edgeCounter = 0
	if (can(someObject, "connect")){
		edgeCounter++
	}
	if (can(someObject, "contains")){
		edgeCounter++
	}
	if (can(someObject, "getBounds")){
		edgeCounter++
	}
	if (can(someObject, "clone")){
		edgeCounter++
	}
	if (can(someObject, "getStart")){
		edgeCounter++
	}
	if (can(someObject, "getEnd")){
		edgeCounter++
	}
	if (can(someObject, "draw")){
		edgeCounter++
	}
	if (can(someObject, "drawIcon")){
		edgeCounter++
	}
	if (can(someObject, "getIconHeight")){
		edgeCounter++
	}
	if (can(someObject, "getIconWidth")){
		edgeCounter++
	}
	if (can(someObject, "getConnectionPoints")){
		edgeCounter++
	}
	if (edgeCounter === 11) edge = true
	return edge	
}

/**
* Function to test if some object can be considered a "Node" object
* @param someObject an object to test
* @return a boolean value
*/ 
function isNode(someObject){
	function can(obj, methodName)
	{
		return ((typeof obj[methodName]) === "function")
	}

	let node = false
	let nodeCounter = 0
	if (can(someObject, "draw")){
		nodeCounter++
	}
	if (can(someObject, "translate")){
		nodeCounter++
	}
	if (can(someObject, "contains")){
		nodeCounter++
	}
	if (can(someObject, "getBounds")){
		nodeCounter++
	}
	if (can(someObject, "clone")){
		nodeCounter++
	}
	if (can(someObject, "getConnectionPoint")){
		nodeCounter++
	}
	if (can(someObject, "drawIcon")){
		nodeCounter++
	}
	if (can(someObject, "getIconHeight")){
		nodeCounter++
	}
	if (can(someObject, "getIconWidth")){
		nodeCounter++
	}
	if (can(someObject, "addNode")){
		nodeCounter++
	}
	if (can(someObject, "addEdge")){
		nodeCounter++
	}
	if (can(someObject, "removeNode")){
		nodeCounter++
	}
	if (can(someObject, "removeEdge")){
		nodeCounter++
	}
	if (nodeCounter === 13) node = true
	return node	
}

/**
* Function to handle navbar click events
* @param the click event
*/ 
function dropdownClick(event){
  if (event.target.id === "filecontent"){
	  var x = document.getElementById("filedropdown")
	  var y = document.getElementById("editdropdown")
	  var z = document.getElementById("graphdropdown")
  }
  else if (event.target.id === "editcontent"){
	  var x = document.getElementById("editdropdown")
	  var y = document.getElementById("filedropdown")
	  var z = document.getElementById("graphdropdown")
  }
  else if (event.target.id === "graphcontent"){
	  var x = document.getElementById("graphdropdown")
	  var y = document.getElementById("filedropdown")
	  var z = document.getElementById("editdropdown")
  }
  if (x.className.indexOf("w3-show") === -1) {  
    x.className += " w3-show";
  } else { 
    x.className = x.className.replace(" w3-show", "")
  }
  if (y.className.indexOf("w3-show") !== -1){
	y.className = y.className.replace("w3-show", "")
  }
  if (z.className.indexOf("w3-show") !== -1){
	z.className = z.className.replace("w3-show", "")
  }
}