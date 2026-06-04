import CardHeaders from "@/components/dashboard/spend-analysis-comp/cards-headers";
import SpendActions from "@/components/dashboard/spend-analysis-comp/spend-actions";
import SpendCharts from "@/components/dashboard/spend-analysis-comp/spend-charts";
import SpendTable from "@/components/dashboard/spend-analysis-comp/spend-table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cardData } from "@/data/spend-analysis";
import { DollarSign, Users, Package, MapPin, FileText } from "lucide-react";
import { FC } from "react";

interface SpendAnalysisProps {}

const SpendAnalysis: FC<SpendAnalysisProps> = ({}) => {
  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb className=" ">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Spend Analysis</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <SpendActions />

      {/* cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5">
        <CardHeaders
          description="Cumulative order spending"
          Icon={DollarSign}
          title="Total Spend"
          countSymbol="$"
          count={cardData.totalSpent}
        />
        <CardHeaders
          description="Active sourcing vendors"
          Icon={Users}
          title="Suppliers Count"
          countSymbol=""
          count={cardData.SuppliersCount}
        />
        <CardHeaders
          description="Unique parts categories"
          Icon={Package}
          title="Commodity Count"
          countSymbol=""
          count={cardData.CommodityCount}
        />
        <CardHeaders
          description="Sourcing locations"
          Icon={MapPin}
          title="Locations Count"
          countSymbol=""
          count={cardData.locationSCount}
        />
        <CardHeaders
          description="Purchase Orders issued"
          Icon={FileText}
          title="PO Count"
          countSymbol=""
          count={cardData.poCount}
        />
      </div>

      {/* Spend charts */}
      <SpendCharts />

      {/* Detailed Table */}
      <SpendTable />
    </div>
  );
};

export default SpendAnalysis;
