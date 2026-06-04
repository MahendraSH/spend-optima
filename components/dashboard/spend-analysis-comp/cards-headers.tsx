import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

export default function CardHeaders({
  Icon,
  title,
  description,
  count,
  countSymbol,
}: {
  Icon: LucideIcon;
  title: string;
  description: string;
  count: string | number;
  countSymbol: string;
}) {
  return (
    <Card className="w-full shadow-sm hover:shadow-md hover:border-purple-500/20 transition-all duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5">
        <CardTitle className="text-sm font-semibold text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-purple-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tracking-tight text-foreground">
          {countSymbol}{count}
        </div>
        <p className="text-[10px] text-muted-foreground mt-1 truncate">{description}</p>
      </CardContent>
    </Card>
  );
}
