'use strict'

/**
   A toolbar class consisting of selectable tool buttons (nodes and edges)
   @author Jeren Mckey
*/
class ToolBar{

	/**
	* Constructs a new toolbar object based on some graph
	* @param graph the graph used for construction
	*/
    constructor(graph) {
        this.tools = []
		this.prototypes = graph.getNodePrototypes()
		this.prototypes = this.prototypes.concat(graph.getEdgePrototypes())
		this.currentTool = undefined
	}

	/**
	* Returns the currently selected tool from this toolbar object
	* @return the node or edge object or null for the grabber
	*/
    getSelectedTool()
    {
		return this.currentTool
    }

	/**
	*  This method adds the icons from all of the prototypes to the toolbar at once. 
	*  Must be called only once from graphframe.
	*/
   add()
   {
	    const div = document.getElementById('toolbar')
		div.innerHTML = ''
		const grabButton = document.createElement('div')
		grabButton.setAttribute('name', 'Grabber')
		grabButton.setAttribute('class', 'toolbarButtons')
		grabButton.addEventListener('mousedown', event => {
			this.currentTool = undefined
		})
		div.appendChild(grabButton)
		const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
		svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns", "http://www.w3.org/2000/svg")
		let grabberBounds = new Rectangle()
		grabberBounds.setRect(0, 0, 20, 20)
		this.drawGrabber(grabberBounds.getMinX(), grabberBounds.getMinY(), svg)
		this.drawGrabber(grabberBounds.getMinX(), grabberBounds.getMaxY(), svg)
		this.drawGrabber(grabberBounds.getMaxX(), grabberBounds.getMinY(), svg)
		this.drawGrabber(grabberBounds.getMaxX(), grabberBounds.getMaxY(), svg)
		svg.setAttribute('padding', '20px')
		svg.setAttribute('width', '20px')
		svg.setAttribute('height', '20px')
		svg.setAttribute('style', 'dispaly:none')
		grabButton.appendChild(svg)	
	    for (let i = 0; i < this.prototypes.length; i++)
		{
			const div = document.getElementById('toolbar')
			const newButton = document.createElement('div')
			newButton.setAttribute('name', this.prototypes[i].constructor.name)
			newButton.setAttribute('class', 'toolbarButtons')
			newButton.addEventListener('mousedown', event => {
				let name = event.target.attributes.name.textContent
				let found = false
				for (let i = 0; i < this.prototypes.length; i++)
				{
					if (this.prototypes[i].constructor.name === name){
						console.log(this.prototypes[i].constructor.name)
						this.currentTool = this.prototypes[i]
						found = true
					}
				}
				if (!found) this.currentTool = undefined
			})
			div.appendChild(newButton)
			const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
			svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns", "http://www.w3.org/2000/svg")
			let icon = this.prototypes[i].drawIcon()
			let iconHeight = this.prototypes[i].getIconHeight()
			let iconWidth = this.prototypes[i].getIconWidth()
			svg.setAttribute('padding', '20px')
			svg.setAttribute('width', iconWidth)
			svg.setAttribute('height', iconHeight)
			svg.setAttribute('name', this.prototypes[i].constructor.name)
			svg.setAttribute('style', 'dispaly:none')
			icon.setAttribute('name', this.prototypes[i].constructor.name)
			svg.appendChild(icon)
			newButton.appendChild(svg)
		}
   }

   /**
   * Utility class for drawing the grabber icon on the toolbar
   */
   drawGrabber(x,y, svg){
        const SIZE = 8
        let rect = new Rectangle()
        rect.setRect(x - SIZE / 2, y - SIZE / 2, SIZE , SIZE)
        const sq = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
        sq.setAttribute('x', rect.getX())
        sq.setAttribute('y', rect.getY())
        sq.setAttribute('width', rect.getWidth())
        sq.setAttribute('height', rect.getHeight())
        sq.setAttribute('fill', 'purple')
        svg.appendChild(sq)
    }
  }


