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

export const Entity = ({ elements }) => {
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
      elements,
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
        quality: "proof",
        randomize: true,
        animate: false,
        animationDuration: 500,
        nodeRepulsion: 12000,
        idealEdgeLength: 150,
        edgeElasticity: 0.3,
        gravity: 3,
        gravityRangeCompound: 2.5,
        gravityCompound: 2.0,
        gravityRange: 3.0,
        nestingFactor: 0.2,
        tilingPaddingVertical: 200,
        tilingPaddingHorizontal: 100,
        packingFactor: 1.0,
      },
    });

    cy.nodeHtmlLabel([
      {
        query: "node",
        tpl: (data) => `
          <div style="display: flex; flex-direction: column; align-items: center; margin-top: 100px;">
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
                padding: 3px;
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

    cyRef.current = cy;

    setTimeout(() => {
      cy.resize();
      cy.fit(undefined, 50); // Add padding but reduce extra spacing

      const boundingBox = cy.extent(); // Get the bounding box of the graph
      const centerX = (boundingBox.x1 + boundingBox.x2) / 2;
      const centerY = (boundingBox.y1 + boundingBox.y2) / 2;

      cy.pan({ x: cy.width() / 2 - centerX, y: cy.height() / 2 - centerY });
    }, 100);

    return () => cy.destroy();
  }, [elements]);

  return (
    <div className="relative w-full h-full" ref={cyContainerRef}>
      <div id="cy" />
    </div>
  );
};
