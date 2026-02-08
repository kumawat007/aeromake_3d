import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cartStore";

export function CartDrawer() {
  const { items, isOpen, setCartOpen, removeItem, updateQuantity, totalPrice, clearCart } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={() => setCartOpen(false)}
            data-testid="cart-overlay"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-50 bg-card border-l border-border flex flex-col"
            data-testid="cart-drawer"
          >
            <div className="flex items-center justify-between gap-4 p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-primary" />
                <h2 className="font-semibold text-foreground">Your Cart</h2>
                <span className="text-xs text-muted-foreground">({items.length} items)</span>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setCartOpen(false)}
                data-testid="button-close-cart"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                    <ShoppingCart className="w-7 h-7 text-muted-foreground/50" />
                  </div>
                  <p className="text-muted-foreground text-sm mb-1">Your cart is empty</p>
                  <p className="text-muted-foreground/50 text-xs">Add products to get started</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="glass-card rounded-md p-3 flex gap-3"
                      data-testid={`cart-item-${item.product.id}`}
                    >
                      <div className="w-16 h-16 rounded-md overflow-hidden bg-muted shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-foreground text-sm font-medium truncate">{item.product.name}</h4>
                        <p className="text-primary text-sm font-bold">${item.product.price.toFixed(2)}</p>

                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            data-testid={`button-decrease-${item.product.id}`}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-xs text-foreground w-6 text-center" data-testid={`text-quantity-${item.product.id}`}>
                            {item.quantity}
                          </span>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            data-testid={`button-increase-${item.product.id}`}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>

                          <Button
                            size="icon"
                            variant="ghost"
                            className="ml-auto text-destructive"
                            onClick={() => removeItem(item.product.id)}
                            data-testid={`button-remove-${item.product.id}`}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-4 border-t border-border space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground text-sm">Subtotal</span>
                  <span className="text-foreground font-bold text-lg" data-testid="text-cart-total">
                    ${totalPrice().toFixed(2)}
                  </span>
                </div>

                <Button
                  className="w-full bg-primary text-primary-foreground border border-primary-border"
                  data-testid="button-checkout"
                >
                  Checkout
                </Button>

                <Button
                  variant="ghost"
                  className="w-full text-muted-foreground text-xs"
                  onClick={clearCart}
                  data-testid="button-clear-cart"
                >
                  Clear Cart
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
