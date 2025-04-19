import { useEffect, useRef } from "react";
import Cytoscape from "cytoscape";
import fcose from "cytoscape-fcose";
import nodeHtmlLabel from "cytoscape-node-html-label";

// eslint-disable-next-line react-hooks/rules-of-hooks
if (!Cytoscape.prototype.hasOwnProperty("nodeHtmlLabel")) {
  Cytoscape.use(nodeHtmlLabel);
}

if (!Cytoscape.prototype.hasOwnProperty("fcose")) {
  Cytoscape.use(fcose);
}

export const System = ({ elements, onNodeClick, selectedNode }) => {
  const cyRef = useRef(null);
  const cyContainerRef = useRef(null);

  useEffect(() => {
    if (!cyContainerRef.current) return;
    if (cyRef.current) {
      cyRef.current.destroy();
      cyRef.current = null;
    }

    const cy = Cytoscape({
      container: cyContainerRef.current,
      elements: [
        // Add center node
        {
          data: {
            id: 'center',
            label: 'Systems',
            type: 'center',
            icon: 'boxes',
          }
        },
        ...elements
      ],
      style: [
        {
          selector: "node",
          style: {
            "background-color": "#16A34A",
            "background-image": `url(/images/graph/boxes.svg)`,
            "background-fit": "none",
            "background-position-x": "50%",
            "background-position-y": "50%",
            "border-width": 4,
            "border-color": "#BBF7D0",
            width: 80,
            height: 80,
          },
        },
        {
          selector: "node[type='center']",
          style: {
            "background-color": "#4569E1",
            "background-image": `url(/images/graph/boxes.svg)`,
            "background-fit": "none",
            "background-position-x": "50%",
            "background-position-y": "50%",
            "border-width": 4,
            "border-color": "#D9D9FF",
            width: 100,
            height: 100,
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
            width: 2,
            "line-color": "#cccccc",
            "target-arrow-color": "#cccccc",
            "target-arrow-shape": "triangle",
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
        query: "node[type='center']",
        tpl: (data) => `
      <div style="display: flex; flex-direction: column; align-items: center; margin-top: 140px;">
        <div style="display: flex; align-items: center; justify-content: center;
            background-color: #4569E1;
            border-radius: 15px;
            padding: 4px 15px;
            box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
          ">
          <img src="/images/systems/${data.icon}.svg" alt="${data.icon}" style="
            width: 20px;
            height: 20px;
            margin-right: 8px;
            padding: 2px;
            background-color: white;
            border-radius: 15px;"
          />
          <div style="
            color: white;
            font-size: 14px;
            display: inline-block;
          ">
            ${data.label}
          </div>
        </div>
      </div>
    `,
      },
      {
        query: "node[type!='center']",
        tpl: (data) => `
      <div style="display: flex; flex-direction: column; align-items: center; margin-top: 120px;">
        <div style="display: flex; align-items: center; justify-content: center;
            background-color: #16A34A;
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
      },
    ]);

    // Add click handler
    cy.on('tap', 'node', (evt) => {
      const node = evt.target;
      if (onNodeClick && node.id() !== 'center') {
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

    setTimeout(() => {
      cy.resize();
      cy.fit();

      // Position center node in the middle
      const centerNode = cy.getElementById('center');
      if (centerNode) {
        centerNode.position({
          x: cy.width() / 2,
          y: cy.height() / 2
        });

        // Arrange other nodes in an orbit
        const otherNodes = cy.nodes().filter(node => node.id() !== 'center');
        const radius = Math.min(cy.width(), cy.height()) * 0.35;
        const angleStep = (2 * Math.PI) / otherNodes.length;

        otherNodes.forEach((node, index) => {
          const angle = index * angleStep;
          node.position({
            x: cy.width() / 2 + radius * Math.cos(angle),
            y: cy.height() / 2 + radius * Math.sin(angle)
          });
        });
      }

      cy.zoom({
        level: cy.zoom() * 0.5,
        renderedPosition: { x: cy.width() / 2, y: cy.height() / 2 },
      });
    }, 100);

    return () => cy.destroy();
  }, [elements, onNodeClick, selectedNode]);

  return (
    <div className="relative w-full h-full" ref={cyContainerRef}>
      <div id="cy" />
    </div>
  );
};
