import React, { useState } from 'react';
import { Lock, Mail, User, ArrowRight, ShieldCheck, Check } from 'lucide-react';

interface OnboardingPageProps {
  onSuccessAuth: (userData?: { name: string; email: string }) => void;
  onCancel: () => void;
}

export const OnboardingPage: React.FC<OnboardingPageProps> = ({
  onSuccessAuth,
  onCancel,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (mode === 'signup' && !name)) {
      setError('Please provide all required fields to continue.');
      return;
    }
    setError(null);
    onSuccessAuth({
      name: mode === 'signup' ? name : 'Marcus Vance',
      email: email,
    });
  };

  const handleDemoSignIn = () => {
    onSuccessAuth({
      name: 'Dr. Sarah Jenkins',
      email: 's.jenkins@stanford.edu',
    });
  };

  return (
    <div id="onboarding-page-container" className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 sm:p-6 bg-[#F8FAFC]">
      <div className="w-full max-w-md">
        
        {/* Crisp Card with Minimal Border Radius */}
        <div className="bg-white border border-slate-200 rounded-[2px] elevation-2 p-6 sm:p-8">
          
          {/* Header & Logo Badge */}
          <div className="text-center mb-6">
            <div className="w-9 h-9 bg-[#1A365D] text-white flex items-center justify-center rounded-[2px] font-bold text-lg mx-auto mb-3 shadow-sm">
              S
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {mode === 'login' ? 'Welcome Back to Schedly' : 'Create Your Schedly Account'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {mode === 'login'
                ? 'Access your digitized schedules, calendar syncs, and parsing history.'
                : 'Turn printed syllabi & whiteboard schedules into digital clarity.'}
            </p>
          </div>

          {/* Mode Switcher Tabs (Instant Material Toggle) */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-[2px] mb-6 border border-slate-200">
            <button
              id="auth-toggle-login"
              type="button"
              onClick={() => { setMode('login'); setError(null); }}
              className={`py-2 text-xs font-semibold rounded-[2px] transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-white text-[#1A365D] elevation-1 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              id="auth-toggle-signup"
              type="button"
              onClick={() => { setMode('signup'); setError(null); }}
              className={`py-2 text-xs font-semibold rounded-[2px] transition-all cursor-pointer ${
                mode === 'signup'
                  ? 'bg-white text-[#1A365D] elevation-1 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Error notice if any */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-[2px]">
              {error}
            </div>
          )}

          {/* Form with Material Floating-Style Inputs */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {mode === 'signup' && (
              <div className="relative">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    id="input-auth-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Sarah Jenkins"
                    className="w-full px-3 py-2.5 text-sm bg-white border border-slate-300 rounded-[2px] focus:border-[#1A365D] focus:ring-1 focus:ring-[#1A365D] focus:outline-none transition-all placeholder:text-slate-400"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Corporate or Academic Email
              </label>
              <div className="relative">
                <input
                  id="input-auth-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@organization.com"
                  className="w-full px-3 py-2.5 text-sm bg-white border border-slate-300 rounded-[2px] focus:border-[#1A365D] focus:ring-1 focus:ring-[#1A365D] focus:outline-none transition-all placeholder:text-slate-400"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                  Password
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => alert('Password reset link sent to registered email.')}
                    className="text-[11px] text-[#1A365D] hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  id="input-auth-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2.5 text-sm bg-white border border-slate-300 rounded-[2px] focus:border-[#1A365D] focus:ring-1 focus:ring-[#1A365D] focus:outline-none transition-all placeholder:text-slate-400"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Primary Submit Button */}
            <button
              id="btn-auth-submit"
              type="submit"
              className="w-full mt-2 py-3 px-4 bg-[#1A365D] hover:bg-[#2A4365] text-white text-sm font-semibold rounded-[2px] elevation-1 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>{mode === 'login' ? 'Sign In to Workspace' : 'Create Free Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

          {/* Divider */}
          <div className="my-5 flex items-center">
            <div className="flex-1 border-t border-slate-200" />
            <span className="px-3 text-[11px] uppercase tracking-wider text-slate-400 font-medium">
              Or continue with
            </span>
            <div className="flex-1 border-t border-slate-200" />
          </div>

          {/* Alternative Auth: Minimalist Google / Apple Flat Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              id="btn-oauth-google"
              type="button"
              onClick={() => onSuccessAuth({ name: 'Google User', email: 'user@gmail.com' })}
              className="py-2.5 px-3 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-[2px] flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.97 0 12s.45 3.84 1.24 5.42l4.04-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span>Google</span>
            </button>

            <button
              id="btn-oauth-apple"
              type="button"
              onClick={() => onSuccessAuth({ name: 'Apple User', email: 'user@icloud.com' })}
              className="py-2.5 px-3 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-[2px] flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current text-slate-900" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.61 1.34-.55.63-.99 1.68-.87 2.7.99.08 2.02-.44 2.55-1.19z"/>
              </svg>
              <span>Apple ID</span>
            </button>
          </div>

          {/* Quick Demo Shortcut */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-2">
            <button
              id="btn-demo-signin"
              type="button"
              onClick={handleDemoSignIn}
              className="w-full py-2 px-3 bg-slate-50 hover:bg-slate-100 text-[#1A365D] border border-slate-200 text-xs font-semibold rounded-[2px] transition-colors flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Instant Access: Continue as Demo User</span>
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="text-xs text-slate-500 hover:text-slate-800 text-center py-1"
            >
              Return to Landing Page
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
