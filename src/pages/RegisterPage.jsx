import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Phone, Lock, MapPin, Heart, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'Food Provider', // default
    address: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const result = register(formData);
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
            Join the Food <br />
            Redistribution Network.
          </h2>
          <p className="text-emerald-100/70 text-xs leading-relaxed max-w-sm">
            Whether you are a chef with surplus meals, an NGO serving shelters, a driver looking to volunteer, or an individual seeking food assistance, you play a vital part in our mission.
          </p>
        </div>

        <div className="text-[10px] text-emerald-200/50 z-10">
          &copy; {new Date().getFullYear()} FoodLink Foundation. All rights reserved.
        </div>
      </div>

      {/* Right Column: Registration Form */}
      <div className="lg:col-span-7 flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-6 bg-white border border-slate-100 p-8 rounded-3xl shadow-xs">

          <div>
            <h2 className="text-2xl font-bold font-display text-slate-800 tracking-tight">Create Account</h2>
            <p className="text-slate-400 text-xs mt-1">Register today to join the redistribution bridge</p>
          </div>

          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-100 text-rose-800 text-xs font-semibold rounded-xl flex items-start gap-2 animate-fade-in">
              <ShieldAlert className="h-4.5 w-4.5 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name / Org</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  />
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Phone Number</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 555-0199"
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  />
                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@organization.org"
                  className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Physical Address</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="123 Eco Ave, Green City"
                  className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Account Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 bg-white rounded-xl text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option>Food Provider</option>
                  <option>NGO</option>
                  <option>Volunteer</option>
                  <option>Needy Individual</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  />
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-sm hover:shadow-md transition-all active:scale-98 disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer mt-2"
            >
              {loading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-emerald-600 hover:underline">
              Sign In
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
};

export default RegisterPage;
