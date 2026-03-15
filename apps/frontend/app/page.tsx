import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Zap,
  Shield,
  DollarSign,
  Code,
  ArrowRight,
  Check,
  Globe,
  Sparkles,
  BarChart3,
} from "lucide-react";

const models = [
  {
    name: "GPT-4 Turbo",
    provider: "OpenAI",
    description: "Most capable GPT-4 model with 128k context",
    price: "$10.00",
    badge: "Popular",
  },
  {
    name: "Claude 3 Opus",
    provider: "Anthropic",
    description: "Most intelligent Claude model for complex tasks",
    price: "$15.00",
    badge: "New",
  },
  {
    name: "Gemini 1.5 Pro",
    provider: "Google",
    description: "Multi-modal model with 1M context window",
    price: "$3.50",
    badge: null,
  },
  {
    name: "Llama 3 70B",
    provider: "Meta",
    description: "Open-source powerhouse for general tasks",
    price: "$0.90",
    badge: "Open Source",
  },
  {
    name: "Mixtral 8x22B",
    provider: "Mistral",
    description: "Mixture of experts for efficient inference",
    price: "$1.20",
    badge: null,
  },
  {
    name: "Command R+",
    provider: "Cohere",
    description: "Optimized for RAG and tool use",
    price: "$3.00",
    badge: null,
  },
];

const features = [
  {
    icon: Globe,
    title: "Unified API",
    description:
      "Access 100+ AI models through a single, consistent API endpoint. No need to manage multiple integrations.",
  },
  {
    icon: DollarSign,
    title: "Pay As You Go",
    description:
      "Only pay for what you use with transparent per-token pricing. No monthly fees or commitments.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "SOC 2 Type II compliant with end-to-end encryption. Your data never leaves our secure infrastructure.",
  },
  {
    icon: Zap,
    title: "Smart Routing",
    description:
      "Automatic fallback and load balancing across providers. 99.99% uptime guaranteed.",
  },
  {
    icon: BarChart3,
    title: "Usage Analytics",
    description:
      "Detailed insights into your API usage, costs, and performance metrics in real-time.",
  },
  {
    icon: Code,
    title: "Developer First",
    description:
      "SDKs for every major language, comprehensive docs, and a vibrant community.",
  },
];

const codeExample = `import OpenRouter from 'openrouter';

const client = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const response = await client.chat.completions.create({
  model: 'anthropic/claude-3-opus',
  messages: [
    { role: 'user', content: 'Hello, Claude!' }
  ],
});

console.log(response.choices[0].message.content);`;

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="container relative mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-6">
            <Sparkles className="mr-1 h-3 w-3" />
            Now supporting 100+ AI models
          </Badge>
          <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
            One API for <span className="gradient-text">All AI Models</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Access GPT-4, Claude, Gemini, Llama, and 100+ more models through a
            unified API. Pay only for what you use with transparent pricing.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/auth/signup">
              <Button size="lg" className="gap-2 px-8">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button size="lg" variant="outline" className="px-8">
                View Documentation
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-accent" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-accent" />
              $5 free credits
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-accent" />
              Cancel anytime
            </div>
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section className="border-t border-border bg-card/50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Access Top AI Models
            </h2>
            <p className="mt-4 text-muted-foreground">
              Choose from the world&apos;s leading AI models, all available
              through a single API.
            </p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {models.map((model) => (
              <Card
                key={model.name}
                className="group cursor-pointer transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              >
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                  <div>
                    <CardTitle className="text-lg">{model.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {model.provider}
                    </p>
                  </div>
                  {model.badge && (
                    <Badge
                      variant={
                        model.badge === "Popular" ? "default" : "secondary"
                      }
                    >
                      {model.badge}
                    </Badge>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {model.description}
                  </p>
                  <p className="mt-4 text-lg font-semibold text-primary">
                    {model.price}
                    <span className="text-sm font-normal text-muted-foreground">
                      {" "}
                      / 1M tokens
                    </span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/models">
              <Button variant="outline" className="gap-2">
                View All Models
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Why Choose OpenRouter?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Built for developers who want simplicity without sacrificing
              power.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="border-border/50">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="border-t border-border bg-card/50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">
                Start Building in Minutes
              </h2>
              <p className="mt-4 text-muted-foreground">
                Our API is compatible with OpenAI&apos;s SDK. Switch providers
                or try new models with a single line change.
              </p>
              <ul className="mt-8 space-y-4">
                <li className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20">
                    <Check className="h-4 w-4 text-accent" />
                  </div>
                  <span>OpenAI SDK compatible</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20">
                    <Check className="h-4 w-4 text-accent" />
                  </div>
                  <span>Streaming support out of the box</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20">
                    <Check className="h-4 w-4 text-accent" />
                  </div>
                  <span>Function calling & tool use</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20">
                    <Check className="h-4 w-4 text-accent" />
                  </div>
                  <span>Vision & multi-modal support</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link href="/docs/quickstart">
                  <Button className="gap-2">
                    Read the Quickstart Guide
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-[#0d0d0d] p-6">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span className="ml-2 text-sm text-muted-foreground">
                  index.ts
                </span>
              </div>
              <pre className="overflow-x-auto text-sm">
                <code className="text-muted-foreground">{codeExample}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-background p-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Join thousands of developers using OpenRouter to build the next
              generation of AI applications.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/auth/signup">
                <Button size="lg" className="gap-2 px-8">
                  Create Free Account
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="px-8">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
