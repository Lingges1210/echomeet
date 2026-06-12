"use client";

import { useState } from "react";
import { Gavel, Copy, Check, User, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/lib/utils";
import type { Decision } from "@/types";

interface DecisionsProps {
  decisions: Decision[];
}

export default function Decisions({ decisions }: DecisionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = decisions
      .map(
        (d, i) =>
          `${i + 1}. ${d.decision}\n   Rationale: ${d.rationale}\n   Decision-maker: ${d.madeBy}`
      )
      .join("\n\n");
    await copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gavel className="h-4 w-4 text-purple-400" />
          <h3 className="font-semibold text-sm">
            Decisions
            <span className="ml-2 text-xs text-muted-foreground font-normal">
              {decisions.length} made
            </span>
          </h3>
        </div>
        {decisions.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs gap-1.5 text-muted-foreground"
            onClick={handleCopy}
          >
            {copied ? <Check className="h-3 w-3 text-echo-400" /> : <Copy className="h-3 w-3" />}
            {copied ? "Copied" : "Copy all"}
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {decisions.length === 0 ? (
          <div className="flex items-center gap-2 rounded-lg border border-dashed border-border/40 p-4 text-sm text-muted-foreground">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            No explicit decisions found. Check open questions.
          </div>
        ) : (
          decisions.map((decision) => (
            <div
              key={decision.id}
              className="rounded-lg border border-border/40 bg-card p-4 hover:border-purple-500/20 transition-colors"
            >
              {/* Decision */}
              <div className="flex items-start gap-2 mb-2">
                <span className="text-purple-400 text-sm mt-0.5 flex-shrink-0">✓</span>
                <p className="text-sm font-medium leading-snug">{decision.decision}</p>
              </div>

              {/* Rationale */}
              {decision.rationale && decision.rationale !== "Not specified" && (
                <div className="ml-5 mb-2">
                  <p className="text-xs text-muted-foreground italic">
                    {decision.rationale}
                  </p>
                </div>
              )}

              {/* Made by */}
              {decision.madeBy && (
                <div className="ml-5 flex items-center gap-1 text-[11px] text-muted-foreground">
                  <User className="h-3 w-3" />
                  {decision.madeBy}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
