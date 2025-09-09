import { LandingDock } from "@/components/layout/landing-dock";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, ChevronLeft, ChevronRight, InboxIcon } from "lucide-react";

export default function NFTsLoading() {
  return (
    <main className="min-h-screen gradient-bg">
      <LandingDock alwaysVisible={true} />
      
      {/* NFTs Loading Skeleton */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-secondary/15 via-secondary/20 to-secondary/10">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-primary/20 rounded-full blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-accent/20 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Section Header Skeleton */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-12 h-12 text-secondary animate-pulse" />
            </div>
            <Skeleton className="h-12 w-80 mx-auto mb-6 bg-secondary/20" />
            <Skeleton className="h-6 w-96 mx-auto mb-12 bg-accent/20" />
          </div>

          {/* NFT Stats Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[1, 2, 3].map((index) => (
              <Card key={index} className="p-6 backdrop-blur-sm bg-background/20 border-secondary/20 animate-pulse">
                <div className="flex items-center gap-4">
                  <Skeleton className="w-12 h-12 rounded-xl bg-secondary/20" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-2 bg-secondary/20" />
                    <Skeleton className="h-8 w-16 bg-secondary/30" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* NFT Display Section */}
          <div className="space-y-8">
            {/* Iteration Navigation Skeleton */}
            <Card className="relative p-6 backdrop-blur-sm bg-background/20 border-primary/20 animate-pulse">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <Skeleton className="h-6 w-40 mb-2 bg-primary/20" />
                  <Skeleton className="h-4 w-60 bg-muted/20" />
                </div>

                <div className="flex items-center gap-2">
                  <Skeleton className="h-9 w-16 bg-muted/20" />
                  <div className="w-8 h-8 rounded bg-muted/20 flex items-center justify-center">
                    <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="w-16 text-center">
                    <Skeleton className="h-6 w-8 mx-auto bg-primary/20" />
                  </div>
                  <div className="w-8 h-8 rounded bg-muted/20 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <Skeleton className="h-9 w-16 bg-muted/20" />
                </div>
              </div>
            </Card>

            {/* NFT Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((index) => (
                <Card key={index} className="relative overflow-hidden backdrop-blur-sm border-secondary/20 animate-pulse">
                  <div className="aspect-square relative bg-gradient-to-br from-secondary/10 to-accent/10">
                    <Skeleton className="w-full h-full" />
                    
                    {/* NFT Badge */}
                    <div className="absolute top-3 left-3">
                      <Skeleton className="h-6 w-16 rounded-full bg-secondary/20" />
                    </div>
                    
                    {/* Power Level */}
                    <div className="absolute top-3 right-3">
                      <Skeleton className="h-8 w-12 rounded-lg bg-accent/20" />
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <div>
                      <Skeleton className="h-5 w-32 mb-2 bg-secondary/20" />
                      <Skeleton className="h-4 w-24 bg-muted/20" />
                    </div>
                    
                    {/* Abilities */}
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20 bg-accent/20" />
                      <div className="flex gap-2">
                        {[1, 2, 3].map((abilityIndex) => (
                          <Skeleton key={abilityIndex} className="h-6 w-16 rounded-full bg-primary/20" />
                        ))}
                      </div>
                    </div>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3">
                      {[1, 2, 3].map((statIndex) => (
                        <div key={statIndex} className="text-center">
                          <Skeleton className="h-6 w-8 mx-auto mb-1 bg-secondary/20" />
                          <Skeleton className="h-3 w-12 mx-auto bg-muted/20" />
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Video Preview Skeleton */}
          <Card className="relative overflow-hidden backdrop-blur-sm bg-background/50 border border-primary/20 shadow-2xl mt-16 animate-pulse">
            <div className="relative w-full aspect-video bg-black/20">
              <Skeleton className="w-full h-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                  <div className="w-6 h-6 border-l-4 border-white/40" style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }} />
                </div>
              </div>
              
              {/* Video overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Skeleton className="h-6 w-48 mb-2 bg-white/20" />
                    <Skeleton className="h-4 w-64 bg-white/10" />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* NFT Features Skeleton */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <Skeleton className="h-10 w-64 mx-auto mb-4 bg-secondary/20" />
              <Skeleton className="h-5 w-80 mx-auto bg-muted/20" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((index) => (
                <Card key={index} className="relative p-8 backdrop-blur-sm bg-background/20 border-secondary/20 animate-pulse">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-secondary/20 mx-auto mb-4 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-secondary/50" />
                    </div>
                    <Skeleton className="h-6 w-32 mx-auto mb-3 bg-secondary/20" />
                    <Skeleton className="h-4 w-40 mx-auto mb-2 bg-muted/20" />
                    <Skeleton className="h-4 w-36 mx-auto bg-muted/20" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}