"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowRight, Github, Loader2, Network } from "lucide-react";
import { LoginUser } from "@/api/auth/auth";
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

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const loginResult = await LoginUser(email, password);
    if (loginResult.success) {
      toast("Login Successfully", { position: "bottom-right" });
      router.push("/dashboard");
    } else {
      toast("Error While Login", { position: "bottom-right" });
    }

    setIsLoading(false);
  };

  const handleOAuthLogin = (provider: string) => {
    setIsLoading(true);
    console.log(`Logging in with ${provider}`);
  };

  return (
    <div className="router-bg relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="router-grid pointer-events-none absolute inset-0" />

      <div className="relative grid w-full max-w-5xl items-center gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <section className="hidden lg:block">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-md border border-[#262626] bg-[#141414] text-white">
              <Network className="h-6 w-6" />
            </div>
            <span className="text-xl font-semibold text-[#ededef]">
              ProxyRouter
            </span>
          </Link>

          <h1 className="mt-10 max-w-lg text-5xl font-semibold leading-tight tracking-tight text-[#ededef]">
            Return to your model routing console.
          </h1>
          <p className="mt-5 max-w-md text-base leading-7 text-[#737373]">
            Review credits, API activity, provider fallback, and scoped keys
            from a single black workspace.
          </p>

          <div className="mt-8 max-w-sm rounded-md border border-[#262626] bg-[#0a0a0a] p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-[#737373]">
              Today&apos;s requests
            </p>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="text-3xl font-semibold text-[#ededef]">12,847</p>
                <p className="text-sm text-[#26a69a]">99.95% routed</p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#262626] bg-[#141414]">
                <Network className="h-7 w-7 text-[#ededef]" />
              </div>
            </div>
          </div>
        </section>

        <Card className="router-card text-white">
          <CardHeader className="text-center">
            <Link
              href="/"
              className="mx-auto flex h-12 w-12 items-center justify-center rounded-md border border-[#262626] bg-[#141414] text-[#ededef] lg:hidden"
            >
              <Network className="h-6 w-6" />
            </Link>
            <CardTitle className="mt-3 text-2xl">Welcome back</CardTitle>
            <CardDescription className="text-[#737373]">
              Sign in to your ProxyRouter account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Button
                  variant="outline"
                  className="w-full gap-2 border-[#262626] bg-[#0a0a0a] text-[#ededef] hover:bg-[#141414] hover:border-[#333333]"
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
                  Continue with Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2 border-[#262626] bg-[#0a0a0a] text-[#ededef] hover:bg-[#141414] hover:border-[#333333]"
                  onClick={() => handleOAuthLogin("github")}
                  disabled={isLoading}
                >
                  <Github className="h-4 w-4" />
                  Continue with GitHub
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-zinc-300">
                      Password
                    </Label>
                    <Link
                      href="/auth/forgot-password"
                    className="text-sm text-zinc-200 hover:text-white"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="border-zinc-700 bg-black/40 text-white placeholder:text-zinc-600"
                  />
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
                      Sign In
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            <p className="mt-6 text-center text-sm text-zinc-500">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="text-zinc-200 hover:underline">
                Create account
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
