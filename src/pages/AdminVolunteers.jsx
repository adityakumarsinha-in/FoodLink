import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Award, MapPin, Truck } from 'lucide-react';

const AdminVolunteers = () => {
  const { users } = useAuth();
  
  // Filter for volunteer accounts
  const volunteers = users.filter(u => u.role === 'volunteer');

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold font-display text-slate-800 tracking-tight">Volunteers Register</h2>
        <p className="text-slate-500 text-xs sm:text-sm">Manage, reward, or contact active community couriers helping with food transport.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {volunteers.map((vol) => {
          const completedCount = vol.deliveriesCompleted || 15;
          const points = completedCount * 15;

          return (
            <div key={vol.id} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-xs space-y-4 hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 h-1.5 w-full bg-sky-500" />
              
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-sky-50 rounded-xl flex items-center justify-center text-sky-600 font-bold font-display">
                      {vol.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 font-display leading-tight">{vol.name}</h4>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{vol.email}</span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-sky-50 border border-sky-100 text-sky-700 px-2 py-0.5 rounded-md font-bold uppercase shrink-0">
                    Active
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-50 text-center">
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Deliveries</span>
                    <span className="text-base font-black text-slate-800 font-display">{completedCount}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Eco Points</span>
                    <span className="text-base font-black text-emerald-600 font-display flex items-center justify-center gap-0.5">
                      <Award className="h-4.5 w-4.5 fill-emerald-100" /> {points}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Vehicle</span>
                    <span className="text-xs font-bold text-slate-700 block truncate mt-1">{vol.vehicleType || 'Car'}</span>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-slate-500 pt-1">
                  <div className="flex items-center gap-2">
                    <Truck className="h-3.5 w-3.5 text-slate-400" />
                    <span>Active Duties: {vol.deliveriesAssigned || 0} Pickups</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span className="truncate">{vol.address}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-50 flex gap-2">
                <button 
                  onClick={() => alert(`Sending message to volunteer ${vol.name}`)}
                  className="flex-1 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-800 rounded-xl text-xs font-bold transition-all cursor-pointer text-center"
                >
                  Contact Courier
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

export default AdminVolunteers;
