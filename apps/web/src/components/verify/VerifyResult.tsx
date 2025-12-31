import { ResultTable } from "@/components/shared/ResultTable";
import { StatusExplanations } from "./StatusExplanations";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type VerifyStatus = "qualified" | "inconclusive" | "disqualified";

interface VerifyResultProps {
  productId: string;
  itemName: string;
  signatures: number;
  status: VerifyStatus;
  date: string;
}

export function VerifyResult({
  productId,
  itemName,
  signatures,
  status,
  date,
}: VerifyResultProps) {
  const statusConfig = {
    qualified: {
      label: "Qualified",
      className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    },
    inconclusive: {
      label: "Inconclusive",
      className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    },
    disqualified: {
      label: "Disqualified",
      className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    },
  };

  const config = statusConfig[status];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-h2 mb-6">Authentication Result</h2>
        <ResultTable
          rows={[
            { label: "Product ID", value: productId },
            { label: "Item Name", value: itemName },
            { label: "Number of Signatures", value: signatures.toString() },
            {
              label: "Result Status",
              value: (
                <Badge className={cn("border-0", config.className)}>
                  {config.label}
                </Badge>
              ),
            },
            { label: "Date of Analysis", value: new Date(date).toLocaleDateString() },
          ]}
        />
      </div>
      <StatusExplanations />
    </div>
  );
}

