// App.tsx
import { useState, useRef, useEffect } from "react";
import { sdk } from "@farcaster/miniapp-sdk";

const memeTemplates = [
  { name: "Distracted Boyfriend", url: "/templates/meme1.jpg" },
  { name: "Drake Hotline Bling", url: "/templates/meme3.jpg" },
  { name: "Once Again Asking", url: "/templates/meme2.jpg" },
];

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(memeTemplates[0]);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    sdk.actions.ready();
  }, []);

  const generateMeme = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const image = new Image();
    image.src = selectedTemplate.url;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      ctx.font = "40px Impact";
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.textAlign = "center";
      ctx.fillText(topText.toUpperCase(), canvas.width / 2, 50);
      ctx.strokeText(topText.toUpperCase(), canvas.width / 2, 50);
      ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);
      ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);

      // Set preview image
      setPreviewSrc(canvas.toDataURL("image/png"));
    };
  };

  const downloadMeme = () => {
    if (!previewSrc) return;
    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = previewSrc;
    link.click();
  };

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h1>MemeCaster</h1>

      <select onChange={(e) => setSelectedTemplate(memeTemplates[+e.target.value])}>
        {memeTemplates.map((t, i) => (
          <option key={i} value={i}>{t.name}</option>
        ))}
      </select>

      <div style={{ marginTop: 10 }}>
        <input
          type="text"
          placeholder="Top text"
          value={topText}
          onChange={(e) => setTopText(e.target.value)}
        />
      </div>
      <div style={{ marginTop: 10 }}>
        <input
          type="text"
          placeholder="Bottom text"
          value={bottomText}
          onChange={(e) => setBottomText(e.target.value)}
        />
      </div>

      <div style={{ marginTop: 10 }}>
        <button onClick={generateMeme}>Generate Meme</button>
        <button onClick={downloadMeme} style={{ marginLeft: 10 }} disabled={!previewSrc}>
          Download Meme
        </button>
      </div>

      {/* Canvas for generating meme (hidden) */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* Preview image */}
      {previewSrc && (
        <div style={{ marginTop: 20 }}>
          <h3>Preview:</h3>
          <img src={previewSrc} alt="Meme Preview" style={{ maxWidth: "100%" }} />
        </div>
      )}
    </div>
  );
}

export default App;
