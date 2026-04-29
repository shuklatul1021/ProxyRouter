"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  Github,
  Loader2,
  Network,
  ShieldCheck,
} from "lucide-react";
import { RegisterUser } from "@/api/auth/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const benefits = [
  "One API for hundreds of models",
  "$5 starter API credits",
  "Usage, latency, and spend tracking",
  "Provider fallback and BYOK controls",
  "No credit card required",
];

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [companyname, setCompanyname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const regResult = await RegisterUser(
      name,
      username,
      companyname,
      email,
      password,
    );

    if (regResult.success) {
      router.push("/auth/login");
    } else {
      alert("Error");
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = (provider: string) => {
    setIsLoading(true);
    console.log(`Signing up with ${provider}`);
  };

  return (
    <div className="router-bg relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="router-grid pointer-events-none absolute inset-0" />

      <div className="relative grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <section className="hidden lg:flex lg:flex-col lg:justify-center">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-md border border-white/15 bg-white/[0.06] text-white">
              <Network className="h-6 w-6" />
            </div>
            <span className="text-xl font-semibold text-white">
              OpenRouter
            </span>
          </Link>

          <h1 className="mt-10 text-5xl font-semibold leading-tight tracking-tight text-white">
            Launch your AI routing workspace.
          </h1>
          <p className="mt-5 max-w-md text-base leading-7 text-zinc-400">
            Build with a dashboard designed for model discovery, provider
            routing, API keys, credits, and usage clarity.
          </p>

          <ul className="mt-8 space-y-4">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-white/[0.06]">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <span className="text-zinc-200">{benefit}</span>
              </li>
            ))}
          </ul>
        </section>

        <Card className="router-card border-white/10 bg-zinc-950/90 text-white shadow-2xl">
          <CardHeader className="text-center">
            <Link
              href="/"
              className="mx-auto flex h-12 w-12 items-center justify-center rounded-md border border-white/15 bg-white/[0.06] text-white lg:hidden"
            >
              <Network className="h-6 w-6" />
            </Link>
            <div className="mx-auto hidden h-12 w-12 items-center justify-center rounded-md border border-white/15 bg-white/[0.06] text-white lg:flex">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <CardTitle className="mt-3 text-2xl">Create your account</CardTitle>
            <CardDescription className="text-zinc-400">
              Start routing AI model requests today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2 sm:grid-cols-2">
                <Button
                  variant="outline"
                  className="w-full gap-2 border-zinc-700 bg-black/40 text-zinc-100 hover:bg-zinc-900"
                  onClick={() => handleOAuthLogin("google")}
                  disabled={isLoading}
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2 border-zinc-700 bg-black/40 text-zinc-100 hover:bg-zinc-900"
                  onClick={() => handleOAuthLogin("github")}
                  disabled={isLoading}
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="bg-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-zinc-950 px-2 text-zinc-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="name" className="text-zinc-300">
                      Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      disabled={isLoading}
                      className="border-zinc-700 bg-black/40 text-white placeholder:text-zinc-600"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="username" className="text-zinc-300">
                      Username
                    </Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="johndoe"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      disabled={isLoading}
                      className="border-zinc-700 bg-black/40 text-white placeholder:text-zinc-600"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="companyname" className="text-zinc-300">
                    Company Name
                  </Label>
                  <Input
                    id="companyname"
                    type="text"
                    placeholder="Aurum Labs"
                    value={companyname}
                    onChange={(e) => setCompanyname(e.target.value)}
                    required
                    disabled={isLoading}
                    className="border-zinc-700 bg-black/40 text-white placeholder:text-zinc-600"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-zinc-300">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                      className="border-zinc-700 bg-black/40 text-white placeholder:text-zinc-600"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password" className="text-zinc-300">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      minLength={8}
                      className="border-zinc-700 bg-black/40 text-white placeholder:text-zinc-600"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full gap-2 rounded-md bg-white font-semibold text-black hover:bg-zinc-200"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <p className="text-center text-xs text-zinc-500">
                By creating an account, you agree to our{" "}
                <Link href="/terms" className="text-zinc-300 underline">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-zinc-300 underline">
                  Privacy Policy
                </Link>
              </p>
            </div>

            <p className="mt-6 text-center text-sm text-zinc-500">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-zinc-200 hover:underline">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
