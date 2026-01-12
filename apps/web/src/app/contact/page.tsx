import type { Metadata } from "next";
import { ContactPageContent } from "./ContactPageContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Relique. Inquiry response time: < 24 hours.",
  openGraph: {
    title: "Contact Relique",
    description: "Get in touch with Relique.",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
