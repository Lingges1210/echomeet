"use client";

import { useState, useRef, useCallback } from "react";
import {
  ClipboardPaste, FileUp, X, Zap, ChevronDown, ChevronUp, Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { wordCount } from "@/lib/utils";

const EXAMPLE_NOTES = `Q2 Planning Meeting — March 15, 2pm
Attendees: Sarah (PM), Dev (Eng Lead), Amir (Backend), Priya (Design)

Sarah: We need to lock the Q2 roadmap by Thursday. The analytics dashboard is at risk.
Dev: The auth refactor is blocking 3 other tickets. Need 2 more days minimum.
Amir: API rate limiting PR is ready, just waiting on Dev's review.
Priya: Mobile designs are 80% done. Need Sarah to approve the new nav pattern before I proceed.

Decision: Push analytics dashboard to Q3. Not enough bandwidth in Q2.
Decision: Sarah takes ownership of roadmap doc, shares with team by Thursday EOD.

Action: Amir to send PR link to Dev. Dev to review today.
Action: Priya sends nav mockups to Sarah by tomorrow morning.
Action: Dev investigates broken staging env (likely env var issue from yesterday's deploy).
Action: Sarah to book design review for Thursday 2pm.

Open: What colour system are we going with for the mobile redesign?
Open: Are we still targeting the June 30 launch date given the auth delay?`;

interface InputPanelProps {
  onAnalyse: (notes: string, context: string, attendeeHint: string) => void;
  isLoading: boolean;
}

export default function InputPanel({ onAnalyse, isLoading }: InputPanelProps) {
  const [notes, setNotes] = useState("");
  const [context, setContext] = useState("");
  const [attendeeHint, setAttendeeHint] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const words = wordCount(notes);
  const chars = notes.length;
  const isReady = notes.trim().length >= 20 && !isLoading;

  const handleFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setNotes(text);
    };
    reader.readAsText(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file && (file.type === "text/plain" || file.name.endsWith(".txt") || file.name.endsWith(".md"))) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const handleSubmit = () => {
    if (isReady) {
      onAnalyse(notes, context, attendeeHint);
    }
  };

  const loadExample = () => {
    setNotes(EXAMPLE_NOTES);
    setContext("Quarterly planning meeting for a software product team");
    setAttendeeHint("Sarah (PM), Dev (Eng Lead), Amir (Backend), Priya (Design)");
    setShowOptions(true);
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-sm">Meeting notes</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Paste raw notes, a transcript, or a voice memo transcription
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs h-7 text-muted-foreground"
            onClick={loadExample}
            disabled={isLoading}
          >
            Load example
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs h-7 text-muted-foreground"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
          >
            <FileUp className="h-3 w-3 mr-1" />
            Upload .txt
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.md,text/plain"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </div>
      </div>

      {/* Textarea with drag-drop */}
      <div
        className={`relative flex-1 min-h-0 rounded-lg border transition-colors ${
          dragOver
            ? "border-echo-500 bg-echo-500/5"
            : notes
            ? "border-border/60"
            : "border-dashed border-border/40"
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={
            dragOver
              ? "Drop your .txt file here..."
              : "Paste your meeting notes here...\n\nCan be messy, informal, or a raw transcript. EchoMeet will sort it out.\n\nTip: Drag and drop a .txt file directly onto this area."
          }
          className="h-full min-h-[320px] w-full resize-none border-0 bg-transparent text-sm font-mono leading-relaxed focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/40"
          disabled={isLoading}
        />
        {notes && (
          <button
            onClick={() => setNotes("")}
            className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear notes"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Character count */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {words > 0 && `${words.toLocaleString()} words · `}
          {chars > 0 && `${chars.toLocaleString()} chars`}
          {chars === 0 && "Start typing or paste notes above"}
        </span>
        {chars > 12000 && (
          <span className="text-amber-400">
            {Math.round(((15000 - chars) / 1000))}k chars remaining
          </span>
        )}
        {chars >= 15000 && (
          <span className="text-red-400">Character limit reached</span>
        )}
      </div>

      {/* Optional context (collapsible) */}
      <div className="rounded-lg border border-border/40 overflow-hidden">
        <button
          className="w-full flex items-center justify-between px-4 py-2.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
          onClick={() => setShowOptions(!showOptions)}
        >
          <span className="flex items-center gap-1.5">
            Optional context
            <span className="text-muted-foreground/50">(helps AI accuracy)</span>
          </span>
          {showOptions ? (
            <ChevronUp className="h-3.5 w-3.5" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5" />
          )}
        </button>

        {showOptions && (
          <div className="px-4 pb-4 pt-1 space-y-3 border-t border-border/40 bg-muted/10">
            <div>
              <label className="text-xs text-muted-foreground block mb-1.5">
                Meeting context
              </label>
              <Input
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="e.g. Q2 planning meeting for a fintech startup"
                className="text-xs h-8"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1.5">
                Known attendees
              </label>
              <Input
                value={attendeeHint}
                onChange={(e) => setAttendeeHint(e.target.value)}
                placeholder="e.g. Sarah (PM), Dev (Eng Lead), Amir (Backend)"
                className="text-xs h-8"
                disabled={isLoading}
              />
            </div>
          </div>
        )}
      </div>

      {/* Submit */}
      <Button
        variant="teal"
        size="lg"
        className="w-full gap-2 font-semibold"
        disabled={!isReady}
        onClick={handleSubmit}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Analysing with AI...
          </>
        ) : (
          <>
            <Zap className="h-4 w-4" />
            Analyse meeting
          </>
        )}
      </Button>

      {notes.trim().length > 0 && notes.trim().length < 20 && (
        <p className="text-xs text-amber-400 text-center -mt-2">
          Add a bit more text to analyse
        </p>
      )}
    </div>
  );
}
