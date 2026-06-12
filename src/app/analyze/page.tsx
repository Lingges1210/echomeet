"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Zap, Sparkles } from "lucide-react";
import InputPanel from "@/components/analyze/InputPanel";
import ResultsPanel from "@/components/analyze/ResultsPanel";
import type { MeetingAnalysis } from "@/types";

// Loading skeleton while AI processes
function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-4 h-full animate-pulse">
      {/* Header card skeleton */}
      <div className="rounded-xl border border-border/60 bg-card p-4">
        <div className="h-5 bg-muted/60 rounded-md w-3/4 mb-2" />
        <div className="h-3 bg-muted/40 rounded-md w-1/2 mb-4" />
        <div className="space-y-2">
          <div className="h-3 bg-muted/40 rounded-md w-full" />
          <div className="h-3 bg-muted/40 rounded-md w-5/6" />
          <div className="h-3 bg-muted/40 rounded-md w-4/5" />
        </div>
      </div>
      {/* Stats row skeleton */}
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg border border-border/40 bg-card p-3 text-center">
            <div className="h-4 w-4 bg-muted/60 rounded-full mx-auto mb-2" />
            <div className="h-6 bg-muted/60 rounded-md w-8 mx-auto mb-1" />
            <div className="h-2 bg-muted/40 rounded-md w-16 mx-auto" />
          </div>
        ))}
      </div>
      {/* Tabs skeleton */}
      <div className="rounded-lg border border-border/40 bg-card p-4">
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-7 bg-muted/40 rounded-md flex-1" />
          ))}
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg border border-border/40 p-3">
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 bg-muted/60 rounded mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="h-3 bg-muted/60 rounded w-full mb-1.5" />
                  <div className="h-2.5 bg-muted/40 rounded w-1/3" />
                </div>
                <div className="h-4 w-12 bg-muted/40 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Processing indicator */}
      <div className="flex items-center justify-center gap-3 py-4">
        <div className="flex gap-1">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-echo-400 typing-dot"
              style={{ animationDelay: `${(i - 1) * 0.2}s` }}
            />
          ))}
        </div>
        <span className="text-xs text-muted-foreground">
          LLaMA 3 is reading your notes...
        </span>
      </div>
    </div>
  );
}

export default function AnalyzePage() {
  const [analysis, setAnalysis] = useState<MeetingAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyse = async (
    notes: string,
    context: string,
    attendeeHint: string
  ) => {
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes, meetingContext: context, attendeeHint }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      setAnalysis(data.analysis);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
            <div className="h-4 w-px bg-border" />
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-echo-500/20 border border-echo-500/30">
                <Zap className="h-3 w-3 text-echo-400" />
              </div>
              <span className="font-semibold text-sm">
                Echo<span className="text-echo-400">Meet</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-echo-400" />
            <span className="hidden sm:inline">Powered by Groq · LLaMA 3</span>
            <span className="sm:hidden">Groq AI</span>
          </div>
        </div>
      </header>

      {/* Main split layout */}
      <main className="container mx-auto max-w-7xl px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 min-h-[calc(100vh-8rem)]">
          {/* Left: Input */}
          <div className="flex flex-col">
            <InputPanel onAnalyse={handleAnalyse} isLoading={isLoading} />
          </div>

          {/* Right: Results */}
          <div className="flex flex-col">
            {isLoading ? (
              <LoadingSkeleton />
            ) : error ? (
              <div className="flex flex-col items-center justify-center h-full rounded-xl border border-red-500/20 bg-red-500/5 p-8 text-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <span className="text-red-400 text-xl">!</span>
                </div>
                <div>
                  <h3 className="font-semibold text-red-400 mb-1">Analysis failed</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">{error}</p>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2"
                >
                  Dismiss
                </button>
              </div>
            ) : analysis ? (
              <ResultsPanel analysis={analysis} />
            ) : (
              /* Empty state */
              <div className="flex flex-col items-center justify-center h-full rounded-xl border border-dashed border-border/40 p-8 text-center gap-3 min-h-[400px]">
                <div className="w-14 h-14 rounded-2xl bg-echo-500/10 border border-echo-500/20 flex items-center justify-center mb-2">
                  <Zap className="h-7 w-7 text-echo-400" />
                </div>
                <h3 className="font-semibold">Ready to analyse</h3>
                <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                  Paste your meeting notes on the left and hit{" "}
                  <strong className="text-foreground">Analyse meeting</strong> to
                  extract action items, decisions, and generate your follow-up email.
                </p>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {["Action items", "Decisions", "Open questions", "Follow-up email"].map(
                    (item) => (
                      <span
                        key={item}
                        className="text-[11px] px-2.5 py-1 rounded-full bg-muted border border-border/40 text-muted-foreground"
                      >
                        {item}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
