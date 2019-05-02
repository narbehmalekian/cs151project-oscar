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

/**
* Downloads the graph object to a file
* @param filename the name for the downloaded file
* @param graphSave the graph to be saved
*/
function download(filename, graphSave) {
	//get svg element.
	var svg = graphSave

	//get svg source.
	var serializer = new XMLSerializer();
	var source = serializer.serializeToString(svg);

	//add name spaces.
	if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
		source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
	}
	if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
		source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
	}

	//add xml declaration
	source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
    let element = document.createElement('a')
    element.setAttribute('href', 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source))
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
	objectGraph.setNodePrototype(new ObjectNode())
	objectGraph.setEdgePrototype(new ObjectReferenceEdge())
	const simpleToolBar = new ToolBar(simpleGraph)
	const objectToolBar = new ToolBar(objectGraph)
	let toolBar = simpleToolBar
	toolBar.add()
	graph.draw()
	addGraphType(simpleGraph, 'Simple Graph', simpleToolBar)
	addGraphType(objectGraph, 'Object Diagram', objectToolBar)
	let lastSelected = undefined
	let mouseDownPoint = undefined
	let lastMousePoint = undefined

	const panel = document.getElementById('graphpanel')
	const deleteButton = document.getElementById('delete')
	const saveButton = document.getElementById('save')
	let selected = undefined
	let menuFunct = false
	let dragStartPoint = undefined
	let dragStartBounds = undefined
	let rubberBandStart = undefined
	
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

  /**
  * Updates the graphpanel space by repainting all of the current objects
  */
  function repaint() {
		panel.innerHTML = ''
		let graphBounds = graph.getBounds()
		graph.draw()
		if (selected !== undefined){
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

	/**
	* Returns the mouseclick on the graphpanel as a point object
	* @param a click event
	* @return a point object
	*/
	function mouseLocation(event) {
	  var rect = panel.getBoundingClientRect()
	  let p = new Point()
	  p.setPoint(event.clientX - rect.left, event.clientY - rect.top)
	  return p

	}

	/**
	* Removes the selected object, a node or an edge
	* @param the object to be removed
	*/
	function removeSelected(sel){
	  if (isNode(sel))
	  {
		 graph.removeNode(sel)
	  }
	  else if (isEdge(sel))
	  {
		 graph.removeEdge(sel)
	  }          
	  selected = undefined
	  repaint()
	}

	//Event listener for panel click functionality (selecting and creating new nodes/edges)
	panel.addEventListener('mousedown', event => {
	   let mousePoint = mouseLocation(event)
	   let n = graph.findNode(mousePoint) 
	   let e = graph.findEdge(mousePoint);
	   let tool = toolBar.getSelectedTool()
	   if (tool === undefined) // select
	   {
		  if (e !== undefined)
		  {
			 selected = e
		  }
		  else if (n !== undefined)
		  {
			 selected = n
			 dragStartPoint = mousePoint
			 dragStartBounds = n.getBounds()
		  }
		  else 
		  {
			 selected = undefined
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
		  else if (n !== undefined)
		  {
			 selected = n
			 dragStartPoint = mousePoint
			 dragStartBounds = n.getBounds()
		  }
	   }
	   else if (isEdge(tool))
	   {
		  if (n !== undefined) rubberBandStart = mousePoint
	   }
	   lastMousePoint = mousePoint
	   lastSelected = selected
	   repaint()
	})

	//Event listener for dragging objects
	panel.addEventListener('mousemove', event => {
	if (dragStartPoint === undefined) return
	let mousePoint = mouseLocation(event)
	if (selected !== undefined) {
	  const bounds = selected.getBounds();
	  selected.translate(
		dragStartBounds.getX() - bounds.getX()
		  + mousePoint.getX() - dragStartPoint.getX(),
		dragStartBounds.getY() - bounds.getY() 
		  + mousePoint.getY() - dragStartPoint.getY());
	  repaint()
	}
	})

	//Event listener for handling repainting and cloning
	panel.addEventListener('mouseup', event => {
	   let tool = toolBar.getSelectedTool()
	   if (rubberBandStart !== undefined)
	   {
		  let mousePoint = mouseLocation(event)
		  let proto = tool
		  let newEdge = proto.clone()
		  if (graph.connect(newEdge, 
				 rubberBandStart, mousePoint))
			 selected = newEdge
	   }

	   repaint()

	   lastMousePoint = undefined;
	   dragStartBounds = undefined;
	   rubberBandStart = undefined;
	   lastSelected = selected;
	   selected = undefined;
	})

	//delete object functionality
	deleteButton.addEventListener('mousedown', event => {
	  if (isNode(lastSelected)) graph.removeNode(lastSelected)
	  else if (isEdge(lastSelected)) graph.removeEdge(lastSelected)
	  repaint()
	})

	//reveals actualy save feature on nav bar
	saveButton.addEventListener('mousedown', event => {
	  let textBox = document.getElementById('text-val')
	  let saveButton = document.getElementById('dwn-btn')
	  textBox.setAttribute('style', 'display:inline')
	  saveButton.setAttribute('style', 'display:inline')
	  menuFunct = true
	})

	document.getElementById("dwn-btn").addEventListener("click", function(){
		let textEntry = document.getElementById("text-val").value

		download(textEntry, document.getElementById('graphpanel'))
		})

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
