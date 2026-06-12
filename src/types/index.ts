// ─────────────────────────────────────────────
//  EchoMeet — Shared Types
// ─────────────────────────────────────────────

export interface ActionItem {
  id: string;
  task: string;
  owner: string;
  deadline: string;
  priority: "high" | "medium" | "low";
}

export interface Decision {
  id: string;
  decision: string;
  rationale: string;
  madeBy: string;
}

export interface OpenQuestion {
  id: string;
  question: string;
  context: string;
  assignedTo: string;
}

export interface Attendee {
  name: string;
  role: string;
  contributions: string[];
}

export interface MeetingAnalysis {
  title: string;
  date: string;
  duration: string;
  summary: string;
  attendees: Attendee[];
  actionItems: ActionItem[];
  decisions: Decision[];
  openQuestions: OpenQuestion[];
  keyThemes: string[];
  sentiment: "positive" | "neutral" | "mixed" | "tense";
  followUpEmail: string;
}

export interface AnalyzeRequest {
  notes: string;
  meetingContext?: string;
  attendeeHint?: string;
}

export interface MeetingRecord {
  id: string;
  title: string;
  created_at: string;
  summary: string;
  action_items_count: number;
  decisions_count: number;
  raw_notes: string;
  analysis: MeetingAnalysis;
}
