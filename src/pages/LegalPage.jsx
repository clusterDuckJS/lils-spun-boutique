import React from 'react';
import { useLocation } from 'react-router-dom';
import { Shield, FileText } from 'lucide-react';
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
          Lils Spun Boutique
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-brand-navy font-normal">
          {title}
        </h1>
        <p className="text-xs sm:text-sm text-brand-muted font-light max-w-lg mx-auto">
          {isPrivacy
            ? 'Our commitment to protecting your personal information and privacy.'
            : 'Terms governing the purchase and browsing experience at Lils Spun Boutique.'}
        </p>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-2xl border border-brand-border shadow-soft space-y-6 text-xs text-brand-text/85 leading-relaxed font-light">
        {isPrivacy ? (
          <>
            <section className="space-y-2">
              <h2 className="font-serif text-lg font-medium text-brand-navy">1. Information We Collect</h2>
              <p>
                When you visit Lils Spun Boutique, create an account, or place an order, we collect details necessary to process your purchase and deliver an elevated boutique experience. This includes your name, contact phone number, delivery address, and email.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-medium text-brand-navy">2. How We Use Your Information</h2>
              <p>
                Your details are used exclusively to process orders, coordinate courier dispatch from our Kerala studio, provide delivery tracking, and send tailored styling assistance when requested. We never sell or share your personal data with third-party marketers.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-medium text-brand-navy">3. Security & Storage</h2>
              <p>
                We employ industry-standard encryption and secure cloud infrastructure to safeguard your account and transaction details. Payment transactions are processed through authenticated and compliant payment gateways.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-medium text-brand-navy">4. Contacting Our Concierge</h2>
              <p>
                If you have inquiries regarding your personal data or wish to update your records, please contact us at <strong>lilsspunboutique@gmail.com</strong> or call <strong>+91 97474 46174</strong>.
              </p>
            </section>
          </>
        ) : (
          <>
            <section className="space-y-2">
              <h2 className="font-serif text-lg font-medium text-brand-navy">1. Handcrafted Garment Authenticity</h2>
              <p>
                All traditional Indian ethnic wear, sarees, and suits offered at Lils Spun Boutique are sourced and curated with the highest standards of craftsmanship. Due to the genuine nature of handloom and artisanal weaving, subtle nuances in texture, zari reflection, or thread weave are authentic signatures of handcrafting.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-medium text-brand-navy">2. Orders & Pricing</h2>
              <p>
                All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes. In the event of inadvertent typographical errors in pricing or product descriptions, the boutique reserves the right to correct the details and confirm with the customer before processing.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-medium text-brand-navy">3. Intellectual Property</h2>
              <p>
                The Lils Spun Boutique name, crescent botanical emblem, and editorial photography are the intellectual property of Lils Spun Boutique. Unauthorized reproduction or commercial use is strictly prohibited.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-medium text-brand-navy">4. Boutique Studio Information</h2>
              <p>
                Lils Spun Boutique, Sree Ram Ganesh Arcade, Residency Road, Asramam. For customer care, call <strong>+91 97474 46174</strong> or WhatsApp <strong>+91 97784 65361</strong>.
              </p>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
