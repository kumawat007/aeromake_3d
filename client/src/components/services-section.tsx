import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Wireframe } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, Layers, Truck, Shield, ArrowRight } from "lucide-react";

function WireframeGear() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.35, 128, 16]} />
        <meshStandardMaterial
          color="#0ea5e9"
          wireframe
          transparent
          opacity={0.4}
          emissive="#0ea5e9"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

const steps = [
  {
    icon: Upload,
    title: "Upload Your Design",
    description: "Upload STL, OBJ, or STEP files directly from your CAD software",
  },
  {
    icon: Layers,
    title: "Choose Materials",
    description: "Select from PLA, ABS, PETG, Nylon, Resin, or carbon-fiber composites",
  },
  {
    icon: Shield,
    title: "Quality Check",
    description: "Our engineers review your design for optimal print results",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Precision-printed and shipped within 3-5 business days",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="relative py-24 px-4 md:px-8" data-testid="services-section">
      <div className="absolute inset-0 grid-bg opacity-50" />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-accent/50" />
              <span className="text-accent text-xs tracking-[0.3em] uppercase font-medium">Custom Printing</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Upload Your Design,{" "}
              <span className="text-glow-orange text-accent">We Print It</span>
            </h2>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              From concept to creation in days. Our industrial-grade 3D printers deliver
              precision parts with tolerances as tight as 0.1mm. Perfect for RC components,
              custom enclosures, and prototype engineering.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="glass-card rounded-md p-4"
                  >
                    <div className="w-8 h-8 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center mb-3">
                      <Icon className="w-4 h-4 text-accent" />
                    </div>
                    <h4 className="text-foreground text-sm font-semibold mb-1">{step.title}</h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">{step.description}</p>
                  </motion.div>
                );
              })}
            </div>

            <Button
              size="lg"
              className="bg-accent text-accent-foreground border border-accent-border gap-2"
              data-testid="button-upload-design"
            >
              <Upload className="w-4 h-4" />
              Upload Your Design
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[400px] md:h-[500px] rounded-md overflow-hidden glass-card"
          >
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-full">
                  <div className="w-10 h-10 rounded-full border-2 border-transparent border-t-accent animate-spin" />
                </div>
              }
            >
              <Canvas camera={{ position: [3, 2, 3], fov: 50 }}>
                <ambientLight intensity={0.2} />
                <pointLight position={[5, 5, 5]} intensity={0.5} color="#f97316" />
                <pointLight position={[-5, 3, -5]} intensity={0.3} color="#0ea5e9" />
                <WireframeGear />
              </Canvas>
            </Suspense>

            <div className="absolute bottom-4 left-4 right-4 glass-card rounded-md p-3 flex items-center justify-between gap-4">
              <div>
                <p className="text-foreground text-xs font-medium">Supported Formats</p>
                <p className="text-muted-foreground text-[10px]">.STL, .OBJ, .STEP, .3MF, .AMF</p>
              </div>
              <div className="text-right">
                <p className="text-accent text-xs font-bold">From $4.99</p>
                <p className="text-muted-foreground text-[10px]">per part</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
