import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "./product-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@shared/schema";
import { Boxes, Cpu, Plane, Wrench } from "lucide-react";

const categories = [
  { label: "All", value: "all", icon: Boxes },
  { label: "Racing Drones", value: "Racing Drones", icon: Plane },
  { label: "3D Printed Gears", value: "3D Printed Gears", icon: Wrench },
  { label: "Micro Controllers", value: "Micro Controllers", icon: Cpu },
  { label: "RC Kits", value: "RC Kits", icon: Boxes },
];

const partners = ["TechDrone", "AeroSystems", "PrintMaster", "SkyLabs", "MicroFlow", "CarbonX"];

function ProductSkeleton() {
  return (
    <div className="glass-card rounded-md overflow-hidden">
      <Skeleton className="aspect-[4/3] w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <div className="flex justify-between items-center gap-4 pt-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-8 w-16 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState("all");

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const filtered = products?.filter(
    (p) => activeCategory === "all" || p.category === activeCategory
  );

  return (
    <section id="products" className="relative py-24 px-4 md:px-8 bg-background" data-testid="products-section">
      <div className="max-w-7xl mx-auto">
        {/* Marquee */}
        <div className="mb-20 overflow-hidden relative border-y border-border py-6">
          <motion.div 
            className="flex gap-20 items-center whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...partners, ...partners].map((partner, i) => (
              <span key={i} className="text-2xl font-black uppercase tracking-[0.5em] text-foreground/20 italic">
                {partner}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-primary/50" />
            <span className="text-primary text-xs tracking-[0.3em] uppercase font-medium">Marketplace</span>
            <div className="h-px w-8 bg-primary/50" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Trending Products
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-sm">
            Browse our curated selection of premium RC components and 3D printed parts
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-10 flex-wrap"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.value;
            return (
              <Button
                key={cat.value}
                variant={isActive ? "default" : "secondary"}
                size="sm"
                onClick={() => setActiveCategory(cat.value)}
                className={`gap-1.5 ${isActive ? "bg-primary text-primary-foreground border border-primary-border" : ""}`}
                data-testid={`button-category-${cat.value.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.label}
              </Button>
            );
          })}
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered?.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}

        {filtered && filtered.length === 0 && (
          <div className="text-center py-16">
            <Boxes className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No products found in this category</p>
          </div>
        )}
      </div>
    </section>
  );
}
