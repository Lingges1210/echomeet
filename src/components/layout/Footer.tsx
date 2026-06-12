import Link from "next/link";
import { Zap, Github, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-echo-500/20 border border-echo-500/30">
              <Zap className="h-3.5 w-3.5 text-echo-400" />
            </div>
            <span className="font-semibold text-sm">
              Echo<span className="text-echo-400">Meet</span>
            </span>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Built by{" "}
            <a
              href="https://lingges.my"
              target="_blank"
              rel="noopener noreferrer"
              className="text-echo-400 hover:underline"
            >
              Lingges Muniandy
            </a>{" "}
            · Powered by{" "}
            <a
              href="https://groq.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-echo-400 hover:underline"
            >
              Groq
            </a>{" "}
            &amp; LLaMA 3
          </p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <Github className="h-3.5 w-3.5" />
              Source
            </a>
            <Link
              href="/analyze"
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Try it free
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
