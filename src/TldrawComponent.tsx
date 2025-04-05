import { TLShapeId, Tldraw, createShapeId, toRichText } from "tldraw";
import "tldraw/tldraw.css";
import { Spoke } from "./App";

export interface TldrawComponentProps {
  spokeData: Spoke[];
}

export default function TldrawComponent({ spokeData }: TldrawComponentProps) {
  const createdShapeIds: TLShapeId[] = [];
  return (
    <div style={{ position: "fixed", width: "100dvw", height: "75vh" }}>
      <Tldraw
        hideUi={true}
        onMount={(editor:any) => {
          const hubId = createShapeId();
          createdShapeIds.push(hubId);
          const centerX = 500;
          const centerY = 250;
          const hubRadius = 50;
          editor.createShape({
            id: hubId,
            type: "geo",
            x: centerX - hubRadius, 
            y: centerY - hubRadius, 
            props: {
              geo: "ellipse", 
              w: hubRadius * 2, 
              h: hubRadius * 2, 
              fill: "solid", 
              color: "black",
              richText: toRichText("Hub"),
              size: "m",
              font: "sans", 
            },
          });
          
          const radius = 250;
          const angleStep = (2 * Math.PI) / spokeData.length;

          spokeData.forEach((spoke, i) => {
            const angle = -Math.PI / 2 + i * angleStep;
            const spokeX = centerX + radius * Math.cos(angle);
            const spokeY = centerY + radius * Math.sin(angle);

            const titleId = createShapeId();
            createdShapeIds.push(titleId);
            editor.createShape({
              id: titleId,
              type: "text",
              x: spokeX - 50,
              y: spokeY,
              props: {
                richText: toRichText(spoke.title),
                size: "m",
                font: "sans",
              },
            });


            const arrowId = createShapeId();
            createdShapeIds.push(arrowId);
            const midX = (centerX + spokeX) / 2;
            const midY = (centerY + spokeY) / 2;

            editor.run(() => {
              editor.createShape({
                id: arrowId,
                type: "arrow",
                x: midX,
                y: midY,
                props: {
                  start: {
                    x: centerX - midX,
                    y: centerY - midY,
                  },
                  end: {
                    x: spokeX - midX,
                    y: spokeY - midY,
                  },
                },
              });
              editor.createBindings([
                {
                  fromId: arrowId,
                  toId: hubId,
                  type: "arrow",
                  props: {
                    terminal: "start",
                    normalizedAnchor: { x: 0.5, y: 0.5 },
                    isExact: false,
                    isPrecise: false,
                  },
                },
                {
                  fromId: arrowId,
                  toId: titleId,
                  type: "arrow",
                  props: {
                    terminal: "end",
                    normalizedAnchor: { x: 0.5, y: 0.5 },
                    isExact: false,
                    isPrecise: false,
                  },
                },
              ]);
            });
          });

          return () => {
            createdShapeIds.forEach((id) => {
              try {
                editor.deleteShape(id);
              } catch (error) {}
            });
          };
        }}
      />
    </div>
  );
}
