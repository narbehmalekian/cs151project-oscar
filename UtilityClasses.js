'use strict'


class Rectangle {
	constructor() {
		this.xPoints = [0, 0, 0, 0]
		this.yPoints = [0, 0, 0, 0]
	}
	setRectPoints(xPoints, yPoints){
		this.xPoints = xPoints
		this.yPoints = yPoints
	}
	getWidth(){
		return this.xPoints[1] - this.xPoints[0]
	}
	getHeight(){
		return this.yPoints[4] - this.yPoints[0]
	}
	getTopLeft(){
		let p = new Point();
		p.setPoint(xPoints[0], yPoints[0])
		return p
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