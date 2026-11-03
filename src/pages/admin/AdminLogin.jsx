import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, Eye, EyeOff, ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAdminAuth, DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD } from '../../context/AdminAuthContext';
import BrandLogo from '../../components/BrandLogo';

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginAdmin } = useAdminAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const destination = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const res = await loginAdmin({ email, password, rememberMe });
      if (res.success) {
        navigate(destination, { replace: true });
      } else {
        setError(res.error || 'Authentication failed. Please verify admin credentials.');
      }
    } catch (err) {
      setError(err.message || 'An unexpected login error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickDemoFill = () => {
    setEmail(DEFAULT_ADMIN_EMAIL);
    setPassword(DEFAULT_ADMIN_PASSWORD);
    setError('');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-brand-ivory relative">
      {/* Background Subtle Gradient Accents */}
      <div className="absolute inset-0 bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        {/* Back to store navigation */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-brand-muted hover:text-brand-rose transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Boutique</span>
          </Link>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-rose uppercase tracking-wider bg-brand-rose/10 px-2.5 py-1 rounded-full border border-brand-rose/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            Admin Portal
          </span>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-luxury border border-brand-border/80 p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-2xl bg-brand-navy flex items-center justify-center shadow-md">
                <ShieldCheck className="w-7 h-7 text-brand-champagne" />
              </div>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl text-brand-navy font-normal mb-1">
              Boutique Management
            </h1>
            <p className="text-xs text-brand-muted tracking-wide font-light">
              Authenticate to manage product listings, convert & upload WebP media, and sync collections.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200/80 text-xs text-red-700 leading-relaxed flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-brand-navy mb-1.5">
                Admin Email / ID
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@lilsspun.com"
                  className="w-full pl-10 pr-4 py-3 bg-brand-ivory/40 border border-brand-border rounded-xl text-xs sm:text-sm text-brand-navy placeholder-brand-muted/60 focus:outline-none focus:border-brand-rose focus:ring-1 focus:ring-brand-rose transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs uppercase tracking-wider font-semibold text-brand-navy">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-brand-ivory/40 border border-brand-border rounded-xl text-xs sm:text-sm text-brand-navy placeholder-brand-muted/60 focus:outline-none focus:border-brand-rose focus:ring-1 focus:ring-brand-rose transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-navy"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-brand-muted select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-brand-border text-brand-navy focus:ring-brand-rose/20 cursor-pointer accent-brand-navy"
                />
                <span>Remember this terminal</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 bg-brand-navy hover:bg-brand-navy-light text-brand-champagne rounded-xl text-xs uppercase tracking-luxury font-semibold shadow-md transition-all hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isSubmitting ? 'Authenticating...' : 'Enter Admin Console'}</span>
            </button>
          </form>

          {/* Quick Demo Fill Helper */}
          <div className="mt-6 pt-6 border-t border-brand-border/60">
            <div className="p-3.5 bg-brand-ivory/60 rounded-2xl border border-brand-border flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold text-brand-navy">Default Credentials</p>
                <p className="text-[11px] text-brand-muted">admin@lilsspun.com / admin</p>
              </div>
              <button
                type="button"
                onClick={handleQuickDemoFill}
                className="px-3 py-1.5 bg-white border border-brand-border hover:border-brand-rose text-[11px] text-brand-rose font-medium rounded-lg transition-colors shadow-2xs hover:bg-brand-rose/5"
              >
                Auto Fill
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-[11px] text-brand-muted mt-6 font-light">
          Lils Spun Boutique • Enterprise Content & Inventory Management
        </p>
      </div>
    </div>
  );
}
