import React from 'react';
import { Truck, Clock, ShieldCheck, Package, MapPin, Mail, Phone, CheckCircle2 } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Shipping() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <Breadcrumbs items={[{ label: 'Shipping & Delivery Policy' }]} />

      <div className="text-center my-8 sm:my-12 space-y-3">
        <span className="text-xs uppercase tracking-luxury text-brand-rose font-medium block">
          Client Care & Logistics
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-brand-navy font-normal">
          Shipping & Delivery Policy
        </h1>
        <p className="text-xs sm:text-sm text-brand-muted font-light max-w-xl mx-auto">
          We ensure that every handcrafted ethnic garment from Lils Spun Boutique reaches you swiftly, securely, and in pristine condition.
        </p>
      </div>

      <div className="space-y-8 bg-white p-6 sm:p-10 rounded-2xl border border-brand-border shadow-soft text-xs text-brand-text/85 leading-relaxed font-light">
        
        {/* SECTION 1: DOMESTIC SHIPPING TIMELINES */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-medium text-brand-navy flex items-center gap-2">
            <Truck className="w-5 h-5 text-brand-rose" /> 1. Domestic Delivery Timelines (Across India)
          </h2>
          <p>
            We ship to all serviceable postal pin codes across India through premier courier partners including <strong>Blue Dart, Delhivery, DTDC, and India Post Speed Post</strong>.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-xl bg-brand-ivory border border-brand-border space-y-1.5">
              <strong className="text-brand-navy block font-medium flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-brand-rose" /> Order Processing & Dispatch
              </strong>
              <p className="text-[11px] text-brand-muted leading-relaxed">
                Ready-to-wear garments and unstitched fabrics are dispatched from our Kerala atelier within <strong>24 to 48 business hours</strong> of order verification.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-brand-ivory border border-brand-border space-y-1.5">
              <strong className="text-brand-navy block font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Transit & Delivery Time
              </strong>
              <p className="text-[11px] text-brand-muted leading-relaxed">
                Standard transit time is <strong>3 to 7 business days</strong> depending on your destination city and delivery pin code (metro cities usually receive deliveries within 2 to 4 days).
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: SHIPPING CHARGES */}
        <section className="space-y-3 pt-6 border-t border-brand-border/60">
          <h2 className="font-serif text-xl font-medium text-brand-navy flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-rose" /> 2. Transparent Shipping Rates
          </h2>
          <ul className="list-disc list-inside space-y-2 text-brand-text/80 pl-1">
            <li>
              <strong>Complimentary Shipping:</strong> We offer <strong>FREE standard delivery</strong> on all orders of <strong>₹4,999 and above</strong> anywhere in India.
            </li>
            <li>
              <strong>Standard Shipping Fee:</strong> For orders below ₹4,999, a nominal flat shipping fee of <strong>₹250</strong> is applied at checkout to cover insured express handling and secure transit.
            </li>
            <li>
              <strong>No Hidden Charges:</strong> All prices displayed on our website are inclusive of applicable Goods and Services Tax (GST).
            </li>
          </ul>
        </section>

        {/* SECTION 3: ORDER TRACKING */}
        <section className="space-y-3 pt-6 border-t border-brand-border/60">
          <h2 className="font-serif text-xl font-medium text-brand-navy flex items-center gap-2">
            <Package className="w-5 h-5 text-brand-rose" /> 3. Order Tracking & Notifications
          </h2>
          <p>
            Once your order is handed over to our courier partners, an automated notification containing your <strong>Air Waybill (AWB) Tracking Number</strong> and direct tracking URL will be sent to your registered email address and mobile phone number via SMS/WhatsApp.
          </p>
          <p>
            You can also track your orders at any time by signing into your account under <strong>My Patron Account &gt; Track My Orders</strong>.
          </p>
        </section>

        {/* SECTION 4: PACKAGING & TRANSIT SAFETY */}
        <section className="space-y-3 pt-6 border-t border-brand-border/60">
          <h2 className="font-serif text-xl font-medium text-brand-navy">
            4. Bespoke Boutique Packaging & Transit Protection
          </h2>
          <p>
            Delicate silk sarees, churidar materials, and ready-made ethnic garments require meticulous care. Every piece is wrapped in acid-free tissue paper and enclosed in signature, tamper-evident outer packaging to ensure complete protection against humidity, dust, and handling damage during transit.
          </p>
        </section>

        {/* SECTION 5: DISPATCH ATELIER & CONTACT */}
        <section className="space-y-2 pt-6 border-t border-brand-border/60 bg-brand-ivory/60 p-5 rounded-xl border border-brand-border">
          <h3 className="font-serif text-base font-semibold text-brand-navy">
            Atelier Dispatch & Logistics Queries:
          </h3>
          <p className="text-brand-navy font-medium">
            LILS SPUN BOUTIQUE<br />
            Sree Ram Ganesh Arcade, Residency Road, Asramam<br />
            Kollam, Kerala - 691002, India<br />
            Telephone: +91 97474 46174 | WhatsApp: +91 97784 65361<br />
            Email: lilsspunboutique@gmail.com
          </p>
        </section>

      </div>
    </div>
  );
}
