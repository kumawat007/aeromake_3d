import { Cpu } from "lucide-react";
import { SiGithub, SiDiscord, SiYoutube } from "react-icons/si";

export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-4 md:px-8" data-testid="footer">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Cpu className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="font-bold text-foreground">
                Aero<span className="text-primary">Make</span>
              </span>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed mb-4">
              Premium marketplace for RC components, racing drones, and custom 3D printing services.
            </p>
            <div className="flex items-center gap-2">
              <a href="#" className="w-8 h-8 rounded-md bg-muted/50 flex items-center justify-center text-muted-foreground hover-elevate" data-testid="link-github">
                <SiGithub className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-md bg-muted/50 flex items-center justify-center text-muted-foreground hover-elevate" data-testid="link-discord">
                <SiDiscord className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-md bg-muted/50 flex items-center justify-center text-muted-foreground hover-elevate" data-testid="link-youtube">
                <SiYoutube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {[
            {
              title: "Shop",
              links: ["Racing Drones", "3D Printed Gears", "Micro Controllers", "RC Kits"],
            },
            {
              title: "Services",
              links: ["Custom 3D Printing", "Design Review", "Bulk Orders", "Enterprise"],
            },
            {
              title: "Support",
              links: ["Help Center", "Shipping Info", "Returns", "Contact Us"],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-foreground text-sm font-semibold mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-muted-foreground text-xs transition-colors hover:text-foreground"
                      data-testid={`link-footer-${link.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-[10px]" data-testid="text-copyright">
            2026 AeroMake 3D. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground text-[10px] hover:text-foreground transition-colors" data-testid="link-privacy">Privacy</a>
            <a href="#" className="text-muted-foreground text-[10px] hover:text-foreground transition-colors" data-testid="link-terms">Terms</a>
            <a href="#" className="text-muted-foreground text-[10px] hover:text-foreground transition-colors" data-testid="link-cookies">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
