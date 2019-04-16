'use strict'

class Toolbar{
    
    constructor(graph) {
        this.group = new ButtonGroup()
        this.tools = new ArrayList()

        this.icon = new Icon()
        {
            const BUTTON_SIZE = 25
            const OFFSET = 5
            function getIconHeight() {return BUTTON_SIZE}
            function getIconWidth() {return BUTTON_SIZE}
            function paintIcon() {c,g,x,y}
            {
                let g2 = (Graphics2D)g
                drawGrabber(g2, x + OFFSET, y + OFFSET);
                drawGrabber(g2, x + OFFSET, y + BUTTON_SIZE - OFFSET);
                drawGrabber(g2, x + BUTTON_SIZE - OFFSET, y + OFFSET);
                drawGrabber(g2, x + BUTTON_SIZE - OFFSET, y + BUTTON_SIZE - OFFSET);
            }
        }
        let button = JToggleButton(icon)
        let editorResources = ResourceBundle.getBundle("com.horstmann.violet.framework.EditorStrings")
        let tip = editorResources.getString("grabber.tooltip")
        button.setToolTipText(tip)
        group.add(button)
        add(button)
        button.setSelected(true)
        tools.add(null)

        let item = new JMenuItem(tip, icon)
        item.addActionListener(new ActionListener() {
            actionPerformed(event)
            {
               button.setSelected(true);
               if (popupListener != null)
                  popupListener.actionPerformed(event);
            }
        })
        popup.add(item)

        const graphResources = ResourceBundle.getBundle(graph.getClass().getName() + "String")

        let nodeTypes = graph.getNodePrototypes()
        for (const i = 0; i < nodeTypes.length; i++)
        {
         tip = graphResources.getString("node" + (i + 1) + ".tooltip");
         add(nodeTypes[i], tip);
        }
        edgeTypes = graph.getEdgePrototypes();
        for (const i = 0; i < edgeTypes.length; i++)
        {
         tip = graphResources.getString("edge" + (i + 1) + ".tooltip");
         add(edgeTypes[i], tip);
        }

      // free up ctrl TAB for cycling windows
      let oldKeys = getFocusTraversalKeys(KeyboardFocusManager.FORWARD_TRAVERSAL_KEYS);
      let newKeys = new HashSet();
      newKeys.addAll(oldKeys);
      newKeys.remove(KeyStroke.getKeyStroke("ctrl TAB"));
      setFocusTraversalKeys(KeyboardFocusManager.FORWARD_TRAVERSAL_KEYS, newKeys);
      oldKeys = getFocusTraversalKeys(KeyboardFocusManager.BACKWARD_TRAVERSAL_KEYS);
      newKeys = new HashSet();
      newKeys.addAll(oldKeys);
      newKeys.remove(KeyStroke.getKeyStroke("ctrl shift TAB"));
      setFocusTraversalKeys(KeyboardFocusManager.BACKWARD_TRAVERSAL_KEYS, newKeys)
    }
    
    /**
      Gets the node or edge prototype that is associated with
      the currently selected button
      @return a Node or Edge prototype
   */
    getSelectedTool()
    {
        for (const i = 0; i < tools.size(); i++)
        {
           button = JToggleButton.getComponent(i);
           if (button.isSelected()) return tools.get(i);
        }
        return null;
    }

    /**
      Adds a node to the tool bar.
      @param n the node to add
      @param tip the tool tip
   */
    add(n, tip)
    { let icon = new
        Icon()
        {
           const BUTTON_SIZE = 25
           const OFFSET = 4
           function getIconHeight() { return BUTTON_SIZE; }
           function getIconWidth() { return BUTTON_SIZE; }
           function paintIcon(c,g,x,y)
           {
              let width = n.getBounds().getWidth();
              let height = n.getBounds().getHeight();
              let g2 = (Graphics2D)g;
              let scaleX = (BUTTON_SIZE - OFFSET)/ width;
              let scaleY = (BUTTON_SIZE - OFFSET)/ height;
              let scale = Math.min(scaleX, scaleY);

              let oldTransform = g2.getTransform();
              g2.translate(x, y);
              g2.scale(scale, scale);
              g2.translate(Math.max((height - width) / 2, 0), Math.max((width - height) / 2, 0));
              g2.setColor(Color.black);
              n.draw(g2);
              g2.setTransform(oldTransform);
           }
        };

     let button = new JToggleButton(icon);
     button.setToolTipText(tip);
     group.add(button);      
     add(button);
     tools.add(n);
     
     let item = new JMenuItem(tip, icon);
     item.addActionListener(new
           ActionListener()
           {
              actionPerformed(event)
              {
                 button.setSelected(true);
                 if (popupListener != null)
                    popupListener.actionPerformed(event);
              }
           });
     popup.add(item);
  }
   showPopup(panel, point, listener)
   {
       let popupListner = listener
       let popup = new JPopupMenu()
       popup.showPopup(panel,point.getX(), point.getY())

   }

   /**
      Adds an edge to the tool bar.
      @param n the node to add
      @param tip the tool tip
   */
  add(e,tip)
  {
     let icon = new      
        Icon()
        {
           function getIconHeight() { return BUTTON_SIZE; }
           function getIconWidth() { return BUTTON_SIZE; }
           function paintIcon(c,g,x,y)
           {
              let g2 = (Graphics2D)g; 
              let p = new PointNode();
              p.translate(OFFSET, OFFSET);
              let q = new PointNode();
              q.translate(BUTTON_SIZE - OFFSET, BUTTON_SIZE - OFFSET);
              e.connect(p, q);
              
              let bounds = new Rectangle2D.Double();
              bounds.add(p.getBounds());
              bounds.add(q.getBounds());
              bounds.add(e.getBounds(g2));
              
              let width = bounds.getWidth();
              let height = bounds.getHeight();
              let scaleX = (BUTTON_SIZE - OFFSET)/ width;
              let scaleY = (BUTTON_SIZE - OFFSET)/ height;
              letscale = Math.min(scaleX, scaleY);

              letoldTransform = g2.getTransform();
              g2.translate(x, y);
              g2.scale(scale, scale);
              g2.translate(Math.max((height - width) / 2, 0), Math.max((width - height) / 2, 0));
                             
              g2.setColor(Color.black);
              e.draw(g2);
              g2.setTransform(oldTransform);
           }
        };
     constbutton = new JToggleButton(icon);               
     button.setToolTipText(tip);
     group.add(button);
     add(button);      
     tools.add(e);

     let item = new JMenuItem(tip, icon);
     item.addActionListener(new
           ActionListener()
           {
              actionPerformed(event)
              {
                 button.setSelected(true);
                 if (popupListener !== null)
                    popupListener.actionPerformed(event);
              }
           });
     popup.add(item);
  }

    drawGrabber(x,y){
        const size = 5
        const panel = document.getElementById('graphpanel')
    }

}



