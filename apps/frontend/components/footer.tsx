import Link from "next/link";
import { Zap } from "lucide-react";

const footerLinks = {
  Product: [
    { name: "Models", href: "/models" },
    { name: "Pricing", href: "/pricing" },
    { name: "API Reference", href: "/docs/api" },
    { name: "Playground", href: "/playground" },
  ],
  Resources: [
    { name: "Documentation", href: "/docs" },
    { name: "Quickstart", href: "/docs/quickstart" },
    { name: "Examples", href: "/docs/examples" },
    { name: "SDKs", href: "/docs/sdks" },
  ],
  Company: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Acceptable Use", href: "/acceptable-use" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">OpenRouter</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Unified API gateway for accessing multiple AI models with
              pay-as-you-go pricing.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold">{category}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} OpenRouter. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="https://twitter.com"
              className="text-muted-foreground hover:text-foreground"
            >
              Twitter
            </Link>
            <Link
              href="https://github.com"
              className="text-muted-foreground hover:text-foreground"
            >
              GitHub
            </Link>
            <Link
              href="https://discord.com"
              className="text-muted-foreground hover:text-foreground"
            >
              Discord
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
