import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useFood } from '../context/FoodContext';
import FoodCard from '../components/FoodCard';
import EmptyState from '../components/EmptyState';
import { ShoppingBag, Heart, Search } from 'lucide-react';

const NeedyDashboard = () => {
  const { currentUser } = useAuth();
  const { listings } = useFood();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter listings: must be available, not expired
  const availableListings = listings.filter((item) => {
    const isAvailable = item.status === 'available';
    const isNotExpired = new Date(item.expiryTime) > new Date();
    const matchesSearch = 
      item.foodName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.pickupAddress.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.providerName.toLowerCase().includes(searchTerm.toLowerCase());

    return isAvailable && isNotExpired && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold font-display text-slate-800 tracking-tight flex items-center gap-2">
          <Heart className="h-6 w-6 text-emerald-600 fill-emerald-100" /> Nearby Available Food
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm">Claim free edible meals or bakery products posted by restaurants near you.</p>
      </div>

      {/* Accessible Search Bar */}
      <div className="relative w-full max-w-md bg-white border border-slate-100 p-2.5 rounded-2xl shadow-2xs">
        <input
          type="text"
          placeholder="Type name, restaurant, or street address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
        />
        <Search className="absolute left-6 top-5 h-4.5 w-4.5 text-slate-400" />
      </div>

      {/* Listings */}
      {availableListings.length === 0 ? (
        <EmptyState
          title="No food listings nearby"
          message="No free surplus meals are listed right now. Check back in a few hours!"
          icon={ShoppingBag}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableListings.map((item) => (
            <FoodCard
              key={item.id}
              food={item}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default NeedyDashboard;
