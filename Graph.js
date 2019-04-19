

/**
   A graph consisting of selectable nodes and edges.
*/
class Graph {
   /**
      Constructs a graph with no nodes or edges.
   */
   constructor()
   {
      this.nodes = []
      this.edges = []
      this.nodesToBeRemoved = []
      this.edgesToBeRemoved = []
	  this.minBounds = new Rectangle()
   }

   /**
      Adds an edge to the graph that joins the nodes containing
      the given points. If the points aren't both inside nodes,
      then no edge is added.
      @param e the edge to add
      @param p1 a point in the starting node
      @param p2 a point in the ending node
   */
   connect(e, p1, p2)
   {
      let n1 = findNode(p1)
      let n2 = findNode(p2)
      if (n1 !== null)
      {
         e.connect(n1, n2);
         if (n1.addEdge(e, p1, p2) && e.getEnd() !== null)
         {
            this.edges.push(e)
            if (!this.nodes.contains(e.getEnd()))
               this.nodes.push(e.getEnd())
            return true
         }
      }
      return false
   }

   /**
      Finds a node containing the given point.
      @param p a point
      @return a node containing p or null if no nodes contain p
   */
   findNode(p)
   {
      for (let i = nodes.length - 1; i >= 0; i--)
      {
         let n = this.nodes[i]
         if (n.contains(p)) return n
      }
      return null
   }

   /**
      Finds an edge containing the given point.
      @param p a point
      @return an edge containing p or null if no edges contain p
   */
   findEdge(p)
   {
      for (let i = this.edges.length - 1; i >= 0; i--)
      {
         let e = this.edges[i]
         if (e.contains(p)) return e
      }
      return null
   }
   
   /**
      Draws the graph
   */
   draw()
   {

      for (let i = 0; i < this.nodes.length; i++)
      {
         let n = this.nodes[i]
         n.draw()
      }

      for (let i = 0; i < this.edges.length; i++)
      {
         let e = this.edges[i]
         e.draw()
      }
   }
   
   /**
      Removes a node and all edges that start or end with that node
      @param n the node to remove
   */
   removeNode(n)
   {
	  
      for (let i = 0; i < this.edges.length; i++)
      {
         let e = this.edges[i]
         if (e.getStart() === n || e.getEnd() === n)
            removeEdge(e)
      }
	  let index = this.nodes.indexOf(n)
	  this.nodes.splice(index, 1)
   }

   /**
      Removes an edge from the graph.
      @param e the edge to remove
   */
   removeEdge(e)
   {
      this.edges.splice(this.edges.indeOf(e), 1)
   }


   /**
      Gets the smallest rectangle enclosing the graph
      @return the bounding rectangle
   */
   getBounds()
   {
      let r = minBounds
      for (let i = 0; i < this.nodes.length; i++)
      {
         let n = this.nodes[i]
         let b = n.getBounds()
         if (r === null) r = b
         else r.add(b)
      }
      for (let i = 0; i < this.edges.length; i++)
      {
         let e = this.edges[i]
         r.add(e.getBounds())
      }
	  let temp = new Rectangle()
	  temp.setTopLeft(r.getX(), r.getY())
	  temp.setWidth(r.getWidth() + AbstractNode.getShadowGap())
	  temp.setHeight(r.getHeight() + AbstractNode.getShadowGap())
      return (r === null ? new Rectangle() : temp)
   }
   
   getMinBounds() { return this.minBounds }
   setMinBounds(newValue) { this.minBounds = newValue }
 
   /**
      Gets the nodes of this graph.
      @return an unmodifiable collection of the nodes
   */
   getNodes() { return this.nodes }

   /**
      Gets the edges of this graph.
      @return an unmodifiable collection of the edges
   */
   getEdges() { return this.edges }

   /**
      Adds a node to this graph. This method should
      only be called by a decoder when reading a data file.
      @param n the node to add
      @param p the desired location
   */
   addNode(n, p)
   {
	  if (n.isNode()){
		  let bounds = n.getBounds();
		  n.translate(p.getX() - bounds.getX(), 
			 p.getY() - bounds.getY())
		  this.nodes.push(n)
	  }
   }

   /**
      Adds an edge to this graph. 
      @param e the edge to add
      @param start the start node of the edge
      @param end the end node of the edge
   */
   connect(e, start, end)
   {
      e.connect(start, end);
      this.edges.push(e);
   }
} 
module.exports = { Graph: Graph }