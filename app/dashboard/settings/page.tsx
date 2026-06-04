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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { generalTabData, usersTabData, billingTabData, referTabData } from "@/data/setting";
import toast, { Toaster } from "react-hot-toast";
import {
  Settings as SettingsIcon,
  Users as UsersIcon,
  CreditCard,
  Gift,
  Save,
  UserPlus,
  Copy,
  CheckCircle,
  HelpCircle,
  Building,
  MapPin,
  ClipboardCheck,
} from "lucide-react";

type ActiveTab = "general" | "users" | "billing" | "refer";

interface Member {
  name: string;
  email: string;
  permission: string;
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("general");

  // State for General info
  const [displayName, setDisplayName] = useState(generalTabData.basicInfo.displayName);
  const [phoneNumber, setPhoneNumber] = useState(generalTabData.basicInfo.phoneNumber);
  const [email, setEmail] = useState(generalTabData.basicInfo.email);
  const [currency, setCurrency] = useState(generalTabData.basicInfo.currency);
  
  const [legalName, setLegalName] = useState(generalTabData.RegistrationInfo.legalName);
  const [regPhone, setRegPhone] = useState(generalTabData.RegistrationInfo.RegistrationPhoneNumber);
  const [vatNum, setVatNum] = useState(generalTabData.RegistrationInfo.vatNumber);
  
  const [address, setAddress] = useState(generalTabData.officialAddress.address);
  const [city, setCity] = useState(generalTabData.officialAddress.city);
  const [state, setState] = useState(generalTabData.officialAddress.state);
  const [zipCode, setZipCode] = useState(generalTabData.officialAddress.zipCode);
  const [country, setCountry] = useState(generalTabData.officialAddress.country);

  // State for Users tab
  const [users, setUsers] = useState<Member[]>(usersTabData.users);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState("user");
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  // State for Refer tab
  const [copied, setCopied] = useState(false);

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("General settings saved successfully!");
  };

  const handleInviteUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;

    const newMember: Member = {
      name: newUserName,
      email: newUserEmail,
      permission: newUserRole,
    };

    setUsers([...users, newMember]);
    setIsInviteOpen(false);
    setNewUserName("");
    setNewUserEmail("");
    setNewUserRole("user");
    toast.success(`Invitation sent to ${newUserEmail}`);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referTabData.refer);
    setCopied(true);
    toast.success("Referral code copied to clipboard!");
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="flex flex-col gap-6">
      <Toaster position="top-right" reverseOrder={false} />
      
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Settings</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="pb-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Organization Settings</h1>
        <p className="text-sm text-muted-foreground">Configure profile configurations, billing metrics, and invite partners</p>
      </div>

      {/* Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 items-start">
        {/* Navigation Sidebar */}
        <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1.5 p-1 bg-muted/30 lg:bg-transparent rounded-lg border border-muted lg:border-none">
          <Button
            variant={activeTab === "general" ? "secondary" : "ghost"}
            onClick={() => setActiveTab("general")}
            className={`justify-start gap-2.5 px-4 h-10 w-full rounded-md text-sm ${activeTab === "general" ? "bg-muted text-foreground font-semibold" : "text-muted-foreground"}`}
          >
            <Building className="w-4 h-4" /> General Profile
          </Button>
          <Button
            variant={activeTab === "users" ? "secondary" : "ghost"}
            onClick={() => setActiveTab("users")}
            className={`justify-start gap-2.5 px-4 h-10 w-full rounded-md text-sm ${activeTab === "users" ? "bg-muted text-foreground font-semibold" : "text-muted-foreground"}`}
          >
            <UsersIcon className="w-4 h-4" /> Users & Roles
          </Button>
          <Button
            variant={activeTab === "billing" ? "secondary" : "ghost"}
            onClick={() => setActiveTab("billing")}
            className={`justify-start gap-2.5 px-4 h-10 w-full rounded-md text-sm ${activeTab === "billing" ? "bg-muted text-foreground font-semibold" : "text-muted-foreground"}`}
          >
            <CreditCard className="w-4 h-4" /> Subscription & Billing
          </Button>
          <Button
            variant={activeTab === "refer" ? "secondary" : "ghost"}
            onClick={() => setActiveTab("refer")}
            className={`justify-start gap-2.5 px-4 h-10 w-full rounded-md text-sm ${activeTab === "refer" ? "bg-muted text-foreground font-semibold" : "text-muted-foreground"}`}
          >
            <Gift className="w-4 h-4" /> Partner Referral
          </Button>
        </div>

        {/* Tab Contents */}
        <div className="min-w-0">
          {activeTab === "general" && (
            <form onSubmit={handleSaveGeneral} className="space-y-6">
              {/* Basic Info */}
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">Basic Information</CardTitle>
                  <CardDescription>Company-wide brand and communication contacts</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="comp-display" className="text-foreground">Company Display Name</Label>
                    <Input
                      id="comp-display"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="bg-muted/30 focus:bg-background border-muted"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="comp-phone" className="text-foreground">Phone Number</Label>
                    <Input
                      id="comp-phone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="bg-muted/30 focus:bg-background border-muted"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="comp-email" className="text-foreground">Email Address</Label>
                    <Input
                      id="comp-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-muted/30 focus:bg-background border-muted"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="comp-curr" className="text-foreground">Preferred Currency</Label>
                    <Input
                      id="comp-curr"
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="bg-muted/30 focus:bg-background border-muted"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Registration Info */}
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">Legal Registration</CardTitle>
                  <CardDescription>Official business entities and tax certifications</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="comp-legal" className="text-foreground">Legal Business Name</Label>
                    <Input
                      id="comp-legal"
                      value={legalName}
                      onChange={(e) => setLegalName(e.target.value)}
                      className="bg-muted/30 focus:bg-background border-muted"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="comp-reg-phone" className="text-foreground">Official Telephone</Label>
                    <Input
                      id="comp-reg-phone"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      className="bg-muted/30 focus:bg-background border-muted"
                    />
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label htmlFor="comp-vat" className="text-foreground">VAT / Tax Identification Number</Label>
                    <Input
                      id="comp-vat"
                      value={vatNum}
                      onChange={(e) => setVatNum(e.target.value)}
                      className="bg-muted/30 focus:bg-background border-muted"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Official Address */}
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">Corporate Headquarters Address</CardTitle>
                  <CardDescription>Primary operating center for vendor contract delivery</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label htmlFor="comp-addr" className="text-foreground">Street Address</Label>
                    <Input
                      id="comp-addr"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="bg-muted/30 focus:bg-background border-muted"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="comp-city" className="text-foreground">City</Label>
                    <Input
                      id="comp-city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="bg-muted/30 focus:bg-background border-muted"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="comp-state" className="text-foreground">State / Region</Label>
                    <Input
                      id="comp-state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="bg-muted/30 focus:bg-background border-muted"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="comp-zip" className="text-foreground">ZIP / Postal Code</Label>
                    <Input
                      id="comp-zip"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className="bg-muted/30 focus:bg-background border-muted"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="comp-country" className="text-foreground">Country</Label>
                    <Input
                      id="comp-country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="bg-muted/30 focus:bg-background border-muted"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-3 border-t pt-4">
                  <Button type="button" variant="outline">Discard</Button>
                  <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2">
                    <Save className="w-4 h-4" /> Save General Settings
                  </Button>
                </CardFooter>
              </Card>
            </form>
          )}

          {activeTab === "users" && (
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4">
                <div>
                  <CardTitle className="text-lg font-semibold text-foreground">User Management</CardTitle>
                  <CardDescription>Manage user roles, permissions and team collaborations</CardDescription>
                </div>
                <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2">
                      <UserPlus className="w-4 h-4" /> Invite User
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[420px] border border-muted bg-card">
                    <form onSubmit={handleInviteUser}>
                      <DialogHeader>
                        <DialogTitle className="text-foreground">Invite Organization Member</DialogTitle>
                        <DialogDescription>
                          Send a registration invitation to add a colleague to SpendOptima.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="user-name" className="text-foreground">Full Name</Label>
                          <Input
                            id="user-name"
                            required
                            placeholder="Johnathan Smith"
                            value={newUserName}
                            onChange={(e) => setNewUserName(e.target.value)}
                            className="bg-muted/30 focus:bg-background border-muted"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="user-email" className="text-foreground">Email Address</Label>
                          <Input
                            id="user-email"
                            required
                            type="email"
                            placeholder="jsmith@corporate.com"
                            value={newUserEmail}
                            onChange={(e) => setNewUserEmail(e.target.value)}
                            className="bg-muted/30 focus:bg-background border-muted"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="user-role" className="text-foreground">Access Privilege</Label>
                          <select
                            id="user-role"
                            value={newUserRole}
                            onChange={(e) => setNewUserRole(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-muted bg-muted/30 px-3 py-2 text-sm text-foreground focus:bg-background focus:outline-none focus:ring-1 focus:ring-ring"
                          >
                            <option value="user">User (Read-Write Procurement)</option>
                            <option value="admin">Administrator (Full Control)</option>
                            <option value="viewer">Viewer (Read-Only Spend Analysis)</option>
                          </select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsInviteOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
                          Send Invite
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-muted overflow-hidden">
                  <Table>
                    <TableHeader className="bg-muted/30">
                      <TableRow>
                        <TableHead className="font-semibold text-foreground">Name</TableHead>
                        <TableHead className="font-semibold text-foreground">Email</TableHead>
                        <TableHead className="font-semibold text-foreground">Access Permission</TableHead>
                        <TableHead className="text-right font-semibold text-foreground">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((member, index) => (
                        <TableRow key={index} className="hover:bg-muted/30 transition-colors">
                          <TableCell className="font-semibold text-foreground">{member.name}</TableCell>
                          <TableCell className="text-muted-foreground">{member.email}</TableCell>
                          <TableCell>
                            <Badge variant={member.permission === "admin" ? "default" : "secondary"} className={member.permission === "admin" ? "bg-purple-600 border-none" : ""}>
                              {member.permission}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-500/10 hover:text-red-600">
                              Revoke
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "billing" && (
            <div className="space-y-6">
              {/* Plan Cards */}
              <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                <Card className="flex flex-col justify-between border border-muted opacity-80">
                  <CardHeader>
                    <CardTitle className="text-sm font-bold text-muted-foreground uppercase">Trial Tier</CardTitle>
                    <div className="text-3xl font-extrabold text-foreground mt-2">$0</div>
                    <CardDescription className="text-xs mt-1">Basic metrics and CSV downloads</CardDescription>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground space-y-2">
                    <div className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-zinc-400 shrink-0" /> Up to 50 POs/mo</div>
                    <div className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-zinc-400 shrink-0" /> 1 active sourcing project</div>
                  </CardContent>
                  <CardFooter className="pt-3 pb-3 border-t">
                    <Button variant="outline" className="w-full text-xs h-8" disabled>Downgrade</Button>
                  </CardFooter>
                </Card>

                <Card className="flex flex-col justify-between border-2 border-purple-500/30 relative bg-purple-500/5">
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-purple-600 hover:bg-purple-600 border-none text-white text-[9px] px-1.5 py-0.5 font-bold uppercase">Active</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-sm font-bold text-purple-600 dark:text-purple-400 uppercase">Professional Plan</CardTitle>
                    <div className="text-3xl font-extrabold text-foreground mt-2">$100<span className="text-xs text-muted-foreground font-normal"> / mo</span></div>
                    <CardDescription className="text-xs mt-1">Complete spend analysis for growing teams</CardDescription>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground space-y-2">
                    <div className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-purple-500 shrink-0" /> Unlimited PO uploads</div>
                    <div className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-purple-500 shrink-0" /> Unlimited active projects</div>
                    <div className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-purple-500 shrink-0" /> Real-time location analytics</div>
                  </CardContent>
                  <CardFooter className="pt-3 pb-3 border-t">
                    <Button className="w-full text-xs h-8 bg-purple-600 text-white hover:bg-purple-700" disabled>Active Plan</Button>
                  </CardFooter>
                </Card>

                <Card className="flex flex-col justify-between border border-muted hover:border-muted-foreground/30 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-sm font-bold text-muted-foreground uppercase">Enterprise Tier</CardTitle>
                    <div className="text-3xl font-extrabold text-foreground mt-2">Custom</div>
                    <CardDescription className="text-xs mt-1">Multi-entity controls & dedicated support</CardDescription>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground space-y-2">
                    <div className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-purple-500 shrink-0" /> Multi-currency automation</div>
                    <div className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-purple-500 shrink-0" /> Custom API connections</div>
                    <div className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-purple-500 shrink-0" /> SLA & Dedicated Manager</div>
                  </CardContent>
                  <CardFooter className="pt-3 pb-3 border-t">
                    <Button variant="outline" className="w-full text-xs h-8 border-purple-500/20 hover:border-purple-500/40 text-purple-600 dark:text-purple-400 hover:bg-purple-500/5">Contact Sales</Button>
                  </CardFooter>
                </Card>
              </div>

              {/* Billing Table */}
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">Billing Statements History</CardTitle>
                  <CardDescription>Download past invoices and check transaction status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border border-muted overflow-hidden">
                    <Table>
                      <TableHeader className="bg-muted/30">
                        <TableRow>
                          <TableHead className="font-semibold text-foreground">Statement Date</TableHead>
                          <TableHead className="font-semibold text-foreground">Description</TableHead>
                          <TableHead className="font-semibold text-foreground">Charged Amount</TableHead>
                          <TableHead className="font-semibold text-foreground">Status</TableHead>
                          <TableHead className="text-right font-semibold text-foreground">Invoice</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {billingTabData.billing.map((statement, idx) => (
                          <TableRow key={idx} className="hover:bg-muted/30 transition-colors">
                            <TableCell className="font-semibold text-foreground">{statement.date}</TableCell>
                            <TableCell className="text-muted-foreground">{statement.description}</TableCell>
                            <TableCell className="font-bold text-foreground">{statement.amount}</TableCell>
                            <TableCell>
                              <Badge className="bg-emerald-500 hover:bg-emerald-500 border-none text-white text-[10px] py-0.5">
                                {statement.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="link" size="sm" className="text-purple-600 dark:text-purple-400 p-0 hover:underline">
                                Download PDF
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "refer" && (
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">Partner Referral Program</CardTitle>
                <CardDescription>Spread the word and unlock free subscription months for your organization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-purple-500/5 border border-purple-500/10 rounded-lg p-5 flex flex-col md:flex-row items-center gap-5">
                  <div className="flex-1 space-y-1.5">
                    <h4 className="font-semibold text-foreground text-sm flex items-center gap-2">
                      <Gift className="w-5 h-5 text-purple-500" /> Share the Savings, Gain Rewards!
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      For every procurement manager who subscribes to SpendOptima Professional using your referral code, both your organization and their organization receive **one month of service absolutely free**.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-foreground font-semibold">Your Unique Invitation Code</Label>
                  <div className="flex gap-2 max-w-md">
                    <div className="bg-muted border border-muted-foreground/20 rounded-md px-4 py-2 font-mono font-bold text-foreground text-lg tracking-wide flex-1 flex items-center justify-between">
                      {referTabData.refer}
                      <Badge className="bg-purple-600 text-white border-none text-[9px]">ACTIVE</Badge>
                    </div>
                    <Button
                      onClick={handleCopyCode}
                      className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2 px-4 shrink-0"
                    >
                      {copied ? <ClipboardCheck className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? "Copied" : "Copy"}
                    </Button>
                  </div>
                </div>

                <Separator className="bg-muted" />

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-foreground">Frequently Asked Questions</h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <h5 className="text-xs font-bold text-foreground">Is there a limit on referral bonuses?</h5>
                      <p className="text-xs text-muted-foreground">
                        No! You can earn up to 12 months of free Professional service each year by inviting teammates and partners.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h5 className="text-xs font-bold text-foreground">When is the free month applied?</h5>
                      <p className="text-xs text-muted-foreground">
                        The credit is automatically applied to your next monthly statement once your referral pays their first invoice.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
