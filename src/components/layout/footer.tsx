import { Heart } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t backdrop-blur-sm bg-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            &copy; {new Date().getFullYear()} Nerix. Made with
            <Heart className="w-3 h-3 text-red-500 fill-current animate-pulse" />
            for the future of AI security research.
          </p>
          
          <div className="flex items-center gap-6 text-sm">
            <Link 
              href="/terms-of-service" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
            <Link 
              href="/privacy-policy" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/support" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}