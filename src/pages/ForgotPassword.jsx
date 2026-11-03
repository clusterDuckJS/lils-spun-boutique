import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, Sparkles, CheckCircle2, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Breadcrumbs from '../components/Breadcrumbs';

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim()) {
      setErrorMessage('Please enter your registered email address.');
      return;
    }

    setIsLoading(true);
    const result = await resetPassword(email);
    setIsLoading(false);

    if (result.success) {
      setIsSubmitted(true);
    } else {
      setErrorMessage(result.error || 'Failed to send password reset instructions.');
    }
  };

  return (
    <div className="min-h-screen bg-brand-ivory pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Sign In', href: '/login' }, { label: 'Reset Password' }]} />
      </div>

      <div className="max-w-md mx-auto px-4 sm:px-6 mt-6">
        <div className="bg-white rounded-2xl border border-brand-border/80 shadow-soft p-6 sm:p-8">
          
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blush/20 text-brand-rose text-[11px] font-sans font-medium uppercase tracking-luxury mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Patron Security</span>
            </div>
            <h1 className="font-serif text-3xl text-brand-navy font-medium">
              Recover Password
            </h1>
            <p className="text-xs text-brand-muted mt-2 max-w-xs mx-auto">
              Enter your account email address and we will send you secure instructions to reset your password.
            </p>
          </div>

          {isSubmitted ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-100">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h2 className="font-serif text-xl text-brand-navy font-medium mb-2">Instructions Sent</h2>
              <p className="text-xs text-brand-muted leading-relaxed mb-6">
                If an account exists for <strong className="text-brand-navy">{email}</strong>, you will receive an email shortly with a link to reset your password.
              </p>
              <Link
                to="/login"
                className="w-full py-2.5 px-4 bg-brand-navy text-brand-champagne hover:bg-brand-navy-light rounded-xl font-medium text-xs uppercase tracking-luxury transition-all inline-flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Sign In</span>
              </Link>
            </div>
          ) : (
            <>
              {errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <p>{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-medium text-brand-navy mb-1.5 uppercase tracking-wider">
                    Registered Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. priya@example.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-brand-ivory/50 border border-brand-border rounded-xl text-sm text-brand-text focus:outline-none focus:border-brand-navy transition-colors placeholder:text-brand-muted/50"
                    />
                    <Mail className="w-4 h-4 text-brand-muted/70 absolute left-3.5 top-3" />
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
                      <span>Sending Instructions...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Reset Link</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-xs text-brand-muted hover:text-brand-navy transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
