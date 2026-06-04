"use client";
import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { searchProjects } from "@/data/spend-analysis";
import {
  Briefcase,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  FileEdit,
  TrendingUp,
  Percent,
  DollarSign,
  Calendar,
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  status: "Active" | "Completed" | "Draft" | "Review";
  value: string;
  savings: string;
  date: string;
}

export default function Projects() {
  // Pre-seed some realistic projects based on mock data and standard procurement projects
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "proj-1",
      name: "Direct Materials Q3 Sourcing",
      description: "Aggregate purchasing and vendor negotiation for primary manufacturing materials in the upcoming third quarter.",
      status: "Active",
      value: "$125,000",
      savings: "12%",
      date: "2026-05-15",
    },
    {
      id: "proj-2",
      name: "Logistics RFQ 2026",
      description: "Request for proposal from regional freight forwarding partners to optimize domestic and international shipping rates.",
      status: "Review",
      value: "$85,000",
      savings: "8%",
      date: "2026-06-01",
    },
    {
      id: "proj-3",
      name: "Office IT Infrastructure Lease",
      description: "Lease contract negotiations for employee workstation hardware, laptop upgrades, and local network switches.",
      status: "Completed",
      value: "$45,000",
      savings: "15%",
      date: "2026-04-10",
    },
    {
      id: "proj-4",
      name: "Facility Management Contract",
      description: "Consolidating cleaning, security, and maintenance contracts across all 5 active warehouse locations.",
      status: "Active",
      value: "$160,000",
      savings: "5%",
      date: "2026-05-20",
    },
    {
      id: "proj-5",
      name: "Chemicals & Plastics Bid",
      description: "Annual multi-source supply agreements for chemical additives and packaging polymers.",
      status: "Draft",
      value: "$210,000",
      savings: "10%",
      date: "2026-06-03",
    },
    // Seed remaining from mock searchProjects array
    ...searchProjects.slice(0, 3).map((p, idx) => ({
      id: `proj-mock-${idx}`,
      name: p.name,
      description: `${p.description} - Generic procurement sub-project initialized for spend analysis.`,
      status: (idx % 2 === 0 ? "Active" : "Draft") as any,
      value: `$${(25000 * (idx + 1)).toLocaleString()}`,
      savings: `${idx * 2 + 6}%`,
      date: "2026-05-28",
    })),
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // New Project Form State
  const [newProjName, setNewProjName] = useState("");
  const [newProjDesc, setNewProjDesc] = useState("");
  const [newProjValue, setNewProjValue] = useState("");
  const [newProjSavings, setNewProjSavings] = useState("");
  const [newProjStatus, setNewProjStatus] = useState<Project["status"]>("Active");

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjName || !newProjDesc) return;

    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name: newProjName,
      description: newProjDesc,
      status: newProjStatus,
      value: newProjValue ? `$${Number(newProjValue).toLocaleString()}` : "$0",
      savings: newProjSavings ? `${newProjSavings}%` : "0%",
      date: new Date().toISOString().split("T")[0],
    };

    setProjects([newProject, ...projects]);
    setIsDialogOpen(false);

    // Reset Form
    setNewProjName("");
    setNewProjDesc("");
    setNewProjValue("");
    setNewProjSavings("");
    setNewProjStatus("Active");
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const totalCount = projects.length;
  const activeCount = projects.filter((p) => p.status === "Active").length;
  const completedCount = projects.filter((p) => p.status === "Completed").length;
  const averageSavings =
    projects.reduce((acc, p) => acc + Number(p.savings.replace("%", "")), 0) /
    totalCount;

  const getStatusBadge = (status: Project["status"]) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-blue-500 hover:bg-blue-600 text-white border-none">Active</Badge>;
      case "Completed":
        return <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-none">Completed</Badge>;
      case "Draft":
        return <Badge className="bg-zinc-500 hover:bg-zinc-600 text-white border-none">Draft</Badge>;
      case "Review":
        return <Badge className="bg-amber-500 hover:bg-amber-600 text-white border-none">In Review</Badge>;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Sourcing Projects</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Sourcing Projects</h1>
          <p className="text-sm text-muted-foreground">Manage and track RFQs, vendor evaluations, and negotiation pipelines</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white shadow-sm flex items-center gap-2">
              <Plus className="w-4 h-4" /> New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] border border-muted bg-card">
            <form onSubmit={handleCreateProject}>
              <DialogHeader>
                <DialogTitle className="text-foreground">Create Sourcing Project</DialogTitle>
                <DialogDescription>
                  Initialize a new sourcing event, RFQ, or procurement negotiation pipeline.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-1.5">
                  <Label htmlFor="proj-name" className="text-foreground">Project Name</Label>
                  <Input
                    id="proj-name"
                    required
                    placeholder="e.g. Facilities Consolidation RFQ"
                    value={newProjName}
                    onChange={(e) => setNewProjName(e.target.value)}
                    className="bg-muted/30 focus:bg-background border-muted text-foreground"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="proj-desc" className="text-foreground">Description</Label>
                  <Input
                    id="proj-desc"
                    required
                    placeholder="Short summary of project objectives and categories"
                    value={newProjDesc}
                    onChange={(e) => setNewProjDesc(e.target.value)}
                    className="bg-muted/30 focus:bg-background border-muted text-foreground"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="proj-value" className="text-foreground">Est. Value ($)</Label>
                    <Input
                      id="proj-value"
                      type="number"
                      placeholder="e.g. 75000"
                      value={newProjValue}
                      onChange={(e) => setNewProjValue(e.target.value)}
                      className="bg-muted/30 focus:bg-background border-muted text-foreground"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="proj-savings" className="text-foreground">Target Savings (%)</Label>
                    <Input
                      id="proj-savings"
                      type="number"
                      placeholder="e.g. 12"
                      value={newProjSavings}
                      onChange={(e) => setNewProjSavings(e.target.value)}
                      className="bg-muted/30 focus:bg-background border-muted text-foreground"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="proj-status" className="text-foreground">Initial Status</Label>
                  <select
                    id="proj-status"
                    value={newProjStatus}
                    onChange={(e) => setNewProjStatus(e.target.value as any)}
                    className="flex h-10 w-full rounded-md border border-muted bg-muted/30 px-3 py-2 text-sm text-foreground focus:bg-background focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="Active">Active</option>
                    <option value="Review">In Review</option>
                    <option value="Completed">Completed</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
                  Create Project
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-1.5 space-y-0">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Total Projects</CardTitle>
            <Briefcase className="w-4 h-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalCount}</div>
            <p className="text-[10px] text-muted-foreground mt-1">Sourcing events initialized</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-1.5 space-y-0">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Active Negotiations</CardTitle>
            <Clock className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{activeCount}</div>
            <p className="text-[10px] text-muted-foreground mt-1">Direct suppliers RFP/RFQ stage</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-1.5 space-y-0">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Completed Bids</CardTitle>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{completedCount}</div>
            <p className="text-[10px] text-muted-foreground mt-1">Contracts executed & locked</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-1.5 space-y-0">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Avg. Target Savings</CardTitle>
            <Percent className="w-4 h-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{averageSavings.toFixed(1)}%</div>
            <p className="text-[10px] text-muted-foreground mt-1">Across all project lines</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter and search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-full bg-muted/30 focus:bg-background border-muted text-foreground"
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground shrink-0 font-medium">Status Filter:</span>
          <div className="flex bg-muted p-0.5 rounded-md gap-0.5 border border-muted">
            {["All", "Active", "Review", "Completed", "Draft"].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setStatusFilter(status)}
                className={`h-7 px-3 text-xs ${statusFilter === status ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}
              >
                {status}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="flex flex-col justify-between shadow-sm hover:shadow-md hover:border-purple-500/25 transition-all duration-200">
              <CardHeader className="pb-3.5">
                <div className="flex justify-between items-start gap-4">
                  <CardTitle className="text-base font-semibold leading-tight text-foreground line-clamp-1">
                    {project.name}
                  </CardTitle>
                  {getStatusBadge(project.status)}
                </div>
                <CardDescription className="text-xs line-clamp-2 mt-1.5 h-8">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="py-2.5 border-t border-muted bg-muted/10">
                <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">Est. Value</span>
                    <span className="font-bold text-foreground flex items-center justify-center gap-0.5 mt-0.5">
                      <DollarSign className="w-3.5 h-3.5 text-muted-foreground" />
                      {project.value.replace("$", "")}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">Target Savings</span>
                    <span className="font-bold text-purple-500 flex items-center justify-center gap-0.5 mt-0.5">
                      <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
                      {project.savings}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">Created</span>
                    <span className="font-semibold text-muted-foreground flex items-center justify-center gap-1 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                      {project.date}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-3 pb-3 flex justify-end gap-2 border-t border-muted">
                <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground">
                  View Specs
                </Button>
                <Button variant="outline" size="sm" className="h-7 text-xs border-purple-500/20 hover:border-purple-500/40 text-purple-600 dark:text-purple-400 hover:bg-purple-500/5">
                  Manage Suppliers
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-dashed border-2 flex flex-col items-center justify-center p-12 text-center">
          <Briefcase className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-foreground">No Projects Found</h3>
          <p className="text-sm text-muted-foreground max-w-sm mt-1">
            Try adjusting your search query or status filters, or create a brand new sourcing project.
          </p>
        </Card>
      )}
    </div>
  );
}
