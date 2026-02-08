import { motion } from "framer-motion";
import { Cpu, CircuitBoard, Radio, Battery, Wifi, Cable } from "lucide-react";

const parts = [
  {
    icon: CircuitBoard,
    title: "Flight Controllers",
    desc: "F4/F7/H7 processors with built-in OSD",
    count: "120+",
  },
  {
    icon: Radio,
    title: "FPV Systems",
    desc: "Digital & analog video transmitters & cameras",
    count: "85+",
  },
  {
    icon: Battery,
    title: "LiPo Batteries",
    desc: "High-discharge cells from 1S to 6S",
    count: "200+",
  },
  {
    icon: Cpu,
    title: "ESC & Motors",
    desc: "Brushless motors and speed controllers",
    count: "150+",
  },
  {
    icon: Wifi,
    title: "Receivers",
    desc: "ELRS, Crossfire, and FrSky protocols",
    count: "60+",
  },
  {
    icon: Cable,
    title: "Accessories",
    desc: "Connectors, wires, frames, and tools",
    count: "300+",
  },
];

export function PartsSection() {
  return (
    <section id="parts" className="relative py-24 px-4 md:px-8" data-testid="parts-section">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-primary/50" />
            <span className="text-primary text-xs tracking-[0.3em] uppercase font-medium">Components</span>
            <div className="h-px w-8 bg-primary/50" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Electronics & Parts
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-sm">
            Everything you need to build, repair, and upgrade your RC fleet
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {parts.map((part, i) => {
            const Icon = part.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass-card rounded-md p-5 flex items-start gap-4 hover-elevate cursor-pointer"
                data-testid={`card-part-${i}`}
              >
                <div className="w-10 h-10 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <h4 className="text-foreground text-sm font-semibold">{part.title}</h4>
                    <span className="text-primary text-xs font-bold">{part.count}</span>
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed">{part.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
