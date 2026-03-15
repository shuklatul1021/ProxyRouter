"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  CreditCard,
  Key,
  Zap,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Activity,
} from "lucide-react";
import Link from "next/link";

const stats = [
  {
    title: "Total Credits",
    value: "$24.50",
    description: "~2.4M tokens remaining",
    icon: CreditCard,
    trend: null,
  },
  {
    title: "API Requests",
    value: "12,847",
    description: "Last 30 days",
    icon: Activity,
    trend: "+12.5%",
  },
  {
    title: "Tokens Used",
    value: "4.2M",
    description: "Last 30 days",
    icon: BarChart3,
    trend: "+8.3%",
  },
  {
    title: "Active Keys",
    value: "3",
    description: "2 in production",
    icon: Key,
    trend: null,
  },
];

const recentActivity = [
  {
    model: "gpt-4-turbo",
    tokens: 2847,
    cost: "$0.028",
    time: "2 min ago",
  },
  {
    model: "claude-3-opus",
    tokens: 5621,
    cost: "$0.084",
    time: "5 min ago",
  },
  {
    model: "gemini-1.5-pro",
    tokens: 1234,
    cost: "$0.004",
    time: "12 min ago",
  },
  {
    model: "llama-3-70b",
    tokens: 8432,
    cost: "$0.008",
    time: "18 min ago",
  },
  {
    model: "gpt-4-turbo",
    tokens: 3156,
    cost: "$0.032",
    time: "25 min ago",
  },
];

const topModels = [
  { name: "GPT-4 Turbo", usage: 45, requests: 5782 },
  { name: "Claude 3 Opus", usage: 28, requests: 3621 },
  { name: "Gemini 1.5 Pro", usage: 15, requests: 1934 },
  { name: "Llama 3 70B", usage: 12, requests: 1510 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold">Welcome back, John!</h1>
        <p className="mt-2 text-muted-foreground">
          Here&apos;s an overview of your API usage and credits.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-2">
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
                {stat.trend && (
                  <Badge variant="secondary" className="gap-1 text-xs">
                    <TrendingUp className="h-3 w-3" />
                    {stat.trend}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest API requests</CardDescription>
            </div>
            <Link href="/dashboard/usage">
              <Button variant="ghost" size="sm" className="gap-1">
                View all
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{activity.model}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.tokens.toLocaleString()} tokens
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{activity.cost}</p>
                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Models */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Top Models</CardTitle>
              <CardDescription>Most used models this month</CardDescription>
            </div>
            <Link href="/dashboard/usage">
              <Button variant="ghost" size="sm" className="gap-1">
                Details
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {topModels.map((model) => (
                <div key={model.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{model.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {model.requests.toLocaleString()} requests
                    </span>
                  </div>
                  <Progress value={model.usage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/dashboard/keys">
              <Button
                variant="outline"
                className="h-auto w-full flex-col gap-2 p-4"
              >
                <Key className="h-6 w-6" />
                <span>Create API Key</span>
              </Button>
            </Link>
            <Link href="/dashboard/credits">
              <Button
                variant="outline"
                className="h-auto w-full flex-col gap-2 p-4"
              >
                <CreditCard className="h-6 w-6" />
                <span>Add Credits</span>
              </Button>
            </Link>
            <Link href="/docs">
              <Button
                variant="outline"
                className="h-auto w-full flex-col gap-2 p-4"
              >
                <BarChart3 className="h-6 w-6" />
                <span>View Docs</span>
              </Button>
            </Link>
            <Link href="/dashboard/usage">
              <Button
                variant="outline"
                className="h-auto w-full flex-col gap-2 p-4"
              >
                <Activity className="h-6 w-6" />
                <span>Usage Report</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
