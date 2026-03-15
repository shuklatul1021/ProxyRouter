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
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CreditCard,
  Plus,
  Wallet,
  TrendingUp,
  Clock,
  Download,
  Check,
  ArrowRight,
  Zap,
} from "lucide-react";

const creditPackages = [
  { amount: 10, bonus: 0, popular: false },
  { amount: 25, bonus: 5, popular: false },
  { amount: 50, bonus: 15, popular: true },
  { amount: 100, bonus: 35, popular: false },
  { amount: 250, bonus: 100, popular: false },
  { amount: 500, bonus: 250, popular: false },
];

const transactionHistory = [
  {
    id: "txn_1",
    type: "purchase",
    amount: 50.0,
    bonus: 15.0,
    date: "Feb 28, 2026",
    status: "completed",
    method: "Visa •••• 4242",
  },
  {
    id: "txn_2",
    type: "usage",
    amount: -12.45,
    bonus: 0,
    date: "Feb 27, 2026",
    status: "completed",
    method: "API Usage",
  },
  {
    id: "txn_3",
    type: "usage",
    amount: -8.32,
    bonus: 0,
    date: "Feb 26, 2026",
    status: "completed",
    method: "API Usage",
  },
  {
    id: "txn_4",
    type: "purchase",
    amount: 25.0,
    bonus: 5.0,
    date: "Feb 20, 2026",
    status: "completed",
    method: "Visa •••• 4242",
  },
  {
    id: "txn_5",
    type: "signup",
    amount: 5.0,
    bonus: 0,
    date: "Feb 15, 2026",
    status: "completed",
    method: "Welcome Bonus",
  },
];

export default function CreditsPage() {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [isAddCreditsOpen, setIsAddCreditsOpen] = useState(false);

  const currentBalance = 24.5;
  const usageThisMonth = 42.35;
  const estimatedDays = Math.floor(
    (currentBalance / (usageThisMonth / 28)) * 1,
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Credits</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your account balance and purchase credits.
          </p>
        </div>
        <Dialog open={isAddCreditsOpen} onOpenChange={setIsAddCreditsOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Credits
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Credits</DialogTitle>
              <DialogDescription>
                Choose a credit package or enter a custom amount.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {creditPackages.map((pkg) => (
                  <button
                    key={pkg.amount}
                    onClick={() => {
                      setSelectedPackage(pkg.amount);
                      setCustomAmount("");
                    }}
                    className={`relative rounded-lg border p-4 text-left transition-all hover:border-primary ${
                      selectedPackage === pkg.amount
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    }`}
                  >
                    {pkg.popular && (
                      <Badge className="absolute -top-2 -right-2">
                        Popular
                      </Badge>
                    )}
                    <div className="text-2xl font-bold">${pkg.amount}</div>
                    {pkg.bonus > 0 && (
                      <div className="mt-1 text-sm text-accent">
                        +${pkg.bonus} bonus
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or enter custom amount
                  </span>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="custom">Custom Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="custom"
                    type="number"
                    placeholder="Enter amount"
                    className="pl-8"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedPackage(null);
                    }}
                    min={5}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Minimum amount is $5.00
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddCreditsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                disabled={!selectedPackage && !customAmount}
                className="gap-2"
              >
                <CreditCard className="h-4 w-4" />
                Continue to Payment
                <ArrowRight className="h-4 w-4" />
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Balance Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Current Balance
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              ${currentBalance.toFixed(2)}
            </div>
            <div className="mt-2 flex items-center gap-4">
              <div className="flex items-center gap-1 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  ~{estimatedDays} days remaining
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Zap className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">~2.4M tokens</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Balance level</span>
                <span className="text-muted-foreground">{currentBalance}%</span>
              </div>
              <Progress
                value={Math.min(currentBalance, 100)}
                className="mt-2 h-2"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              This Month
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${usageThisMonth.toFixed(2)}
            </div>
            <p className="text-sm text-muted-foreground">spent on API usage</p>
            <div className="mt-4 space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span>GPT-4 Turbo</span>
                <span>$15.68</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Claude 3 Opus</span>
                <span>$14.81</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Others</span>
                <span>$11.86</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Auto-reload Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Auto-Reload</CardTitle>
          <CardDescription>
            Automatically add credits when your balance falls below a threshold.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="font-medium">Auto-reload is disabled</p>
              <p className="text-sm text-muted-foreground">
                Enable auto-reload to never run out of credits.
              </p>
            </div>
            <Button variant="outline">Configure Auto-Reload</Button>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>
              Your recent credit purchases and usage.
            </CardDescription>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactionHistory.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {txn.type === "purchase" ? (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20">
                          <Plus className="h-4 w-4 text-accent" />
                        </div>
                      ) : txn.type === "signup" ? (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                          <Zap className="h-4 w-4 text-primary" />
                        </div>
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                      <span className="capitalize">{txn.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <span
                        className={
                          txn.amount > 0 ? "text-accent" : "text-foreground"
                        }
                      >
                        {txn.amount > 0 ? "+" : ""}$
                        {Math.abs(txn.amount).toFixed(2)}
                      </span>
                      {txn.bonus > 0 && (
                        <span className="ml-1 text-sm text-muted-foreground">
                          (+${txn.bonus} bonus)
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {txn.method}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {txn.date}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="gap-1">
                      <Check className="h-3 w-3" />
                      {txn.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
