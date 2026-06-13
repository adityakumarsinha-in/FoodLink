import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useFood } from '../context/FoodContext';
import EmptyState from '../components/EmptyState';
import { History, Check, Calendar, Award } from 'lucide-react';

const VolunteerHistory = () => {
  const { currentUser } = useAuth();
  const { listings } = useFood();

  // Filter listings assigned/delivered by this volunteer that are marked DELIVERED
  const completedMissions = listings.filter(
    (l) => l.volunteerId === currentUser?.id && l.status === 'delivered'
  );

  return (
    <div className="space-y-6">
      
      <div>
        <h2 className="text-2xl font-bold font-display text-slate-800 tracking-tight">Completed Deliveries</h2>
        <p className="text-slate-500 text-xs sm:text-sm">Log of your successful food distribution pickups.</p>
      </div>

      {completedMissions.length === 0 ? (
        <EmptyState
          title="No completed deliveries yet"
          message="You haven't completed any pickups yet. Claim and fulfill a mission to earn impact badges!"
          icon={History}
          actionText="Find Missions"
          onAction={() => window.location.href = '/dashboard/volunteer/pickups'}
        />
      ) : (
        <div className="bg-white border border-slate-100 rounded-2xl shadow-xs overflow-hidden">
          <div className="divide-y divide-slate-100">
            {completedMissions.map((item) => {
              const deliveryDate = item.deliveredAt ? new Date(item.deliveredAt) : new Date();
              const formattedDate = deliveryDate.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }) + ' at ' + deliveryDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              
              return (
                <div key={item.id} className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-slate-50/50 transition-colors animate-fade-in">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-800 font-display">{item.foodName}</h4>
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-sm border border-emerald-100">
                        {item.quantity}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-medium">Provider: {item.providerName}</p>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      <span>Delivered on {formattedDate}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-start sm:self-center">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Award Points</span>
                      <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
                        <Award className="h-3.5 w-3.5 fill-emerald-100" /> +15 Points
                      </span>
                    </div>
                    <div className="h-9 w-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <Check className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};

export default VolunteerHistory;
