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

function download(filename, graphSave) {
    let element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(graphSave))
    element.setAttribute('download', filename)

    element.style.display = 'none'
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
 }
 


document.addEventListener('DOMContentLoaded', function () {
	const simpleGraph = new Graph()
	const objectGraph = new Graph()
	simpleGraph.setNodePrototype(new CircleNode())
	let graph = simpleGraph
	//objectGraph.setNodePrototype(new ObjectNode())
	// objectGraph.setEdgePrototype(new ObjectReferenceEdge())
	const simpleToolBar = new ToolBar(simpleGraph)
	const objectToolBar = new ToolBar(objectGraph)
	let toolBar = simpleToolBar
	toolBar.add()
	graph.draw()
	addGraphType(simpleGraph, 'Simple Graph', simpleToolBar)
	addGraphType(objectGraph, 'Object Diagram', objectToolBar)
	let lastSelected = null
	let mouseDownPoint = null
	let lastMousePoint = null

	const panel = document.getElementById('graphpanel')
	const deleteButton = document.getElementById('delete')
	const saveButton = document.getElementById('save')
	let selected = null
	let menuFunct = false
	let dragStartPoint = null
	let dragStartBounds = null
	let rubberBandStart = null
	
	function addGraphType(graphType, title, toolbar) {
		let dropdown = document.getElementById('graphdropdown')
		let a = document.createElement('a')
		a.setAttribute('href', '#')
		let t = document.createTextNode(title)
		dropdown.appendChild(a)
		a.appendChild(t)
		a.addEventListener('mousedown', event => {
			graph = graphType
			repaint()
			toolBar = toolbar
			toolBar.add()
		})
	}

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
	  if (isNode(lastSelected)) graph.removeNode(lastSelected)
	  else if (isEdge(lastSelected)) graph.removeEdge(lastSelected)
	  repaint()
	})

	saveButton.addEventListener('mousedown', event => {
	  let textBox = document.getElementById('text-val')
	  let saveButton = document.getElementById('dwn-btn')
	  textBox.setAttribute('style', 'display:inline')
	  saveButton.setAttribute('style', 'display:inline')
	  menuFunct = true
	})

	document.getElementById('open').addEventListener('mousedown', event => {
		menuFunct = true
	})

	document.getElementById("dwn-btn").addEventListener("click", function(){
		let textEntry = document.getElementById("text-val").value

		download(textEntry, graph)
		}, false)

	document.addEventListener('mousedown', event => {
		let x = document.getElementById('editdropdown')
		let y = document.getElementById('filedropdown')
		let z = document.getElementById('graphdropdown')
		if (x.className.indexOf('w3-show') !== -1){
			x.className = x.className.replace('w3-show', '')
		}
		if (y.className.indexOf('w3-show') !== -1 && menuFunct !== true){
			y.className = y.className.replace('w3-show', '')
		}
		if (z.className.indexOf('w3-show') !== -1){
			z.className = z.className.replace('w3-show', '')
		}
		menuFunct = false
	})
})
