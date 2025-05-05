import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Experience from "./Experience";
import { Canvas } from "@react-three/fiber";
import { Html, SpotLight, Text } from "@react-three/drei";
import * as THREE from "three";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Canvas>
      <SpotLight
        position={[8, 4, 0]}
        color="blue"
        attenuation={10}
        distance={20}
      />
      <SpotLight
        position={[7, 4, 0]}
        color="green"
        attenuation={10}
        angle={1}
        distance={20}
      />
      <SpotLight
        position={[9, 4, 0]}
        color="red"
        distance={20}
        angle={1}
        attenuation={10}
        anglePower={5}
      />

      <Text scale={0.5} anchorX="center" position={[0, 3, 0]}>
        Interactive Mouse Pointer
        <meshStandardMaterial color={"#ffffff"} />
      </Text>
      <Experience />
    </Canvas>
  </StrictMode>
);
