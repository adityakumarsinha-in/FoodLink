import React from 'react';
import { Clock, MapPin, Phone, User, Check, Trash2, Edit, ClipboardList, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useFood } from '../context/FoodContext';

const FoodCard = ({ food, onEdit, onDelete, onViewTimeline }) => {
  const { currentUser } = useAuth();
  const { claimFoodListing, assignVolunteer, updateDeliveryStatus } = useFood();

  const isExpired = new Date(food.expiryTime) < new Date();
  const expiryDate = new Date(food.expiryTime);
  const formattedExpiry = expiryDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' ' + expiryDate.toLocaleDateString([], { month: 'short', day: 'numeric' });

  const getStatusBadge = (status) => {
    const badges = {
      available: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      claimed: 'bg-amber-50 text-amber-700 border-amber-200',
      scheduled: 'bg-sky-50 text-sky-700 border-sky-200',
      pickedup: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      delivered: 'bg-teal-50 text-teal-700 border-teal-200'
    };

    const statusLabels = {
      available: 'Available',
      claimed: 'Claimed',
      scheduled: 'Pickup Scheduled',
      pickedup: 'Picked Up',
      delivered: 'Delivered'
    };

    return (
      <span className={`px-2 py-0.5 border text-xs font-semibold rounded-md ${badges[status] || badges.available}`}>
        {statusLabels[status] || status}
      </span>
    );
  };

  const handleClaim = () => {
    if (!currentUser) return;
    claimFoodListing(food.id, currentUser.id, currentUser.name);
  };

  const handleVolunteerAccept = () => {
    if (!currentUser) return;
    assignVolunteer(food.id, currentUser.id, currentUser.name);
  };

  const handleStatusTransition = () => {
    if (food.status === 'scheduled') {
      updateDeliveryStatus(food.id, 'pickedup');
    } else if (food.status === 'pickedup') {
      updateDeliveryStatus(food.id, 'delivered');
    }
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group animate-fade-in">
      {/* Image container */}
      <div className="h-44 relative bg-slate-100 overflow-hidden">
        <img
          src={food.imageUrl}
          alt={food.foodName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop';
          }}
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-slate-800 shadow-sm">
          {food.category}
        </div>
        <div className="absolute top-3 right-3">
          {getStatusBadge(food.status)}
        </div>
        {food.distance && (
          <div className="absolute bottom-3 left-3 bg-slate-900/60 backdrop-blur-md px-2 py-0.5 rounded-md text-[11px] font-semibold text-white flex items-center gap-1">
            <MapPin className="h-3 w-3 text-emerald-400" />
            {food.distance} mi away
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start gap-2 mb-1">
            <h4 className="text-base font-bold text-slate-800 font-display leading-tight">{food.foodName}</h4>
            <span className="shrink-0 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">
              {food.quantity}
            </span>
          </div>

          <p className="text-xs text-slate-500 line-clamp-2 mb-4">
            {food.description}
          </p>

          <div className="space-y-2 text-xs text-slate-600 mb-4 pt-3 border-t border-slate-50">
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              <span className={isExpired ? 'text-red-500 font-bold' : ''}>
                Expires: {formattedExpiry} {isExpired && '(Expired)'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-3.5 w-3.5 text-slate-400" />
              <span>Provider: {food.providerName}</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span className="truncate">{food.pickupAddress}</span>
            </div>
          </div>
        </div>

        {/* Buttons / Actions */}
        <div className="pt-4 border-t border-slate-50 flex gap-2">
          {/* Provider Dash Actions */}
          {currentUser?.role === 'provider' && food.providerId === currentUser?.id && (
            <>
              <button
                onClick={() => onEdit && onEdit(food)}
                className="flex-1 py-2 border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer"
              >
                <Edit className="h-3.5 w-3.5" /> Edit
              </button>
              <button
                onClick={() => onDelete && onDelete(food.id)}
                className="py-2 px-3 border border-rose-200 hover:border-rose-300 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-bold flex items-center justify-center transition-all active:scale-95 cursor-pointer"
                title="Delete Listing"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </>
          )}

          {/* NGO/Needy Claim Actions */}
          {(currentUser?.role === 'ngo' || currentUser?.role === 'needy') && food.status === 'available' && !isExpired && (
            <button
              onClick={handleClaim}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-98 cursor-pointer"
            >
              <Check className="h-4 w-4" /> Claim Meal
            </button>
          )}

          {/* Claimed by me (NGO) timeline check */}
          {currentUser?.role === 'ngo' && food.claimedBy === currentUser?.id && (
            <button
              onClick={() => onViewTimeline && onViewTimeline(food)}
              className="w-full py-2 border border-emerald-600/30 hover:border-emerald-600 text-emerald-700 hover:bg-emerald-50 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <ClipboardList className="h-4 w-4" /> Track Status
            </button>
          )}

          {/* Volunteer Actions */}
          {currentUser?.role === 'volunteer' && (
            <>
              {food.status === 'claimed' && (
                <button
                  onClick={handleVolunteerAccept}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-98 cursor-pointer"
                >
                  <Check className="h-4 w-4" /> Accept Pickup Mission
                </button>
              )}

              {food.status === 'scheduled' && food.volunteerId === currentUser.id && (
                <button
                  onClick={handleStatusTransition}
                  className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-98 cursor-pointer"
                >
                  <RefreshCw className="h-4 w-4 animate-spin-slow" /> Mark Picked Up
                </button>
              )}

              {food.status === 'pickedup' && food.volunteerId === currentUser.id && (
                <button
                  onClick={handleStatusTransition}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-98 cursor-pointer"
                >
                  <Check className="h-4 w-4" /> Mark Delivered
                </button>
              )}

              {food.status === 'delivered' && (
                <span className="w-full py-2 bg-slate-50 text-slate-400 border border-slate-100 rounded-xl text-xs font-bold flex items-center justify-center gap-1">
                  <Check className="h-3.5 w-3.5 text-emerald-500" /> Delivered
                </span>
              )}
            </>
          )}

          {/* Admin general tracking action */}
          {currentUser?.role === 'admin' && (
            <button
              onClick={() => onViewTimeline && onViewTimeline(food)}
              className="w-full py-2 border border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <ClipboardList className="h-4 w-4 text-slate-400" /> View Lifecycle
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
