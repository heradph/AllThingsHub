import { useEffect, useState } from "react";
import "./App.css";
import Aurora from "./components/Background/Aurora";
import SplitText from "./components/SplitText";
import Login from "./components/Login";
import CircularGallery from "./components/ListItems/CircularGallery";

const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch("http://localhost:3011/api")
      .then((res) => res.json())
      .then((json) => setData(json.message))
      .catch((err) => console.error("API error:", err));
  }, []);
  return (
    <div className="App">
      <SplitText
        text="TokoTamba Connected!"
        className="text-8xl  font-semibold text-center"
        delay={100}
        duration={0.6}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
        onLetterAnimationComplete={handleAnimationComplete}
      />
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />
      <div style={{ height: "600px", position: "relative" }}>
        <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} />
      </div>

      <h1>Tes Frontend</h1>
      <p>coba tes dari backend: {data}</p>
      <Login />
    </div>
  );
}
export default App;
