import React from 'react';
import { RotateCcw, AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Returns() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <Breadcrumbs items={[{ label: 'Returns & Exchanges' }]} />

      <div className="text-center my-8 sm:my-12 space-y-3">
        <span className="text-xs uppercase tracking-luxury text-brand-rose font-medium block">
          Client Care
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-brand-navy font-normal">
          Returns & Exchanges
        </h1>
        <p className="text-xs sm:text-sm text-brand-muted font-light max-w-lg mx-auto">
          Our commitment to your complete satisfaction with your ethnic wear selection.
        </p>
      </div>

      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 mb-8 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <p>
          <strong>Demo Placeholder Notice:</strong> This return policy draft is prepared for prototype demonstration. Final terms, refund mechanisms, and return shipping logistics will be defined by the client prior to storefront launch.
        </p>
      </div>

      <div className="space-y-8 bg-white p-6 sm:p-10 rounded-2xl border border-brand-border shadow-soft text-xs text-brand-text/85 leading-relaxed font-light">
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-medium text-brand-navy flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-brand-rose" /> 7-Day Exchange Window
          </h2>
          <p>
            If a garment does not meet your expectations in sizing or drape, you may initiate an exchange or request store credit within 7 calendar days of receipt.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/60 space-y-2">
              <strong className="text-emerald-900 flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" /> Eligible for Exchange
              </strong>
              <ul className="list-disc list-inside space-y-1 text-emerald-800 text-[11px]">
                <li>Unstitched sarees with intact blouse pieces</li>
                <li>Standard size suits in original unworn condition</li>
                <li>Original boutique tags and fabric seals attached</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200/60 space-y-2">
              <strong className="text-rose-900 flex items-center gap-1.5 font-medium">
                <ShieldAlert className="w-4 h-4 text-rose-700" /> Non-Returnable Items
              </strong>
              <ul className="list-disc list-inside space-y-1 text-rose-800 text-[11px]">
                <li>Garments altered or stitched to custom measurements</li>
                <li>Intimate wear, nose rings, and earrings (hygiene rules)</li>
                <li>Items with perfume, makeup, or deodorant marks</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-3 pt-6 border-t border-brand-border/60">
          <h2 className="font-serif text-xl font-medium text-brand-navy">
            How to Request an Exchange
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-brand-text/85 pl-1">
            <li>Contact our concierge team via our Contact page or at <strong>concierge@lilsspunboutique.com</strong> with your order reference.</li>
            <li>Our team will verify eligibility and schedule a reverse courier collection at your doorstep.</li>
            <li>Once inspected at our atelier, your replacement piece or store credit note will be issued within 48 hours.</li>
          </ol>
        </section>
      </div>
    </div>
  );
}
