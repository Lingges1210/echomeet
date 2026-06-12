# EchoMeet ⚡

> Turn meeting chaos into clarity — AI-powered meeting analyst built with Next.js, Groq, and Supabase.

Paste your raw, messy meeting notes and get back:
- ✅ **Action items** with owners, deadlines, and priorities
- ✓ **Decisions** with rationale and decision-maker
- ? **Open questions** with assigned owners
- 📧 **Follow-up email** ready to send (with AI refinement)

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| AI | Groq API · LLaMA 3 70B |
| Database | Supabase (PostgreSQL) |
| UI | shadcn/ui + Tailwind CSS |
| Deployment | Vercel |

---

## Quick Start

### 1. Clone and install

```bash
git clone https://github.com/yourusername/echomeet.git
cd echomeet
npm install
```

### 2. Set up environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
GROQ_API_KEY=your_groq_api_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url        # optional
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key   # optional
```

**Getting a Groq API key (free):**
1. Go to [console.groq.com](https://console.groq.com)
2. Sign up (free, no credit card)
3. Create an API key

**Supabase is optional** — the app works fully without it. Supabase is only used to save meeting history.

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Supabase Setup (Optional)

If you want to save meeting history, run this SQL in your Supabase SQL editor:

```sql
create table if not exists meetings (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  title text not null,
  summary text,
  raw_notes text not null,
  analysis jsonb not null,
  action_items_count int,
  decisions_count int
);

alter table meetings enable row level security;

-- Allow anonymous reads and inserts (demo mode)
create policy "Allow anon insert" on meetings for insert with check (true);
create policy "Allow anon select" on meetings for select using (true);
```

---

## Deployment to Vercel

```bash
npm install -g vercel
vercel
```

Add your environment variables in the Vercel dashboard under Project Settings → Environment Variables.

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── analyze/page.tsx      # Main tool (split panel)
│   └── api/
│       ├── analyze/route.ts  # Groq AI endpoint
│       └── email/route.ts    # Email refinement endpoint
├── components/
│   ├── layout/               # Header, Footer
│   ├── home/                 # Hero, HowItWorks, UseCases
│   └── analyze/              # InputPanel, ResultsPanel, ActionItems, etc.
├── lib/
│   ├── groq.ts               # Groq client
│   ├── prompts.ts            # AI prompt engineering
│   ├── supabase.ts           # Supabase client
│   └── utils.ts              # Helpers
└── types/index.ts            # TypeScript types
```

---

## Features

### Core
- **Paste or upload** `.txt` meeting notes
- **AI extraction** of action items, decisions, open questions, attendees
- **Priority detection** (high/medium/low) from language cues
- **Sentiment analysis** of meeting tone
- **Key themes** extraction

### Action Items
- Checkbox to mark items done
- Copy all as formatted text
- Owner and deadline display

### Follow-up Email
- Auto-drafted email with all key points
- **AI refinement** — ask AI to make it shorter, more formal, etc.
- Quick suggestion buttons
- Copy or open in mail client

### UX
- Drag-and-drop `.txt` file upload
- Loading skeleton during analysis
- Export full analysis as Markdown
- Optional meeting context for better AI accuracy

---

## Built by

**Lingges Muniandy** — Software Engineering graduate, USM Penang  
Portfolio: [hemwaren.my](https://hemwaren.my) → replace with your portfolio  
GitHub: [github.com/Hemwaren](https://github.com/Hemwaren)
