'use client';

import Script from 'next/script';
import { GTM_ID, defaultConsent } from '@/lib/gtm';

export function GTMScript() {
  return (
    <>
      {/* Google Tag Manager - Consent Mode v2 */}
      <Script
        id="gtm-consent-init"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            // Set default consent state
            gtag('consent', 'default', ${JSON.stringify(defaultConsent)});
            
            // Enhanced Ecommerce and other configurations
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
              send_page_view: false,
              allow_google_signals: false,
              allow_ad_personalization_signals: false
            });
          `,
        }}
      />
      
      {/* Google Tag Manager */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
      />
      
      {/* GTM NoScript fallback */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  );
}
