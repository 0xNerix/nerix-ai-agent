import { LandingDock } from "@/components/layout/landing-dock";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageIcon, Play, Download, Eye } from "lucide-react";

export default function GalleryLoading() {
  return (
    <main className="min-h-screen gradient-bg">
      <LandingDock alwaysVisible={true} />
      
      {/* Gallery Loading Skeleton */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 min-h-screen">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] bg-purple-500/20 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Section Header Skeleton */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <ImageIcon className="w-12 h-12 text-pink-500 animate-pulse" />
            </div>
            <Skeleton className="h-12 w-64 mx-auto mb-6 bg-pink-500/20" />
            <Skeleton className="h-6 w-96 mx-auto mb-4 bg-purple-500/20" />
            <Skeleton className="h-4 w-80 mx-auto bg-muted/20" />
          </div>

          {/* Filter/Category Skeleton */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['All', 'Images', 'Videos', 'AI Art', 'Game Assets'].map((category) => (
              <Skeleton key={category} className="h-10 w-20 rounded-full bg-primary/20" />
            ))}
          </div>

          {/* Gallery Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, index) => (
              <Card key={index} className="group relative overflow-hidden backdrop-blur-sm border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 animate-pulse">
                <div className="aspect-square relative bg-gradient-to-br from-pink-500/10 to-purple-500/10">
                  <Skeleton className="w-full h-full" />
                  
                  {/* Media Type Indicator */}
                  <div className="absolute top-3 left-3">
                    {index % 3 === 0 ? (
                      <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                        <Play className="w-4 h-4 text-red-500" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <ImageIcon className="w-4 h-4 text-blue-500" />
                      </div>
                    )}
                  </div>
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                        <Eye className="w-5 h-5 text-white" />
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                        <Download className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Resolution/Size Badge */}
                  <div className="absolute bottom-3 right-3">
                    <Skeleton className="h-6 w-16 rounded bg-black/20" />
                  </div>
                </div>
                
                {/* Asset Info */}
                <div className="p-4">
                  <Skeleton className="h-5 w-32 mb-2 bg-pink-500/20" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-16 bg-purple-500/20" />
                    <Skeleton className="h-4 w-12 bg-muted/20" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More Button Skeleton */}
          <div className="text-center mt-12">
            <Skeleton className="h-12 w-32 mx-auto rounded-lg bg-gradient-to-r from-pink-500/20 to-purple-500/20" />
          </div>

          {/* Featured Gallery Section */}
          <div className="mt-24">
            <div className="text-center mb-12">
              <Skeleton className="h-10 w-48 mx-auto mb-4 bg-primary/20" />
              <Skeleton className="h-5 w-64 mx-auto bg-muted/20" />
            </div>

            {/* Large Featured Items */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[1, 2].map((index) => (
                <Card key={index} className="relative overflow-hidden backdrop-blur-sm border-primary/20 animate-pulse">
                  <div className="aspect-video relative bg-gradient-to-br from-primary/10 to-secondary/10">
                    <Skeleton className="w-full h-full" />
                    
                    {/* Play Button for Video */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    
                    {/* Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                      <Skeleton className="h-6 w-40 mb-2 bg-white/20" />
                      <Skeleton className="h-4 w-56 bg-white/10" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Gallery Categories */}
          <div className="mt-24">
            <div className="text-center mb-12">
              <Skeleton className="h-10 w-40 mx-auto mb-4 bg-secondary/20" />
              <Skeleton className="h-5 w-60 mx-auto bg-muted/20" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {['Game Screenshots', 'AI-Generated Art', 'Character Designs'].map((category, index) => (
                <Card key={index} className="relative p-8 backdrop-blur-sm bg-background/20 border-secondary/20 animate-pulse">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-secondary/20 mx-auto mb-4 flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-secondary/50" />
                    </div>
                    <Skeleton className="h-6 w-32 mx-auto mb-3 bg-secondary/20" />
                    <Skeleton className="h-4 w-40 mx-auto mb-2 bg-muted/20" />
                    <Skeleton className="h-4 w-36 mx-auto mb-4 bg-muted/20" />
                    <Skeleton className="h-10 w-24 mx-auto rounded-lg bg-primary/20" />
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