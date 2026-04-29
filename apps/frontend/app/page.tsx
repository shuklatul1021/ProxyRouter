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

export default function Home() {
  return (
    <div className="router-bg min-h-screen overflow-x-hidden text-white">
      <Navbar />

      <main className="relative pt-16">
        <section className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-4 pb-14 pt-10 sm:px-6 lg:grid-cols-[0.98fr_1.02fr] lg:px-8">
          <div className="router-grid pointer-events-none absolute inset-0 -z-10" />

          <div className="max-w-3xl">
            <Badge className="border-white/15 bg-white/[0.06] px-3 py-1 text-xs uppercase tracking-[0.16em] text-zinc-200">
              <Network className="mr-1.5 h-3.5 w-3.5" />
              Unified AI model router
            </Badge>

            <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[0.96] tracking-tight text-white sm:text-6xl lg:text-7xl">
              OpenRouter-style access to every leading model.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
              Build with a single API for model discovery, provider routing,
              credits, usage analytics, API keys, BYOK, and fallback reliability
              across hundreds of models.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  className="min-w-44 gap-2 rounded-md bg-white px-7 font-semibold text-black hover:bg-zinc-200"
                >
                  Start Building
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="min-w-44 gap-2 rounded-md border-zinc-700 bg-black/60 px-7 text-zinc-100 hover:bg-zinc-900"
                >
                  View Console
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
              {platformStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-md border border-white/10 bg-white/[0.035] p-4"
                >
                  <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">
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
            <div className="router-console">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                    Chat completions
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-white sm:text-3xl">
                    /api/v1/chat/completions
                  </p>
                </div>
                <div className="rounded-md border border-white/15 bg-white/[0.06] p-3 text-white">
                  <KeyRound className="h-6 w-6" />
                </div>
              </div>

              <div className="p-5">
                <div className="rounded-md border border-white/10 bg-black/55 p-4 font-mono text-xs leading-6 text-zinc-300">
                  <p className="text-zinc-500">POST</p>
                  <p>
                    model:{" "}
                    <span className="text-emerald-200">
                      &quot;openrouter/auto&quot;
                    </span>
                  </p>
                  <p>
                    route:{" "}
                    <span className="text-sky-200">
                      [&quot;openai&quot;, &quot;anthropic&quot;,
                      &quot;google&quot;]
                    </span>
                  </p>
                  <p>
                    fallback: <span className="text-white">true</span>
                  </p>
                </div>

                <div className="mt-5 rounded-md border border-white/10 bg-black/35">
                  {modelRows.map(([model, provider, capability, mode]) => (
                    <div
                      key={model}
                      className="grid gap-1 border-b border-white/10 px-4 py-3 last:border-0 sm:grid-cols-[1.25fr_0.7fr_1fr_auto] sm:items-center sm:gap-4"
                    >
                      <span className="font-mono text-sm text-white">
                        {model}
                      </span>
                      <span className="text-sm text-zinc-400">{provider}</span>
                      <span className="text-sm text-zinc-500">
                        {capability}
                      </span>
                      <span className="text-xs text-emerald-300">{mode}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-md border border-sky-300/20 bg-sky-300/10 p-4">
                    <Gauge className="h-5 w-5 text-sky-200" />
                    <p className="mt-3 text-sm text-zinc-400">Avg latency</p>
                    <p className="text-xl font-semibold text-white">324ms</p>
                  </div>
                  <div className="rounded-md border border-emerald-300/20 bg-emerald-300/10 p-4">
                    <BadgeCheck className="h-5 w-5 text-emerald-300" />
                    <p className="mt-3 text-sm text-zinc-400">Success rate</p>
                    <p className="text-xl font-semibold text-white">99.95%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-black/50 py-16">
          <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
            {features.map((feature) => (
              <article key={feature.title} className="router-card p-6">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md border border-white/15 bg-white/[0.06] text-white">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold text-white">
                  {feature.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <Badge className="border-white/15 bg-white/[0.06] text-zinc-200">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Platform details
            </Badge>
            <h2 className="mt-5 max-w-xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Everything builders expect from an OpenRouter-like console.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-400">
              Browse models, compare context windows and token pricing, create
              scoped API keys, track every request, configure provider policies,
              and keep billing in one place.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {platformDetails.map((detail) => (
              <article key={detail.title} className="router-card p-5">
                <detail.icon className="h-5 w-5 text-zinc-200" />
                <h3 className="mt-4 font-semibold text-white">
                  {detail.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  {detail.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-white/10 bg-black py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.16em] text-zinc-500">
                  Pricing and limits
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-white">
                  Simple plans for API access.
                </h2>
              </div>
              <Link href="/auth/signup">
                <Button className="gap-2 rounded-md bg-white text-black hover:bg-zinc-200">
                  Create API Key
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="overflow-hidden rounded-md border border-white/10">
              {pricingRows.map(([plan, limit, pricing]) => (
                <div
                  key={plan}
                  className="grid gap-2 border-b border-white/10 bg-white/[0.025] px-4 py-4 last:border-0 sm:grid-cols-3 sm:items-center"
                >
                  <span className="font-semibold text-white">{plan}</span>
                  <span className="text-sm text-zinc-400">{limit}</span>
                  <span className="text-sm text-zinc-500">{pricing}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
