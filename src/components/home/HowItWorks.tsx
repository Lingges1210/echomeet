import { ClipboardPaste, Cpu, FileText, Send } from "lucide-react";

const STEPS = [
  {
    icon: ClipboardPaste,
    number: "01",
    title: "Paste your notes",
    description:
      "Drop in raw meeting notes, transcripts, or even a messy voice-note transcription. No formatting required.",
    color: "text-amber-400",
    bg: "bg-amber-400/10 border-amber-400/20",
  },
  {
    icon: Cpu,
    number: "02",
    title: "AI analyses instantly",
    description:
      "LLaMA 3 via Groq reads your notes and extracts structure — who said what, what was decided, what's pending.",
    color: "text-echo-400",
    bg: "bg-echo-400/10 border-echo-400/20",
  },
  {
    icon: FileText,
    number: "03",
    title: "Review your summary",
    description:
      "Get action items with owners, decisions with rationale, open questions, and a sentiment read on the meeting.",
    color: "text-purple-400",
    bg: "bg-purple-400/10 border-purple-400/20",
  },
  {
    icon: Send,
    number: "04",
    title: "Send the follow-up",
    description:
      "Copy the auto-drafted follow-up email, tweak it if needed, and send. Your team is aligned before anyone forgets.",
    color: "text-blue-400",
    bg: "bg-blue-400/10 border-blue-400/20",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 border-t border-border/40">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground mb-4">
            Simple process
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            From notes to clarity
            <br />
            <span className="gradient-text">in four steps</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            No training required. No templates to fill. Just paste and go.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="relative rounded-xl border border-border/60 bg-card p-6 hover:border-echo-500/30 transition-colors group"
            >
              {/* Number */}
              <div className="text-5xl font-bold text-muted-foreground/10 absolute top-4 right-4 font-mono select-none group-hover:text-muted-foreground/20 transition-colors">
                {step.number}
              </div>

              {/* Icon */}
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border ${step.bg} mb-4`}>
                <step.icon className={`h-5 w-5 ${step.color}`} />
              </div>

              {/* Content */}
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
