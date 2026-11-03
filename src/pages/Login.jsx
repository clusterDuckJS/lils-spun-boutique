import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowRight, Sparkles, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Login() {
  const { signIn, signInDemo, isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/account';

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // If already logged in, redirect
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectPath]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.email || !formData.password) {
      setErrorMessage('Please enter both your email address and password.');
      return;
    }

    setIsLoading(true);

    const result = await signIn({
      email: formData.email,
      password: formData.password
    });

    setIsLoading(false);

    if (result.success) {
      addToast({
        title: 'Welcome Back',
        message: 'You have signed in to Lils Spun Boutique.',
        type: 'info'
      });
      navigate(redirectPath, { replace: true });
    } else {
      setErrorMessage(result.error || 'Invalid email or password. Please try again.');
    }
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    signInDemo('customer');
    setIsLoading(false);
    addToast({
      title: 'Demo Sign-In Active',
      message: 'Signed in as Priya Sharma (Demo Patron).',
      type: 'info'
    });
    navigate(redirectPath, { replace: true });
  };

  return (
    <div className="min-h-screen bg-brand-ivory pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Sign In' }]} />
      </div>

      <div className="max-w-md mx-auto px-4 sm:px-6 mt-4">
        <div className="bg-white rounded-2xl border border-brand-border/80 shadow-soft p-6 sm:p-8">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blush/20 text-brand-rose text-[11px] font-sans font-medium uppercase tracking-luxury mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Boutique Patron Portal</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-brand-navy font-medium">
              Welcome Back
            </h1>
            <p className="text-xs text-brand-muted mt-2 max-w-xs mx-auto">
              Sign in to manage your orders, saved measurements, bespoke wishes, and seamless checkout.
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <p>{errorMessage}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-brand-navy mb-1.5 uppercase tracking-wider">
                Email Address
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
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-brand-navy uppercase tracking-wider">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[11px] text-brand-rose hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-brand-navy text-brand-champagne hover:bg-brand-navy-light rounded-xl font-medium text-xs uppercase tracking-luxury transition-all flex items-center justify-center gap-2 shadow-soft disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Sign In Option */}
          <div className="mt-6 pt-6 border-t border-brand-border">
            <p className="text-[11px] text-center text-brand-muted uppercase tracking-wider mb-3">
              Fast Reviewer Access
            </p>
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-brand-blush/20 hover:bg-brand-blush/35 text-brand-navy border border-brand-champagne/40 rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-rose" />
              <span>One-Click Demo Patron Sign-In</span>
            </button>
          </div>

          {/* Switch to SignUp */}
          <div className="mt-8 text-center text-xs text-brand-muted">
            New to Lils Spun Boutique?{' '}
            <Link
              to={`/signup${searchParams.get('redirect') ? `?redirect=${encodeURIComponent(searchParams.get('redirect'))}` : ''}`}
              className="text-brand-navy font-semibold hover:text-brand-rose underline decoration-brand-champagne underline-offset-4 transition-colors"
            >
              Create an Account
            </Link>
          </div>

        </div>

        {/* Brand Assurance Note */}
        <div className="mt-8 text-center space-y-1">
          <p className="text-[11px] text-brand-muted flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-rose" />
            256-bit Encrypted Boutique Patron Security
          </p>
        </div>
      </div>
    </div>
  );
}
