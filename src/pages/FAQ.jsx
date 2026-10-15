import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles, AlertCircle } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

const faqData = [
  {
    category: 'Ordering & Sizing',
    questions: [
      {
        q: 'How do I choose the correct size for stitched Anarkalis and Salwar Suits?',
        a: 'Every product page features a detailed size guide with bust, waist, and hip measurements in inches. If you fall between two sizes, we recommend selecting the larger size, as all our stitched garments include generous 2-inch inner side margins for easy alterations.'
      },
      {
        q: 'Are the sarees unstitched or ready to drape?',
        a: 'Our sarees are 5.5 meters of authentic handwoven drape and come with an unstitched 0.8 meter matching blouse piece. Fall and pico edging can be requested with our boutique team upon order confirmation.'
      },
      {
        q: 'Can I request custom sleeve lengths or necklines?',
        a: 'Yes, for select festive and bridal suits, our boutique studio offers bespoke tailoring adjustments. Please contact us via our Contact page or WhatsApp stylist line before or immediately after placing your order.'
      }
    ]
  },
  {
    category: 'Craftsmanship & Authenticity',
    questions: [
      {
        q: 'How can I verify the purity of your silks and handlooms?',
        a: 'Our pure Kanjivaram and Banarasi sarees are sourced directly from traditional artisan clusters and carry Silk Mark verification standards. We provide specific yarn and zari disclosures on each product detail page.'
      },
      {
        q: 'Why do some handwoven pieces have minor slubs or variations?',
        a: 'Authentic handloom textiles are woven manually on wooden pit or shuttle looms. Slubs, minor unevenness in thread spacing, or tiny dye nuances are the hallmark of authentic human craftsmanship, distinguishing real handloom from industrial powerlooms.'
      }
    ]
  },
  {
    category: 'Shipping & Delivery (Sample Copy for Approval)',
    questions: [
      {
        q: 'What is the estimated dispatch and delivery timeline?',
        a: '[Sample Policy — Requires Client Approval] Ready-to-ship garments are dispatched within 24 to 48 business hours from our Kerala atelier. Standard domestic delivery takes 3 to 6 business days depending on destination pin code.'
      },
      {
        q: 'Do you offer international shipping?',
        a: '[Sample Policy — Requires Client Approval] Yes, we ship worldwide to over 50 countries via premium international courier partners with tracking. International delivery typically takes 6 to 10 working days.'
      }
    ]
  },
  {
    category: 'Returns & Exchanges (Sample Copy for Approval)',
    questions: [
      {
        q: 'What is your exchange and return policy?',
        a: '[Sample Policy — Requires Client Approval] We accept exchange requests within 7 days of delivery for unstitched sarees, dupattas, and standard size garments in original unworn condition with tags intact. Custom tailored garments are final sale.'
      },
      {
        q: 'How do I initiate an exchange?',
        a: '[Sample Policy — Requires Client Approval] Simply email concierge@lilsspunboutique.com with your order number and request. Our team will schedule a return pickup from your address.'
      }
    ]
  }
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (catIdx, qIdx) => {
    const key = `${catIdx}-${qIdx}`;
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <Breadcrumbs items={[{ label: 'Frequently Asked Questions' }]} />

      <div className="text-center my-8 sm:my-12 space-y-3">
        <span className="text-xs uppercase tracking-luxury text-brand-rose font-medium block">
          Client Support
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-navy font-normal">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-brand-muted font-light max-w-lg mx-auto">
          Answers to common questions regarding boutique sizing, weaving crafts, shipping, and styling services.
        </p>
      </div>

      {/* Client approval disclaimer alert */}
      <div className="mb-10 p-4 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold block">Design Prototype Note:</strong>
          All policies below are representative demo drafts prepared for presentation. Final timelines, return conditions, and guarantee terms will be customized according to Lils Spun Boutique’s official operational rules upon launch.
        </div>
      </div>

      {/* FAQ Accordion Groups */}
      <div className="space-y-10">
        {faqData.map((group, gIdx) => (
          <div key={gIdx} className="space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl text-brand-navy border-b border-brand-border/60 pb-2">
              {group.category}
            </h2>

            <div className="space-y-3">
              {group.questions.map((item, qIdx) => {
                const isOpen = openItems[`${gIdx}-${qIdx}`];
                return (
                  <div
                    key={qIdx}
                    className="bg-white rounded-xl border border-brand-border/80 shadow-soft overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(gIdx, qIdx)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 text-xs sm:text-sm font-medium text-brand-navy hover:text-brand-rose transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="font-serif text-base">{item.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-brand-muted shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-brand-navy' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 text-xs text-brand-text/85 leading-relaxed font-light border-t border-brand-border/40 pt-3 animate-in fade-in">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
