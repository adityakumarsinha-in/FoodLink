import React, { useState } from 'react';
import { useFood } from '../context/FoodContext';
import { useAuth } from '../context/AuthContext';
import { Map, MapPin, Compass, Search, Sliders, ChevronRight, Award, Plus, Check } from 'lucide-react';

const MapPage = () => {
  const { listings, claimFoodListing } = useFood();
  const { currentUser } = useAuth();
  
  const [radius, setRadius] = useState(3.0); // radius in miles
  const [selectedPin, setSelectedPin] = useState(null);
  
  // Filter listings based on radius (simulation distance)
  const mapListings = listings.filter(
    (l) => l.status === 'available' && l.distance <= radius
  );

  const handleClaim = (id) => {
    if (!currentUser) return;
    claimFoodListing(id, currentUser.id, currentUser.name);
    setSelectedPin(null);
  };

  // Convert lat/lng coordinates to standard SVG percentages for rendering
  // Coordinates are centered around lat: 40.7128, lng: -74.0060 (Green City Base)
  const getSvgCoordinates = (coords) => {
    if (!coords) return { x: 50, y: 50 };
    
    // Simple math projection to map viewport
    const latOffset = coords.lat - 40.7128;
    const lngOffset = coords.lng - (-74.0060);

    const x = 50 + lngOffset * 2200; // scaling factor
    const y = 50 - latOffset * 2200;

    // Boundary constraints
    return {
      x: Math.max(10, Math.min(90, x)),
      y: Math.max(10, Math.min(90, y))
    };
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold font-display text-slate-800 tracking-tight">Interactive Food Map</h2>
        <p className="text-slate-500 text-xs sm:text-sm">Locate fresh surplus food listings near your coordinates visually.</p>
      </div>

      {/* Main Grid: Map canvas on left, details on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Map Panel */}
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-xs min-h-[450px] relative flex flex-col justify-between">
          
          {/* Top Info Bar */}
          <div className="absolute top-4 left-4 right-4 z-10 flex flex-col sm:flex-row gap-3">
            <div className="glass px-4 py-2.5 rounded-2xl flex items-center gap-2 text-xs font-semibold text-slate-700 shadow-sm">
              <Compass className="h-4.5 w-4.5 text-emerald-600 animate-spin-slow" />
              <span>Center: Green City Hub (My Location)</span>
            </div>
            
            {/* Radius Slider */}
            <div className="glass px-4 py-2 rounded-2xl flex items-center gap-3 text-xs font-semibold text-slate-700 shadow-sm flex-1 sm:max-w-xs">
              <Sliders className="h-4 w-4 text-emerald-600 shrink-0" />
              <div className="flex-1 flex items-center gap-2">
                <input
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.5"
                  value={radius}
                  onChange={(e) => setRadius(parseFloat(e.target.value))}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <span className="shrink-0 font-mono w-12 text-right">{radius.toFixed(1)} mi</span>
              </div>
            </div>
          </div>

          {/* Map SVG Canvas Area */}
          <div className="flex-1 bg-slate-50 relative overflow-hidden flex items-center justify-center p-4">
            
            {/* Background Map Grid Pattern */}
            <div className="absolute inset-0 bg-linear-to-b from-slate-100 to-slate-50/50" />
            <svg className="absolute inset-0 h-full w-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#000" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Custom Mock City Streets Drawing */}
            <svg className="absolute inset-0 h-full w-full opacity-30 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Rivers / Lakes */}
              <path d="M 0 90 Q 30 70 70 85 T 100 50 L 100 100 L 0 100 Z" fill="#e0f2fe" />
              {/* Main Roads */}
              <line x1="10" y1="0" x2="10" y2="100" stroke="#cbd5e1" strokeWidth="1.2" />
              <line x1="50" y1="0" x2="50" y2="100" stroke="#cbd5e1" strokeWidth="1.5" />
              <line x1="90" y1="0" x2="90" y2="100" stroke="#cbd5e1" strokeWidth="1.2" />
              <line x1="0" y1="30" x2="100" y2="30" stroke="#cbd5e1" strokeWidth="1.2" />
              <line x1="0" y1="70" x2="100" y2="70" stroke="#cbd5e1" strokeWidth="1.5" />
            </svg>

            {/* Pulsing Blue Location Pointer (User Location) */}
            <div 
              className="absolute h-8 w-8 -ml-4 -mt-4 flex items-center justify-center pointer-events-none"
              style={{ left: '50%', top: '50%' }}
            >
              <span className="absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-60 animate-ping" />
              <span className="relative inline-flex rounded-full h-4.5 w-4.5 bg-sky-600 border-2 border-white shadow-md" />
            </div>

            {/* Radius Scan Overlay Circle */}
            <div 
              className="absolute rounded-full border border-emerald-500/20 bg-emerald-500/[0.03] transition-all duration-300 pointer-events-none"
              style={{
                width: `${radius * 160}px`,
                height: `${radius * 160}px`,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            />

            {/* Listings Pins */}
            {mapListings.map((item) => {
              const pos = getSvgCoordinates(item.coordinates);
              const isSelected = selectedPin?.id === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedPin(item)}
                  className="absolute p-1 -translate-x-1/2 -translate-y-1/2 focus:outline-hidden hover:scale-110 active:scale-95 transition-transform duration-200"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                >
                  <MapPin className={`h-8 w-8 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] ${
                    isSelected ? 'text-emerald-700' : 'text-emerald-500 animate-bounce-slow'
                  }`} />
                </button>
              );
            })}

          </div>

          {/* Quick Stats Overlay footer */}
          <div className="p-4 bg-slate-900 text-slate-400 text-xs flex justify-between items-center z-10">
            <span>Redistribution Area Scan Completed</span>
            <span className="font-semibold text-emerald-400 font-mono">{mapListings.length} Pins visible</span>
          </div>

        </div>

        {/* Sidebar Detail Panel */}
        <div className="lg:col-span-4 bg-white border border-slate-100 p-6 rounded-3xl shadow-xs flex flex-col justify-between min-h-[450px]">
          
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-display mb-4">Location Scanner</h3>
            
            {selectedPin ? (
              <div className="space-y-4 animate-fade-in">
                
                {/* Image */}
                <div className="h-28 bg-slate-100 rounded-xl overflow-hidden relative">
                  <img
                    src={selectedPin.imageUrl}
                    alt={selectedPin.foodName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-white/95 px-2 py-0.5 rounded-md text-[10px] font-bold text-slate-800">
                    {selectedPin.category}
                  </div>
                </div>

                {/* Details */}
                <div>
                  <h4 className="font-bold text-slate-800 text-sm font-display leading-tight">{selectedPin.foodName}</h4>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100/50 px-2 py-0.5 rounded-sm inline-block mt-1">
                    {selectedPin.quantity}
                  </span>
                </div>

                <p className="text-xs text-slate-500 line-clamp-3">
                  {selectedPin.description}
                </p>

                <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-50 pt-3">
                  <p><span className="text-slate-400 font-medium">Provider:</span> {selectedPin.providerName}</p>
                  <p><span className="text-slate-400 font-medium">Address:</span> {selectedPin.pickupAddress}</p>
                  <p className="text-emerald-600 font-semibold flex items-center gap-1">
                    <Compass className="h-3.5 w-3.5" /> Approx {selectedPin.distance} miles away
                  </p>
                </div>

                {/* NGO/Needy claim trigger */}
                {(currentUser?.role === 'ngo' || currentUser?.role === 'needy') && (
                  <button
                    onClick={() => handleClaim(selectedPin.id)}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-4"
                  >
                    <Check className="h-4 w-4" /> Claim Surplus Meal
                  </button>
                )}

              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400">
                <MapPin className="h-10 w-10 text-slate-300 mb-2 animate-bounce" />
                <p className="text-xs font-semibold text-slate-500">No Pin Selected</p>
                <p className="text-[11px] max-w-[200px] mt-1">Click on any map marker pin inside the radius circles to inspect food listings details.</p>
              </div>
            )}
          </div>

          {selectedPin && (
            <button
              onClick={() => setSelectedPin(null)}
              className="w-full py-1.5 border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors mt-6 cursor-pointer"
            >
              Clear Selection
            </button>
          )}

        </div>

      </div>

    </div>
  );
};

export default MapPage;
