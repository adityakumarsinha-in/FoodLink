import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Heart, ShieldAlert, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Short timeout to simulate API call
    setTimeout(() => {
      const result = login(email, password);
      setLoading(false);

      if (result.success) {
        // Redirect based on role
        const role = result.user.role;
        if (role === 'provider') navigate('/dashboard/provider');
        else if (role === 'ngo') navigate('/dashboard/ngo');
        else if (role === 'volunteer') navigate('/dashboard/volunteer');
        else if (role === 'needy') navigate('/dashboard/needy');
        else if (role === 'admin') navigate('/dashboard/admin');
      } else {
        setError(result.message);
      }
    }, 800);
  };

  const handleQuickFill = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('password123');
  };

  return (
    <div className="w-full flex-grow grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-69px)] bg-slate-50">

      {/* Left Column: Graphic/Info (Visible on Desktop) */}
      <div className="hidden lg:flex lg:col-span-5 bg-emerald-900 text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.2),transparent_50%)]" />
        <div className="z-10 flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
            <Heart className="h-4 w-4 fill-white" />
          </div>
          <span className="font-bold text-sm tracking-tight font-display text-white">FoodLink Portal</span>
        </div>

        <div className="space-y-6 z-10">
          <h2 className="text-3xl font-extrabold font-display leading-tight">
            Reducing Waste. <br />
            Feeding Hopes.
          </h2>
          <p className="text-emerald-100/70 text-xs leading-relaxed max-w-sm">
            Sign in to access your platform dashboard. Coordinate active listings, track claimed meals, or accept local volunteer deliveries.
          </p>
        </div>

        <div className="text-[10px] text-emerald-200/50 z-10">
          &copy; {new Date().getFullYear()} FoodLink Foundation.
        </div>
      </div>

      {/* Right Column: Authentication Form */}
      <div className="lg:col-span-7 flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8 bg-white border border-slate-100 p-8 rounded-3xl shadow-xs">

          <div>
            <h2 className="text-2xl font-bold font-display text-slate-800 tracking-tight">Welcome Back</h2>
            <p className="text-slate-400 text-xs mt-1">Please enter your credentials to log in</p>
          </div>

          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-100 text-rose-800 text-xs font-semibold rounded-xl flex items-start gap-2 animate-fade-in">
              <ShieldAlert className="h-4.5 w-4.5 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="provider@foodlink.org"
                  className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
                <Mail className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-slate-500 uppercase">Password</label>
                <a href="#" className="text-[10px] font-semibold text-emerald-600 hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
                <Lock className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-sm hover:shadow-md transition-all active:scale-98 disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {loading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Quick-fill helper block */}
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Demo Testing Profiles (Click to fill)</span>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Provider', email: 'provider@foodlink.org' },
                { label: 'NGO', email: 'ngo@foodlink.org' },
                { label: 'Volunteer', email: 'volunteer@foodlink.org' },
                { label: 'Needy', email: 'needy@foodlink.org' },
                { label: 'Admin', email: 'admin@foodlink.org' }
              ].map(profile => (
                <button
                  key={profile.label}
                  type="button"
                  onClick={() => handleQuickFill(profile.email)}
                  className={`px-2 py-1 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 text-slate-600 hover:text-emerald-800 text-[10px] font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer ${email === profile.email ? 'border-emerald-500 bg-emerald-50/50 text-emerald-800' : ''
                    }`}
                >
                  {profile.label}
                </button>
              ))}
            </div>
          </div>

          <div className="text-center text-xs text-slate-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-emerald-600 hover:underline">
              Create an account
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
};

export default LoginPage;
