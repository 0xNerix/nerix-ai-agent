"use client";

import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function BnbPitchDeckLoading() {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center">
      <Card className="p-8 backdrop-blur-sm bg-background/50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-lg font-medium">Loading system overview...</p>
        </div>
      </Card>
    </div>
  );
}