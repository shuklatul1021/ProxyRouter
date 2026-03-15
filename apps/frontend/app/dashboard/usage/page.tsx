"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  Calendar,
  Download,
  TrendingUp,
  TrendingDown,
  Activity,
  Zap,
  Clock,
} from "lucide-react";

const usageStats = {
  totalRequests: 12847,
  totalTokens: 4234567,
  totalCost: 42.35,
  avgLatency: 324,
};

const dailyUsage = [
  { date: "Feb 22", requests: 1245, tokens: 345678, cost: 3.45 },
  { date: "Feb 23", requests: 1567, tokens: 423456, cost: 4.23 },
  { date: "Feb 24", requests: 1123, tokens: 298765, cost: 2.98 },
  { date: "Feb 25", requests: 1789, tokens: 512345, cost: 5.12 },
  { date: "Feb 26", requests: 1456, tokens: 387654, cost: 3.87 },
  { date: "Feb 27", requests: 1678, tokens: 456789, cost: 4.56 },
  { date: "Feb 28", requests: 1989, tokens: 567890, cost: 5.67 },
];

const modelUsage = [
  {
    model: "gpt-4-turbo",
    provider: "OpenAI",
    requests: 5782,
    tokens: 1567890,
    cost: 15.68,
    percentage: 45,
  },
  {
    model: "claude-3-opus",
    provider: "Anthropic",
    requests: 3621,
    tokens: 987654,
    cost: 14.81,
    percentage: 28,
  },
  {
    model: "gemini-1.5-pro",
    provider: "Google",
    requests: 1934,
    tokens: 567890,
    cost: 1.99,
    percentage: 15,
  },
  {
    model: "llama-3-70b",
    provider: "Meta",
    requests: 1510,
    tokens: 1111133,
    cost: 1.0,
    percentage: 12,
  },
];

const recentRequests = [
  {
    id: "req_1",
    model: "gpt-4-turbo",
    inputTokens: 1245,
    outputTokens: 856,
    cost: 0.021,
    latency: 2345,
    status: "success",
    time: "2 min ago",
  },
  {
    id: "req_2",
    model: "claude-3-opus",
    inputTokens: 2567,
    outputTokens: 1234,
    cost: 0.057,
    latency: 3456,
    status: "success",
    time: "5 min ago",
  },
  {
    id: "req_3",
    model: "gemini-1.5-pro",
    inputTokens: 876,
    outputTokens: 432,
    cost: 0.005,
    latency: 1234,
    status: "success",
    time: "8 min ago",
  },
  {
    id: "req_4",
    model: "gpt-4-turbo",
    inputTokens: 3456,
    outputTokens: 0,
    cost: 0.035,
    latency: 5678,
    status: "error",
    time: "12 min ago",
  },
  {
    id: "req_5",
    model: "llama-3-70b",
    inputTokens: 1567,
    outputTokens: 987,
    cost: 0.002,
    latency: 987,
    status: "success",
    time: "15 min ago",
  },
];

export default function UsagePage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [timeRange, setTimeRange] = useState("7d");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Usage</h1>
          <p className="mt-2 text-muted-foreground">
            Monitor your API usage, costs, and performance.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Last 7 days
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Requests
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {usageStats.totalRequests.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3 text-accent" />
              <span className="text-accent">+12.5%</span>
              <span className="text-muted-foreground">vs last period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tokens Used
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(usageStats.totalTokens / 1000000).toFixed(2)}M
            </div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3 text-accent" />
              <span className="text-accent">+8.3%</span>
              <span className="text-muted-foreground">vs last period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Cost
            </CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${usageStats.totalCost.toFixed(2)}
            </div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingDown className="h-3 w-3 text-accent" />
              <span className="text-accent">-5.2%</span>
              <span className="text-muted-foreground">vs last period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Latency
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usageStats.avgLatency}ms</div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingDown className="h-3 w-3 text-accent" />
              <span className="text-accent">-15ms</span>
              <span className="text-muted-foreground">vs last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Content */}
      <Tabs defaultValue="models" className="space-y-4">
        <TabsList>
          <TabsTrigger value="models">By Model</TabsTrigger>
          <TabsTrigger value="daily">Daily Breakdown</TabsTrigger>
          <TabsTrigger value="requests">Recent Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Usage by Model</CardTitle>
              <CardDescription>
                Breakdown of your API usage across different models
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {modelUsage.map((model) => (
                  <div key={model.model} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{model.model}</span>
                        <Badge variant="secondary">{model.provider}</Badge>
                      </div>
                      <div className="text-right">
                        <span className="font-medium">
                          ${model.cost.toFixed(2)}
                        </span>
                        <span className="ml-2 text-sm text-muted-foreground">
                          ({model.percentage}%)
                        </span>
                      </div>
                    </div>
                    <Progress value={model.percentage} className="h-2" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{model.requests.toLocaleString()} requests</span>
                      <span>{(model.tokens / 1000).toFixed(1)}K tokens</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="daily" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Usage</CardTitle>
              <CardDescription>
                Your API usage over the past 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Requests</TableHead>
                    <TableHead className="text-right">Tokens</TableHead>
                    <TableHead className="text-right">Cost</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dailyUsage.map((day) => (
                    <TableRow key={day.date}>
                      <TableCell className="font-medium">{day.date}</TableCell>
                      <TableCell className="text-right">
                        {day.requests.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {(day.tokens / 1000).toFixed(1)}K
                      </TableCell>
                      <TableCell className="text-right">
                        ${day.cost.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Requests</CardTitle>
              <CardDescription>Your latest API requests</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead className="text-right">Input Tokens</TableHead>
                    <TableHead className="text-right">Output Tokens</TableHead>
                    <TableHead className="text-right">Cost</TableHead>
                    <TableHead className="text-right">Latency</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentRequests.map((req) => (
                    <TableRow key={req.id}>
                      <TableCell className="font-mono text-sm">
                        {req.id}
                      </TableCell>
                      <TableCell>{req.model}</TableCell>
                      <TableCell className="text-right">
                        {req.inputTokens.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {req.outputTokens.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        ${req.cost.toFixed(3)}
                      </TableCell>
                      <TableCell className="text-right">
                        {req.latency}ms
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            req.status === "success" ? "default" : "destructive"
                          }
                        >
                          {req.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {req.time}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
