"use client";

import { useState } from "react";
import { Mail, Copy, Check, RefreshCw, Wand2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { copyToClipboard } from "@/lib/utils";

interface EmailDraftProps {
  email: string;
  onEmailChange: (email: string) => void;
}

// Very basic markdown to HTML for email preview
function renderEmail(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/^### (.+)$/gm, '<h4 class="text-xs font-semibold text-echo-400 uppercase tracking-wider mt-4 mb-1">$1</h4>')
    .replace(/^## (.+)$/gm, '<h3 class="text-sm font-semibold mt-4 mb-1">$1</h3>')
    .replace(/^\| (.+) \|$/gm, (match) => {
      if (match.includes("---")) return "";
      const cells = match.split("|").filter(Boolean).map(c => c.trim());
      const isHeader = false;
      return `<tr>${cells.map(c => `<td class="border border-border/40 px-2 py-1 text-xs">${c}</td>`).join("")}</tr>`;
    })
    .replace(/^- (.+)$/gm, '<li class="text-sm ml-4">$1</li>')
    .replace(/\n\n/g, '</p><p class="mb-2">')
    .replace(/\n/g, "<br>");
}

const REFINEMENT_SUGGESTIONS = [
  "Make it shorter and more concise",
  "Make the tone more formal",
  "Make the tone more casual and friendly",
  "Add a specific deadline reminder",
  "Emphasise the high priority action items",
];

export default function EmailDraft({ email, onEmailChange }: EmailDraftProps) {
  const [copied, setCopied] = useState(false);
  const [refineInstruction, setRefineInstruction] = useState("");
  const [isRefining, setIsRefining] = useState(false);
  const [showRefine, setShowRefine] = useState(false);

  const handleCopy = async () => {
    await copyToClipboard(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMailto = () => {
    const subject = encodeURIComponent("Meeting Follow-Up");
    const body = encodeURIComponent(email);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const handleRefine = async (instruction: string) => {
    if (!instruction.trim()) return;
    setIsRefining(true);
    try {
      const res = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentEmail: email, instruction }),
      });
      const data = await res.json();
      if (data.email) {
        onEmailChange(data.email);
        setRefineInstruction("");
      }
    } catch (err) {
      console.error("Email refinement error:", err);
    } finally {
      setIsRefining(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-blue-400" />
          <h3 className="font-semibold text-sm">Follow-up Email</h3>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs gap-1.5 text-muted-foreground"
            onClick={() => setShowRefine(!showRefine)}
          >
            <Wand2 className="h-3 w-3" />
            Refine
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs gap-1.5 text-muted-foreground"
            onClick={handleCopy}
          >
            {copied ? <Check className="h-3 w-3 text-echo-400" /> : <Copy className="h-3 w-3" />}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs gap-1.5"
            onClick={handleMailto}
          >
            <Mail className="h-3 w-3" />
            Open in mail
          </Button>
        </div>
      </div>

      {/* AI Refine panel */}
      {showRefine && (
        <div className="rounded-lg border border-echo-500/20 bg-echo-500/5 p-3 space-y-3">
          <p className="text-xs text-muted-foreground">
            Tell the AI how to change the email:
          </p>
          {/* Quick suggestions */}
          <div className="flex flex-wrap gap-1.5">
            {REFINEMENT_SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleRefine(s)}
                disabled={isRefining}
                className="text-[11px] px-2 py-1 rounded-full border border-border/60 bg-muted hover:border-echo-500/40 hover:bg-echo-500/10 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>
          {/* Custom instruction */}
          <div className="flex gap-2">
            <Input
              value={refineInstruction}
              onChange={(e) => setRefineInstruction(e.target.value)}
              placeholder="Or write your own instruction..."
              className="text-xs h-8 flex-1"
              disabled={isRefining}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleRefine(refineInstruction);
              }}
            />
            <Button
              size="sm"
              variant="teal"
              className="h-8 text-xs gap-1.5"
              disabled={isRefining || !refineInstruction.trim()}
              onClick={() => handleRefine(refineInstruction)}
            >
              {isRefining ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <RefreshCw className="h-3 w-3" />
              )}
              {isRefining ? "Rewriting..." : "Rewrite"}
            </Button>
          </div>
        </div>
      )}

      {/* Email preview */}
      <div className="rounded-lg border border-border/40 bg-card overflow-hidden">
        {/* Email chrome */}
        <div className="border-b border-border/40 px-4 py-2 bg-muted/20">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Mail className="h-3 w-3" />
            <span>Draft · Follow-up from EchoMeet</span>
          </div>
        </div>
        <div
          className="p-4 text-sm leading-relaxed prose-sm max-h-[400px] overflow-y-auto"
          dangerouslySetInnerHTML={{ __html: `<p class="mb-2">${renderEmail(email)}</p>` }}
        />
      </div>

      {/* Raw text toggle */}
      <details className="group">
        <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors flex items-center gap-1">
          <span className="group-open:rotate-90 transition-transform inline-block">▶</span>
          View raw text
        </summary>
        <pre className="mt-2 text-xs font-mono text-muted-foreground bg-muted/30 rounded-lg p-3 overflow-auto whitespace-pre-wrap max-h-64">
          {email}
        </pre>
      </details>
    </div>
  );
}
