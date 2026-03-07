import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FEATURES } from "@/constants/features";

const Features = () => {
  return (
    <section id="how-it-works" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Infrastructure for Growth</h2>
          <p className="text-slate-500">Replacing manual processes with high-efficiency automation.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {FEATURES.map((f, i) => (
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