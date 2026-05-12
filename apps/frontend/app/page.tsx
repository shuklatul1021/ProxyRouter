import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Boxes,
  ChevronRight,
  Code2,
  Gauge,
  GitBranch,
  KeyRound,
  Landmark,
  Network,
  ShieldCheck,
  Sparkles,
  WalletCards,
  Zap,
  Globe,
  Lock,
  Activity,
} from "lucide-react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const platformStats = [
  { label: "Models", value: "400+", tone: "text-white" },
  { label: "Providers", value: "60+", tone: "text-sky-200" },
  { label: "Free models", value: "25+", tone: "text-emerald-200" },
];

const features = [
  {
    title: "One OpenAI-compatible API",
    description:
      "Route prompts to OpenAI, Anthropic, Google, Meta, Mistral, DeepSeek, xAI, and other providers from one request format.",
    icon: Code2,
  },
  {
    title: "Automatic routing and fallback",
    description:
      "Prefer vendors, pin versions, route by policy, and retry healthy alternatives when a provider or model fails.",
    icon: GitBranch,
  },
  {
    title: "Credits, BYOK, and spend controls",
    description:
      "Buy credits, bring provider keys, set budgets, review activity logs, and separate dev, staging, and production keys.",
    icon: WalletCards,
  },
];

const modelRows = [
  ["openai/gpt-4.1", "OpenAI", "Text, vision, tools", "Pinned"],
  ["anthropic/claude-3.7-sonnet", "Anthropic", "Long-form reasoning", "Auto"],
  ["google/gemini-2.5-pro", "Google", "Multimodal context", "Auto"],
  ["meta-llama/llama-3.3-70b", "Meta", "Fast open model", "Fallback"],
];

const pricingRows = [
  ["Free", "50 reqs/day", "Free models only"],
  ["Pay-as-you-go", "High global limits", "Model pass-through pricing"],
  ["Enterprise", "Dedicated options", "Volume commits and SLA"],
];

const platformDetails = [
  {
    title: "Model catalog",
    description:
      "Search models by provider, modality, context length, pricing, and supported parameters.",
    icon: Boxes,
  },
  {
    title: "Usage analytics",
    description:
      "Review requests, token volume, costs, latency, and model-level spend over time.",
    icon: BarChart3,
  },
  {
    title: "Provider policy",
    description:
      "Prefer vendors, route by region, disable data retention, and pin explicit model versions.",
    icon: ShieldCheck,
  },
  {
    title: "Billing plans",
    description:
      "Free, pay-as-you-go, enterprise, auto top-up, credits, crypto, bank transfer, and invoices.",
    icon: Landmark,
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Get your API key",
    description: "Create a free API key in seconds from your dashboard.",
    icon: KeyRound,
  },
  {
    step: "02",
    title: "Update your endpoint",
    description: "Change your API base URL to ProxyRouter's endpoint.",
    icon: Code2,
  },
  {
    step: "03",
    title: "Route with confidence",
    description: "Use our routing logic or specify your preferred providers.",
    icon: GitBranch,
  },
];

const testimonials = [
  {
    quote: "ProxyRouter reduced our LLM costs by 40% while improving reliability through intelligent routing.",
    author: "Sarah Chen",
    role: "CTO at TechFlow",
  },
  {
    quote: "The unified API saved us months of integration work. We switched providers in minutes.",
    author: "Marcus Johnson",
    role: "Lead Engineer at DataScale",
  },
  {
    quote: "Automatic failover saved us during the OpenAI outage. Our users never noticed a thing.",
    author: "Elena Rodriguez",
    role: "VP Engineering at AI Labs",
  },
];

export default function Home() {
  return (
    <div className="router-bg min-h-screen overflow-x-hidden text-white">
      <Navbar />

      <main className="relative pt-16">
        <section className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-4 pb-14 pt-10 sm:px-6 lg:grid-cols-[0.98fr_1.02fr] lg:px-8">
          <div className="router-grid pointer-events-none absolute inset-0 -z-10" />

          <div className="max-w-3xl">
            <Badge className="animate-fade-in-up border-[#262626] bg-[#141414] px-3 py-1 text-xs uppercase tracking-[0.16em] text-[#a1a1aa]">
              <Network className="mr-1.5 h-3.5 w-3.5" />
              Unified AI model router
            </Badge>

            <h1 className="animate-fade-in-up delay-100 mt-7 max-w-4xl text-5xl font-semibold leading-[0.96] tracking-tight text-[#ededef] sm:text-6xl lg:text-7xl">
              ProxyRouter-style access to every leading model.
            </h1>

            <p className="animate-fade-in-up delay-200 mt-6 max-w-2xl text-base leading-7 text-[#a1a1aa] sm:text-lg">
              Build with a single API for model discovery, provider routing,
              credits, usage analytics, API keys, BYOK, and fallback reliability
              across hundreds of models.
            </p>

            <div className="animate-fade-in-up delay-300 mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  className="btn-animate min-w-44 gap-2 rounded-md bg-white px-7 font-semibold text-black hover:bg-zinc-200"
                >
                  Start Building
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="btn-animate min-w-44 gap-2 rounded-md border-[#262626] bg-[#0a0a0a] px-7 text-[#ededef] hover:bg-[#141414] hover:border-[#333333]"
                >
                  View Console
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="animate-fade-in-up delay-400 mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
              {platformStats.map((stat) => (
                <div
                  key={stat.label}
                  className="card-animate rounded-md border border-[#262626] bg-[#0a0a0a] p-4"
                >
                  <p className="text-xs uppercase tracking-[0.14em] text-[#737373]">
                    {stat.label}
                  </p>
                  <p className={`mt-2 text-2xl font-semibold ${stat.tone}`}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="animate-scale-in delay-300 router-console hover-glow">
              <div className="flex items-center justify-between border-b border-[#262626] px-5 py-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[#737373]">
                    Chat completions
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-[#ededef] sm:text-3xl">
                    /api/v1/chat/completions
                  </p>
                </div>
                <div className="rounded-md border border-[#262626] bg-[#141414] p-3 text-[#ededef]">
                  <KeyRound className="h-6 w-6" />
                </div>
              </div>

              <div className="p-5">
                <div className="animate-fade-in-up delay-400 rounded-md border border-[#262626] bg-[#0a0a0a] p-4 font-mono text-xs leading-6 text-[#a1a1aa]">
                  <p className="text-[#737373]">POST</p>
                  <p>
                    model:{" "}
                    <span className="text-[#26a69a]">
                      &quot;openrouter/auto&quot;
                    </span>
                  </p>
                  <p>
                    route:{" "}
                    <span className="text-sky-300">
                      [&quot;openai&quot;, &quot;anthropic&quot;,
                      &quot;google&quot;]
                    </span>
                  </p>
                  <p>
                    fallback: <span className="text-[#ededef]">true</span>
                  </p>
                </div>

                <div className="animate-fade-in-up delay-500 mt-5 rounded-md border border-[#262626] bg-[#0a0a0a]">
                  {modelRows.map(([model, provider, capability, mode], index) => (
                    <div
                      key={model}
                      className="grid gap-1 border-b border-[#262626] px-4 py-3 last:border-0 sm:grid-cols-[1.25fr_0.7fr_1fr_auto] sm:items-center sm:gap-4 hover:bg-[#141414] transition-colors"
                      style={{ animationDelay: `${500 + index * 100}ms` }}
                    >
                      <span className="font-mono text-sm text-[#ededef]">
                        {model}
                      </span>
                      <span className="text-sm text-[#a1a1aa]">{provider}</span>
                      <span className="text-sm text-[#737373]">
                        {capability}
                      </span>
                      <span className="text-xs text-[#26a69a]">{mode}</span>
                    </div>
                  ))}
                </div>

                <div className="animate-fade-in-up delay-600 mt-5 grid grid-cols-2 gap-3">
                  <div className="card-animate rounded-md border border-sky-300/20 bg-sky-300/10 p-4">
                    <Gauge className="h-5 w-5 text-sky-300" />
                    <p className="mt-3 text-sm text-[#a1a1aa]">Avg latency</p>
                    <p className="text-xl font-semibold text-[#ededef]">324ms</p>
                  </div>
                  <div className="card-animate rounded-md border border-emerald-300/20 bg-emerald-300/10 p-4">
                    <BadgeCheck className="h-5 w-5 text-emerald-300" />
                    <p className="mt-3 text-sm text-[#a1a1aa]">Success rate</p>
                    <p className="text-xl font-semibold text-[#ededef]">99.95%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#262626] bg-[#000000]/50 py-16">
          <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-3 lg:px-8 stagger-children">
            {features.map((feature) => (
              <article key={feature.title} className="card-animate router-card p-6">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md border border-[#262626] bg-[#141414] text-[#ededef] transition-transform hover:scale-110">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold text-[#ededef]">
                  {feature.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#a1a1aa]">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <Badge className="animate-fade-in-up border-[#262626] bg-[#141414] text-[#a1a1aa]">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Platform details
            </Badge>
            <h2 className="animate-fade-in-up delay-100 mt-5 max-w-xl text-3xl font-semibold tracking-tight text-[#ededef] sm:text-4xl">
              Everything builders expect from an ProxyRouter-like console.
            </h2>
            <p className="animate-fade-in-up delay-200 mt-4 max-w-xl text-sm leading-6 text-[#a1a1aa]">
              Browse models, compare context windows and token pricing, create
              scoped API keys, track every request, configure provider policies,
              and keep billing in one place.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 stagger-children">
            {platformDetails.map((detail) => (
              <article key={detail.title} className="card-animate router-card p-5">
                <detail.icon className="h-5 w-5 text-[#a1a1aa]" />
                <h3 className="mt-4 font-semibold text-[#ededef]">
                  {detail.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#737373]">
                  {detail.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-[#262626] bg-[#000000] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="animate-fade-in-up mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.16em] text-[#737373]">
                  Pricing and limits
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-[#ededef]">
                  Simple plans for API access.
                </h2>
              </div>
              <Link href="/auth/signup">
                <Button className="btn-animate gap-2 rounded-md bg-white text-black hover:bg-zinc-200">
                  Create API Key
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="animate-fade-in-up delay-200 overflow-hidden rounded-md border border-[#262626]">
              {pricingRows.map(([plan, limit, pricing], index) => (
                <div
                  key={plan}
                  className="grid gap-2 border-b border-[#262626] bg-[#0a0a0a] px-4 py-4 last:border-0 sm:grid-cols-3 sm:items-center hover:bg-[#141414] transition-colors cursor-pointer"
                  style={{ animationDelay: `${200 + index * 100}ms` }}
                >
                  <span className="font-semibold text-[#ededef]">{plan}</span>
                  <span className="text-sm text-[#a1a1aa]">{limit}</span>
                  <span className="text-sm text-[#737373]">{pricing}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="border-y border-[#262626] bg-[#000000] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="animate-fade-in-up text-center">
              <p className="text-sm uppercase tracking-[0.16em] text-[#737373]">
                How it works
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#ededef] sm:text-4xl">
                Get started in three steps
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-sm leading-6 text-[#a1a1aa]">
                Integrate ProxyRouter into your existing workflow with minimal changes.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3 stagger-children">
              {howItWorks.map((item, index) => (
                <div
                  key={item.step}
                  className="animate-fade-in-up card-animate relative rounded-lg border border-[#262626] bg-[#0a0a0a] p-8"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="absolute -top-4 left-8 flex h-10 w-10 items-center justify-center rounded-md border border-[#262626] bg-[#000000] text-[#26a69a]">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-mono text-[#26a69a]">{item.step}</p>
                  <h3 className="mt-4 text-xl font-semibold text-[#ededef]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#a1a1aa]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="border-y border-[#262626] bg-[#000000]/50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="animate-fade-in-up text-center">
              <p className="text-sm uppercase tracking-[0.16em] text-[#737373]">
                Testimonials
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#ededef] sm:text-4xl">
                Trusted by engineering teams
              </h2>
            </div>

            <div className="mt-16 grid gap-6 md:grid-cols-3 stagger-children">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="animate-fade-in-up card-animate rounded-lg border border-[#262626] bg-[#0a0a0a] p-6"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-4 w-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-6 text-[#a1a1aa]">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div className="mt-6">
                    <p className="font-semibold text-[#ededef]">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-[#737373]">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid Section */}
        <section className="border-y border-[#262626] bg-[#000000] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="animate-fade-in-up text-center">
              <p className="text-sm uppercase tracking-[0.16em] text-[#737373]">
                Capabilities
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#ededef] sm:text-4xl">
                Everything you need to scale
              </h2>
            </div>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
              {[
                {
                  icon: Globe,
                  title: "Global Routing",
                  description: "Route requests to the fastest region for your users.",
                },
                {
                  icon: Lock,
                  title: "Enterprise Security",
                  description: "SOC 2 compliant with encryption at rest and in transit.",
                },
                {
                  icon: Activity,
                  title: "Real-time Monitoring",
                  description: "Live dashboards for latency, error rates, and costs.",
                },
                {
                  icon: Zap,
                  title: "Caching Layer",
                  description: "Reduce costs with intelligent response caching.",
                },
                {
                  icon: ShieldCheck,
                  title: "Rate Limiting",
                  description: "Protect your API with flexible quota controls.",
                },
                {
                  icon: WalletCards,
                  title: "Unified Billing",
                  description: "One invoice for all your provider usage.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="animate-fade-in-up card-animate rounded-lg border border-[#262626] bg-[#0a0a0a] p-6"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-md border border-[#262626] bg-[#141414]">
                    <feature.icon className="h-6 w-6 text-[#26a69a]" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-[#ededef]">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#a1a1aa]">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="border-y border-[#262626] bg-[#000000] py-24">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <div className="animate-fade-in-up">
              <h2 className="text-3xl font-semibold tracking-tight text-[#ededef] sm:text-4xl">
                Ready to streamline your AI infrastructure?
              </h2>
              <p className="mt-4 text-lg leading-8 text-[#a1a1aa]">
                Join thousands of developers already using ProxyRouter to build reliable, cost-effective AI applications.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/auth/signup">
                  <Button size="lg" className="btn-animate min-w-48 gap-2 rounded-md bg-white px-7 font-semibold text-black hover:bg-zinc-200">
                    Start Free
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button size="lg" variant="outline" className="btn-animate min-w-48 gap-2 rounded-md border-[#262626] bg-[#0a0a0a] px-7 text-[#ededef] hover:bg-[#141414] hover:border-[#333333]">
                    View Demo
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
