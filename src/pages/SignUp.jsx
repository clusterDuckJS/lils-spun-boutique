import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User, Phone, ArrowRight, Sparkles, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Breadcrumbs from '../components/Breadcrumbs';

export default function SignUp() {
  const { signUp, isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/account';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: true
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccessConfirmation, setIsSuccessConfirmation] = useState(false);

  // If already logged in, redirect
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectPath]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!formData.email.trim()) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (formData.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify and try again.');
      return;
    }

    if (!formData.agreeTerms) {
      setErrorMessage('Please accept the Terms of Service to create an account.');
      return;
    }

    setIsLoading(true);

    const result = await signUp({
      email: formData.email,
      password: formData.password,
      fullName: formData.fullName,
      phone: formData.phone
    });

    setIsLoading(false);

    if (result.success) {
      if (result.needsConfirmation) {
        setIsSuccessConfirmation(true);
      } else {
        addToast({
          title: 'Account Created',
          message: `Welcome to Lils Spun Boutique, ${formData.fullName.split(' ')[0]}!`,
          type: 'info'
        });
        navigate(redirectPath, { replace: true });
      }
    } else {
      setErrorMessage(result.error || 'Failed to create your account. Please try again.');
    }
  };

  if (isSuccessConfirmation) {
    return (
      <div className="min-h-screen bg-brand-ivory pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Account Created' }]} />
        </div>

        <div className="max-w-md mx-auto px-4 sm:px-6 mt-8">
          <div className="bg-white rounded-2xl border border-brand-border/80 shadow-soft p-6 sm:p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-100">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h1 className="font-serif text-3xl text-brand-navy font-medium mb-3">
              Verify Your Email
            </h1>

            <p className="text-xs text-brand-muted leading-relaxed mb-6">
              A confirmation link has been sent to <strong className="text-brand-navy">{formData.email}</strong>.
              Please check your inbox (and spam folder) and click the link to activate your boutique patron account.
            </p>

            <div className="p-4 rounded-xl bg-brand-ivory border border-brand-border/60 text-xs text-brand-text mb-6 text-left">
              <p className="font-medium text-brand-navy mb-1">Once verified, you will enjoy:</p>
              <ul className="list-disc list-inside space-y-1 text-brand-muted text-[11px]">
                <li>Effortless order tracking and status updates</li>
                <li>Express checkout with pre-saved addresses</li>
                <li>Exclusive previews of bespoke handloom drops</li>
              </ul>
            </div>

            <Link
              to="/login"
              className="w-full py-3 px-4 bg-brand-navy text-brand-champagne hover:bg-brand-navy-light rounded-xl font-medium text-xs uppercase tracking-luxury transition-all inline-flex items-center justify-center gap-2"
            >
              <span>Return to Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-ivory pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Create Account' }]} />
      </div>

      <div className="max-w-md mx-auto px-4 sm:px-6 mt-4">
        <div className="bg-white rounded-2xl border border-brand-border/80 shadow-soft p-6 sm:p-8">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blush/20 text-brand-rose text-[11px] font-sans font-medium uppercase tracking-luxury mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Join Lils Spun Boutique</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-brand-navy font-medium">
              Create an Account
            </h1>
            <p className="text-xs text-brand-muted mt-2 max-w-xs mx-auto">
              Join our community of handloom connoisseurs and enjoy personalized concierge services.
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <p>{errorMessage}</p>
            </div>
          )}

          {/* SignUp Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-brand-navy mb-1 uppercase tracking-wider">
                Full Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Priya Sharma"
                  className="w-full pl-10 pr-4 py-2.5 bg-brand-ivory/50 border border-brand-border rounded-xl text-sm text-brand-text focus:outline-none focus:border-brand-navy transition-colors placeholder:text-brand-muted/50"
                />
                <User className="w-4 h-4 text-brand-muted/70 absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-brand-navy mb-1 uppercase tracking-wider">
                Email Address *
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. priya@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-brand-ivory/50 border border-brand-border rounded-xl text-sm text-brand-text focus:outline-none focus:border-brand-navy transition-colors placeholder:text-brand-muted/50"
                />
                <Mail className="w-4 h-4 text-brand-muted/70 absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-brand-navy mb-1 uppercase tracking-wider">
                Mobile Number <span className="text-[10px] text-brand-muted lowercase font-normal">(for delivery SMS)</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full pl-10 pr-4 py-2.5 bg-brand-ivory/50 border border-brand-border rounded-xl text-sm text-brand-text focus:outline-none focus:border-brand-navy transition-colors placeholder:text-brand-muted/50"
                />
                <Phone className="w-4 h-4 text-brand-muted/70 absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-brand-navy mb-1 uppercase tracking-wider">
                Password * <span className="text-[10px] text-brand-muted lowercase font-normal">(min 6 chars)</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-brand-ivory/50 border border-brand-border rounded-xl text-sm text-brand-text focus:outline-none focus:border-brand-navy transition-colors placeholder:text-brand-muted/50"
                />
                <Lock className="w-4 h-4 text-brand-muted/70 absolute left-3.5 top-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-brand-muted/70 hover:text-brand-navy"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-brand-navy mb-1 uppercase tracking-wider">
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-brand-ivory/50 border border-brand-border rounded-xl text-sm text-brand-text focus:outline-none focus:border-brand-navy transition-colors placeholder:text-brand-muted/50"
                />
                <Lock className="w-4 h-4 text-brand-muted/70 absolute left-3.5 top-3" />
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-2.5 text-xs text-brand-muted cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  className="mt-0.5 rounded border-brand-border text-brand-navy focus:ring-brand-rose"
                />
                <span>
                  I agree to the{' '}
                  <Link to="/pages/terms" className="text-brand-navy underline hover:text-brand-rose">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/pages/privacy" className="text-brand-navy underline hover:text-brand-rose">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-brand-navy text-brand-champagne hover:bg-brand-navy-light rounded-xl font-medium text-xs uppercase tracking-luxury transition-all flex items-center justify-center gap-2 shadow-soft disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Switch to Login */}
          <div className="mt-8 text-center text-xs text-brand-muted">
            Already have an account?{' '}
            <Link
              to={`/login${searchParams.get('redirect') ? `?redirect=${encodeURIComponent(searchParams.get('redirect'))}` : ''}`}
              className="text-brand-navy font-semibold hover:text-brand-rose underline decoration-brand-champagne underline-offset-4 transition-colors"
            >
              Sign In
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
