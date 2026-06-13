import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Heart, LogOut, Menu, X, Users, RefreshCw, UserCheck, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NotificationBell from './NotificationBell';

const Navbar = ({ onMenuClick }) => {
  const { currentUser, switchRole, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);

  const handleRoleSwitch = (role) => {
    switchRole(role);
    setIsRoleMenuOpen(false);

    // Redirect to dashboard matching the new role
    if (role === 'provider') navigate('/dashboard/provider');
    else if (role === 'ngo') navigate('/dashboard/ngo');
    else if (role === 'volunteer') navigate('/dashboard/volunteer');
    else if (role === 'needy') navigate('/dashboard/needy');
    else if (role === 'admin') navigate('/dashboard/admin');
  };

  const handleLogoutClick = () => {
    logout();
    navigate('/login');
  };

  const getRoleLabel = (role) => {
    const labels = {
      provider: 'Food Provider (Restaurant)',
      ngo: 'NGO (Hope Alliance)',
      volunteer: 'Volunteer (Alex)',
      needy: 'Needy Individual (Maria)',
      admin: 'Admin Console'
    };
    return labels[role] || role;
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 sm:px-6 py-3.5 flex items-center justify-between">
      {/* Brand Logo */}
      <div className="flex items-center gap-3">
        {isDashboard && onMenuClick && (
          <button
            onClick={onMenuClick}
            className="p-1.5 -ml-1 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg lg:hidden cursor-pointer"
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        )}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="h-9 w-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform duration-300">
            <Heart className="h-5 w-5 fill-white" />
          </div>
          <span className="font-extrabold text-xl font-display tracking-tight text-slate-800">
            Food<span className="text-emerald-600">Link</span>
          </span>
        </Link>
      </div>

      {/* Navigation Links / Action area */}
      <div className="flex items-center gap-2 sm:gap-4">
        {currentUser ? (
          <>
            {/* Quick Demo Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-xl border border-emerald-100/50 shadow-2xs transition-all active:scale-95 cursor-pointer"
                title="Switch Roles for Demo testing"
              >
                <UserCheck className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Switch Role</span>
                <span className="inline sm:hidden font-mono capitalize">({currentUser.role})</span>
              </button>

              {isRoleMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 py-2 animate-fade-in origin-top-right">
                  <div className="px-3.5 py-1.5 border-b border-slate-50 mb-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Demo Sandbox</span>
                  </div>
                  {['provider', 'ngo', 'volunteer', 'needy', 'admin'].map((r) => (
                    <button
                      key={r}
                      onClick={() => handleRoleSwitch(r)}
                      className={`w-full text-left px-4 py-2 text-xs font-semibold flex items-center justify-between hover:bg-slate-50 transition-colors capitalize ${currentUser.role === r ? 'text-emerald-600 bg-emerald-50/40' : 'text-slate-600'
                        }`}
                    >
                      {getRoleLabel(r)}
                      {currentUser.role === r && <Check className="h-3.5 w-3.5 text-emerald-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <NotificationBell />

            {/* User Profile Info (Desktop) */}
            <div className="hidden md:flex flex-col text-right">
              <span className="text-xs font-bold text-slate-700 leading-none">{currentUser.name}</span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5 capitalize">{currentUser.role}</span>
            </div>

            {/* Dashboard redirect if on home page */}
            {!isDashboard && !isAuthPage && (
              <Link
                to={`/dashboard/${currentUser.role}`}
                className="px-4 py-2 bg-slate-900 text-white font-semibold text-xs rounded-xl hover:bg-slate-800 transition-colors shadow-sm"
              >
                Console
              </Link>
            )}

            {/* Logout */}
            <button
              onClick={handleLogoutClick}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-all cursor-pointer"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </>
        ) : (
          !isAuthPage && (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-slate-600 hover:text-slate-800 font-semibold text-xs px-3.5 py-2 hover:bg-slate-50 rounded-xl transition-all"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95"
              >
                Get Started
              </Link>
            </div>
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;
