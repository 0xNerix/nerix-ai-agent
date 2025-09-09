import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="min-h-screen gradient-bg">
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          {/* Hero-style Nerix Logo */}
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <div className="relative rounded-3xl px-3 pt-2 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group hover:from-primary/30 hover:to-secondary/30 transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 animate-pulse" />
                <Image
                  src="https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/nerix-512-logo.png"
                  alt="Nerix Logo"
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain relative"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 animate-pulse" />
                <Image
                  src="https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/logo-text-dark.svg"
                  alt="Nerix"
                  height={24}
                  width={80}
                  className="h-6 hidden dark:block relative"
                />
                <Image
                  src="https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/logo-text-light.svg"
                  alt="Nerix"
                  height={24}
                  width={80}
                  className="h-6 dark:hidden relative"
                />
              </div>
            </div>
          </div>

          {/* Error Content */}
          <div className="mb-8">
            <div className="flex items-center justify-center mb-6">
              <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg">
              <Link href="/games">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go to Games
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}