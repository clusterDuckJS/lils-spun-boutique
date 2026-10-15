import React from 'react';
import { Truck, Clock, ShieldCheck, AlertCircle, Package } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Shipping() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <Breadcrumbs items={[{ label: 'Shipping Information' }]} />

      <div className="text-center my-8 sm:my-12 space-y-3">
        <span className="text-xs uppercase tracking-luxury text-brand-rose font-medium block">
          Client Care
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-brand-navy font-normal">
          Shipping & Delivery Information
        </h1>
        <p className="text-xs sm:text-sm text-brand-muted font-light max-w-lg mx-auto">
          Every piece is carefully wrapped in protective boutique packaging to ensure flawless arrival.
        </p>
      </div>

      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 mb-8 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <p>
          <strong>Demo Placeholder Notice:</strong> The rates, timelines, and carrier details below are editable mock content prepared for client review and final configuration.
        </p>
      </div>

      <div className="space-y-8 bg-white p-6 sm:p-10 rounded-2xl border border-brand-border shadow-soft text-xs text-brand-text/85 leading-relaxed font-light">
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-medium text-brand-navy flex items-center gap-2">
            <Truck className="w-5 h-5 text-brand-rose" /> Domestic Shipping (Across India)
          </h2>
          <p>
            We offer complimentary standard domestic shipping across all serviceable Indian pincodes on orders above ₹4,999. For orders below this threshold, a nominal flat delivery charge of ₹250 is applied at checkout.
          </p>
          <ul className="list-disc list-inside space-y-1 text-brand-muted pt-1">
            <li><strong>Dispatch Window:</strong> Ready-to-wear items dispatch within 24 to 48 hours.</li>
            <li><strong>Transit Time:</strong> Metro cities: 2 to 4 business days. Non-metro regions: 4 to 7 business days.</li>
            <li><strong>Tracking:</strong> Real-time SMS and email tracking links are sent upon courier handover.</li>
          </ul>
        </section>

        <section className="space-y-3 pt-6 border-t border-brand-border/60">
          <h2 className="font-serif text-xl font-medium text-brand-navy flex items-center gap-2">
            <Package className="w-5 h-5 text-brand-rose" /> Boutique Packaging
          </h2>
          <p>
            All sarees, dupattas, and heavy lehengas are wrapped in acid-free tissue and encased in signature Lils Spun presentation boxes to guard against transit humidity and snagging.
          </p>
        </section>

        <section className="space-y-3 pt-6 border-t border-brand-border/60">
          <h2 className="font-serif text-xl font-medium text-brand-navy flex items-center gap-2">
            <Clock className="w-5 h-5 text-brand-rose" /> Made-to-Order & Custom Garments
          </h2>
          <p>
            Pieces requiring custom blouse stitching or made-to-measure alterations generally require an additional 7 to 10 production days prior to courier dispatch.
          </p>
        </section>
      </div>
    </div>
  );
}
