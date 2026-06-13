import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Image, MapPin, Phone, Coffee, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useFood } from '../context/FoodContext';

// Preset sample photos to make demoing effortless and beautiful
const IMAGE_PRESETS = [
  { label: 'Veg Biryani / Cooked', url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600&auto=format&fit=crop' },
  { label: 'Breads & Bakery', url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop' },
  { label: 'Salad / Fruit bowl', url: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=600&auto=format&fit=crop' },
  { label: 'Dairy / Groceries', url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=600&auto=format&fit=crop' }
];

const ProviderAddFood = () => {
  const { currentUser } = useAuth();
  const { addFoodListing } = useFood();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    foodName: '',
    quantity: '',
    category: 'Cooked Meals',
    description: '',
    preparationTime: new Date().toISOString().slice(0, 16), // Current local ISO time
    expiryTime: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString().slice(0, 16), // Default +12 hours
    pickupAddress: currentUser?.address || '',
    contactNumber: currentUser?.phone || '',
    imageUrl: IMAGE_PRESETS[0].url // Default to Biryani preset
  });

  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess('');

    addFoodListing(formData);
    setSuccess('Surplus food listed successfully! Redirecting...');
    
    // Redirect to listings page after brief delay
    setTimeout(() => {
      navigate('/dashboard/provider/listings');
    }, 1200);
  };

  const selectPresetImage = (url) => {
    setFormData(prev => ({ ...prev, imageUrl: url }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      <div>
        <h2 className="text-2xl font-bold font-display text-slate-800 tracking-tight flex items-center gap-2">
          <PlusCircle className="h-6 w-6 text-emerald-600 animate-pulse" /> Post Surplus Food
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm">List freshly cooked meals or groceries so local NGOs can claim them quickly.</p>
      </div>

      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 text-sm font-semibold rounded-xl animate-fade-in">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-slate-100 p-6 rounded-3xl shadow-xs space-y-6">
        
        {/* Row 1: Food Name & Quantity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Food Item Title</label>
            <input
              type="text"
              required
              placeholder="e.g., Paneer Butter Masala & Parathas"
              value={formData.foodName}
              onChange={(e) => setFormData({ ...formData, foodName: e.target.value })}
              className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Quantity / Servings</label>
            <input
              type="text"
              required
              placeholder="e.g., 30 Meals, 10 kg, 4 Boxes"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        {/* Row 2: Category & Preparation time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Food Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3.5 py-2 border border-slate-200 bg-white rounded-xl text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            >
              <option>Cooked Meals</option>
              <option>Bakery</option>
              <option>Dairy</option>
              <option>Fruits & Salads</option>
              <option>Groceries</option>
              <option>Beverages</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description / Ingredients</label>
            <textarea
              rows="1"
              placeholder="e.g., Veg Fried Rice. Fresh, packaged in disposable trays. Stored cold."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        {/* Row 3: Timings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-slate-400" /> Preparation Time
            </label>
            <input
              type="datetime-local"
              required
              value={formData.preparationTime}
              onChange={(e) => setFormData({ ...formData, preparationTime: e.target.value })}
              className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-red-400 animate-pulse" /> Estimated Expiry Time
            </label>
            <input
              type="datetime-local"
              required
              value={formData.expiryTime}
              onChange={(e) => setFormData({ ...formData, expiryTime: e.target.value })}
              className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        {/* Row 4: Pickup Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-slate-400" /> Pickup Address
            </label>
            <input
              type="text"
              required
              value={formData.pickupAddress}
              onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
              className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
              <Phone className="h-3.5 w-3.5 text-slate-400" /> Contact Number
            </label>
            <input
              type="text"
              required
              value={formData.contactNumber}
              onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
              className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        {/* Row 5: Food Image Preset selector */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
              <Image className="h-3.5 w-3.5 text-slate-400" /> Food Image URL
            </label>
            <input
              type="url"
              required
              placeholder="https://..."
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          {/* Presets buttons */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Or select a high-res demo preset:</span>
            <div className="flex flex-wrap gap-2">
              {IMAGE_PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => selectPresetImage(p.url)}
                  className={`px-3 py-1.5 border rounded-xl text-[10px] font-bold transition-all hover:bg-slate-50 active:scale-95 cursor-pointer ${
                    formData.imageUrl === p.url ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-sm hover:shadow-md transition-all active:scale-98 cursor-pointer"
        >
          Post Listing Now
        </button>

      </form>
    </div>
  );
};

export default ProviderAddFood;
