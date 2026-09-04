import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="ghost-strength-container">

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>

                  <img
                    src="AXE.png"
                    alt="axe breaker "
                    style={{ height: "45px" }}
                  />



               </div>

              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-5">
              Premium sports nutrition forged for warriors. Built in the shadows,
              trusted on the stage.
            </p>
            <div className="flex gap-3">

              {/* Instagram */}
              <a
                href="https://www.instagram.com/axebreaker_official/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-white/10 hover:border-[#e41e26] hover:bg-[#e41e26] transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} className="text-white/70 hover:text-white" />
              </a>

              {/* Facebook */}
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center border border-white/10 hover:border-[#e41e26] hover:bg-[#e41e26] transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} className="text-white/70 hover:text-white" />
              </a>

              {/* YouTube */}
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center border border-white/10 hover:border-[#e41e26] hover:bg-[#e41e26] transition-all duration-300"
                aria-label="YouTube"
              >
                <Youtube size={18} className="text-white/70 hover:text-white" />
              </a>

            </div>
            </div>
          {/* Quick links */}
          <div>
            <h4 className="font-fire text-white mb-4 text-sm">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {['Home', 'Products', 'Our Story', 'Distributer', 'Contact','lab-reports'].map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase().replace(' ', '')}`}
                    className="text-white/40 hover:text-[#e41e26] text-sm transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-fire text-white mb-4 text-sm">
              Categories
            </h4>
            <ul className="space-y-2">
              {['Pre-Workout', 'Protein', 'Essentials', 'Fat Burner'].map(
                (l) => (
                  <li key={l}>
                    <a
                      href="#products"
                      className="text-white/40 hover:text-[#e41e26] text-sm transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-fire text-white mb-4 text-sm">
              Reach Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-[#e41e26] mt-0.5 flex-shrink-0" />
                <span className="text-white/40 text-sm">axebreakerofficial@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-[#e41e26] mt-0.5 flex-shrink-0" />
                <span className="text-white/40 text-sm">+91 6362322029</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#e41e26] mt-0.5 flex-shrink-0" />
                <span className="text-white/40 text-sm">
                  The Commercial , #590 , 15th cross, 15 C main, sector 4, HSR Layout, Banglore-560102
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs tracking-wide">
            © {new Date().getFullYear()}  Axe Breaker. All rights reserved. Built in the shadows.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/30 hover:text-white text-xs transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/30 hover:text-white text-xs transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-white/30 hover:text-white text-xs transition-colors">
              Shipping
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}