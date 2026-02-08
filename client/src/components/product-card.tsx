import { motion } from "framer-motion";
import { ShoppingCart, Star, Zap, Activity, Weight, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@shared/schema";
import { useCartStore } from "@/lib/cartStore";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/components/theme-provider";

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const { theme } = useTheme();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const specs = [
    { label: "Voltage", value: "24V", icon: Zap },
    { label: "Weight", value: "450g", icon: Weight },
    { label: "Material", value: "Carbon", icon: Box },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative rounded-md border p-px overflow-hidden transition-all duration-500 ${
        theme === "dark" 
        ? "bg-gradient-to-br from-primary/20 to-transparent border-primary/20" 
        : "bg-white shadow-lg border-border"
      }`}
      data-testid={`card-product-${product.id}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-sm">
        <motion.div 
          className="w-full h-full"
          whileHover={{ rotateY: 180 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            data-testid={`img-product-${product.id}`}
          />
        </motion.div>
        
        {/* HUD Specs */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center gap-2 p-4">
          {specs.map((spec) => (
            <div key={spec.label} className="flex items-center justify-between w-full px-4 py-1 border border-primary/30 bg-black/60 backdrop-blur-sm rounded">
              <span className="text-[10px] uppercase tracking-tighter text-primary flex items-center gap-1">
                <spec.icon className="w-3 h-3" />
                {spec.label}
              </span>
              <span className="text-[10px] font-mono text-white">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-card/50 backdrop-blur-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-primary tracking-[0.2em] uppercase font-bold">{product.category}</span>
          {product.badge && (
            <Badge variant="outline" className="text-[9px] border-primary/50 text-primary uppercase">
              {product.badge}
            </Badge>
          )}
        </div>

        <h3 className="font-bold text-foreground text-sm mb-3" data-testid={`text-product-name-${product.id}`}>
          {product.name}
        </h3>

        <div className="flex items-center justify-between gap-3">
          <span className="text-xl font-black text-foreground" data-testid={`text-price-${product.id}`}>
            ${product.price.toFixed(2)}
          </span>
          <Button
            size="sm"
            onClick={handleAddToCart}
            className={`rounded-none border-2 font-bold uppercase tracking-widest transition-all duration-300 ${
              theme === "dark" 
              ? "bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground animate-pulse" 
              : "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
            }`}
            data-testid={`button-add-to-cart-${product.id}`}
          >
            Deploy
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
