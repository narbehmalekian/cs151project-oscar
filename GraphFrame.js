'use strict' 
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
  panel.appendChild(square)
}

document.addEventListener('DOMContentLoaded', function () {
  const graph = new Graph()
  graph.setNodePrototype(new CircleNode())
  const toolBar = new ToolBar(graph)
  toolBar.add()
  graph.draw()
  let lastSelected = null
  let selectedButton = null
  let mouseDownPoint = null
  let lastMousePoint = null
  
  const panel = document.getElementById('graphpanel')
  const deleteButton = document.getElementById('delete')
  let selected = null
  let dragStartPoint = null
  let dragStartBounds = null
  let rubberBandStart = null

  function repaint() {
	 panel.innerHTML = ''
	 let graphBounds = graph.getBounds()
	 graph.draw()
	 if (selected !== null){
		 if (!graph.getNodes().includes(selected)
			   && !graph.getEdges().includes(selected)) 
		 {
			removeSelected(selected)
		 }
		 else if (isNode(selected))
		 {
			const grabberBounds = selected.getBounds()
			drawGrabber(grabberBounds.getMinX(), grabberBounds.getMinY())
			drawGrabber(grabberBounds.getMinX(), grabberBounds.getMaxY())
			drawGrabber(grabberBounds.getMaxX(), grabberBounds.getMinY())
			drawGrabber(grabberBounds.getMaxX(), grabberBounds.getMaxY())
		 }
		 else if (isEdge(selected))
		 {
			lineObject = selected.getConnectionPoints();
			drawGrabber(line.getX1(), line.getY1())
			drawGrabber(line.getX2(), line.getY2())
		 }
	 }
  }
  
  function mouseLocation(event) {
    var rect = panel.getBoundingClientRect()
	  let p = new Point()
	  p.setPoint(event.clientX - rect.left, event.clientY - rect.top)
	  return p
    
  }
  
  function removeSelected(sel){
	  if (isNode(sel))
      {
         graph.removeNode(sel)
      }
      else if (isEdge(sel))
      {
         graph.removeEdge(sel)
      }          
      selected = null
      repaint()
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
	   else if (isNode(tool))
	   {
		  let proto = tool.clone()
		  let added = graph.addNode(proto, mousePoint)
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
	   else if (isEdge(tool))
	   {
		  if (n !== null) rubberBandStart = mousePoint
	   }
	   lastMousePoint = mousePoint
	   lastSelected = selected
	   repaint()
  })

  panel.addEventListener('mousemove', event => {
    if (dragStartPoint === null) return
    let mousePoint = mouseLocation(event)
    if (selected !== null) {
      const bounds = selected.getBounds();
      selected.translate(
        dragStartBounds.getX() - bounds.getX()
          + mousePoint.getX() - dragStartPoint.getX(),
        dragStartBounds.getY() - bounds.getY() 
          + mousePoint.getY() - dragStartPoint.getY());
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
	   lastSelected = selected;
	   selected = null;
  })
  
  deleteButton.addEventListener('mousedown', event => {
	  console.log("test")
	  if (isNode(lastSelected)) graph.removeNode(lastSelected)
      else if (isEdge(lastSelected)) graph.removeEdge(lastSelected)
	  repaint()
  })
  
})
