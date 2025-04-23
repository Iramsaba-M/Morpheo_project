import { useEffect, useRef } from "react";
import Cytoscape from "cytoscape";
import fcose from "cytoscape-fcose";
import nodeHtmlLabel from "cytoscape-node-html-label";
import { createRoot } from "react-dom/client";

// eslint-disable-next-line react-hooks/rules-of-hooks
if (!Cytoscape.prototype.hasOwnProperty("nodeHtmlLabel")) {
  Cytoscape.use(nodeHtmlLabel);
}

if (!Cytoscape.prototype.hasOwnProperty("fcose")) {
  Cytoscape.use(fcose);
}

export const Entity = ({ elements, selectedNode }) => {
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
    haloDiv.style.backgroundColor = "#FEF3C7";
    haloDiv.style.borderRadius = "50%";
    haloDiv.style.filter = "blur(20px)";
    haloDiv.style.zIndex = "5";
    cyContainerRef.current.appendChild(haloDiv);

    // Create center icon
    const centerIcon = document.createElement("div");
    centerIcon.style.width = "90px";
    centerIcon.style.height = "90px";
    centerIcon.style.backgroundColor = "#F59E0B";
    centerIcon.style.borderRadius = "50%";
    centerIcon.style.display = "flex";
    centerIcon.style.alignItems = "center";
    centerIcon.style.justifyContent = "center";
    centerIcon.style.border = "4px solid #FEF3C7";
    centerIcon.innerHTML = `<img src="/images/graph/boxes.svg" alt="entities" style="width: 50px; height: 50px; filter: brightness(0) invert(1);">`;
    overlayDiv.appendChild(centerIcon);

    // Transform the elements to match Cytoscape's expected format
    const transformedElements = elements
    .filter(item => item.data?.type?.toLowerCase() === "entity")
    .map(item => ({
      data: {
        id: item.data.id,
        label: item.data.label,
        icon: item.data.icon
      }
    }));


    const cy = Cytoscape({
      container: cyContainerRef.current,
      elements: transformedElements,
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
            width: 60,
            height: 60,
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
        center: { x: 0, y: 0 },
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
                padding: 2px 10px;
                box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
              ">
              <img src="/images/systems/${data.icon}.svg" alt="${data.icon}" style="
                width: 16px;
                height: 16px;
                margin-right: 6px;
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
    ]);

    cyRef.current = cy;

    setTimeout(() => {
      cy.resize();
      cy.fit();

      // Position all nodes in a perfect circle
      const nodes = cy.nodes();
      const radius = 240;
      const centerX = cy.width() / 2;
      const centerY = cy.height() / 2;
      const angleStep = (2 * Math.PI) / nodes.length;
      const startAngle = -Math.PI / 2;

      nodes.forEach((node, index) => {
        const angle = startAngle + (index * angleStep);
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        node.position({ x, y });
      });

      // Center the view and adjust zoom
      cy.center();
      cy.zoom({
        level: cy.zoom() * 0.7,
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
  }, [elements]);

  return (
    <div className="relative w-full h-full" ref={cyContainerRef}>
      <div id="cy" />
    </div>
  );
};
