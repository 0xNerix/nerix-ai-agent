export interface LegalSection {
  title: string;
  content: string;
  subsections?: LegalSection[];
}

export interface LegalDocument {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export const TERMS_OF_SERVICE: LegalDocument = {
  title: "Terms of Service",
  lastUpdated: "August 18, 2025",
  sections: [
    {
      title: "1. Acceptance of Terms",
      content: "By using Nerix, you agree to these Terms. If you don't agree, don't use the platform."
    },
    {
      title: "2. Platform Description",
      content: "Nerix is a gamified Web3-based AI security research and bug bounty platform. We provide AI vulnerability testing through interactive game mechanics, security reporting, and crypto rewards for validated findings."
    },
    {
      title: "3. Game Mechanics & Fee Structure",
      content: "Our platform uses gamified mechanics including iterations, cooldowns, message limits, and dynamic fee structures. Each game has specific parameters detailed in individual game documentation. Fees may vary per game and increase based on participation patterns."
    },
    {
      title: "4. User Requirements",
      content: "You must be at least 18 years old. You're responsible for your wallet security, submissions, and following local laws. We're not liable for lost funds due to user error."
    },
    {
      title: "5. Risks",
      content: "Crypto transactions are risky and irreversible. You may lose funds due to volatility, network issues, or user mistakes. Participate at your own risk."
    },
    {
      title: "6. Rewards",
      content: "Rewards are distributed according to game-specific mechanics and validation criteria. Payments are made in BNB but we may change currencies. Reward calculations follow predetermined formulas per game iteration. All blockchain transactions are final.",
      subsections: [
        { title: "6.1 Taxes", content: "You are solely responsible for reporting and paying any taxes related to rewards and platform use." }
      ]
    },
    {
      title: "7. Your Submissions",
      content: "You own your reports but give us rights to review and use them for security research. We can reject any submission. Our decisions on rewards are final."
    },
    {
      title: "8. Third-Party Services",
      content: "We use external services like blockchain networks and APIs. Their terms may apply and we're not responsible for their issues."
    },
    {
      title: "9. Platform Changes",
      content: "We can modify or suspend the platform anytime. Critical updates may happen without notice.",
      subsections: [
        { title: "9.1 Availability & Force Majeure", content: "Service may be unavailable due to maintenance, outages, or events beyond our control (force majeure). We disclaim liability for such unavailability." }
      ]
    },
    {
      title: "10. Prohibited Activities",
      content: "Don't submit false reports, exploit vulnerabilities maliciously, use bots, circumvent cooldown periods, manipulate game mechanics, break laws, or interfere with other users.",
      subsections: [
        { title: "10.1 Enforcement", content: "We may suspend or terminate accounts, withhold rewards, reverse benefits, or report unlawful activity to authorities for violations." }
      ]
    },
    {
      title: "11. Intellectual Property",
      content: "The platform is our property. You keep rights to your content but give us license to use it for platform operations."
    },
    {
      title: "12. Privacy",
      content: "See our Privacy Policy for data handling details. Blockchain data is public and permanent."
    },
    {
      title: "13. Disclaimers",
      content: "Platform provided 'as is' with no warranties. We're not liable for damages. Maximum liability is limited to recent rewards received."
    },
    {
      title: "14. Compliance (KYC/AML & Sanctions)",
      content: "We may request identity verification and screen users to comply with AML/CTF and sanctions laws. We may restrict or terminate access where required by law."
    },
    {
      title: "15. Termination",
      content: "We can terminate your access anytime for any or no reason. You keep already distributed rewards but lose platform access."
    },
    {
      title: "16. Changes",
      content: "We may update these Terms anytime. Continued use means acceptance of changes."
    },
    {
      title: "17. Disputes & Governing Law",
      content: "These Terms are governed by the laws of Delaware, USA.",
      subsections: [
        { title: "17.1 Arbitration", content: "All disputes will be resolved by binding individual arbitration seated in Delaware, USA. Class actions and jury trials are waived to the fullest extent permitted by law." }
      ]
    },
    {
      title: "18. Contact",
      content: "Questions? Contact hello@nerixai.com"
    }
  ]
};

export const PRIVACY_POLICY: LegalDocument = {
  title: "Privacy Policy",
  lastUpdated: "August 18, 2025",
  sections: [
    {
      title: "1. What We Collect",
      content: "We collect wallet addresses, security reports, game interactions, messages, email addresses, IP addresses, NFT ownership data, and usage analytics. We don't access your private keys or wallet funds."
    },
    {
      title: "2. Blockchain Data",
      content: "All blockchain transactions are public and permanent, including wallet addresses and transaction amounts. This data cannot be deleted."
    },
    {
      title: "3. How We Use Data",
      content: "To operate the platform, process game mechanics, distribute rewards, provide support, improve AI systems, analyze gaming patterns, prevent fraud/abuse, and comply with laws."
    },
    {
      title: "4. Legal Bases (GDPR)",
      content: "We process data based on: performance of a contract, legitimate interests (security, fraud prevention, product improvement), consent (where required), and legal obligations."
    },
    {
      title: "5. AI Training",
      content: "Your security reports and game interactions may help train our AI systems. Game messages and user behavior patterns are analyzed to improve platform mechanics. Avoid including personal data beyond what is necessary for validation."
    },
    {
      title: "6. Third-Party Processors",
      content: "We use wallet providers, blockchain nodes, cloud hosting, analytics, email and support tools. These vendors act as processors where applicable and are bound by contracts."
    },
    {
      title: "7. Data Security",
      content: "We use encryption and safeguards to protect data, but no system is 100% secure. Protect your private keys."
    },
    {
      title: "8. Cookies",
      content: "We use cookies for authentication, preferences, and analytics. You can control cookies in your browser or device settings."
    },
    {
      title: "9. Data Retention",
      content: "Blockchain data is permanent. Other data is retained for as long as needed for operations, legal compliance, or dispute resolution, then deleted or anonymized where feasible."
    },
    {
      title: "10. Your Rights",
      content: "Subject to your location: access, correction, deletion (where possible), restriction, objection, portability, and withdrawal of consent.",
      subsections: [
        { title: "10.1 CCPA", content: "California residents may request access, deletion, and opt-out of sale/share of personal information. We do not sell personal information; if we begin to share for targeted advertising, you can opt out." }
      ]
    },
    {
      title: "11. International Transfers",
      content: "Data may be processed in other countries. Where required, we rely on safeguards such as Standard Contractual Clauses (SCCs) or other lawful mechanisms."
    },
    {
      title: "12. Age Restrictions",
      content: "Platform is for users 18+. We do not knowingly collect personal data from children under 13."
    },
    {
      title: "13. Data Breaches",
      content: "We investigate incidents promptly and, where legally required, notify authorities and affected users without undue delay (e.g., within 72 hours under GDPR)."
    },
    {
      title: "14. Analytics",
      content: "We use gaming analytics and usage data to improve platform mechanics, game balance, and AI systems; data is anonymized or pseudonymized when feasible."
    },
    {
      title: "15. Communications",
      content: "We may contact you via email, platform notifications, or community channels. You can adjust preferences or unsubscribe where applicable."
    },
    {
      title: "16. Law Enforcement & Compliance",
      content: "We may disclose data to comply with laws, lawful requests, or to protect rights, safety, and security."
    },
    {
      title: "17. Policy Changes",
      content: "We may update this policy. Material changes will be announced. Continued use means acceptance."
    },
    {
      title: "18. Contact",
      content: "Privacy questions? Email hello@nerixai.com or contact us via Discord/Telegram."
    }
  ]
};