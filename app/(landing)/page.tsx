import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { VideoIcon } from "@radix-ui/react-icons";
import { CheckCircle2, ChevronRight, BarChart3, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const { userId } = auth();
  return (
    <div className="bg-background relative min-h-screen overflow-hidden flex flex-col justify-start items-center w-full">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-[-15%] w-[60%] h-[40%] rounded-full bg-primary/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-15%] w-[60%] h-[40%] rounded-full bg-cyan-500/5 blur-[130px] pointer-events-none" />
      
      {/* Hero section */}
      <section className="relative z-10 flex flex-col justify-center items-center text-center px-6 pt-16 md:pt-24 max-w-4xl mx-auto gap-6">
        {/* Glow badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary hover:bg-primary/10 transition-all duration-300 shadow-[0_0_15px_rgba(var(--primary),0.05)] cursor-pointer">
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span>✨ Discover the Next-Gen Procurement Platform</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-balance leading-[1.1] text-foreground">
          Unlock the <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-indigo-500 to-violet-600 dark:from-primary dark:via-purple-400 dark:to-pink-500">Power</span> of Efficient Procurement
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground text-balance max-w-2xl mx-auto font-light leading-relaxed">
          Seamlessly Manage Orders and Discover the Perfect Suppliers with Our Advanced Procurement Software
        </p>

        <div className="mt-4 flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto">
          {!userId ? (
            <Link href="/sign-in" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto font-semibold rounded-full px-8 py-6 shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
                Start Free Trial
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          ) : (
            <Link href="/dashboard/spend-analysis" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto font-semibold rounded-full px-8 py-6 shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
                Go to Dashboard
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          )}
          <Button size="lg" variant="outline" className="w-full sm:w-auto font-medium rounded-full px-8 py-6 border-border/80 hover:bg-muted/80 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
            <VideoIcon className="w-5 h-5 mr-2.5" />
            View Demo
          </Button>
        </div>
      </section>


      {/* Trusted by section */}
      <section className="relative z-10 w-full max-w-5xl mx-auto mt-24 text-center px-6">
        <h3 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-8">
          Trusted by Procurement Leaders Worldwide
        </h3>
        <div className="flex justify-center items-center gap-8 md:gap-16 flex-wrap">
          <Image
            src="/trust/zoom.svg"
            alt="Zoom logo"
            width={120}
            height={50}
            className="h-6 w-auto opacity-50 hover:opacity-90 grayscale hover:grayscale-0 transition-all duration-300"
          />
          <Image
            src="/trust/avatar.svg"
            alt="Avatar logo"
            width={120}
            height={50}
            className="h-6 w-auto opacity-50 hover:opacity-90 grayscale hover:grayscale-0 transition-all duration-300"
          />
          <Image
            src="/trust/ui-path.svg"
            alt="UiPath logo"
            width={120}
            height={50}
            className="h-6 w-auto opacity-50 hover:opacity-90 grayscale hover:grayscale-0 transition-all duration-300"
          />
          <Image
            src="/trust/fast.svg"
            alt="Fast logo"
            width={120}
            height={50}
            className="h-6 w-auto opacity-50 hover:opacity-90 grayscale hover:grayscale-0 transition-all duration-300"
          />
          <Image
            src="/trust/axon.svg"
            alt="Axon logo"
            width={120}
            height={50}
            className="h-6 w-auto opacity-50 hover:opacity-90 grayscale hover:grayscale-0 transition-all duration-300"
          />
        </div>
      </section>

      {/* Features & Dashboard Mockups */}
      <section id="features" className="relative z-10 w-full max-w-5xl mx-auto mt-32 px-6 flex flex-col gap-20">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 px-3.5 py-1 rounded-full">
            Product Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-4">
            Empowering Procurement Excellence
          </h2>
        </div>

        {/* Feature 1: Spend Analysis */}
        <article className="flex flex-col md:flex-row justify-between items-center gap-12">
          {/* Dashboard Widget Mockup */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-[0_20px_50px_rgba(0,0,0,0.05)] w-full max-w-[450px] aspect-video flex flex-col justify-between overflow-hidden relative group hover:border-primary/30 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
              <div className="flex justify-between items-center border-b border-border/30 pb-3">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Dashboard</span>
                </div>
                <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  +14.2% Savings
                </span>
              </div>
              
              <div className="flex-1 py-4 flex flex-col justify-center gap-3">
                <div>
                  <div className="flex justify-between text-xs mb-1 font-medium text-muted-foreground">
                    <span>Direct Materials</span>
                    <span className="text-foreground font-semibold">$1.4M (65%)</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full transition-all duration-1000 w-[65%]" />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-1 font-medium text-muted-foreground">
                    <span>Services & Outsourcing</span>
                    <span className="text-foreground font-semibold">$430K (20%)</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                    <div className="bg-cyan-500 h-full rounded-full transition-all duration-1000 w-[20%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1 font-medium text-muted-foreground">
                    <span>IT & Software</span>
                    <span className="text-foreground font-semibold">$320K (15%)</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-400 h-full rounded-full transition-all duration-1000 w-[15%]" />
                  </div>
                </div>
              </div>

              <div className="border-t border-border/30 pt-3 flex justify-between items-center text-xs text-muted-foreground font-medium">
                <span>Total Supplier Spend</span>
                <span className="text-foreground font-bold">$2,150,000</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="w-full md:w-1/2 flex flex-col gap-4 text-left">
            <span className="text-xs font-semibold tracking-wider text-primary uppercase">Feature Overview</span>
            <h3 className="text-2xl font-bold text-foreground">Spend Analysis</h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              Unlock the secrets within your financial logs. SpendOptima transforms messy transactions into clean, organized charts that pinpoint cost reduction areas.
            </p>
            <div className="flex flex-col gap-3.5 mt-4">
              <div className="flex items-start">
                <CheckCircle2 className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-secondary-foreground font-medium">Gain Deeper Insights into Your Spending Patterns.</span>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-secondary-foreground font-medium">Analyze Spending by Suppliers, Months, Commodities, and Locations.</span>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-secondary-foreground font-medium">Maximize Cost Savings and Optimize Budget Allocation.</span>
              </div>
            </div>
          </div>
        </article>

        {/* Feature 2: Sourcing Projects */}
        <article className="flex flex-col md:flex-row-reverse justify-between items-center gap-12">
          {/* Dashboard Widget Mockup */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-[0_20px_50px_rgba(0,0,0,0.05)] w-full max-w-[450px] aspect-video flex flex-col justify-between overflow-hidden relative group hover:border-primary/30 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
              <div className="flex justify-between items-center border-b border-border/30 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-500" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Active Sourcing</span>
                </div>
                <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                  Bidding Phase
                </span>
              </div>
              
              <div className="flex-1 py-4 flex flex-col justify-center gap-2">
                <div className="flex justify-between items-center bg-muted/40 hover:bg-muted/75 p-2 rounded-lg border border-border/20 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-semibold text-foreground">Lenovo Inc.</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">$820 / unit</span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded">Lowest</span>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-muted/40 hover:bg-muted/75 p-2 rounded-lg border border-border/20 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-xs font-semibold text-foreground">Dell Technologies</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">$850 / unit</span>
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">Recommended</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-border/30 pt-3 flex justify-between items-center text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5 font-medium text-foreground">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Select Award Winner
                </span>
                <span className="font-semibold text-muted-foreground">June 15 Deadline</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="w-full md:w-1/2 flex flex-col gap-4 text-left">
            <span className="text-xs font-semibold tracking-wider text-primary uppercase">Core Module</span>
            <h3 className="text-2xl font-bold text-foreground">Sourcing Projects</h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              Stop relying on unstructured emails and spreadsheet comparisons. Streamline request-for-quotes (RFQs) and compare supplier bids dynamically in one interface.
            </p>
            <div className="flex flex-col gap-3.5 mt-4">
              <div className="flex items-start">
                <CheckCircle2 className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-secondary-foreground font-medium">Find the Ideal Supplier for Your Unique Projects.</span>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-secondary-foreground font-medium">Simplify Sourcing with Part Numbers and Descriptions.</span>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-secondary-foreground font-medium">Ensure Optimal Supplier Selection Based on Cost, Quality, and Delivery.</span>
              </div>
            </div>
          </div>
        </article>
      </section>

      {/* Founder Profile Section */}
      <section id="about" className="relative z-10 w-full max-w-5xl mx-auto mt-32 px-6">
        <div className="relative rounded-3xl border border-border/40 bg-card/55 backdrop-blur-md p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
            <div className="flex-shrink-0 relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-primary to-cyan-500 opacity-20 blur-sm" />
              <Image
                src="/profile.svg"
                alt="Founder's profile"
                width={320}
                height={320}
                className="relative rounded-2xl w-64 h-64 md:w-80 md:h-80 object-cover border border-border/20 shadow-md"
              />
            </div>
            <div className="flex-1 text-left">
              <span className="text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">
                A Message from Our Leadership
              </span>
              <h3 className="text-2xl md:text-3xl font-bold mt-4 text-foreground leading-tight">
                Dear Procurement Professionals
              </h3>
              <p className="text-base sm:text-lg font-light text-muted-foreground mt-6 leading-relaxed">
                At SpendOptima, we understand the complexities of procurement management
                and the impact it has on your organization&#39;s success.
                That&#39;s why we created our cutting-edge procurement software—to
                revolutionize the way you streamline your operations, drive cost
                efficiencies, and achieve procurement excellence.
              </p>
              <p className="text-base sm:text-lg font-light text-muted-foreground mt-4 leading-relaxed">
                Our software&#39;s powerful spend analysis capabilities and
                advanced sourcing projects feature are designed to empower you
                with actionable insights and enable seamless supplier selection.
                Join the ever-growing community of satisfied customers who have
                transformed their procurement processes with our software.
              </p>
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-foreground">Mahendra H.</h4>
                <p className="text-sm text-muted-foreground">Founder & CEO, SpendOptima</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Banner Call To Action */}
      <section id="cta" className="relative z-10 w-full max-w-5xl mx-auto my-32 px-6">
        <div className="relative rounded-3xl bg-gradient-to-tr from-primary via-violet-700 to-indigo-800 text-primary-foreground p-12 md:p-16 text-center overflow-hidden shadow-2xl shadow-primary/20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl pointer-events-none animate-pulse" />
          
          <div className="relative z-10 flex flex-col items-center gap-6 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Experience Next-Level Procurement Efficiency!
            </h2>
            <p className="text-lg text-primary-foreground/80 font-light max-w-lg">
              Unlock insights, track vendor spending, and optimize budgets in minutes. Start your risk-free trial today.
            </p>
            <div className="mt-4">
              <Link href="/sign-up">
                <Button size="lg" variant="secondary" className="font-semibold rounded-full px-8 py-6 bg-white text-primary hover:bg-white/95 hover:scale-[1.03] transition-all duration-200 shadow-xl shadow-black/10">
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
