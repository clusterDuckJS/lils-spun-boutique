import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, CheckCircle2, Send, Sparkles } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Styling Assistance',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your name.';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please provide a message with at least 10 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <Breadcrumbs items={[{ label: 'Contact Us' }]} />

      <div className="max-w-3xl mx-auto text-center my-8 sm:my-12">
        <span className="text-xs uppercase tracking-luxury text-brand-rose font-medium block mb-2">
          Boutique Concierge
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-brand-navy font-normal mb-3">
          We Would Love to Assist You
        </h1>
        <p className="text-xs sm:text-sm text-brand-muted font-light max-w-lg mx-auto">
          For styling consultations, fabric inquiries, bespoke sizing, or boutique visits, connect with our friendly boutique specialists.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-12 items-start">
        
        {/* Contact Info & Flagship Details (5 cols on lg) */}
        <div className="lg:col-span-5 bg-brand-navy text-brand-ivory p-8 sm:p-10 rounded-3xl shadow-card space-y-8">
          <div>
            <span className="text-xs uppercase tracking-luxury text-brand-champagne font-semibold block mb-1">
              Boutique Studio
            </span>
            <h2 className="font-serif text-2xl font-normal text-brand-ivory">
              Lils Spun Boutique
            </h2>
            <p className="text-xs text-brand-ivory/70 mt-2 leading-relaxed">
              Experience our curated weaves and personal styling in our signature studio atmosphere.
            </p>
          </div>

          <div className="space-y-5 text-xs text-brand-ivory/80">
            <div className="flex items-start gap-3.5">
              <MapPin className="w-5 h-5 text-brand-champagne shrink-0 mt-0.5" />
              <div>
                <strong className="text-brand-ivory block font-medium">Boutique Address</strong>
                <p className="mt-0.5 text-brand-ivory/70">
                  Lils Spun Boutique, Flagship Studio, Kerala, India (Placeholder location)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Phone className="w-5 h-5 text-brand-champagne shrink-0 mt-0.5" />
              <div>
                <strong className="text-brand-ivory block font-medium">Telephone & WhatsApp</strong>
                <p className="mt-0.5 text-brand-ivory/70">
                  +91 (Demo Prototype Contact Number)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Mail className="w-5 h-5 text-brand-champagne shrink-0 mt-0.5" />
              <div>
                <strong className="text-brand-ivory block font-medium">Email Inquiries</strong>
                <p className="mt-0.5 text-brand-ivory/70">
                  concierge@lilsspunboutique.com (Demo)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Clock className="w-5 h-5 text-brand-champagne shrink-0 mt-0.5" />
              <div>
                <strong className="text-brand-ivory block font-medium">Visiting Hours</strong>
                <p className="mt-0.5 text-brand-ivory/70">
                  Monday to Saturday: 10:00 AM – 7:30 PM IST<br />
                  Sunday: By prior styling appointment
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-brand-navy-light/60 text-[11px] text-brand-champagne/80">
            Note: All contact details above are placeholder entries for client presentation and review.
          </div>
        </div>

        {/* Interactive Demo Contact Form (7 cols on lg) */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-brand-border shadow-soft">
          {isSubmitted ? (
            <div className="py-12 text-center space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl text-brand-navy font-medium">
                Thank You for Reaching Out
              </h3>
              <p className="text-xs sm:text-sm text-brand-muted max-w-md mx-auto leading-relaxed">
                Your message has been captured in this frontend prototype demo. In the live website, our boutique team will respond within 24 hours.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: 'Styling Assistance',
                    message: ''
                  });
                }}
                className="mt-4 px-6 py-2.5 bg-brand-navy text-brand-ivory rounded-full text-xs uppercase tracking-widest font-semibold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <h2 className="font-serif text-xl font-medium text-brand-navy mb-4">
                Send a Message
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand-navy font-medium mb-1">Your Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Maya Nair"
                    className="w-full bg-brand-ivory/60 border border-brand-border rounded-xl p-3 text-xs text-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy"
                  />
                  {errors.name && <p className="text-red-600 text-[11px] mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-brand-navy font-medium mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. maya@example.com"
                    className="w-full bg-brand-ivory/60 border border-brand-border rounded-xl p-3 text-xs text-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy"
                  />
                  {errors.email && <p className="text-red-600 text-[11px] mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand-navy font-medium mb-1">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-brand-ivory/60 border border-brand-border rounded-xl p-3 text-xs text-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy"
                  />
                </div>

                <div>
                  <label className="block text-brand-navy font-medium mb-1">Inquiry Topic</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-brand-ivory/60 border border-brand-border rounded-xl p-3 text-xs text-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy"
                  >
                    <option value="Styling Assistance">Styling & Sizing Consultation</option>
                    <option value="Custom Order">Bespoke / Custom Stitching</option>
                    <option value="Order Status">Order Tracking & Dispatch</option>
                    <option value="Boutique Visit">Visiting the Kerala Studio</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-brand-navy font-medium mb-1">Your Message *</label>
                <textarea
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about the occasion you are preparing for or the garment you wish to know more about..."
                  className="w-full bg-brand-ivory/60 border border-brand-border rounded-xl p-3 text-xs text-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy"
                />
                {errors.message && <p className="text-red-600 text-[11px] mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-brand-navy hover:bg-brand-navy-light text-brand-ivory rounded-full text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-card transition-all"
              >
                <Send className="w-3.5 h-3.5 text-brand-champagne" />
                <span>Submit Inquiry (Demo)</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
