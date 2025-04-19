import { useEffect, useRef } from "react";
import Cytoscape from "cytoscape";
import fcose from "cytoscape-fcose";
import nodeHtmlLabel from "cytoscape-node-html-label";

// TODO: Move this imports to a higher level
if (!Cytoscape.prototype.hasOwnProperty("nodeHtmlLabel")) {
  Cytoscape.use(nodeHtmlLabel);
}

if (!Cytoscape.prototype.hasOwnProperty("fcose")) {
  Cytoscape.use(fcose);
}

export const Entity = ({ elements, onNodeClick, selectedNode, centerNode }) => {
  const cyRef = useRef(null);
  const cyContainerRef = useRef(null);

  useEffect(() => {
    if (!cyContainerRef.current) return;
    if (cyRef.current) {
      cyRef.current.destroy();
      cyRef.current = null;
    }

    // Create center node if provided
    const centerNodeData = centerNode ? {
      data: {
        id: centerNode,
        label: centerNode,
        type: "domain",
        icon: "box",
        width: 80,
        height: 80,
      }
    } : null;

    const cy = Cytoscape({
      container: cyContainerRef.current,
      elements: centerNodeData ? [...elements, centerNodeData] : elements,
      style: [
        {
          selector: "node",
          style: {
            "background-color": "#F59E0B",
            "background-image": `url(/images/graph/file.svg)`,
            "background-fit": "none",
            "background-position-x": "50%",
            "background-position-y": "50%",
            "border-width": 4,
            "border-color": "#FEF3C7",
            width: 80,
            height: 80,
          },
        },
        {
          selector: "node[type='domain']",
          style: {
            "background-color": "#4569E1",
            "background-image": `url(/images/graph/box.svg)`,
            "background-fit": "none",
            "background-position-x": "50%",
            "background-position-y": "50%",
            "border-width": 4,
            "border-color": "#D9D9FF",
            width: 80,
            height: 80,
          },
        },
        {
          selector: "node:selected",
          style: {
            "border-width": 6,
            "border-color": "#FFFFFF",
          },
        },
        {
          selector: "edge",
          style: {
            "curve-style": "bezier",
            "control-point-distances": [20, -20],
            "control-point-weights": [0.25, 0.75],
            "line-color": "#6366F1",
            width: 2,
            label: "data(label)",
            "font-size": "10px",
            "text-background-color": "#4338CA",
            "text-background-opacity": 1,
            "text-background-padding": 3,
            "text-border-color": "#4338CA",
            "text-border-width": 1,
            "text-border-opacity": 1,
            color: "#FFFFFF",
          },
        },
      ],
      layout: {
        name: "circle",
        fit: true,
        animate: false,
        padding: 200,
        avoidOverlap: true,
        nodeDimensionsIncludeLabels: true,
        spacingFactor: 1.2,
        radius: 200,
        startAngle: 0,
        sweep: 360,
        clockwise: true,
        sort: undefined
      },
    });

    cy.nodeHtmlLabel([
      {
        query: "node",
        tpl: (data) => `
          <div style="display: flex; flex-direction: column; align-items: center; margin-top: 100px;">
            <div style="display: flex; align-items: center; justify-content: center;
                background-color: ${data.type === 'domain' ? '#4569E1' : '#F59E0B'};
                border-radius: 15px;
                padding: 2px 10px;
                box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
              ">
              <img src="/images/systems/${data.icon}.svg" alt="${data.icon}" style="
                width: 16px;
                height: 16px;
                margin-right: 6px;
                padding: 1px;
                background-color: white;
                border-radius: 15px;"
              />
              <div style="
                color: white;
                font-size: 12px;
                display: inline-block;
              ">
                ${data.label}
              </div>
            </div>
          </div>
        `,
        cssClass: "cy-node-html-label",
      },
    ]);

    // Add click handler
    cy.on('tap', 'node', (evt) => {
      const node = evt.target;
      if (onNodeClick && node.id() !== centerNode) {
        onNodeClick(node.id());
      }
    });

    // Select the node if provided
    if (selectedNode) {
      const node = cy.getElementById(selectedNode);
      if (node) {
        node.select();
      }
    }

    cyRef.current = cy;

    // Ensure proper rendering and visibility
    setTimeout(() => {
      cy.resize();
      cy.fit();

      if (centerNode) {
        const centerNodeElement = cy.getElementById(centerNode);
        if (centerNodeElement) {
          // Position the center node in the middle
          centerNodeElement.position({
            x: cy.width() / 2,
            y: cy.height() / 2
          });

          // Arrange other nodes in a circle around it
          const otherNodes = cy.nodes().filter(node => node.id() !== centerNode);
          const radius = Math.min(cy.width(), cy.height()) * 0.3;
          const angleStep = (2 * Math.PI) / otherNodes.length;

          otherNodes.forEach((node, index) => {
            const angle = index * angleStep;
            node.position({
              x: cy.width() / 2 + radius * Math.cos(angle),
              y: cy.height() / 2 + radius * Math.sin(angle)
            });
          });
        }
      }

      cy.zoom({
        level: cy.zoom() * 0.6,
        renderedPosition: { x: cy.width() / 2, y: cy.height() / 2 },
      });
    }, 100);

    return () => {
      if (cyRef.current) {
        cyRef.current.destroy();
      }
    };
  }, [elements, onNodeClick, selectedNode, centerNode]);

  return (
    <div className="relative w-full h-full" ref={cyContainerRef}>
      <div id="cy" />
    </div>
  );
};
