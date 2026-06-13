import React from 'react';
import { useAuth } from '../context/AuthContext';
import { HeartHandshake, ShieldCheck, Mail, MapPin } from 'lucide-react';

const AdminNGOs = () => {
  const { users } = useAuth();
  
  // Filter for NGO accounts
  const ngos = users.filter(u => u.role === 'ngo');

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold font-display text-slate-800 tracking-tight">NGO Registry</h2>
        <p className="text-slate-500 text-xs sm:text-sm">Review, verify, and monitor partner charity shelters active on FoodLink.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ngos.map((ngo) => (
          <div key={ngo.id} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-xs space-y-4 hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 h-1.5 w-full bg-indigo-500" />
            
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-bold font-display">
                    {ngo.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 font-display leading-tight">{ngo.name}</h4>
                    <span className="text-[10px] bg-indigo-50 border border-indigo-100 text-indigo-700 px-2 py-0.5 rounded-sm font-semibold mt-1 inline-block">
                      {ngo.orgType || 'NGO Shelter'}
                    </span>
                  </div>
                </div>

                <span className="flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-md font-bold uppercase shrink-0">
                  <ShieldCheck className="h-3 w-3 fill-emerald-100" /> Verified
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-50 text-center">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Meals Delivered</span>
                  <span className="text-lg font-black text-slate-800 font-display">{ngo.mealsDistributed || 980}</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Total Claims</span>
                  <span className="text-lg font-black text-slate-800 font-display">{ngo.claimsCount || 38}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-500 pt-1">
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  <span>{ngo.email}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>{ngo.address}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-50 flex gap-2">
              <button 
                onClick={() => alert(`Reviewing documents for ${ngo.name}...`)}
                className="flex-1 py-1.5 border border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all cursor-pointer text-center"
              >
                Inspect Credentials
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default AdminNGOs;
