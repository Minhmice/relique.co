import { AutoTOC } from "@/components/content/AutoTOC";
import policiesData from "@/mocks/policies_terms.json";

export default function PoliciesPage() {
  const { policies } = policiesData;

  return (
    <div className="grid lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1">
        <AutoTOC containerId="content" variant="sidebar" />
      </div>
      <div className="lg:col-span-3 prose-content" id="content">
        <div className="space-y-8">
          <div>
            <h1 className="text-h1">{policies.title}</h1>
            <p className="text-caption mt-2">
              Last updated: {new Date(policies.lastUpdated).toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-8">
            {policies.sections.map((section, idx) => (
              <section key={idx} id={`section-${idx}`} className="space-y-4">
                <h2 className="text-h3">{section.heading}</h2>
                <p className="text-body text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

