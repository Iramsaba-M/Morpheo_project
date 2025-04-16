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

export const System = ({ elements }) => {
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
            "background-color": "#16A34A",
            "background-image": `url(/images/graph/boxes.svg)`,
            "background-fit": "none",
            "background-position-x": "50%",
            "background-position-y": "50%",
            "border-width": 4,
            "border-color": "#BBF7D0",
            width: 60,
            height: 60,
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
        quality: "proof",
        randomize: true,
        animate: false,
        animationDuration: 500,
        nodeRepulsion: 12000,
        idealEdgeLength: 150,
        edgeElasticity: 0.3,
        gravity: 2.5,
        gravityRangeCompound: 2.0,
        gravityCompound: 1.5,
        gravityRange: 2.5,
        nestingFactor: 0.2,
        tilingPaddingVertical: 150,
        tilingPaddingHorizontal: 100,
        packingFactor: 1.2,
      },
    });

    cy.nodeHtmlLabel([
      {
        query: "node",
        tpl: (data) => `
      <div style="display: flex; flex-direction: column; align-items: center; margin-top: 100px;">
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
        cssClass: "cy-node-html-label",
      },
    ]);

    cyRef.current = cy;

    setTimeout(() => {
      cy.resize();
      cy.fit(undefined, 100);
    }, 100);

    return () => cy.destroy();
  }, [elements]);

  return (
    <div className="relative w-full h-full" ref={cyContainerRef}>
      <div id="cy" />
    </div>
  );
};
