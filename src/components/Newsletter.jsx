import React, { useState } from 'react';
import { Mail, CheckCircle2, Sparkles } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Client-side email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError('Please provide a valid email address.');
      return;
    }

    // Demo success state
    setIsSubmitted(true);
  };

  return (
    <section className="py-16 sm:py-20 bg-brand-ivory border-t border-b border-brand-border/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-blush/40 border border-brand-blush text-brand-rose-dark text-xs uppercase tracking-luxury font-medium mb-4">
          <Sparkles className="w-3.5 h-3.5 text-brand-rose" />
          <span>Lils Spun Journal</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy font-normal mb-3">
          A Little Elegance in Your Inbox
        </h2>
        <p className="text-sm text-brand-muted max-w-lg mx-auto mb-8 font-light">
          Receive privileged previews of our newest artisanal arrivals, seasonal styling guides, and festive curation stories.
        </p>

        {isSubmitted ? (
          <div className="p-6 bg-white rounded-2xl border border-brand-champagne/40 shadow-soft max-w-md mx-auto animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 mx-auto flex items-center justify-center mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-lg text-brand-navy font-medium mb-1">
              Welcome to the Lils Spun Family
            </h4>
            <p className="text-xs text-brand-muted leading-relaxed">
              Thank you for subscribing! In this design prototype, your email <strong className="text-brand-navy">{email}</strong> has been received locally.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setEmail('');
              }}
              className="mt-4 text-xs text-brand-rose hover:underline font-medium"
            >
              Sign up with another email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="relative flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Mail className="w-5 h-5 text-brand-muted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter your email address"
                  className="w-full bg-white border border-brand-border rounded-full pl-12 pr-4 py-3.5 text-sm text-brand-text placeholder:text-brand-muted/70 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy shadow-soft transition-all"
                />
              </div>
              <button
                type="submit"
                className="px-7 py-3.5 bg-brand-navy hover:bg-brand-navy-light text-brand-ivory rounded-full text-xs uppercase tracking-widest font-semibold shrink-0 shadow-card transition-all"
              >
                Subscribe
              </button>
            </div>
            {error && (
              <p className="text-xs text-red-600 mt-2 font-medium text-left pl-4">
                {error}
              </p>
            )}
            <p className="text-[11px] text-brand-muted/80 mt-3 font-light">
              By subscribing, you agree to receive prototype updates. No spam, ever.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
