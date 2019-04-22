'use strict'

class ToolBar{

       constructor() {
        group = new ButtonGroup() //need to make this still
        tools = []
        icon = null
        {
            const BUTTON_SIZE = 25
            const OFFSET = 5
            function getIconHeight() {return BUTTON_SIZE}
            function getIconWidth() {return BUTTON_SIZE}
            function paintIcon() {x,y}
            {
                drawGrabber(x + OFFSET, y + OFFSET)
                drawGrabber(x + OFFSET, y + BUTTON_SIZE - OFFSET)
                drawGrabber(x + BUTTON_SIZE - OFFSET, y + OFFSET)
                drawGrabber(x + BUTTON_SIZE - OFFSET, y + BUTTON_SIZE - OFFSET)
            }
        }
        let button = document.getElementById('button')
        let tooltip = document.getElementById('tooltip')
        //let editorResources = ResourceBundle.getBundle("com.horstmann.violet.framework.EditorStrings")
        //let tip = editorResources.getString("grabber.tooltip")
        //button.setToolTipText(tip)
        group.add(button)
        add(button)
        //  button.setSelected(true)
        tools.add(null)
        let item = document.getElementById('menuItem').addActionListener('click', event) //some function (event)
        // item.addActionListener(new ActionListener() {
        //     actionPerformed(event)
        //     {
        //        button.setSelected(true);
        //        if (popupListener != null)
        //           popupListener.actionPerformed(event);
        //     }
        // })
      //  popup.add(item)
        //const graphResources = ResourceBundle.getBundle(graph.getClass().getName() + "String")

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
  /**    // free up ctrl TAB for cycling windows
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
    **/

    function getSelectedTool(tools)
    {
        for (const i = 0; i < tools.length(); i++)
        {
           let button = document.getElementById('button')
           if (button === tools[i]) return tools;
        }
        return null;
    }

    function add(n)
    {
	     let icon = new Icon()
        {
           const BUTTON_SIZE = 25
           const OFFSET = 4
           function getIconHeight() { return BUTTON_SIZE; }
           function getIconWidth() { return BUTTON_SIZE; }
           function paintIcon(x,y)
           {
              const button = document.creatElementNS("http://www.w3.org/2000/svg', 'rect'")
              let width = n.getBounds().getWidth()
              let height = n.getBounds().getHeight()
              button.setAttribute('x', n.getX())
              button.setAttribute('y', n.getY())
              button.setAttribute('width', width)
              button.setAttribute('height', height)
              button.setAttribute('fill', n.fill())
              let scaleX = (BUTTON_SIZE - OFFSET)/ width
              let scaleY = (BUTTON_SIZE - OFFSET)/ height
              let scale = Math.min(scaleX, scaleY)
              button.translate(x, y);
              button.scale(scale, scale);
              button.translate(Math.max((height - width) / 2, 0), Math.max((width - height) / 2, 0));
              //n.setColor(Color.black);
              //  n.draw(g2);
              //g2.setTransform(oldTransform)
              //  panel.appendChilde(button)
           }
        }
     let button = document.getElementById('button')
    // button.setToolTipText(tip);
     group.add(button)
     add(button)
     tools.add(n)

     let item = document.getElementById('menuItem').addEventListener("click", event)
     // item.addActionListener(new
     //       ActionListener()
     //       {
     //          actionPerformed(event)
     //          {
     //             button.setSelected(true);
     //             if (popupListener != null)
     //                popupListener.actionPerformed(event);
     //          }
     //       });
     popup.add(item);
  }
   function add(e,tip)
   {
     let icon = new
        Icon()
        {
           function getIconHeight() { return BUTTON_SIZE; }
           function getIconWidth() { return BUTTON_SIZE; }
           function paintIcon(x,y)
           {
              let p = new PointNode()
              p.translate(OFFSET, OFFSET)
              let q = new PointNode()
              q.translate(BUTTON_SIZE - OFFSET, BUTTON_SIZE - OFFSET);
              e.connect(p, q)

              const icon = document.creatElementNS("http://www.w3.org/2000/svg', 'rect'")
              let width = e.getBounds().getWidth()
              let height = e.getBounds().getHeight()
              icon.setAttribute('x', e.getX())
              button.setAttribute('y', e.getY())
              button.setAttribute('width', width)
              button.setAttribute('height', height)
              button.setAttribute('fill', e.fill())
              let scaleX = (BUTTON_SIZE - OFFSET)/ width
              let scaleY = (BUTTON_SIZE - OFFSET)/ height
              let scale = Math.min(scaleX, scaleY)
              e.translate(x, y);
              e.scale(scale, scale);
              e.translate(Math.max((height - width) / 2, 0), Math.max((width - height) / 2, 0));

             // g2.setColor(Color.black);
              e.draw(n);
             // g2.setTransform(oldTransform);
           }
        };
          let constbutton = document.getElementById('button')
          //button.setToolTipText(tip);
          group.add(button);
          add(button);
          tools.add(e);
          let item = document.getElementById('menuItem').addEventListener('click',event)
     //    item.addActionListener(new
     //       ActionListener()
     //       {
     //          actionPerformed(event)
     //          {
     //             button.setSelected(true);
     //             if (popupListener !== null)
     //                popupListener.actionPerformed(event);
     //          }
     //       });
     // popup.add(item);
  }
  function drawGrabber(x,y){
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



