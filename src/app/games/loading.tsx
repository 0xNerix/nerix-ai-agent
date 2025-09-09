import { LandingDock } from "@/components/layout/landing-dock";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { GamepadIcon, Users, Trophy, MessageCircle } from "lucide-react";

export default function GamesLoading() {
  return (
    <main className="min-h-screen gradient-bg">
      <LandingDock alwaysVisible={true} />
      
      {/* Games Loading Skeleton */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-transparent via-primary/5 to-secondary/15">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-primary/20 rounded-full blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Section Header Skeleton */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <GamepadIcon className="w-12 h-12 text-primary animate-pulse" />
            </div>
            <Skeleton className="h-12 w-96 mx-auto mb-6 bg-primary/20" />
            <Skeleton className="h-6 w-64 mx-auto mb-4 bg-secondary/20" />
            <Skeleton className="h-4 w-80 mx-auto bg-muted/20" />

            {/* Progress Path Skeleton */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Skeleton className="h-10 w-32 rounded-full bg-emerald-500/20" />
              <div className="w-4 h-4 text-muted-foreground animate-pulse">→</div>
              <Skeleton className="h-10 w-32 rounded-full bg-secondary/20" />
            </div>
          </div>

          {/* Game Cards Skeleton */}
          <div className="space-y-8 sm:space-y-16">
            {/* Free Games Grid Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {[1, 2].map((index) => (
                <Card key={index} className="relative overflow-hidden backdrop-blur-sm border-primary/20 p-6 animate-pulse">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Skeleton className="w-12 h-12 rounded-xl bg-primary/20" />
                        <div>
                          <Skeleton className="h-6 w-32 mb-2 bg-secondary/20" />
                          <Skeleton className="h-4 w-24 bg-muted/20" />
                        </div>
                      </div>
                      <Skeleton className="h-8 w-20 rounded-full bg-accent/20" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg bg-secondary/10">
                        <div className="flex items-center gap-2 mb-1">
                          <Users className="w-4 h-4 text-secondary" />
                          <Skeleton className="h-4 w-16 bg-secondary/20" />
                        </div>
                        <Skeleton className="h-6 w-12 bg-secondary/30" />
                      </div>
                      <div className="p-3 rounded-lg bg-accent/10">
                        <div className="flex items-center gap-2 mb-1">
                          <MessageCircle className="w-4 h-4 text-accent" />
                          <Skeleton className="h-4 w-16 bg-accent/20" />
                        </div>
                        <Skeleton className="h-6 w-12 bg-accent/30" />
                      </div>
                    </div>

                    <Skeleton className="h-12 w-full rounded-xl bg-primary/20" />
                  </div>
                </Card>
              ))}
            </div>

            {/* Endless Game Skeleton */}
            <Card className="relative overflow-hidden backdrop-blur-sm border-primary/20 shadow-xl animate-pulse">
              <div className="relative flex">
                {/* Main Content */}
                <div className="flex-1 p-6 space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-12 h-12 rounded-xl bg-primary/20" />
                      <div>
                        <Skeleton className="h-7 w-40 mb-2 bg-secondary/20" />
                        <Skeleton className="h-4 w-60 bg-muted/20" />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-8 w-16 rounded-full bg-primary/20" />
                      <Skeleton className="h-8 w-24 rounded-full bg-secondary/20" />
                    </div>
                  </div>

                  {/* Live Status */}
                  <Skeleton className="h-10 w-80 rounded-lg bg-emerald-500/20" />

                  {/* Prize Pool & Fee */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                      <div className="flex items-center gap-2">
                        <Skeleton className="w-8 h-8 rounded-lg bg-yellow-500/20" />
                        <div>
                          <Skeleton className="h-4 w-20 mb-1 bg-yellow-600/20" />
                          <Skeleton className="h-6 w-16 bg-yellow-600/30" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                      <div className="flex items-center gap-2">
                        <Skeleton className="w-8 h-8 rounded-lg bg-red-500/20" />
                        <div>
                          <Skeleton className="h-4 w-20 mb-1 bg-red-600/20" />
                          <Skeleton className="h-6 w-16 bg-red-600/30" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2].map((index) => (
                      <div key={index} className="p-3 rounded-lg bg-secondary/10 border border-secondary/20">
                        <div className="flex items-center gap-2">
                          <Skeleton className="w-8 h-8 rounded-lg bg-secondary/20" />
                          <div>
                            <Skeleton className="h-4 w-16 mb-1 bg-secondary/20" />
                            <Skeleton className="h-6 w-12 bg-secondary/30" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Skeleton className="h-14 w-full rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20" />
                </div>

                {/* Side Image */}
                <div className="relative w-80 overflow-hidden">
                  <Skeleton className="w-full h-full bg-primary/10" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}