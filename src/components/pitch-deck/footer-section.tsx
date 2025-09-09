"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function FooterSection() {
  return (
    <div className="mt-12 text-center">
      <p className="text-muted-foreground mb-4">
        © 2025 Nerix - AI Security Testing Platform on BNB Chain
      </p>
      <div className="flex justify-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/">
            Home
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href="/whitepaper">
            Whitepaper
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href="/games">
            Games
          </Link>
        </Button>
      </div>
    </div>
  );
}