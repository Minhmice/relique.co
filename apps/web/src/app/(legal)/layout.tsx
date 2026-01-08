export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="border-b bg-muted/40 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-h1">Legal Information</h1>
          <p className="text-muted-foreground mt-2">
            Terms, policies, and legal documentation
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        {children}
      </div>
    </div>
  );
}

