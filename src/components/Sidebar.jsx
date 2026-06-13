import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, PlusCircle, ClipboardList, History, User,
  ShoppingBag, CheckSquare, Truck, CheckCircle, Map,
  Users, BarChart3, HeartHandshake, Shield, Sparkles, MapPin
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) return null;

  // Define sidebar menu configurations per role
  const menus = {
    provider: [
      { path: '/dashboard/provider', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/dashboard/provider/add-food', label: 'Add Food', icon: PlusCircle },
      { path: '/dashboard/provider/listings', label: 'Active Listings', icon: ClipboardList },
      { path: '/dashboard/provider/history', label: 'Donation History', icon: History },
      { path: '/dashboard/provider/profile', label: 'Profile', icon: User }
    ],
    ngo: [
      { path: '/dashboard/ngo', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/dashboard/ngo/available', label: 'Available Food', icon: ShoppingBag },
      { path: '/dashboard/ngo/claimed', label: 'Claimed Food', icon: CheckSquare },
      { path: '/dashboard/ngo/map', label: 'Food Map', icon: Map },
      { path: '/dashboard/ngo/profile', label: 'Profile', icon: User }
    ],
    volunteer: [
      { path: '/dashboard/volunteer', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/dashboard/volunteer/pickups', label: 'Assigned Pickups', icon: Truck },
      { path: '/dashboard/volunteer/history', label: 'Completed Deliveries', icon: CheckCircle },
      { path: '/dashboard/volunteer/map', label: 'Pickup Map', icon: Map },
      { path: '/dashboard/volunteer/profile', label: 'Profile', icon: User }
    ],
    needy: [
      { path: '/dashboard/needy', label: 'Nearby Food', icon: MapPin },
      { path: '/dashboard/needy/claimed', label: 'Claimed Food', icon: CheckSquare },
      { path: '/dashboard/needy/map', label: 'Interactive Map', icon: Map },
      { path: '/dashboard/needy/profile', label: 'Profile', icon: User }
    ],
    admin: [
      { path: '/dashboard/admin', label: 'Overview', icon: LayoutDashboard },
      { path: '/dashboard/admin/users', label: 'Users Moderation', icon: Users },
      { path: '/dashboard/admin/listings', label: 'All Listings', icon: Sparkles },
      { path: '/dashboard/admin/ngos', label: 'NGO Registry', icon: HeartHandshake },
      { path: '/dashboard/admin/volunteers', label: 'Volunteers List', icon: Shield },
      { path: '/dashboard/admin/analytics', label: 'Analytics Reports', icon: BarChart3 }
    ]
  };

  const currentMenu = menus[currentUser.role] || [];

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all ${isActive
      ? 'bg-emerald-600 text-white shadow-xs'
      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
    }`;

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-slate-100 p-4">
      {/* User Quick Info */}
      <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl mb-6 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center font-display text-emerald-700 font-bold">
          {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
        </div>
        <div className="min-w-0">
          <h4 className="text-xs font-bold text-slate-800 truncate leading-tight">{currentUser.name}</h4>
          <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider block mt-0.5 capitalize">
            {currentUser.role === 'provider' ? 'Food Provider' : currentUser.role}
          </span>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 space-y-1.5 overflow-y-auto">
        {currentMenu.map((item) => {
          const IconComponent = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard/provider' || item.path === '/dashboard/ngo' || item.path === '/dashboard/volunteer' || item.path === '/dashboard/admin'}
              className={linkClass}
              onClick={handleLinkClick}
            >
              <IconComponent className="h-5 w-5 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed) */}
      <aside className="hidden lg:block w-64 h-[calc(100vh-69px)] sticky top-[69px] shrink-0 z-20">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar (Drawer Overlay) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />
          {/* Drawer Panel */}
          <div className="fixed inset-y-0 left-0 w-64 max-w-[80vw] bg-white shadow-2xl flex flex-col z-10 animate-fade-in origin-left">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <span className="font-bold text-slate-800 text-sm font-display">Navigation</span>
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              {sidebarContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
