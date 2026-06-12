import Link from "next/link";
import { ArrowRight, CheckCircle2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const DEMO_NOTES = `Team standup - March 15
Present: Sarah (PM), Dev (eng lead), Amir (backend), Priya (design)

Sarah: Q2 roadmap needs to be locked by end of week. We're behind.
Dev: The auth refactor is blocking 3 other tickets. Need 2 more days.
Amir: API rate limiting is done, waiting for review from Dev.
Priya: Mobile designs are 80% done, need Sarah to sign off on the new nav pattern.

Decision: We're pushing the analytics dashboard to Q3. Not enough bandwidth.
Decision: Sarah will own the roadmap doc, share by Thursday EOD.

Sarah: Amir can you get the rate limiting PR reviewed today?
Dev: I'll review it after standup.
Amir: Sure. Also the staging environment is broken, anyone know why?
Dev: I'll look into it - probably the env var issue from yesterday.

Next steps unclear on the mobile nav - Priya to send mockups to Sarah by tomorrow.
Priya: Will do. Also we need to decide on the colour system before I go further.
Sarah: Let's schedule a design review Thursday 2pm.

Meeting ended abruptly, some things unclear.`;

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-echo-950/40 via-background to-background pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-echo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative container mx-auto max-w-6xl px-4 pt-20 pb-16">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-echo-500/30 bg-echo-500/10 px-3 py-1 text-xs text-echo-400">
            <Zap className="h-3 w-3" />
            Powered by Groq · LLaMA 3 · Instant results
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 leading-[1.1]">
            Turn meeting chaos
            <br />
            <span className="gradient-text">into clarity</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Paste your raw meeting notes — get structured action items, decisions,
            open questions, and a ready-to-send follow-up email in seconds.
          </p>
        </div>

        {/* Social proof points */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8 text-sm text-muted-foreground">
          {[
            "Action items with owners",
            "Decisions with rationale",
            "Follow-up email drafted",
          ].map((item) => (
            <div key={item} className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-echo-400 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
          <Link href="/analyze">
            <Button variant="teal" size="lg" className="gap-2 w-full sm:w-auto">
              Analyse your notes
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="#how-it-works">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              See how it works
            </Button>
          </Link>
        </div>

        {/* Demo card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl border border-border/60 bg-card overflow-hidden shadow-2xl">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/60 bg-muted/30">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 mx-4">
                <div className="h-5 rounded-md bg-background/60 border border-border/40 flex items-center px-3">
                  <span className="text-[10px] text-muted-foreground font-mono">echomeet.vercel.app/analyze</span>
                </div>
              </div>
            </div>

            {/* Two-panel layout preview */}
            <div className="grid md:grid-cols-2 min-h-[320px]">
              {/* Input side */}
              <div className="p-5 border-r border-border/40">
                <div className="text-xs text-muted-foreground font-mono mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                  Raw meeting notes
                </div>
                <div className="text-xs text-muted-foreground/70 font-mono leading-relaxed whitespace-pre-line line-clamp-[12]">
                  {DEMO_NOTES}
                </div>
              </div>

              {/* Output side */}
              <div className="p-5 bg-echo-950/20">
                <div className="text-xs text-echo-400 font-mono mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-echo-400 inline-block animate-pulse" />
                  EchoMeet analysis
                </div>
                <div className="space-y-3">
                  {/* Action items */}
                  <div className="rounded-lg border border-border/40 p-3 bg-card/60">
                    <div className="text-[10px] font-semibold text-echo-400 uppercase tracking-wider mb-2">
                      Action Items (4)
                    </div>
                    {[
                      { task: "Review Amir's rate limiting PR", owner: "Dev", p: "high" },
                      { task: "Send mockups to Sarah", owner: "Priya", p: "high" },
                      { task: "Fix staging environment", owner: "Dev", p: "medium" },
                      { task: "Share roadmap doc", owner: "Sarah", p: "medium" },
                    ].map((item) => (
                      <div key={item.task} className="flex items-start gap-2 py-1">
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-mono mt-0.5 ${
                          item.p === "high"
                            ? "border-red-500/30 bg-red-500/10 text-red-400"
                            : "border-amber-500/30 bg-amber-500/10 text-amber-400"
                        }`}>
                          {item.p}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="text-[11px] text-foreground/90 truncate">{item.task}</div>
                          <div className="text-[10px] text-muted-foreground">→ {item.owner}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Decisions */}
                  <div className="rounded-lg border border-border/40 p-3 bg-card/60">
                    <div className="text-[10px] font-semibold text-purple-400 uppercase tracking-wider mb-2">
                      Decisions (2)
                    </div>
                    {[
                      "Analytics dashboard pushed to Q3",
                      "Sarah owns roadmap doc, due Thursday",
                    ].map((d) => (
                      <div key={d} className="text-[11px] text-foreground/80 py-0.5 flex gap-1.5">
                        <span className="text-purple-400 mt-0.5">✓</span>
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-3">
            Live demo — paste your own notes above
          </p>
        </div>
      </div>
    </section>
  );
}
