import React from 'react';
import { RotateCcw, CheckCircle2, ShieldAlert, XCircle, CreditCard, Clock, Truck, HelpCircle, Mail, Phone } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Returns() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <Breadcrumbs items={[{ label: 'Cancellation & Refund Policy' }]} />

      <div className="text-center my-8 sm:my-12 space-y-3">
        <span className="text-xs uppercase tracking-luxury text-brand-rose font-medium block">
          Client Care & Compliance
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-brand-navy font-normal">
          Cancellation & Refund Policy
        </h1>
        <p className="text-xs sm:text-sm text-brand-muted font-light max-w-xl mx-auto">
          At Lils Spun Boutique, we strive to ensure a transparent, fair, and seamless shopping experience. Please review our comprehensive cancellation, return, and refund terms below.
        </p>
      </div>

      <div className="space-y-8 bg-white p-6 sm:p-10 rounded-2xl border border-brand-border shadow-soft text-xs text-brand-text/85 leading-relaxed font-light">
        
        {/* SECTION 1: ORDER CANCELLATION */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-medium text-brand-navy flex items-center gap-2">
            <XCircle className="w-5 h-5 text-brand-rose" /> 1. Order Cancellation Policy
          </h2>
          <p>
            We understand that circumstances may change. We allow hassle-free order cancellations before your package is dispatched:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-brand-text/80 pl-1">
            <li>
              <strong>Cancellation Window:</strong> You may cancel your order within <strong>24 hours of placement</strong> or before the order has been dispatched from our boutique studio, whichever occurs earlier.
            </li>
            <li>
              <strong>How to Cancel:</strong> To cancel, email us at <a href="mailto:lilsspunboutique@gmail.com" className="text-brand-navy font-semibold underline decoration-brand-rose">lilsspunboutique@gmail.com</a> or message our WhatsApp concierge at <a href="https://wa.me/919778465361" className="text-brand-navy font-semibold underline decoration-brand-rose">+91 97784 65361</a> with your <strong>Order ID</strong> and cancellation request.
            </li>
            <li>
              <strong>Cancellation Refund:</strong> For successfully cancelled prepaid orders prior to dispatch, a <strong>100% full refund</strong> will be initiated immediately.
            </li>
            <li>
              <strong>Orders Already Dispatched:</strong> Once an order is handed over to our courier partner and a tracking number is generated, it cannot be cancelled directly. It may instead be processed under our standard 7-day return policy upon arrival.
            </li>
          </ul>
        </section>

        {/* SECTION 2: REFUND TIMELINE & MODE */}
        <section className="space-y-3 pt-6 border-t border-brand-border/60">
          <h2 className="font-serif text-xl font-medium text-brand-navy flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-brand-rose" /> 2. Refund Mode & Timelines
          </h2>
          <p>
            In compliance with Reserve Bank of India (RBI) guidelines and standard electronic payment regulations:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-xl bg-brand-ivory border border-brand-border space-y-2">
              <strong className="text-brand-navy block font-medium flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-brand-rose" /> Processing Timeframe
              </strong>
              <p className="text-[11px] text-brand-muted leading-relaxed">
                Once a returned item is received at our boutique atelier and completes quality inspection (within 24–48 hours), your refund will be approved and initiated.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-brand-ivory border border-brand-border space-y-2">
              <strong className="text-brand-navy block font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Mode of Credit
              </strong>
              <p className="text-[11px] text-brand-muted leading-relaxed">
                Refunds will be credited directly back to the <strong>original source of payment</strong> (Bank Account, UPI, Debit Card, or Credit Card). The amount will reflect in your account within <strong>5 to 7 business days</strong>, depending on your bank's clearing cycle.
              </p>
            </div>
          </div>
          <p className="text-[11px] text-brand-muted pt-1">
            * Note: For orders paid via Cash on Delivery (if applicable), refunds will be processed via direct NEFT/IMPS bank transfer or UPI upon customer providing verified bank account details.
          </p>
        </section>

        {/* SECTION 3: 7-DAY RETURN & EXCHANGE WINDOW */}
        <section className="space-y-3 pt-6 border-t border-brand-border/60">
          <h2 className="font-serif text-xl font-medium text-brand-navy flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-brand-rose" /> 3. 7-Day Returns & Exchanges
          </h2>
          <p>
            We take tremendous pride in the handcrafted quality of our traditional weaves and garments. If an item does not meet your expectations in sizing, fit, or drape, you are eligible for an exchange or refund within <strong>7 calendar days</strong> from the date of delivery.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/60 space-y-2">
              <strong className="text-emerald-900 flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" /> Eligible for Return / Exchange
              </strong>
              <ul className="list-disc list-inside space-y-1 text-emerald-800 text-[11px]">
                <li>Unstitched churidar materials & sarees with intact blouse pieces</li>
                <li>Standard size ready-made garments in original, unworn, unwashed condition</li>
                <li>Garments with original boutique brand tags, labels, and packaging intact</li>
                <li>Items reported within 7 days of verified courier delivery</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200/60 space-y-2">
              <strong className="text-rose-900 flex items-center gap-1.5 font-medium">
                <ShieldAlert className="w-4 h-4 text-rose-700" /> Non-Returnable Items
              </strong>
              <ul className="list-disc list-inside space-y-1 text-rose-800 text-[11px]">
                <li>Garments that have been custom-tailored, altered, or blouse-stitched to personal measurements</li>
                <li>Items with perfume, makeup, body lotion, or deodorant stains</li>
                <li>Items damaged due to improper hand-washing or disregard of care instructions</li>
                <li>Intimate accessories, nose rings, and earrings (due to hygiene standards)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 4: DAMAGED, TRANSIT FAULT OR INCORRECT ITEMS */}
        <section className="space-y-3 pt-6 border-t border-brand-border/60">
          <h2 className="font-serif text-xl font-medium text-brand-navy flex items-center gap-2">
            <Truck className="w-5 h-5 text-brand-rose" /> 4. Damaged, Defective, or Incorrect Deliveries
          </h2>
          <p>
            Each garment undergoes rigorous two-tier quality inspection before being sealed in protective boutique packaging. In the unlikely event that an item arrives damaged in transit or is incorrect:
          </p>
          <ul className="list-disc list-inside space-y-1 text-brand-text/80 pl-1">
            <li>
              Please notify us within <strong>48 hours of delivery</strong> by sending photos or a brief unboxing video to <a href="mailto:lilsspunboutique@gmail.com" className="text-brand-navy font-semibold underline decoration-brand-rose">lilsspunboutique@gmail.com</a> or WhatsApp <a href="https://wa.me/919778465361" className="text-brand-navy font-semibold underline decoration-brand-rose">+91 97784 65361</a>.
            </li>
            <li>
              We will arrange an immediate doorstep reverse courier pickup at zero additional cost to you.
            </li>
            <li>
              You may opt for a prompt <strong>free replacement piece</strong> or a <strong>100% full refund</strong> credited to your original payment method.
            </li>
          </ul>
        </section>

        {/* SECTION 5: STEP-BY-STEP RETURN PROCESS */}
        <section className="space-y-3 pt-6 border-t border-brand-border/60">
          <h2 className="font-serif text-xl font-medium text-brand-navy">
            5. Step-by-Step Return & Pickup Process
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-brand-text/85 pl-1">
            <li>
              <strong>Initiate Request:</strong> Contact our concierge at <strong>lilsspunboutique@gmail.com</strong> or call/WhatsApp <strong>+91 97474 46174</strong> / <strong>+91 97784 65361</strong> with your Order ID and reason for return.
            </li>
            <li>
              <strong>Verification & Reverse Pickup:</strong> Our team will confirm eligibility within 24 hours and schedule a reverse courier pickup from your delivery address.
            </li>
            <li>
              <strong>Secure Packing:</strong> Please place the item back into its original protective box or bag with all tags attached.
            </li>
            <li>
              <strong>Inspection & Refund Disbursement:</strong> Upon receipt and quality inspection at our Kollam boutique atelier, your refund or replacement will be processed within <strong>2 business days</strong>, crediting your original payment source within <strong>5 to 7 working days</strong>.
            </li>
          </ol>
        </section>

        {/* SECTION 6: PHYSICAL STUDIO ADDRESS & SUPPORT */}
        <section className="space-y-2 pt-6 border-t border-brand-border/60 bg-brand-ivory/60 p-5 rounded-xl border border-brand-border">
          <h3 className="font-serif text-base font-semibold text-brand-navy">
            Official Return & Boutique Studio Address:
          </h3>
          <p className="text-brand-navy font-medium">
            LILS SPUN BOUTIQUE<br />
            Sree Ram Ganesh Arcade, Residency Road, Asramam<br />
            Kollam, Kerala - 691002, India<br />
            Customer Support: +91 97474 46174 | WhatsApp: +91 97784 65361<br />
            Email: lilsspunboutique@gmail.com
          </p>
        </section>

      </div>
    </div>
  );
}
