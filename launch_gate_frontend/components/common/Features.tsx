import { Link2, GitBranch, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Link2,
    title: "Unique Referral Links",
    description: "Each Ambassador receives a personalized link to track recruitment numbers automatically."
  },
  {
    icon: GitBranch,
    title: "Automated Hub Routing",
    description: "Structure member data and route them to sector-specific WhatsApp hubs instantly."
  },
  {
    icon: Globe,
    title: "Global Opportunity Scraper",
    description: "Automated backend script pulling opportunities from official global websites."
  }
];

const Features = () => {
  return (
    <section id="how-it-works" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Infrastructure for Growth</h2>
          <p className="text-slate-500">Replacing manual processes with high-efficiency automation.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow bg-white">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-[#0052ff]" />
                </div>
                <CardTitle className="text-xl text-slate-900">{f.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-500 leading-relaxed">{f.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;