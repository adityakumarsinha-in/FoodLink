import React, { useState, useRef, useEffect } from 'react';
import { Bell, X, Check, Award, Truck, ShieldAlert } from 'lucide-react';
import { useFood } from '../context/FoodContext';

const NotificationBell = () => {
  const { notifications, markAllNotificationsRead, clearNotification } = useFood();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'new_food':
        return <Award className="h-4 w-4 text-emerald-600" />;
      case 'claimed':
        return <Bell className="h-4 w-4 text-amber-500" />;
      case 'scheduled':
      case 'pickedup':
        return <Truck className="h-4 w-4 text-sky-500" />;
      case 'delivered':
        return <Check className="h-4 w-4 text-emerald-500" />;
      default:
        return <ShieldAlert className="h-4 w-4 text-slate-500" />;
    }
  };

  const getIconBg = (type) => {
    switch (type) {
      case 'new_food':
        return 'bg-emerald-50';
      case 'claimed':
        return 'bg-amber-50';
      case 'scheduled':
      case 'pickedup':
        return 'bg-sky-50';
      case 'delivered':
        return 'bg-emerald-50';
      default:
        return 'bg-slate-50';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-all focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
        aria-label="Notifications"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 overflow-hidden animate-fade-in origin-top-right">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
            <span className="font-semibold text-slate-800 text-sm font-display">Notifications</span>
            {unreadCount > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="text-xs text-emerald-600 hover:text-emerald-700 font-medium hover:underline"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-64 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-slate-400 text-xs">
                No notifications yet.
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`flex gap-3 px-4 py-3 border-b border-slate-50 hover:bg-slate-50/50 transition-colors ${
                    !notif.read ? 'bg-slate-50/70 font-medium' : ''
                  }`}
                >
                  {/* Notification Icon */}
                  <div className={`p-1.5 h-7 w-7 rounded-full flex items-center justify-center shrink-0 ${getIconBg(notif.type)}`}>
                    {getIcon(notif.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-800 leading-tight">{notif.title}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug break-words">{notif.message}</p>
                    <span className="text-[10px] text-slate-400 block mt-1">{notif.time}</span>
                  </div>

                  {/* Dismiss */}
                  <button
                    onClick={() => clearNotification(notif.id)}
                    className="p-1 rounded-md text-slate-300 hover:text-slate-500 hover:bg-slate-100 self-start shrink-0 transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
