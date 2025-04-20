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

    // Create overlay for fixed center icon
    const overlayDiv = document.createElement("div");
    overlayDiv.style.position = "absolute";
    overlayDiv.style.left = "50%";
    overlayDiv.style.top = "50%";
    overlayDiv.style.transform = "translate(-50%, -50%)";
    overlayDiv.style.zIndex = "10";
    cyContainerRef.current.appendChild(overlayDiv);

    // Create halo effect
    const haloDiv = document.createElement("div");
    haloDiv.style.position = "absolute";
    haloDiv.style.left = "50%";
    haloDiv.style.top = "50%";
    haloDiv.style.width = "200px";
    haloDiv.style.height = "200px";
    haloDiv.style.transform = "translate(-50%, -50%)";
    haloDiv.style.backgroundColor = "#fef3c7";
    haloDiv.style.borderRadius = "50%";
    haloDiv.style.filter = "blur(20px)";
    haloDiv.style.zIndex = "5";
    cyContainerRef.current.appendChild(haloDiv);

    // Create center icon
    const centerIcon = document.createElement("div");
    centerIcon.style.width = "100px";
    centerIcon.style.height = "100px";
    centerIcon.style.backgroundColor = "#4569E1";
    centerIcon.style.borderRadius = "50%";
    centerIcon.style.display = "flex";
    centerIcon.style.alignItems = "center";
    centerIcon.style.justifyContent = "center";
    centerIcon.style.border = "4px solid #D9D9FF";
    centerIcon.innerHTML = `<img src="/images/graph/box.svg" alt="domain" style="width: 50px; height: 50px; filter: brightness(0) invert(1);">`;
    overlayDiv.appendChild(centerIcon);

    const cy = Cytoscape({
      container: cyContainerRef.current,
      elements: elements,
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
          selector: "node:selected",
          style: {
            "border-width": 6,
            "border-color": "#FFFFFF",
          },
        },
      ],
      layout: {
        name: "circle",
        radius: 240,
        startAngle: (3 * Math.PI) / 2,
        sweep: 2 * Math.PI - Math.PI / 3,
        center: { x: 0, y: -30 },
      },
    });

    cy.nodeHtmlLabel([
      {
        query: "node",
        tpl: (data) => `
          <div style="display: flex; flex-direction: column; align-items: center; margin-top: 120px;">
            <div style="display: flex; align-items: center; justify-content: center;
                background-color: #F59E0B;
                border-radius: 15px;
                padding: 4px 12px;
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
        cssClass: "cy-node-html-label",
      },
    ]);

    // Add click handler
    cy.on('tap', 'node', (evt) => {
      const node = evt.target;
      if (onNodeClick) {
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
      cy.zoom({
        level: cy.zoom() * 0.6,
        renderedPosition: { x: cy.width() / 2, y: cy.height() / 2 },
      });
    }, 100);

    return () => {
      if (cyRef.current) {
        cyRef.current.destroy();
      }
      if (cyContainerRef.current) {
        if (overlayDiv && overlayDiv.parentNode === cyContainerRef.current) {
          cyContainerRef.current.removeChild(overlayDiv);
        }
        if (haloDiv && haloDiv.parentNode === cyContainerRef.current) {
          cyContainerRef.current.removeChild(haloDiv);
        }
      }
    };
  }, [elements, onNodeClick, selectedNode, centerNode]);

  return (
    <div className="relative w-full h-full" ref={cyContainerRef}>
      <div id="cy" />
    </div>
  );
};
