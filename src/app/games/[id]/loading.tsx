"use client";

import { Card } from "@/components/ui/card";

export default function GameLoading() {
  return (
    <div className="min-h-screen gradient-bg py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8">
          {/* Left Column - Game Info */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="h-9 w-24 bg-muted/50 rounded-lg animate-pulse" />
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-9 w-24 bg-muted/50 rounded-lg animate-pulse" />
                ))}
              </div>
            </div>

            <div className="rounded-xl overflow-hidden bg-gradient-to-br from-background/95 via-background/80 to-background/95 border">
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="h-8 w-32 bg-muted/50 rounded-lg animate-pulse" />
                  <div className="h-10 bg-muted/50 rounded-lg w-3/4 animate-pulse" />
                  <div className="h-20 bg-muted/50 rounded-lg animate-pulse" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 h-32 bg-muted/50 rounded-xl animate-pulse" />
                  <div className="h-24 bg-muted/50 rounded-xl animate-pulse" />
                  <div className="h-24 bg-muted/50 rounded-xl animate-pulse" />
                  <div className="col-span-2 h-24 bg-muted/50 rounded-xl animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Chat */}
          <Card className="h-[800px] backdrop-blur-sm bg-background/50">
            <div className="h-16 border-b p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted/50 animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-5 w-32 bg-muted/50 rounded-lg animate-pulse" />
                    <div className="h-4 w-24 bg-muted/50 rounded-lg animate-pulse" />
                  </div>
                </div>
                <div className="h-8 w-40 bg-muted/50 rounded-lg animate-pulse" />
              </div>
            </div>

            <div className="flex-1 p-4 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-muted/50 animate-pulse" />
                  <div className="h-20 flex-1 bg-muted/50 rounded-lg animate-pulse" />
                </div>
              ))}
            </div>

            <div className="border-t p-4">
              <div className="flex gap-3">
                <div className="h-[60px] flex-1 bg-muted/50 rounded-lg animate-pulse" />
                <div className="h-[60px] w-[100px] bg-muted/50 rounded-lg animate-pulse" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}