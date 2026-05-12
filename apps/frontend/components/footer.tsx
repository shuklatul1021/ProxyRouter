import Link from "next/link";
import { Network } from "lucide-react";

const footerLinks = {
  Product: [
    { name: "Model Catalog", href: "/dashboard" },
    { name: "Pricing", href: "/pricing" },
    { name: "Routing API", href: "/docs/api" },
    { name: "Usage Analytics", href: "/dashboard/usage" },
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
    <footer className="border-t border-[#262626] bg-[#000000]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md border border-[#262626] bg-[#141414] text-[#ededef]">
                <Network className="h-5 w-5" />
              </div>
              <span className="text-xl font-semibold text-[#ededef]">
                ProxyRouter
              </span>
            </Link>
            <p className="mt-4 text-sm leading-6 text-[#737373]">
              One black interface for AI model routing, credits, provider
              policies, API keys, and usage analytics.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-[#ededef]">{category}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                    className="text-sm text-[#737373] transition-colors hover:text-[#ededef]"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#262626] pt-8 md:flex-row">
          <p className="text-sm text-[#525252]">
            &copy; {new Date().getFullYear()} ProxyRouter. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="https://twitter.com"
              className="text-[#737373] hover:text-[#ededef]"
            >
              Twitter
            </Link>
            <Link
              href="https://github.com"
              className="text-[#737373] hover:text-[#ededef]"
            >
              GitHub
            </Link>
            <Link
              href="https://discord.com"
              className="text-[#737373] hover:text-[#ededef]"
            >
              Discord
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
