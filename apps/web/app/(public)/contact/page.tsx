import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactForm } from "@/components/contact/ContactForm";
import { Mail, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-h1">Contact Us</h1>
        <p className="text-xl text-muted-foreground">
          Get in touch with our team
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email
            </CardTitle>
          </CardHeader>
          <CardContent>
            <a
              href="mailto:contact@relique.co"
              className="text-primary hover:underline"
            >
              contact@relique.co
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Phone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <a
              href="tel:+1234567890"
              className="text-primary hover:underline"
            >
              +1 (234) 567-890
            </a>
          </CardContent>
        </Card>
      </div>

      <ContactForm />

      <Card>
        <CardHeader>
          <CardTitle>Business Hours</CardTitle>
          <CardDescription>We're here to help</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Monday - Friday: 9:00 AM - 6:00 PM EST<br />
            Saturday: 10:00 AM - 4:00 PM EST<br />
            Sunday: Closed
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
