"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  Clock,
  Code2,
  CreditCard,
  GitBranch,
  Key,
  Network,
  ShieldCheck,
  TrendingUp,
  WalletCards,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useUser } from "../providers/UserProvider";

const stats = [
  {
    title: "Credit Balance",
    value: "$24.50",
    description: "~2.4M estimated tokens",
    icon: WalletCards,
    trend: null,
  },
  {
    title: "API Requests",
    value: "12,847",
    description: "Requests in 30 days",
    icon: Network,
    trend: "+12.5%",
  },
  {
    title: "Tokens Routed",
    value: "4.2M",
    description: "Last 30 days",
    icon: BarChart3,
    trend: "+8.3%",
  },
  {
    title: "Active Keys",
    value: "3",
    description: "2 production keys",
    icon: Key,
    trend: null,
  },
];

const recentActivity = [
  {
    model: "openai/gpt-4.1",
    provider: "OpenAI",
    tokens: 2847,
    cost: "$0.028",
    time: "2 min ago",
  },
  {
    model: "anthropic/claude-3.7-sonnet",
    provider: "Anthropic",
    tokens: 5621,
    cost: "$0.084",
    time: "5 min ago",
  },
  {
    model: "google/gemini-2.5-pro",
    provider: "Google",
    tokens: 1234,
    cost: "$0.004",
    time: "12 min ago",
  },
  {
    model: "meta-llama/llama-3.3-70b",
    provider: "Meta",
    tokens: 8432,
    cost: "$0.008",
    time: "18 min ago",
  },
  {
    model: "deepseek/deepseek-chat",
    provider: "DeepSeek",
    tokens: 3156,
    cost: "$0.032",
    time: "25 min ago",
  },
];

const providerMix = [
  { name: "OpenAI", usage: 39, requests: "5,782 reqs" },
  { name: "Anthropic", usage: 28, requests: "3,621 reqs" },
  { name: "Google", usage: 18, requests: "1,934 reqs" },
  { name: "Open models", usage: 15, requests: "1,510 reqs" },
];

export default function DashboardPage() {
  const { user } = useUser();
  console.log("Dashboard User: ", user);
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-md border border-[#262626] bg-[#0a0a0a] p-6 lg:p-8">
        <div className="router-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <Badge className="border-[#262626] bg-[#141414] text-[#ededef]">
              <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
              Routing overview
            </Badge>
            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Welcome back, {user?.name ?? "John"}.
            </h1>
            <p className="mt-2 max-w-2xl text-zinc-400">
              Monitor model routing, API keys, credits, provider fallback, and
              request analytics from your ProxyRouter console.
            </p>
          </div>

          <div className="min-w-64 rounded-md border border-[#262626] bg-[#0a0a0a] p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-300">Available credits</span>
              <WalletCards className="h-5 w-5 text-white" />
            </div>
            <p className="mt-3 text-4xl font-semibold text-white">${user?.credit.creditAmount?.toFixed(2)}</p>
            <p className="mt-1 text-sm text-emerald-300">
              Auto fallback: enabled
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="router-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-zinc-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-white">
                {stat.value}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <p className="text-xs text-zinc-500">{stat.description}</p>
                {stat.trend && (
                  <Badge className="gap-1 border-emerald-300/20 bg-emerald-300/10 text-xs text-emerald-300">
                    <TrendingUp className="h-3 w-3" />
                    {stat.trend}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <Card className="router-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-white">Recent Requests</CardTitle>
              <CardDescription className="text-zinc-500">
                Latest routed model calls
              </CardDescription>
            </div>
            <Link href="/dashboard/usage">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-zinc-100 hover:bg-white/5"
              >
                View all
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={`${activity.model}-${activity.time}`}
                  className="flex items-center justify-between gap-4 border-b border-[#262626] pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#262626] bg-[#141414]">
                      <Network className="h-5 w-5 text-zinc-200" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-mono text-sm font-medium text-white">
                        {activity.model}
                      </p>
                      <p className="text-sm text-zinc-500">
                        {activity.provider} · {activity.tokens.toLocaleString()}{" "}
                        tokens
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-white">{activity.cost}</p>
                    <p className="flex items-center justify-end gap-1 text-sm text-zinc-500">
                      <Clock className="h-3 w-3" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="router-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-white">Provider Mix</CardTitle>
              <CardDescription className="text-zinc-500">
                Model traffic by provider
              </CardDescription>
            </div>
            <Link href="/dashboard/credits">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-zinc-100 hover:bg-white/5"
              >
                Details
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="mb-6 rounded-md border border-[#262626] bg-[#0a0a0a] p-4 font-mono text-xs leading-6 text-[#a1a1aa]">
              <p>
                route = [&quot;openai&quot;, &quot;anthropic&quot;,
                &quot;google&quot;]
              </p>
              <p>fallback = true</p>
              <p>data_retention = &quot;disabled&quot;</p>
            </div>

            <div className="space-y-6">
              {providerMix.map((item) => (
                <div key={item.name} className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-medium text-white">{item.name}</span>
                    <span className="text-sm text-zinc-500">
                      {item.requests}
                    </span>
                  </div>
                  <Progress value={item.usage} className="h-2 bg-zinc-800" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="router-card">
        <CardHeader>
          <CardTitle className="text-white">Quick Actions</CardTitle>
          <CardDescription className="text-zinc-500">
            Common model routing and account shortcuts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/dashboard/keys">
              <Button
                variant="outline"
                className="h-28 w-full flex-col gap-2 rounded-md border-[#262626] bg-[#0a0a0a] text-[#ededef] hover:bg-[#141414] hover:border-[#333333]"
              >
                <Key className="h-6 w-6 text-zinc-100" />
                <span>Create API Key</span>
              </Button>
            </Link>
            <Link href="/dashboard/credits">
              <Button
                variant="outline"
                className="h-28 w-full flex-col gap-2 rounded-md border-[#262626] bg-[#0a0a0a] text-[#ededef] hover:bg-[#141414] hover:border-[#333333]"
              >
                <CreditCard className="h-6 w-6 text-zinc-100" />
                <span>Add Credits</span>
              </Button>
            </Link>
            <Link href="/docs">
              <Button
                variant="outline"
                className="h-28 w-full flex-col gap-2 rounded-md border-[#262626] bg-[#0a0a0a] text-[#ededef] hover:bg-[#141414] hover:border-[#333333]"
              >
                <Code2 className="h-6 w-6 text-zinc-100" />
                <span>View Docs</span>
              </Button>
            </Link>
            <Link href="/dashboard/usage">
              <Button
                variant="outline"
                className="h-28 w-full flex-col gap-2 rounded-md border-[#262626] bg-[#0a0a0a] text-[#ededef] hover:bg-[#141414] hover:border-[#333333]"
              >
                <GitBranch className="h-6 w-6 text-zinc-100" />
                <span>Routing Report</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
