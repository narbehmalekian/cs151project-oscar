'use strict'

class Rectangle {
	constructor() {
		this.x = 0
		this.y = 0
		this.width = 0
		this.height = 0
	}
	setRect(x, y, width, height){
		this.x = x
		this.y = y
		this.width = width
		this.height = height
	}
	setLocation(x, y){
		this.x = x
		this.y = y
	}
	setWidth(width){
		this.width = width
	}
	setHeight(height){
		this.height = height
	}
	getWidth(){
		return this.width
	}
	getHeight(){
		return this.height
	}
	getX(){
		return this.x
	}
	getY(){
		return this.y
	}	
	getMinX(){
		return this.x
	}
	getMinY(){
		return this.y
	}
	getMaxX(){
		return this.x + this.width
	}
	getMaxY(){
		return this.y + this.height
	}
	add(r){
		let x1 = Math.min(this.x, r.getMinX())
		let x2 = Math.max(this.x + this.width, r.getMaxX())
		let y1 = Math.min(this.y, r.getMinY())
		let y2 = Math.max(this.y + this.height, r.getMaxY())
		this.setRect(x1, y1, x2 - x1, y2 - y1);
	}
}

class Point {
	constructor() {
		this.x = 0
		this.y = 0
	}
	
	setPoint(x, y){
		this.x = x
		this.y = y
	}
	getX(){
		return this.x
	}
	getY(){
		return this.y
	}
}

class Line {
	constructor() {
		this.point1 = new Point()
		this.point2 = new Point()
	}
	
	setPoints(p1, p2){
		this.point1 = p1
		this.point2 = p2
	}
	getPoint1(){
		return this.point1
	}
	getPoint2(){
		return this.point2
	}
	getX1(){
		return this.point1.getX()
	}
	getY1(){
		return this.point1.getY()
	}
	getX2(){
		return this.point2.getX()
	}
	getY2(){
		return this.point2.getY()
	}
}

class Ellipse {
	constructor() {
		this.center = new Point()
		this.width = 0
		this.height = 0
	}
	
	setCenter(x, y){
		this.center.setPoint(x, y)
	}
	setWidth(width){
		this.width = width
	}
	setHeight(height){
		this.height = height
	}
	getCenter(){
		return this.center
	}
	getWidth(){
		return this.width
	}
	getHeight(){
		return this.height
	}
}


/**
   A grid to which points and rectangles can be "snapped". The
   snapping operation moves a point to the nearest grid point.
*/
class Grid
{
   /**
      Constructs a grid with no grid points.
   */
   constructor()
   {
      this.gridx = 0
	  this.gridy = 0
   }
   
   /**
      Sets the grid point distances in x- and y-direction
      @param x the grid point distance in x-direction
      @param y the grid point distance in y-direction
   */
   setGrid(x, y)
   {
      this.gridx = x
      this.gridy = y
   }
   
   /**
      Draws this grid inside a rectangle.
      @param g2 the graphics context
      @param bounds the bounding rectangle
   */
   draw(bounds)
   {
	  const panel = document.getElementById('graphpanel')
	  const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line')
	  const line2 = document.createElementNS('http://www.w3.ord/2000/svg', 'line')
      let pale_blue = 'lightcyan'
	  
      for (let x = bounds.getX(); x < bounds.getMaxX(); x += this.gridx)
	     line1.setAttribute('x1', x)
		 line1.setAttribute('y1', bounds.getY())
		 line1.setAttribute('x2', x)
		 line1.setAttribute('y2', bounds.getMaxY())
		 line1.setAttribute('fill', pale_blue)
		 panel.appendChild(line)
      for (let y = bounds.getY(); y < bounds.getMaxY(); y += this.gridy)
		 line2.setAttribute('x1', bounds.getX())
		 line2.setAttribute('y1', y)
		 line2.setAttribute('x2', bounds.getMaxX())
		 line2.setAttribute('y2', y)
		 line2.setAttribute('fill', pale_blue)
		 line.appendChild(line2)
   }

   /**
      Snaps a point to the nearest grid point
      @param p the point to snap. After the call, the 
      coordinates of p are changed so that p falls on the grid.
   */
   snap(p)
   {
      let x = 0
      if (this.gridx === 0)
         x = p.getX()
      else
         x = Math.round(p.getX() / this.gridx) * this.gridx
      let y = 0
      if (this.gridy === 0)
         y = p.getY()
      else
         y = Math.round(p.getY() / this.gridy) * this.gridy
         
      p.setLocation(x, y)
   }

   /**
      Snaps a rectangle to the nearest grid points
      @param r the rectangle to snap. After the call, the 
      coordinates of r are changed so that all of its corners
      falls on the grid.
   */
   snap(r)
   {
      let x = 0
      let w = 0
      if (this.gridx === 0)
      {
         x = r.getX()
         w = r.getWidth()
      }
      else
      {
         x = Math.round(r.getX() / this.gridx) * this.gridx
         w = Math.ceil(r.getWidth() / (2 * this.gridx)) * (2 * this.gridx)
      }
      let y = 0
      let h = 0
      if (this.gridy === 0)
      {
         y = r.getY()
         h = r.getHeight()
      }
      else
      {
         y = Math.round(r.getY() / this.gridy) * this.gridy
         h = Math.ceil(r.getHeight() / (2 * this.gridy)) * (2 * this.gridy)
      }
         
      r.setRect(x, y, w, h);     
   }
}

class Direction{
	   /**
		  Constructs a direction between two points
		  @param p the starting point
		  @param q the ending point
	   */
	   constructor(p, q)
	   {
		   this.x = 0
		   this.y = 0
		   setDirection(q.getX() - p.getX(),
			 q.getY() - p.getY())
	   }
		/**
		  Constructs a direction (normalized to length 1).
		  @param dx the x-value of the direction
		  @param dy the corresponding y-value of the direction
	   */
	   setDirection(dx, dy)
	   {
		  this.x = dx;
		  this.y = dy;
		  let length = Math.sqrt(this.x * this.x + this.y * this.y)
		  if (length === 0) return
		  this.x = this.x / length
		  this.y = this.y / length
	   }
	   /**
		  Turns this direction by an angle.
		  @param angle the angle in degrees
	   */
	   turn(angle)
	   {
		  let a = angle
		  return new Direction(
			 this.x * Math.cos(a) - this.y * Math.sin(a),
			 this.x * Math.sin(a) + this.y * Math.cos(a))
	   }

	   /**
		  Gets the x-component of this direction
		  @return the x-component (between -1 and 1)
	   */
	   getX()
	   {
		  return this.x
	   }

	   /**
		  Gets the y-component of this direction
		  @return the y-component (between -1 and 1)
	   */
	   getY()
	   {
		  return this.y
	   }

	   static getNorth(){ return new Direction(0, -1) }
	   static getSouth() { return new Direction(0, 1) }
	   static getEast() { return new Direction(1, 0) }
	   static getWest() { return new Direction(-1, 0) }
	}



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
	if (edgeCounter === 7) edge = true
	return edge	
}

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
	if (nodeCounter === 6) node = true
	return node	
}

function dropdownClick(event){
  if (event.target.id === "filecontent"){
	  var x = document.getElementById("filedropdown")
	  var y = document.getElementById("editdropdown")
  }
  else{
	  var x = document.getElementById("editdropdown")
	  var y = document.getElementById("filedropdown")
  }
  if (x.className.indexOf("w3-show") === -1) {  
    x.className += " w3-show";
  } else { 
    x.className = x.className.replace(" w3-show", "")
  }
  if (y.className.indexOf("w3-show") !== -1){
	y.className = y.className.replace("w3-show", "")
  }
}