import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Import GSAP and ScrollTrigger
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

createRoot(document.getElementById("root")!).render(<App />); 