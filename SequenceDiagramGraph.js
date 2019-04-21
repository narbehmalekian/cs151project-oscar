'use strict'

function SequenceDiagramGraph { 
	let NODE_PROTOTYPES = [];
	let EDGE_PROTOTYPES = [];
}

extends(Graph, SequenceDiagramGraph); 


SequenceDiagramGraph.prototype.add = function(Node n, Point p){
	let nodes = getNodes(); 
	let inside = false;

	for( let i = 0; i < nodes.length; i++){
		if(nodes[i].contains(p)) { 
			inside = true;
		}
	}

    if (!inside) {
    	return false;
    }

	if (!super.add(n, p)) {
		return false;
	}
    return true;
}

SequenceDiagramGraph.prototype.removeEdge = function(Edge e){
	super.removeEdge(e);
	if(e instanceof CallEdge && e.getEnd().getChildren().size() == 0){
		removeNode(e.getEnd());
	}
}

SequenceDiagramGraph.prototype.layout = function(Grid grid){
	super.layout(grid);

	let topLevelCalls = [];
	let objects = [];
	let nodes = getNodes();

	for( let i = 0; i < nodes.length; i++){
		if(n instanceof CallNode && n.getParent() == undefined){
			topLevelCalls.add(n);
		}
		else if( n instanceof ImplicitParameterNode){
			objects.add(n);
		}
	}
	let edges = getEdges();
	for( let i = 0; i < nodes.length; i++){
		if(e instanceof CallEdge){
			let end = e.getEnd();
		}
		if( end instanceof CallNode){
			end.setSignaled(e.isSignal());
		}
	}
	let left = 0; 

	//find max height of objects

	let top = 0; 
	for(let i = 0; i < objects.length; i++){
		let n = objects.get(i); 
		n.translate(0, -n.getBounds().getY());
		top = Math.max(top, n.getTopRectangle().getHeight());
	}

	for (let i = 0; i < topLevelCalls.size(); i++)
      {
         let call = topLevelCalls.get(i);
         call.layout(this, grid);
      }

    for( let i = 0; i < objects.length; i++){
    	if(n instanceof CallNode){
    		top = Math.max(top, n.getBounds().getY()
           	+ n.getBounds().getHeight());
    	}

    	top += CallNode.CALL_YGAP;

    for (let i = 0; i < objects.length; i++)
      {
         let n = objects.get(i);
         let b = n.getBounds();
         //n.setBounds(new Rectangle2D.Double(
            //b.getX(), b.getY(), 
            //b.getWidth(), top - b.getY()));         
      }
   }

SequenceDiagramGraph.prototype.draw = function(Grid grid){
	let panel = document.getElementByID('graphpanel');
	layout(grid); 

	let nodes = getNodes();
	for(let i = 0; i < nodes.length; i++){
		if (!(nodes[i] instanceof CallNode)){
			panel.appendChild(nodes[i]);
		}   
	}
	for(let i = 0; i < nodes.length; i++){
		if (nodes[i] instanceof CallNode){
			panel.appendChild(nodes[i]);
	}   

	let edges = getEdges();
	for(let i = 0; i < edges.length; i++){
         panel.appendChild(edges[i]);
     }
}




 







