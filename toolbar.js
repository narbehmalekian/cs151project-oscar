'use strict'

class ToolBar{

    constructor(graph) {
        this.tools = []
		const div = document.getElementById('toolbar')
		const newButton = document.createElement('button')
		newButton.setAttribute('name', 'Grabber')
		newButton.setAttribute('class', 'toolbarButtons')
		newButton.addEventListener('click', event => {
			let name = event.target.name
			let found = false
			for (let i = 0; i < this.prototypes.length; i++)
			{
				if (this.prototypes[i].constructor.name === name){
					console.log("true")
					this.currentTool = this.prototypes[i]
					found = true
				}
			}
			if (!found) this.currentTool = null
		})
		const textNew = document.createTextNode("Grabber")
		newButton.appendChild(textNew)
		div.appendChild(newButton)
		this.prototypes = graph.getNodePrototypes()
		this.prototypes.concat(graph.getEdgePrototypes())
		this.currentTool = null
	}

    getSelectedTool()
    {
		return this.currentTool
    }

	/**
		This method adds all of the prototypes to the toolbar at once. 
		Must be called only once from graphframe.
	**/
   add()
   {
	    for (let i = 0; i < this.prototypes.length; i++)
		{
			let icon = new Icon()
			const div = document.getElementById('toolbar')
			const newButton = document.createElement('button')
			newButton.setAttribute('name', this.prototypes[i].constructor.name)
			newButton.setAttribute('class', 'toolbarButtons')
			newButton.addEventListener('click', event => {
				let name = event.target.name
				let found = false
				for (let i = 0; i < this.prototypes.length; i++)
				{
					if (this.prototypes[i].constructor.name === name){
						console.log("true")
						this.currentTool = this.prototypes[i]
						found = true
					}
				}
				if (!found) this.currentTool = null
			})
			const textNew = document.createTextNode(this.prototypes[i].constructor.name)
			newButton.appendChild(textNew)
			div.appendChild(newButton)
		}
   }

   drawGrabber(x,y){
        const size = 5
        const panel = document.getElementById('graphpanel')
        let rect = new Rectangle()
        rect.setRect(x - SIZE / 2, y - SIZE / 2, SIZE, SIZE)
        const sq = document.creatElementNS("http://www.w3.org/2000/svg', 'rect'")
        sq.setAttribute('x', rect.getX())
        sq.setAttribute('y', rect.getY())
        sq.setAttribute('width', rect.Width())
        sq.setAttribute('height', rect.getHeight())
        sq.setAttribute('fill', rect.fill())
        panel.appedChild(sq)
    }
  }


class Icon {
	constructor(){
		const BUTTON_SIZE = 25
		const OFFSET = 5
	}
	getIconHeight() {return BUTTON_SIZE}
	getIconWidth() {return BUTTON_SIZE}
	paintIcon(x,y)
	{
		drawGrabber(x + OFFSET, y + OFFSET)
		drawGrabber(x + OFFSET, y + BUTTON_SIZE - OFFSET)
		drawGrabber(x + BUTTON_SIZE - OFFSET, y + OFFSET)
		drawGrabber(x + BUTTON_SIZE - OFFSET, y + BUTTON_SIZE - OFFSET)
	}
	paintEdgeIcon(x, y){
		
	}
}