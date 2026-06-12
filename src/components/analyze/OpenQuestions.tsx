"use client";

import { HelpCircle, User, AlertCircle } from "lucide-react";
import type { OpenQuestion } from "@/types";

interface OpenQuestionsProps {
  questions: OpenQuestion[];
}

export default function OpenQuestions({ questions }: OpenQuestionsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <HelpCircle className="h-4 w-4 text-amber-400" />
        <h3 className="font-semibold text-sm">
          Open Questions
          <span className="ml-2 text-xs text-muted-foreground font-normal">
            {questions.length} unresolved
          </span>
        </h3>
      </div>

      <div className="space-y-2">
        {questions.length === 0 ? (
          <div className="flex items-center gap-2 rounded-lg border border-dashed border-border/40 p-4 text-sm text-muted-foreground">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            No open questions — everything was resolved!
          </div>
        ) : (
          questions.map((q) => (
            <div
              key={q.id}
              className="rounded-lg border border-border/40 bg-card p-3 hover:border-amber-500/20 transition-colors"
            >
              <div className="flex items-start gap-2 mb-1.5">
                <span className="text-amber-400 text-sm flex-shrink-0 mt-0.5">?</span>
                <p className="text-sm leading-snug">{q.question}</p>
              </div>
              {q.context && q.context !== "Not specified" && (
                <p className="text-xs text-muted-foreground ml-4 mb-1.5 italic">
                  {q.context}
                </p>
              )}
              {q.assignedTo && q.assignedTo !== "TBD" && (
                <div className="ml-4 flex items-center gap-1 text-[11px] text-muted-foreground">
                  <User className="h-3 w-3" />
                  Assigned to {q.assignedTo}
                </div>
              )}
              {(!q.assignedTo || q.assignedTo === "TBD") && (
                <div className="ml-4 text-[11px] text-amber-400/70">
                  Owner not assigned
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
