"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { PRIVACY_POLICY, LegalSection } from "@/data/legal";

function LegalSectionComponent({ section, level = 0 }: { section: LegalSection; level?: number }) {
  const HeadingTag = level === 0 ? 'h2' : level === 1 ? 'h3' : 'h4';
  const headingClass = level === 0 
    ? 'text-xl font-bold mb-4 text-foreground' 
    : level === 1 
      ? 'text-lg font-semibold mb-3 text-foreground' 
      : 'text-base font-medium mb-2 text-foreground';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <HeadingTag className={headingClass}>
        {section.title}
      </HeadingTag>
      <p className="text-muted-foreground leading-relaxed mb-4">
        {section.content}
      </p>
      {section.subsections && (
        <div className="ml-4">
          {section.subsections.map((subsection, index) => (
            <LegalSectionComponent 
              key={index} 
              section={subsection} 
              level={level + 1} 
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function PrivacyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6 hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-secondary/10">
              <Shield className="w-8 h-8 text-secondary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
                {PRIVACY_POLICY.title}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Last updated: {PRIVACY_POLICY.lastUpdated}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <Card className="p-8 bg-background/50 backdrop-blur-sm border border-white/10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="pb-6 border-b border-white/10">
              <p className="text-muted-foreground leading-relaxed">
                This Privacy Policy describes how Nerix (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) collects, uses, and shares 
                your personal information when you use our platform and services.
              </p>
            </div>

            {PRIVACY_POLICY.sections.map((section, index) => (
              <LegalSectionComponent key={index} section={section} />
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-6 border-t border-white/10"
            >
              <div className="p-4 rounded-lg bg-muted/30">
                <h3 className="font-semibold mb-2">Data Protection</h3>
                <p className="text-sm text-muted-foreground">
                  We are committed to protecting your privacy and ensuring the security of your personal information. 
                  For any privacy-related questions or concerns, please contact our support team.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </Card>
      </div>
    </div>
  );
}