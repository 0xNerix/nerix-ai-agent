"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { handleError } from '@/lib/utils/error-handler';
import { 
  Mail, 
  MessageCircle, 
  MessagesSquare, 
  Send, 
  CheckCircle,
  Twitter,
  Github,
  Globe,
  Users,
  HelpCircle,
  Bug,
  Lightbulb,
  Shield,
  Clock,
  Activity,
  ArrowLeft,
  Youtube
} from 'lucide-react';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api/client';

// Custom X (Twitter) icon component
function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      width="20"
      height="20"
      fill="currentColor"
      {...props}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
    </svg>
  );
}

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general',
    honeypot: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formStartTime] = useState(Date.now()); // For spam protection

  const submitSupportMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const submitData = {
        ...data,
        timestamp: formStartTime,
      };
      return api.support.submit(submitData);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      setSubmitError(null);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          type: 'general',
          honeypot: ''
        });
      }, 5000);
    },
    onError: (error) => {
      handleError(error, 'Form submission failed', { 
        toastDescription: 'Failed to submit form. Please try again.' 
      });
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message. Please try again.';
      
      // Parse field-specific validation errors
      const fieldErrorMap: Record<string, string> = {};
      if (errorMessage.includes(':')) {
        const errors = errorMessage.split(', ');
        errors.forEach(err => {
          const [field, message] = err.split(': ');
          if (field && message) {
            fieldErrorMap[field] = message;
          }
        });
        
        if (Object.keys(fieldErrorMap).length > 0) {
          setFieldErrors(fieldErrorMap);
          setSubmitError(null);
          return;
        }
      }
      
      setFieldErrors({});
      setSubmitError(errorMessage);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setFieldErrors({});
    submitSupportMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Client-side validation limits (matching API)
    const fieldLimits = {
      name: { min: 2, max: 100 },
      subject: { min: 5, max: 200 }, 
      message: { min: 10, max: 2000 }
    };
    
    // Check field limits
    const limit = fieldLimits[name as keyof typeof fieldLimits];
    if (limit && value.length > limit.max) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} cannot exceed ${limit.max} characters`
      }));
      return; // Don't update if over limit
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const contactTypes = [
    { value: 'general', label: 'General Inquiry', icon: <HelpCircle className="w-4 h-4" /> },
    { value: 'support', label: 'Technical Support', icon: <Shield className="w-4 h-4" /> },
    { value: 'bug', label: 'Bug Report', icon: <Bug className="w-4 h-4" /> },
    { value: 'feature', label: 'Feature Request', icon: <Lightbulb className="w-4 h-4" /> },
    { value: 'partnership', label: 'Partnership', icon: <Users className="w-4 h-4" /> },
  ];

  const socialLinks = [
    {
      name: "X (Twitter)",
      icon: <XIcon className="text-white" />,
      href: "https://x.com/0xNerix",
      description: "Follow us for updates and announcements",
      color: "hover:bg-white/10"
    },
    {
      name: "Discord",
      icon: <MessageCircle className="w-5 h-5 text-[#5865F2]" />,
      href: "https://discord.gg/bvxzdHgBPW",
      description: "Join our community for support and discussions",
      color: "hover:bg-[#5865F2]/10"
    },
    {
      name: "Telegram",
      icon: <MessagesSquare className="w-5 h-5 text-[#0088cc]" />,
      href: "https://t.me/nerixaiprotocol",
      description: "Get real-time updates and connect with the team",
      color: "hover:bg-[#0088cc]/10"
    },
    {
      name: "YouTube",
      icon: <Youtube className="w-5 h-5 text-[#FF0000]" />,
      href: "https://www.youtube.com/@0xNerix",
      description: "Watch our latest videos and tutorials",
      color: "hover:bg-[#FF0000]/10"
    }
  ];

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      {/* Back to Home Button */}
      <div className="fixed top-6 left-6 z-50">
        <Link href="/">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl shadow-lg hover:bg-card/90 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
              Back to Home
            </span>
          </motion.div>
        </Link>
      </div>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Connect
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join the Nerix community. Get support, discuss partnerships, share ideas, and connect with fellow AI gaming enthusiasts. 
            We&apos;re here to help and grow together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we&apos;ll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 space-y-4"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                    <h3 className="text-xl font-semibold">Message Sent!</h3>
                    <p className="text-muted-foreground">
                      Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Honeypot field for spam protection - hidden from users */}
                    <input
                      type="text"
                      name="honeypot"
                      tabIndex={-1}
                      autoComplete="off"
                      style={{
                        position: 'absolute',
                        left: '-9999px',
                        opacity: 0,
                        pointerEvents: 'none'
                      }}
                      onChange={(e) => {
                        // If this field is filled, it's likely a bot
                        if (e.target.value) {
                          setFormData(prev => ({ ...prev, honeypot: e.target.value }));
                        }
                      }}
                    />

                    {submitError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
                      >
                        <p className="text-red-500 text-sm">{submitError}</p>
                      </motion.div>
                    )}
                    {/* Name and Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Name *</label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          maxLength={100}
                          required
                          className={fieldErrors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}
                        />
                        {fieldErrors.name && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-xs"
                          >
                            {fieldErrors.name}
                          </motion.p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email *</label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          required
                          className={fieldErrors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}
                        />
                        {fieldErrors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-xs"
                          >
                            {fieldErrors.email}
                          </motion.p>
                        )}
                      </div>
                    </div>

                    {/* Contact Type */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Type of Inquiry</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {contactTypes.map((type) => (
                          <Button
                            key={type.value}
                            type="button"
                            variant={formData.type === type.value ? "default" : "outline"}
                            size="sm"
                            onClick={() => setFormData(prev => ({ ...prev, type: type.value }))}
                            className="justify-start"
                          >
                            {type.icon}
                            <span className="ml-2">{type.label}</span>
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Subject *</label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Brief summary of your message"
                        maxLength={200}
                        required
                        className={fieldErrors.subject ? 'border-red-500 focus-visible:ring-red-500' : ''}
                      />
                      {fieldErrors.subject && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-xs"
                        >
                          {fieldErrors.subject}
                        </motion.p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Message *</label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                        maxLength={2000}
                        required
                        className={fieldErrors.message ? 'border-red-500 focus-visible:ring-red-500' : ''}
                      />
                      {fieldErrors.message && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-xs"
                        >
                          {fieldErrors.message}
                        </motion.p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={submitSupportMutation.isPending}
                      className="w-full"
                    >
                      {submitSupportMutation.isPending ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Social Links */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Contact & Support
                </CardTitle>
                <CardDescription>
                  Join our community and stay updated
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group block p-4 rounded-lg bg-background/40 backdrop-blur-xl border border-white/10 transition-all duration-300 ${link.color}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      {link.icon}
                      <h3 className="font-semibold">{link.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {link.description}
                    </p>
                  </motion.a>
                ))}
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  Quick Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Direct Support</p>
                      <p className="text-sm text-muted-foreground">
                        <a 
                          href="mailto:hello@nerixai.com" 
                          className="text-primary hover:text-primary/80 transition-colors underline"
                        >
                          hello@nerixai.com
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Response Time</p>
                      <p className="text-sm text-muted-foreground">
                        We typically respond within 24 hours
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Shield className="w-4 h-4 text-secondary mt-1" />
                    <div>
                      <p className="font-medium">Support Hours</p>
                      <p className="text-sm text-muted-foreground">
                        24/7 community support via Discord
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Globe className="w-4 h-4 text-accent mt-1" />
                    <div>
                      <p className="font-medium">Languages</p>
                      <p className="text-sm text-muted-foreground">
                        English, with community support in multiple languages
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    For urgent technical issues, please join our Discord server for immediate community support.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Additional Resources */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link
                  href="/system-overview"
                  className="block p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-primary" />
                    <span className="font-medium">Documentation</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Learn about Nerix and how it works
                  </p>
                </Link>

                <Link
                  href="/api-docs"
                  className="block p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-orange-500" />
                    <span className="font-medium">API Documentation</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Build apps and integrate with our API
                  </p>
                </Link>

                <Link
                  href="/system-status"
                  className="block p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-green-500" />
                    <span className="font-medium">System Status</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Check platform uptime and service status
                  </p>
                </Link>

                <Link
                  href="/terms-of-service"
                  className="block p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">Terms of Service</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Read our terms and conditions
                  </p>
                </Link>

                <Link
                  href="/privacy-policy"
                  className="block p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-purple-500" />
                    <span className="font-medium">Privacy Policy</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Learn how we protect your data
                  </p>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}