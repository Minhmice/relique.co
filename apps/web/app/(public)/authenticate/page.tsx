import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AuthenticatePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Authenticate Your Collectibles</h1>
          <p className="text-xl text-muted-foreground">
            Get your memorabilia professionally authenticated with our probabilistic verification system
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Submit for Authentication</CardTitle>
            <CardDescription>
              Upload images and details of your collectible item for professional authentication
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" className="w-full">
              Submit for Authentication
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Authentication form will be available in the next phase
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Expert Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our team of specialists uses advanced techniques to verify authenticity
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Probabilistic Results</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Receive detailed authentication results based on available evidence
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Certificate of Authenticity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get a verifiable certificate for authenticated items
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

