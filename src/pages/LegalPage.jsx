import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Shield, FileText, CheckCircle2, Lock, Scale, Building, Mail, Phone, MapPin } from 'lucide-react';
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
          Lils Spun Boutique &bull; Compliance
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-brand-navy font-normal">
          {title}
        </h1>
        <p className="text-xs sm:text-sm text-brand-muted font-light max-w-xl mx-auto">
          {isPrivacy
            ? 'Our transparent commitment to protecting your personal information, payment security, and data rights.'
            : 'Terms governing the purchase, browsing experience, and order fulfillment at Lils Spun Boutique.'}
        </p>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-2xl border border-brand-border shadow-soft space-y-8 text-xs text-brand-text/85 leading-relaxed font-light">
        {isPrivacy ? (
          <>
            {/* PRIVACY POLICY */}
            <div className="p-4 bg-brand-ivory rounded-xl border border-brand-border text-brand-muted text-[11px] leading-relaxed">
              <strong>Last Updated:</strong> November 2026. This Privacy Policy applies to the online platform of <strong>LILS SPUN BOUTIQUE</strong> (<a href="https://lilsspunboutique.in" className="text-brand-navy underline">lilsspunboutique.in</a>) and complies with the Information Technology Act, 2000 and the Consumer Protection (E-Commerce) Rules, 2020.
            </div>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-medium text-brand-navy flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-rose" /> 1. Information We Collect
              </h2>
              <p>
                To process your orders, arrange doorstep courier delivery, and provide personalized styling assistance, we collect information you voluntarily provide, including:
              </p>
              <ul className="list-disc list-inside space-y-1 text-brand-muted pl-1">
                <li>Personal Identity Data: Full name, patron title.</li>
                <li>Contact Information: Operational phone number (for courier SMS updates), email address.</li>
                <li>Delivery & Billing Details: Complete postal shipping address with pincode and state.</li>
                <li>Transaction Records: Garments ordered, order reference numbers, and transaction statuses.</li>
              </ul>
            </section>

            <section className="space-y-2 pt-4 border-t border-brand-border/60">
              <h2 className="font-serif text-lg font-medium text-brand-navy flex items-center gap-2">
                <Lock className="w-4 h-4 text-brand-rose" /> 2. Payment Security & Zero Card Data Storage
              </h2>
              <p>
                We do <strong>NOT</strong> collect, store, or process your credit/debit card numbers, CVVs, expiration dates, or net banking passwords on our servers.
              </p>
              <p>
                All online transactions are processed through authorized, PCI-DSS Level 1 compliant payment gateways (such as Razorpay / Cashfree / PayU). Transactions are protected using industry-standard <strong>256-bit Secure Sockets Layer (SSL) encryption</strong> to guarantee absolute confidentiality.
              </p>
            </section>

            <section className="space-y-2 pt-4 border-t border-brand-border/60">
              <h2 className="font-serif text-lg font-medium text-brand-navy">
                3. Purpose and Use of Collected Information
              </h2>
              <p>
                Your personal information is utilized strictly for lawful business purposes:
              </p>
              <ul className="list-disc list-inside space-y-1 text-brand-muted pl-1">
                <li>Processing, packing, and dispatching orders from our boutique atelier in Kollam, Kerala.</li>
                <li>Sharing delivery coordinates with trusted logistics partners (Blue Dart, Delhivery, DTDC, India Post) for shipment tracking.</li>
                <li>Communicating order status confirmations, invoices, and delivery notifications.</li>
                <li>Responding to customer support, exchange requests, and styling consultations.</li>
              </ul>
              <p>
                We maintain a strict zero-spam policy: we never sell, rent, or trade your contact information to third-party marketing agencies.
              </p>
            </section>

            <section className="space-y-2 pt-4 border-t border-brand-border/60">
              <h2 className="font-serif text-lg font-medium text-brand-navy">
                4. Cookies & Web Analytics
              </h2>
              <p>
                Our website utilizes essential functional cookies to keep track of items placed in your shopping bag, preserve session authentication, and analyze general site traffic to enhance browsing speed. You can configure your browser to decline cookies, though certain shopping cart features may require cookies to function properly.
              </p>
            </section>

            {/* GRIEVANCE REDRESSAL (MANDATORY UNDER E-COMMERCE RULES) */}
            <section className="space-y-3 pt-4 border-t border-brand-border/60 bg-brand-ivory/60 p-5 rounded-xl border border-brand-border">
              <h2 className="font-serif text-lg font-medium text-brand-navy flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-700" /> 5. Grievance Redressal Officer
              </h2>
              <p>
                In accordance with the Information Technology Act, 2000 and the Consumer Protection (E-Commerce) Rules, 2020, the contact details of the designated Grievance Officer for Lils Spun Boutique are provided below:
              </p>
              <div className="text-brand-navy text-xs leading-relaxed space-y-1">
                <p><strong>Designation:</strong> Grievance Redressal & Compliance Officer</p>
                <p><strong>Entity Name:</strong> LILS SPUN BOUTIQUE</p>
                <p><strong>Physical Studio:</strong> Sree Ram Ganesh Arcade, Residency Road, Asramam, Kollam, Kerala - 691002, India</p>
                <p><strong>Email:</strong> <a href="mailto:lilsspunboutique@gmail.com" className="text-brand-navy font-semibold underline">lilsspunboutique@gmail.com</a></p>
                <p><strong>Telephone:</strong> <a href="tel:+919747446174" className="text-brand-navy font-semibold underline">+91 97474 46174</a></p>
                <p><strong>Turnaround Timelines:</strong> Acknowledgment within 48 hours; resolution within 30 days from receipt of grievance.</p>
              </div>
            </section>
          </>
        ) : (
          <>
            {/* TERMS AND CONDITIONS */}
            <div className="p-4 bg-brand-ivory rounded-xl border border-brand-border text-brand-muted text-[11px] leading-relaxed">
              <strong>Last Updated:</strong> November 2026. These Terms & Conditions govern the purchase of products and use of services provided by <strong>LILS SPUN BOUTIQUE</strong> (<a href="https://lilsspunboutique.in" className="text-brand-navy underline">lilsspunboutique.in</a>). By accessing our website or placing an order, you agree to be bound by these terms.
            </div>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-medium text-brand-navy flex items-center gap-2">
                <Building className="w-4 h-4 text-brand-rose" /> 1. Merchant Identity & Business Model
              </h2>
              <p>
                <strong>LILS SPUN BOUTIQUE</strong> is a premium Indian ethnic wear fashion boutique operating from its flagship studio located at <strong>Sree Ram Ganesh Arcade, Residency Road, Asramam, Kollam, Kerala - 691002, India</strong>.
              </p>
              <p>
                We retail curated traditional Indian ethnic wear including ready-made suits and gowns, unstitched churidar materials, festive sarees, and kids ethnic wear.
              </p>
            </section>

            <section className="space-y-2 pt-4 border-t border-brand-border/60">
              <h2 className="font-serif text-lg font-medium text-brand-navy">
                2. Product Authenticity & Handloom Nuances
              </h2>
              <p>
                All traditional Indian ethnic garments, handlooms, and embroideries presented on our website are curated with authentic artisanal craftsmanship. Due to the natural characteristics of hand-weaving and handcrafted embroideries, subtle variations in texture, yarn slubs, or dye depth are authentic hallmarks of genuine human craft, rather than manufacturing defects.
              </p>
            </section>

            <section className="space-y-2 pt-4 border-t border-brand-border/60">
              <h2 className="font-serif text-lg font-medium text-brand-navy flex items-center gap-2">
                <Lock className="w-4 h-4 text-brand-rose" /> 3. Pricing, Taxes & Payment Gateway Terms
              </h2>
              <p>
                All prices displayed on the website are listed in <strong>Indian Rupees (INR)</strong> and are <strong>inclusive of applicable Goods and Services Tax (GST)</strong>.
              </p>
              <p>
                Payment can be made through authorized electronic payment methods including UPI (Google Pay, PhonePe, Paytm), Net Banking, RuPay, Visa, and Mastercard via our secure payment gateway partner. The order will be confirmed upon successful payment authorization.
              </p>
            </section>

            <section className="space-y-2 pt-4 border-t border-brand-border/60">
              <h2 className="font-serif text-lg font-medium text-brand-navy">
                4. Shipping, Cancellation & Refund Policies
              </h2>
              <p>
                All orders are fulfilled subject to our dedicated policies:
              </p>
              <ul className="list-disc list-inside space-y-1 text-brand-muted pl-1">
                <li>
                  Orders are dispatched within 24 to 48 hours and delivered within 3 to 7 business days across India. Please review our full <Link to="/pages/shipping" className="text-brand-navy font-semibold underline">Shipping & Delivery Policy</Link>.
                </li>
                <li>
                  Orders may be cancelled within 24 hours of placement or prior to courier dispatch. Eligible returns are accepted within 7 days of delivery, and approved refunds are credited back to the original payment source within 5 to 7 working days. Please review our full <Link to="/pages/returns" className="text-brand-navy font-semibold underline">Cancellation & Refund Policy</Link>.
                </li>
              </ul>
            </section>

            <section className="space-y-2 pt-4 border-t border-brand-border/60">
              <h2 className="font-serif text-lg font-medium text-brand-navy">
                5. Intellectual Property
              </h2>
              <p>
                All content, brand emblems, crescent botanical illustrations, photographs, website design, and typography are the exclusive intellectual property of <strong>Lils Spun Boutique</strong>. No portion of this site may be duplicated, reproduced, or exploited for commercial purposes without prior written authorization.
              </p>
            </section>

            {/* JURISDICTION & GOVERNING LAW (MANDATORY FOR GATEWAYS) */}
            <section className="space-y-2 pt-4 border-t border-brand-border/60 bg-brand-ivory/60 p-5 rounded-xl border border-brand-border">
              <h2 className="font-serif text-lg font-medium text-brand-navy flex items-center gap-2">
                <Scale className="w-4 h-4 text-brand-rose" /> 6. Governing Law & Legal Jurisdiction
              </h2>
              <p className="text-brand-navy text-xs leading-relaxed">
                These Terms and Conditions and any transactions concluded through this website shall be governed by and construed in accordance with the laws of <strong>India</strong>. Any disputes, claims, or proceedings arising out of or in connection with this website shall be subject to the exclusive jurisdiction of the competent courts in <strong>Kollam, Kerala, India</strong>.
              </p>
            </section>

            {/* CONTACT & GRIEVANCE */}
            <section className="space-y-2 pt-4 border-t border-brand-border/60">
              <h2 className="font-serif text-base font-semibold text-brand-navy">
                7. Boutique Registered Contact Information
              </h2>
              <p className="text-brand-muted text-xs leading-relaxed">
                <strong>LILS SPUN BOUTIQUE</strong><br />
                Sree Ram Ganesh Arcade, Residency Road, Asramam<br />
                Kollam, Kerala - 691002, India<br />
                Telephone: +91 97474 46174 | WhatsApp: +91 97784 65361<br />
                Email: lilsspunboutique@gmail.com
              </p>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
