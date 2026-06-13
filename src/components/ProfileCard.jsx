import React, { useState } from 'react';
import { User, Phone, Mail, MapPin, Building, Star, Award, Edit2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProfileCard = () => {
  const { currentUser, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
    orgType: currentUser?.orgType || currentUser?.vehicleType || ''
  });

  const [message, setMessage] = useState('');

  if (!currentUser) return null;

  const getRoleLabel = (role) => {
    const labels = {
      provider: 'Food Provider',
      ngo: 'NGO Member',
      volunteer: 'Community Volunteer',
      needy: 'Recipient / Needy Individual',
      admin: 'FoodLink Administrator'
    };
    return labels[role] || role;
  };

  const getAvatarLetter = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setMessage('Profile updated successfully!');
    setIsEditing(false);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl shadow-xs overflow-hidden animate-fade-in">
      {/* Decorative banner */}
      <div className="h-28 bg-linear-to-r from-emerald-500 to-teal-600 relative">
        <div className="absolute right-4 bottom-4 px-2 py-1 bg-white/20 backdrop-blur-md rounded-md text-white text-xs font-semibold uppercase tracking-wider">
          {getRoleLabel(currentUser.role)}
        </div>
      </div>

      <div className="px-6 pb-6 relative">
        {/* Avatar */}
        <div className="absolute -top-12 left-6 h-20 w-20 rounded-2xl bg-white p-1 shadow-md flex items-center justify-center border border-slate-100">
          <div className="h-full w-full bg-emerald-50 rounded-xl flex items-center justify-center font-display text-2xl font-bold text-emerald-600">
            {getAvatarLetter(currentUser.name)}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-4">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 hover:border-slate-300 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-all active:scale-95 cursor-pointer"
            >
              <Edit2 className="h-3 w-3" /> Edit Profile
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-50 transition-all cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>

        {/* Details section */}
        <div className="mt-4">
          {!isEditing ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-800 font-display flex items-center gap-2">
                  {currentUser.name}
                  {currentUser.rating && (
                    <span className="flex items-center gap-0.5 text-xs bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded-sm font-medium">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      {currentUser.rating}
                    </span>
                  )}
                </h3>
                <p className="text-sm text-slate-400 font-medium">
                  {currentUser.email}
                </p>
              </div>

              {message && (
                <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-medium rounded-lg">
                  {message}
                </div>
              )}

              {/* Stats badges */}
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50">
                {currentUser.role === 'provider' && (
                  <>
                    <div className="text-center p-3 bg-emerald-50/30 rounded-xl border border-emerald-100/10">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Meals Donated</span>
                      <span className="text-xl font-extrabold text-emerald-600 font-display">{currentUser.mealsSharedCount || 0}</span>
                    </div>
                    <div className="text-center p-3 bg-slate-50/50 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pickups Completed</span>
                      <span className="text-xl font-extrabold text-slate-800 font-display">{currentUser.deliveriesCount || 0}</span>
                    </div>
                  </>
                )}

                {currentUser.role === 'ngo' && (
                  <>
                    <div className="text-center p-3 bg-emerald-50/30 rounded-xl border border-emerald-100/10">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Meals Received</span>
                      <span className="text-xl font-extrabold text-emerald-600 font-display">{currentUser.mealsDistributed || 0}</span>
                    </div>
                    <div className="text-center p-3 bg-slate-50/50 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Claims</span>
                      <span className="text-xl font-extrabold text-slate-800 font-display">{currentUser.claimsCount || 0}</span>
                    </div>
                  </>
                )}

                {currentUser.role === 'volunteer' && (
                  <>
                    <div className="text-center p-3 bg-emerald-50/30 rounded-xl border border-emerald-100/10">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Completed Pickups</span>
                      <span className="text-xl font-extrabold text-emerald-600 font-display">{currentUser.deliveriesCompleted || 0}</span>
                    </div>
                    <div className="text-center p-3 bg-slate-50/50 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Assigned Missions</span>
                      <span className="text-xl font-extrabold text-slate-800 font-display">{currentUser.deliveriesAssigned || 0}</span>
                    </div>
                  </>
                )}

                {currentUser.role === 'needy' && (
                  <div className="col-span-2 text-center p-3 bg-emerald-50/30 rounded-xl border border-emerald-100/10">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Meals Claimed</span>
                    <span className="text-xl font-extrabold text-emerald-600 font-display">{currentUser.mealsClaimedCount || 0}</span>
                  </div>
                )}
              </div>

              {/* Info grid */}
              <div className="space-y-4 text-sm text-slate-600">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                  <span>{currentUser.phone}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>{currentUser.address}</span>
                </div>
                {(currentUser.orgType || currentUser.vehicleType) && (
                  <div className="flex items-center gap-3">
                    <Building className="h-4 w-4 text-slate-400 shrink-0" />
                    <span>
                      {currentUser.role === 'volunteer' ? `Vehicle: ${currentUser.vehicleType}` : `Type: ${currentUser.orgType}`}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name / Org Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Address</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  {currentUser.role === 'volunteer' ? 'Vehicle Type' : 'Organization Type'}
                </label>
                <input
                  type="text"
                  value={formData.orgType}
                  onChange={(e) => setFormData({ ...formData, orgType: e.target.value })}
                  placeholder={currentUser.role === 'volunteer' ? 'e.g., Car, Bicycle, Van' : 'e.g., Restaurant, Hotel, NGO Shelter'}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                Save Profile
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
