import type { Metadata } from "next";
import { AuthenticatePageContent } from "./AuthenticatePageContent";

export const metadata: Metadata = {
  title: "Authenticate Your Items",
  description: "Submit your items to our expert panel for rigorous forensic analysis and digital twin certification.",
  openGraph: {
    title: "Authenticate Your Items - Relique",
    description: "Submit your items for authentication.",
    type: "website",
  },
};

export default function AuthenticatePage() {
  return <AuthenticatePageContent />;
}
