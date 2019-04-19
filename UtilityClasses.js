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
		return width
	}
	getHeight(){
		return height
	}
	getX(){
		return this.x
	}
	getY(){
		return this.y
	}
	add(r){
		let x1 = Math.min(getMinX(), r.getMinX());
		let x2 = Math.max(getMaxX(), r.getMaxX());
		let y1 = Math.min(getMinY(), r.getMinY());
		let y2 = Math.max(getMaxY(), r.getMaxY());
		setRect(x1, y1, x2 - x1, y2 - y1);
	}
	getMinX(){
		return getX()
	}
	getMinY(){
		return getY()
	}
	getMaxX(){
		get
	}
	getMaxY(){
		
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
