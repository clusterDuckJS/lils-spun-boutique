import React from 'react';
import { useLocation } from 'react-router-dom';
import { Shield, AlertTriangle, FileText } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

export default function LegalPage() {
  const location = useLocation();
  const isPrivacy = location.pathname.includes('privacy');

  const title = isPrivacy ? 'Privacy Policy' : 'Terms & Conditions';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <Breadcrumbs items={[{ label: title }]} />

      <div className="text-center my-8 sm:my-12 space-y-3">
        <span className="text-xs uppercase tracking-luxury text-brand-rose font-medium block">
          Legal Framework Placeholder
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-brand-navy font-normal">
          {title}
        </h1>
        <p className="text-xs sm:text-sm text-brand-muted font-light max-w-lg mx-auto">
          Sample legal boilerplate draft for Lils Spun Boutique design prototype.
        </p>
      </div>

      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 mb-8 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-semibold">Important Disclaimer:</strong>
          This document is a placeholder generated solely for layout and UX presentation. It does not constitute verified legal advice or approved operational terms for Lils Spun Boutique. The brand owner and legal counsel should review and replace this before commercial deployment.
        </div>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-2xl border border-brand-border shadow-soft space-y-6 text-xs text-brand-text/85 leading-relaxed font-light">
        {isPrivacy ? (
          <>
            <section className="space-y-2">
              <h2 className="font-serif text-lg font-medium text-brand-navy">1. Information Collection (Prototype Draft)</h2>
              <p>
                In this prototype, no personal information, payment card details, or sensitive user data are collected, saved to cloud databases, or shared with third parties. Form entries reside solely in frontend client memory or local browser storage.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-medium text-brand-navy">2. Local Storage Usage</h2>
              <p>
                The prototype uses standard browser localStorage to remember your shopping bag garments and saved wishlist favourites during page refreshes. You can clear this data at any time through your browser settings.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-medium text-brand-navy">3. Communication & Consent</h2>
              <p>
                Email subscriptions submitted in the newsletter or contact forms in this demo do not trigger external marketing transmissions. Official communications policies will be instituted upon production launch.
              </p>
            </section>
          </>
        ) : (
          <>
            <section className="space-y-2">
              <h2 className="font-serif text-lg font-medium text-brand-navy">1. Acceptance of Prototype Terms</h2>
              <p>
                By navigating this website prototype, you acknowledge that you are interacting with a frontend design concept for Lils Spun Boutique. All products, prices, and inventory representations are sample data created for client approval.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-medium text-brand-navy">2. Intellectual Property & Brand Assets</h2>
              <p>
                The Lils Spun Boutique logo, trademark crescent botanical emblem, and storefront imagery are the intellectual property of the brand owner. Sample product photography is credited to high-resolution editorial fashion contributors on Unsplash.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-medium text-brand-navy">3. Limitation of Liability</h2>
              <p>
                No binding commercial transactions or financial liabilities are incurred through the use of this interactive prototype.
              </p>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
