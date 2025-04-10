import { useEffect, useRef } from "react";
import Cytoscape from "cytoscape";
import { DataProductImage } from "@/components/data-product-image";
import { createRoot } from "react-dom/client";
import nodeHtmlLabel from "cytoscape-node-html-label";

// TODO: Move this imports to a higher level
if (!Cytoscape.prototype.hasOwnProperty("nodeHtmlLabel")) {
  Cytoscape.use(nodeHtmlLabel);
}
export const DataProductGraph = ({ graph }) => {
  const elements = graph.data;

  let colour, image, borderColour;
  if (graph.graphType == "systems") {
    colour = "#16A34A";
    image = "boxes.svg";
    borderColour = "#BBF7D0";
  } else if (graph.graphType == "domains") {
    colour = "#4569E1";
    image = "box.svg";
    borderColour = "#D9D9FF";
  } else {
    colour = "#F59E0B";
    borderColour = "#FEF3C7";
    image = "file.svg";
  }

  const containerRef = useRef(null);
  const cyRef = useRef(null);
  useEffect(() => {
    console.log("Initializing graph with elements:", elements);
    if (!containerRef.current) {
      console.log("No container ref");
      return;
    }

    const overlayDiv = document.createElement("div");
    overlayDiv.style.position = "absolute";
    overlayDiv.style.left = "50%";
    overlayDiv.style.top = "50%";
    overlayDiv.style.transform = "translate(-50%, -50%)";
    overlayDiv.style.zIndex = "10";
    containerRef.current.appendChild(overlayDiv);

    const haloDiv = document.createElement("div");
    haloDiv.style.position = "absolute";
    haloDiv.style.left = "50%";
    haloDiv.style.top = "50%";
    haloDiv.style.width = "200px";
    haloDiv.style.height = "200px";
    haloDiv.style.transform = "translate(-50%, -50%)";
    haloDiv.style.backgroundColor = borderColour;
    haloDiv.style.borderRadius = "50%";
    haloDiv.style.filter = "blur(20px)";
    haloDiv.style.zIndex = "5";
    containerRef.current.appendChild(haloDiv);

    const reactRoot = document.createElement("div");
    reactRoot.style.width = "100%";
    reactRoot.style.height = "100%";
    overlayDiv.appendChild(reactRoot);
    const root = createRoot(reactRoot);
    root.render(<DataProductImage size="xl" />);

    const cy = Cytoscape({
      container: containerRef.current,
      elements: elements,
      style: [
        {
          selector: "node",
          style: {
            "background-color": colour,
            "background-image": `url(/images/graph/${image})`,
            "background-fit": "none",
            "background-position-x": "50%",
            "background-position-y": "50%",
            "border-width": 2,
            "border-color": borderColour,
            width: 40,
            height: 40,
          },
        },
      ],
      layout: {
        name: "circle",
        radius: 180,
        startAngle: (3 * Math.PI) / 2,
        sweep: 2 * Math.PI - Math.PI / 3,
        center: { x: 0, y: -30 },
      },
    });
    cy.nodeHtmlLabel([
      {
        query: "node",
        tpl: (data) => `
          <div style="display: flex; flex-direction: column; align-items: center; margin-top: 60px;">
            <div style="display: flex; align-items: center; justify-content: center;
                background-color: ${colour};
                border-radius: 12px;
                padding: 1px 8px;
                box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
              ">
              <div style="
                color: white;
                font-size: 11px;
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
    return () => {
      if (cyRef.current) {
        cyRef.current.destroy();
      }
      root.unmount();
    };
  }, [elements]);
  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{
        minHeight: "400px",
        position: "relative",
        marginBottom: "60px",
      }}
    />
  );
};
