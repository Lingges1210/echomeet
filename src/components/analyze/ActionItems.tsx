"use client";

import { useState } from "react";
import { CheckSquare, Copy, Check, User, Calendar, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { copyToClipboard, getPriorityColor } from "@/lib/utils";
import type { ActionItem } from "@/types";

interface ActionItemsProps {
  items: ActionItem[];
}

export default function ActionItems({ items }: ActionItemsProps) {
  const [copied, setCopied] = useState(false);
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggleCheck = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleCopy = async () => {
    const text = items
      .map(
        (item, i) =>
          `${i + 1}. [${item.priority.toUpperCase()}] ${item.task}\n   Owner: ${item.owner}\n   Deadline: ${item.deadline}`
      )
      .join("\n\n");
    await copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const high = items.filter((i) => i.priority === "high");
  const medium = items.filter((i) => i.priority === "medium");
  const low = items.filter((i) => i.priority === "low");
  const done = checked.size;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckSquare className="h-4 w-4 text-echo-400" />
          <h3 className="font-semibold text-sm">
            Action Items
            <span className="ml-2 text-xs text-muted-foreground font-normal">
              {done > 0 && `${done}/${items.length} done · `}
              {high.length > 0 && (
                <span className="text-red-400">{high.length} high</span>
              )}
              {high.length > 0 && medium.length > 0 && " · "}
              {medium.length > 0 && (
                <span className="text-amber-400">{medium.length} medium</span>
              )}
              {(high.length > 0 || medium.length > 0) && low.length > 0 && " · "}
              {low.length > 0 && (
                <span className="text-emerald-400">{low.length} low</span>
              )}
            </span>
          </h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs gap-1.5 text-muted-foreground"
          onClick={handleCopy}
        >
          {copied ? (
            <Check className="h-3 w-3 text-echo-400" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
          {copied ? "Copied" : "Copy all"}
        </Button>
      </div>

      {/* Items */}
      <div className="space-y-2">
        {items.length === 0 ? (
          <div className="flex items-center gap-2 rounded-lg border border-dashed border-border/40 p-4 text-sm text-muted-foreground">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            No action items found in these notes.
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className={`flex items-start gap-3 rounded-lg border p-3 transition-colors cursor-pointer group ${
                checked.has(item.id)
                  ? "border-border/20 bg-muted/20 opacity-60"
                  : "border-border/40 bg-card hover:border-echo-500/20"
              }`}
              onClick={() => toggleCheck(item.id)}
            >
              {/* Checkbox */}
              <div
                className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded border transition-colors ${
                  checked.has(item.id)
                    ? "bg-echo-500 border-echo-500"
                    : "border-border group-hover:border-echo-500/50"
                }`}
              >
                {checked.has(item.id) && (
                  <Check className="h-3 w-3 text-black m-px" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm leading-snug ${
                    checked.has(item.id) ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {item.task}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-1.5">
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <User className="h-3 w-3" />
                    {item.owner}
                  </span>
                  {item.deadline && item.deadline !== "No deadline set" && (
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {item.deadline}
                    </span>
                  )}
                </div>
              </div>

              {/* Priority badge */}
              <Badge
                className={`text-[10px] px-1.5 py-0.5 flex-shrink-0 border ${getPriorityColor(item.priority)}`}
              >
                {item.priority}
              </Badge>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
