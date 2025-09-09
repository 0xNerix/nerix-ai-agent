"use client";

import { Card } from "@/components/ui/card";
import { Database, Shield, Lock, Eye, AlertTriangle, CheckCircle, FileCheck, Fingerprint, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export function SecurityFeatures() {
  return (
    <section id="security-features" className="space-y-8">
      <h2 className="text-3xl font-bold text-center">Security Features</h2>
      
      <Card className="p-8 backdrop-blur-sm bg-background/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold">Blockchain Security</h3>
                <p className="text-sm text-muted-foreground">Immutable and transparent</p>
              </div>
            </div>

            <p className="text-muted-foreground mb-6">
              Nerix leverages blockchain technology to ensure complete transparency, immutability, and security for all transactions and game outcomes.
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <Lock className="w-5 h-5 text-primary" />
                  <h4 className="font-medium">Smart Contract Security</h4>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Reentrancy protection with nonReentrant modifier</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Access control with onlyOwner modifier</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Pausable functionality for emergency stops</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Checks-effects-interactions pattern</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                <div className="flex items-center gap-3 mb-2">
                  <Eye className="w-5 h-5 text-secondary" />
                  <h4 className="font-medium">Transparency</h4>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    <span>All transactions recorded on the blockchain</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    <span>Open-source smart contracts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    <span>Verifiable prize pool growth</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    <span>Automated reward distribution</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                <div className="flex items-center gap-3 mb-2">
                  <AlertTriangle className="w-5 h-5 text-accent" />
                  <h4 className="font-medium">Risk Mitigation</h4>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>Integer overflow protection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>Gas optimization for lower fees</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>Fail-safe mechanisms</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>Comprehensive error handling</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                <Fingerprint className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold">User Security</h3>
                <p className="text-sm text-muted-foreground">Safe and secure interactions</p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-muted/50 mb-6">
              <h4 className="text-lg font-semibold mb-4">Wallet Security</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Fingerprint className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Secure Wallet Integration</p>
                    <p className="text-sm text-muted-foreground">
                      Integration with trusted wallet providers like MetaMask, ensuring secure key management and transaction signing.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <RefreshCw className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium">Nonce-Based Authentication</p>
                    <p className="text-sm text-muted-foreground">
                      Secure message signing with nonce-based authentication to prevent replay attacks and ensure message authenticity.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <FileCheck className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">Transaction Verification</p>
                    <p className="text-sm text-muted-foreground">
                      Clear transaction previews and confirmation steps before any funds are transferred.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border border-primary/20">
              <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient-x">Security Best Practices</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Regular Audits</p>
                    <p className="text-sm text-muted-foreground">
                      Smart contracts undergo regular security audits by third-party security firms
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium">Open Source Code</p>
                    <p className="text-sm text-muted-foreground">
                      All smart contracts are open source and verifiable on the blockchain
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">Bug Bounty Program</p>
                    <p className="text-sm text-muted-foreground">
                      Rewards for identifying and reporting security vulnerabilities in the platform
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          className="mt-8 p-6 rounded-xl bg-muted/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-center">Data Security</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-4 rounded-lg bg-background/50 border border-primary/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Database className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-medium">Database Security</h4>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Encrypted data storage</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Row-level security policies</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Regular backups</span>
                </li>
              </ul>
            </div>
            
            <div className="p-4 rounded-lg bg-background/50 border border-secondary/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-secondary" />
                </div>
                <h4 className="font-medium">API Security</h4>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span>Rate limiting</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span>Input validation</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span>HTTPS encryption</span>
                </li>
              </ul>
            </div>
            
            <div className="p-4 rounded-lg bg-background/50 border border-accent/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-accent" />
                </div>
                <h4 className="font-medium">User Data Protection</h4>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>Minimal data collection</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>No personal information stored</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>Wallet addresses only</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </Card>
    </section>
  );
}