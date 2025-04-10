import { useEffect, useRef } from "react";
import Cytoscape from "cytoscape";
import nodeHtmlLabel from "cytoscape-node-html-label";

// eslint-disable-next-line react-hooks/rules-of-hooks
if (!Cytoscape.prototype.hasOwnProperty("nodeHtmlLabel")) {
  Cytoscape.use(nodeHtmlLabel);
}

export const Domain = ({ elements }) => {
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
            "background-color": "#4569E1",
            "background-image": `url(/images/graph/box.svg)`,
            "background-fit": "none",
            "background-position-x": "50%",
            "background-position-y": "50%",
            "border-width": 4,
            "border-color": "#D9D9FF",
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
        name: "grid",
        fit: true,
        animate: false,
        padding: 400,
        avoidOverlap: true,
      },
    });

    cy.nodeHtmlLabel([
      {
        query: "node",
        tpl: (data) => `
      <div style="display: flex; flex-direction: column; align-items: center; margin-top: 100px;">
        <div style="display: flex; align-items: center; justify-content: center;
            background-color: #4569E1;
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
      cy.fit();
      cy.zoom({
        level: cy.zoom() * 0.15,
        renderedPosition: { x: cy.width() / 2, y: cy.height() / 2 },
      });
    }, 100);

    return () => cy.destroy();
  }, [elements]);

  return (
    <div className="relative w-full h-full" ref={cyContainerRef}>
      <div id="cy" />
    </div>
  );
};
