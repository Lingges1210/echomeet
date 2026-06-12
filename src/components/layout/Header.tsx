import Link from "next/link";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-echo-500/20 border border-echo-500/30 group-hover:bg-echo-500/30 transition-colors">
            <Zap className="h-4 w-4 text-echo-400" />
          </div>
          <span className="font-bold text-lg tracking-tight">
            Echo<span className="text-echo-400">Meet</span>
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link
            href="/#how-it-works"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            How it works
          </Link>
          <Link
            href="/#use-cases"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Use cases
          </Link>
          <Link
            href="/analyze"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Try it
          </Link>
        </nav>

        {/* CTA */}
        <Link href="/analyze">
          <Button variant="teal" size="sm" className="gap-2">
            <Zap className="h-3.5 w-3.5" />
            Analyse notes
          </Button>
        </Link>
      </div>
    </header>
  );
}
