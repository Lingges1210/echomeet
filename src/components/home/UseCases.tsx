import Link from "next/link";
import { ArrowRight, BarChart3, Code2, Users, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

const CASES = [
  {
    icon: Briefcase,
    title: "Business Analysts",
    subtitle: "Stop manually writing MoMs",
    description:
      "Your job is to surface insights and drive alignment — not transcribe who said what. EchoMeet handles the MoM so you can focus on the analysis.",
    tags: ["Requirements meetings", "Stakeholder calls", "Sprint planning"],
    color: "text-amber-400",
    bg: "bg-amber-400/10 border-amber-400/20",
  },
  {
    icon: BarChart3,
    title: "Consultants",
    subtitle: "Client-ready notes in seconds",
    description:
      "Turn a rough client call into a clean, structured summary your team can act on. Impress clients with follow-ups that land within minutes of a call ending.",
    tags: ["Client discovery", "Project kick-offs", "Status updates"],
    color: "text-echo-400",
    bg: "bg-echo-400/10 border-echo-400/20",
  },
  {
    icon: Code2,
    title: "Engineering Teams",
    subtitle: "No more lost action items",
    description:
      "Standups, sprint retros, incident reviews — extract every action item and decision automatically. Nothing falls through the cracks again.",
    tags: ["Sprint retros", "Incident reviews", "Architecture calls"],
    color: "text-blue-400",
    bg: "bg-blue-400/10 border-blue-400/20",
  },
  {
    icon: Users,
    title: "Project Managers",
    subtitle: "Full audit trail, zero effort",
    description:
      "Every decision documented, every action item tracked, every open question flagged. Your project's memory lives in EchoMeet.",
    tags: ["Steering committees", "Vendor calls", "Team syncs"],
    color: "text-purple-400",
    bg: "bg-purple-400/10 border-purple-400/20",
  },
];

export default function UseCases() {
  return (
    <section id="use-cases" className="py-20 border-t border-border/40">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground mb-4">
            Who it&apos;s for
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built for people who{" "}
            <span className="gradient-text">run things</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Anyone who leaves meetings with a mess of notes and a sinking feeling
            that something important will be forgotten.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {CASES.map((c) => (
            <div
              key={c.title}
              className="rounded-xl border border-border/60 bg-card p-6 hover:border-echo-500/20 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-lg border ${c.bg}`}>
                  <c.icon className={`h-5 w-5 ${c.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <h3 className="font-semibold">{c.title}</h3>
                    <span className={`text-xs ${c.color}`}>{c.subtitle}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {c.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {c.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center rounded-2xl border border-echo-500/20 bg-echo-500/5 p-10">
          <h3 className="text-2xl font-bold mb-3">
            Ready to clear the noise?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Paste your next meeting notes and see what EchoMeet pulls out. No signup required.
          </p>
          <Link href="/analyze">
            <Button variant="teal" size="lg" className="gap-2">
              Try it now — it&apos;s free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
