import React, { useState } from 'react';
import { useFood } from '../context/FoodContext';
import FoodCard from '../components/FoodCard';
import EmptyState from '../components/EmptyState';
import { ShoppingBag, Search, Filter } from 'lucide-react';

const NGOAvailableFood = () => {
  const { listings } = useFood();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter listings: must be available and not expired
  const availableListings = listings.filter(item => {
    const matchesStatus = item.status === 'available';
    const isNotExpired = new Date(item.expiryTime) > new Date();
    const matchesSearch = item.foodName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.providerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

    return matchesStatus && isNotExpired && matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Cooked Meals', 'Bakery', 'Dairy', 'Fruits & Salads', 'Groceries', 'Beverages'];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold font-display text-slate-800 tracking-tight">Available Food Listings</h2>
        <p className="text-slate-500 text-xs sm:text-sm">Claim surplus meals posted by nearby providers. Volunteers will help transport them.</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <input
            type="text"
            placeholder="Search by meal or provider..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
        </div>

        {/* Categories Scroller */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          <Filter className="h-4 w-4 text-slate-400 hidden sm:block shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all shrink-0 active:scale-95 cursor-pointer ${
                selectedCategory === cat 
                  ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs' 
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Grid */}
      {availableListings.length === 0 ? (
        <EmptyState
          title="No food listings found"
          message="There are no surplus meals matching your selected filters right now. Check back soon!"
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

export default NGOAvailableFood;
