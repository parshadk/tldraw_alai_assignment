import { useState } from "react";
import TldrawComponent from "./TldrawComponent";

export interface Spoke {
  title: string;
  description: string;
}

export default function App() {
  const [spokes, setSpokes] = useState<number>(2);
  const [spokeData, setSpokeData] = useState<Spoke[]>([]);
  const [renderKey, setRenderKey] = useState<number>(0);

  const generateSpokes = (count: number) => {
    const newSpokes: Spoke[] = Array.from({ length: count }, (_, i) => ({
      title: `Spoke ${i + 1}`,
      description: `Description for Spoke ${i + 1}`,
    }));
    setSpokeData(newSpokes);
    setRenderKey((prev) => prev + 1);
  };

  const handleSpokesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const clamped = Math.max(2, Math.min(6, value));
    setSpokes(clamped);
  };

  const addSpoke = () => {
    if (spokeData.length < 6) {
      const newSpoke: Spoke = {
        title: `Spoke ${spokeData.length + 1}`,
        description: `Description for Spoke ${spokeData.length + 1}`,
      };
      setSpokeData((prev) => [...prev, newSpoke]);
      setRenderKey((prev) => prev + 1);
    }
  }
  const removeSpoke = () => {
    if (spokeData.length > 2) {
      setSpokeData((prev) => prev.slice(0, -1));
      setRenderKey((prev) => prev + 1);
    }   
  }
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        padding: "20px",
        fontFamily: "sans-serif",
        background: "#f5f5f5",
      }}
    >
      <h1>Tldraw Canvas</h1>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          Spoke Count:
          <input
            type="number"
            value={spokes}
            onChange={handleSpokesChange}
            min={2}
            max={6}
            step={1}
            style={{ width: "50px", padding: "5px" }}
          />
        </label>
        <button
          onClick={() => generateSpokes(spokes)}
          style={{
            padding: "7px 10px",
            background: "#007BFF",
            border: "none",
            borderRadius: "4px",
            color: "white",
            cursor: "pointer",
          }}
        >
          Generate  Hub and Spokes
        </button>
        <button
          onClick={() => addSpoke()}
          style={{
            padding: "7px 10px",
            background: "#007BFF",
            border: "none",
            borderRadius: "4px",
            color: "white",
            cursor: "pointer",
          }}
        >
          Add spoke
        </button>
        <button
          onClick={() => removeSpoke()}
          style={{
            padding: "7px 10px",
            background: "#007BFF",
            border: "none",
            borderRadius: "4px",
            color: "white",
            cursor: "pointer",
          }}
        >
          Remove Spoke
        </button>
      </div>
      {spokeData.length > 0 && (
        <TldrawComponent key={renderKey} spokeData={spokeData} />
      )}
    </div>
  );
}
