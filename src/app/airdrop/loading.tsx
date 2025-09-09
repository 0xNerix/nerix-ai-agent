import { LandingDock } from "@/components/layout/landing-dock";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Gift, Clock, Users, Trophy, DollarSign } from "lucide-react";

export default function AirdropLoading() {
  return (
    <main className="min-h-screen gradient-bg">
      <LandingDock alwaysVisible={true} />
      
      {/* Airdrop Loading Skeleton */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 min-h-screen">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] bg-amber-500/20 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Section Header Skeleton */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Gift className="w-12 h-12 text-orange-500 animate-pulse" />
            </div>
            <Skeleton className="h-12 w-72 mx-auto mb-6 bg-orange-500/20" />
            <Skeleton className="h-6 w-96 mx-auto mb-4 bg-amber-500/20" />
            <Skeleton className="h-4 w-80 mx-auto bg-muted/20" />
          </div>

          {/* Countdown Timer Skeleton */}
          <Card className="relative mb-16 p-8 backdrop-blur-xl bg-gradient-to-br from-orange-500/10 via-amber-500/10 to-yellow-500/10 border-orange-500/20 animate-pulse">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-orange-500 animate-pulse" />
              </div>
              <Skeleton className="h-8 w-48 mx-auto mb-6 bg-orange-500/20" />
              
              {/* Countdown Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                {['Days', 'Hours', 'Minutes', 'Seconds'].map((unit) => (
                  <div key={unit} className="text-center">
                    <Skeleton className="h-16 w-16 mx-auto mb-2 rounded-lg bg-orange-500/20" />
                    <Skeleton className="h-4 w-12 mx-auto bg-amber-500/20" />
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Airdrop Stats Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: Users, color: 'blue' },
              { icon: DollarSign, color: 'green' },
              { icon: Trophy, color: 'purple' }
            ].map((item, index) => (
              <Card key={index} className="relative p-6 backdrop-blur-sm bg-background/20 border-primary/20 animate-pulse">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-${item.color}-500/20 flex items-center justify-center`}>
                    <item.icon className={`w-6 h-6 text-${item.color}-500`} />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-24 mb-2 bg-muted/20" />
                    <Skeleton className="h-8 w-16 bg-primary/20" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Airdrop Levels Skeleton */}
          <div className="space-y-8">
            <div className="text-center mb-12">
              <Skeleton className="h-10 w-56 mx-auto mb-4 bg-orange-500/20" />
              <Skeleton className="h-5 w-80 mx-auto bg-muted/20" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((index) => (
                <Card key={index} className="relative p-6 backdrop-blur-sm bg-background/20 border-orange-500/20 animate-pulse">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                      <Skeleton className="w-6 h-6 bg-orange-500/30" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <Skeleton className="h-6 w-24 bg-orange-500/20" />
                        <Skeleton className="h-5 w-16 rounded-full bg-amber-500/20" />
                      </div>
                      
                      <Skeleton className="h-4 w-full mb-2 bg-muted/20" />
                      <Skeleton className="h-4 w-3/4 mb-4 bg-muted/20" />
                      
                      {/* Reward Info */}
                      <div className="flex items-center justify-between">
                        <div>
                          <Skeleton className="h-4 w-16 mb-1 bg-green-500/20" />
                          <Skeleton className="h-6 w-20 bg-green-500/30" />
                        </div>
                        <div className="text-right">
                          <Skeleton className="h-4 w-20 mb-1 bg-blue-500/20" />
                          <Skeleton className="h-6 w-16 bg-blue-500/30" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-4">
                    <Skeleton className="h-2 w-full rounded-full bg-orange-500/20" />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* How to Participate Skeleton */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <Skeleton className="h-10 w-64 mx-auto mb-4 bg-primary/20" />
              <Skeleton className="h-5 w-72 mx-auto bg-muted/20" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((step) => (
                <Card key={step} className="relative p-8 backdrop-blur-sm bg-background/20 border-primary/20 animate-pulse">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center">
                      <Skeleton className="w-6 h-6 bg-primary/30" />
                    </div>
                    <Skeleton className="h-6 w-32 mx-auto mb-3 bg-primary/20" />
                    <Skeleton className="h-4 w-40 mx-auto mb-2 bg-muted/20" />
                    <Skeleton className="h-4 w-36 mx-auto bg-muted/20" />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Button Skeleton */}
          <div className="text-center mt-12">
            <Skeleton className="h-14 w-48 mx-auto rounded-xl bg-gradient-to-r from-orange-500/20 to-amber-500/20" />
          </div>
        </div>
      </section>
    </main>
  );
}