'use strict' 

const abstractNode = require('./AbstractNode.js')

/**
* Draws a single "grabber", a filled square
* @param g2 the graphics context
* @param x the x coordinate of the center of the grabber
* @param y the y coordinate of the center of the grabber
*/
function drawGrabber(x, y)
{
  const panel = document.getElementById('graphpanel')
  const SIZE = 5
  let temp = new Rectangle()
  temp.setRect(x - SIZE / 2, y - SIZE / 2, SIZE, SIZE)
  const square = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
  square.setAttribute('x', temp.getX())
  square.setAttribute('y', temp.getY())
  square.setAttribute('width', temp.getWidth())
  square.setAttribute('height', temp.getHeight())
  square.setAttribute('fill', 'purple')
}

class CircleNode extends abstractNode.AbstractNode{
    constructor() { 
		this.x = 0
		this.y = 0
		this.size = 20
	}
    getBounds(){
        let rect = new Rectangle()
		rect.setRect(this.x, this.y, this.width, this.height)
		return rect
      }
	clone() { return super.clone() }
    contains(p){
      return (this.x + this.size / 2 - p.getX()) ** 2 + (this.y + this.size / 2 - p.getY()) ** 2 <= this.size ** 2 / 4
    }
    translate(dx, dy) {
      this.x += dx
      this.y += dy
    }
    draw(){
      const panel = document.getElementById('graphpanel')
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      circle.setAttribute('cx', this.x + this.size / 2)
      circle.setAttribute('cy', this.y + this.size / 2)
      circle.setAttribute('r', this.size / 2)
      circle.setAttribute('fill', 'black')
      panel.appendChild(circle)
    }
	getConnectionPoint(other){
	  let centerX = x + this.size / 2
      let centerY = y + this.size / 2
      let dx = other.getX() - centerX
      let dy = other.getY() - centerY
      let distance = Math.sqrt(dx * dx + dy * dy)
      if (distance === 0) return other
      else {
		  let p = new Point()
		   p.setPoint(centerX + dx * (this.size / 2) / distance, centerY + dy * (this.size / 2) / distance)
		   return p
	  }
	}
 }

document.addEventListener('DOMContentLoaded', function () {
  const graph = new Graph()
  const n1 = createCircleNode(10, 10, 5, 'black')
  let p = new Point()
  p.setPoint(10, 10)
  graph.addNode(n1, p)
  graph.draw()
  let selectedItems = []
  let lastSelected = null
  let selectedButton = null
  let mouseDownPoint = null
  let lastMousePoint = null
  
  const panel = document.getElementById('graphpanel')
  const toolbar = document.getElementByClassName('toolbar')[0]
  const toolbarButtons = toolbar.getElementsByTagName('button')
  let selected = null
  let dragStartPoint = null
  let dragStartBounds = null
  let rubberBandStart = null

  function repaint() {
     panel.innerHTML = ''
      let bounds = getBounds()
      let graphBounds = graph.getBounds()
      graph.draw()

      let end = selectedItems.length
	  let i = 0
      let toBeRemoved = []
      while (i < end)
      {
         selected = selectedItems[i]               
      
         if (!graph.getNodes().contains(selected)
               && !graph.getEdges().contains(selected)) 
         {
            toBeRemoved.push(selected)
         }
         else if (selected.isNode())
         {
            grabberBounds = selected.getBounds();
            drawGrabber(grabberBounds.getMinX(), grabberBounds.getMinY())
            drawGrabber(grabberBounds.getMinX(), grabberBounds.getMaxY())
            drawGrabber(grabberBounds.getMaxX(), grabberBounds.getMinY())
            drawGrabber(grabberBounds.getMaxX(), grabberBounds.getMaxY())
         }
         else if (selected.isEdge())
         {
            lineObject = selected.getConnectionPoints();
            drawGrabber(line.getX1(), line.getY1())
            drawGrabber(line.getX2(), line.getY2())
         }
		 i++
      }

      i = 0
      while (i < toBeRemoved.length())      
	  {
         removeSelected(toBeRemoved[i])
		 i++
	  }
      
      if (dragMode === getDragRubberband())
      {
		 const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line')
		 line1.setAttribute('x1', mouseDownPoint.getX())
		 line1.setAttribute('y1', mouseDownPoint.getY())
		 line1.setAttribute('x2', lastMousePoint.getX())
		 line1.setAttribute('y2', lastMousePoint.getY())
		 line1.setAttribute('fill', purple)
         panel.appendChild(line1)
      }      
      else if (dragMode === getDragLasso())
      {
         let x1 = mouseDownPoint.getX()
         let y1 = mouseDownPoint.getY()
         let x2 = lastMousePoint.getX()
         let y2 = lastMousePoint.getY()
         lasso = new Rectangle()
		 lasso.setRect(Math.min(x1, x2), 
               Math.min(y1, y2), Math.abs(x1 - x2) , Math.abs(y1 - y2))
	     const square = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
		 square.setAttribute('x', lasso.getX())
		 square.setAttribute('y', lasso.getY())
		 square.setAttribute('width', lasso.getWidth())
		 square.setAttribute('height', lasso.getHeight())
		 square.setAttribute('fill', purple)
		 panel.appendChild(square)
      }      
  }
  
  function mouseLocation(event) {
    var rect = panel.getBoundingClientRect()
	  let p = new Point()
	  p.setPoint(event.clientX - rect.left, event.clientY - rect.top)
	  return p
    
  }
  
  function removeSelected(sel){
	  if (sel.isNode())
      {
         graph.removeNode(sel)
      }
      else if (sel.isEdge())
      {
         graph.removeEdge(sel)
      }          
      selected = null
      repaint()
  }
  
  /**
      Gets the node or edge prototype that is associated with
      the currently selected button
      @return a node or edge protoype
   */
   function getSelectedTool()
   {
      //checkButtons for which ones are chosen
      return null
   }
  
  panel.addEventListener('mousedown', event => {
       let mousePoint = mouseLocation(event)
	   let n = graph.findNode(mousePoint) 
	   let e = graph.findEdge(mousePoint);
	   let tool = toolBar.getSelectedTool()
	   if (tool === null) // select
	   {
		  if (e !== null)
		  {
			 selected = e
		  }
		  else if (n !== null)
		  {
			 selected = n
			 dragStartPoint = mousePoint
			 dragStartBounds = n.getBounds()
		  }
		  else 
		  {
			 selected = null
		  }
	   }
	   else if (tool.isNode())
	   {
		  let proto = tool
		  let newNode = proto.clone()
		  let added = graph.add(newNode, mousePoint)
		  if (added)
		  {
			 selected = newNode
			 dragStartPoint = mousePoint
			 dragStartBounds = newNode.getBounds()
		  }
		  else if (n !== null)
		  {
			 selected = n
			 dragStartPoint = mousePoint
			 dragStartBounds = n.getBounds()
		  }
	   }
	   else if (tool.isEdge())
	   {
		  if (n !== null) rubberBandStart = mousePoint
	   }
	   lastMousePoint = mousePoint;
	   repaint();
  })

  panel.addEventListener('mousemove', event => {
    if (dragStartPoint === null) return
    let mousePoint = mouseLocation(event)
    if (selected !== null) {
      const bounds = selected.getBounds();
      
      selected.translate(
        dragStartBounds.x - bounds.x 
          + mousePoint.x - dragStartPoint.x,
        dragStartBounds.y - bounds.y 
          + mousePoint.y - dragStartPoint.y);
      repaint()
    }
  })
  
  panel.addEventListener('mouseup', event => {
       let tool = toolBar.getSelectedTool()
	   if (rubberBandStart !== null)
	   {
		  let mousePoint = mouseLocation(event)
		  let proto = tool
		  let newEdge = proto.clone()
		  if (graph.connect(newEdge, 
				 rubberBandStart, mousePoint))
			 selected = newEdge
	   }

	   repaint()

	   lastMousePoint = null;
	   dragStartBounds = null;
	   rubberBandStart = null;
  })
  
  toolbar.addEventListener('nodebuttonpress', event => {
	selectedButton = 'node'
  })
})
