import { useState, useEffect, Suspense, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, Float, ContactShadows, OrbitControls } from "@react-three/drei";
import * as THREE from "three";


// DRONE CONFIGURATION - CHANGE THESE VALUES TO ADJUST THE SCENE
const DRONE_CONFIG = {
  scale: 3, // Smaller number = Smaller Drone
  position: [2, -1, 0] as [number, number, number], // [X (Right/Left), Y (Up/Down), Z (Forward/Back)]
  rotation: [0.1, Math.PI / 4, 0] as [number, number, number], // [Pitch, Yaw, Roll]
};

function DroneModel(props: any) {
  const { scene, nodes } = useGLTF("/Drone.glb") as any;
  const droneRef = useRef<THREE.Group>(null);
  const { size } = useThree(); // Destructure size for pixel width check

  const propellersRef = useRef<THREE.Object3D[]>([]);

  useEffect(() => {
    if (scene) {
      const foundPropellers: THREE.Object3D[] = [];
      scene.traverse((object: THREE.Object3D) => {
        if (object.name && /prop|rotor|blade|fan/i.test(object.name)) {
          if (object instanceof THREE.Mesh) {
            // Fix Pivot Point: Center geometry and compensate position
            object.geometry.computeBoundingBox();
            const center = new THREE.Vector3();
            // Ensure bounding box exists
            if (object.geometry.boundingBox) {
              object.geometry.boundingBox.getCenter(center);

              // Reset geometry origin to local (0,0,0)
              object.geometry.center();

              // Move mesh to original visual position (compensating for the shift)
              object.position.add(center);

              foundPropellers.push(object);
            }
          }
        }
      });
      propellersRef.current = foundPropellers;
    }
  }, [scene]);

  useFrame((state, delta) => {

    if (droneRef.current) {
      // Gentle hover (Existing Logic)
      droneRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1 - 0.5;

      // Mouse Control (Tilt)
      const targetRotX = state.pointer.y * 0.05;
      const targetRotY = state.pointer.x * 0.05;
      const targetRotZ = -state.pointer.x * 0.05;

      droneRef.current.rotation.x = THREE.MathUtils.lerp(droneRef.current.rotation.x, targetRotX, 0.1);
      droneRef.current.rotation.y = THREE.MathUtils.lerp(droneRef.current.rotation.y, targetRotY + state.clock.getElapsedTime() * 0.05, 0.1);
      droneRef.current.rotation.z = THREE.MathUtils.lerp(droneRef.current.rotation.z, targetRotZ, 0.1);
    }

    // 🔥 TURBO SPIN LOGIC 🔥
    if (propellersRef.current.length > 0) {
      // 200-300 range mein wo "motion blur" jaisa dikhega.
      const speed = 50;

      propellersRef.current.forEach((prop, i) => {
        // Even index clockwise, Odd index anti-clockwise (Physics!)
        const dir = i % 2 === 0 ? 1 : -1;

        // IMPORTANT: Y axis pe spin kar rahe hain (kyunki humne pivot fix kiya tha)
        // Agar pankha "darwaze" ki tarah khul raha hai, toh 'y' ko 'z' kar dena.
        prop.rotation.y += speed * delta * dir;
      });
    }
  });

  // Responsive positioning: Desktop Right, Mobile Center
  const isMobile = size.width < 768;
  const responsivePosition: [number, number, number] = isMobile ? [0, -1, 0] : DRONE_CONFIG.position;

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
      floatingRange={[-0.1, 0.1]}
    >
      <group ref={droneRef} {...props} dispose={null} scale={DRONE_CONFIG.scale} position={responsivePosition}>
        {/* Render the ENTIRE Scene to ensure perfect alignment of all parts (Body + Rotors) */}
        <primitive
          object={scene}
          rotation={DRONE_CONFIG.rotation}
        />
      </group>
    </Float>
  );
}

export function HeroScene() {
  const { theme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-background transition-colors duration-500" data-testid="hero-section">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none z-0" />

      {/* FULLSCREEN CANVAS */}
      <div className="absolute inset-0 h-full w-full z-0">
        <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-muted-foreground">Loading Drone...</div>}>
          <Canvas camera={{ position: [0, 0, 6], fov: 40 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            <DroneModel />
            <Environment preset="city" />
            <ContactShadows opacity={0.4} scale={30} blur={2} far={10} resolution={256} color="#000000" />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </Suspense>
      </div>

      {/* TEXT CONTENT */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 md:px-16 lg:px-24 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="pointer-events-auto max-w-2xl"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tighter mb-8 italic">
            <span className="text-foreground">ENGINEER.</span><br />
            <span className="text-primary">PRINT.</span><br />
            <span className="text-foreground">FLY.</span>
          </h1>

          <div className="flex items-center gap-4 flex-wrap">
            <Button
              size="lg"
              onClick={scrollToProducts}
              className={`rounded-full px-10 h-14 text-lg font-bold uppercase tracking-wider transition-all duration-300 ${theme === "dark"
                ? "bg-primary text-primary-foreground hover:glow-blue animate-pulse"
                : "bg-primary text-primary-foreground hover:shadow-xl"
                }`}
              data-testid="button-shop-now"
            >
              Marketplace
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={scrollToProducts}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-muted-foreground pointer-events-auto"
        data-testid="button-scroll-down"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </section>
  );
}
