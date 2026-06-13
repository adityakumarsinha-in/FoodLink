import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useFood } from '../context/FoodContext';
import FoodCard from '../components/FoodCard';
import EmptyState from '../components/EmptyState';
import { Truck, Navigation } from 'lucide-react';

const VolunteerPickups = () => {
  const { currentUser } = useAuth();
  const { listings } = useFood();

  // 1. Listings claimed by an NGO but no volunteer assigned yet
  const availablePickups = listings.filter(
    (l) => l.status === 'claimed' && l.volunteerId === null
  );

  // 2. Active listings assigned to this volunteer and not delivered
  const myActiveMissions = listings.filter(
    (l) => l.volunteerId === currentUser?.id && l.status !== 'delivered'
  );

  return (
    <div className="space-y-10">
      
      {/* Active Work list */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-800 tracking-tight flex items-center gap-2">
            <Truck className="h-6 w-6 text-emerald-600" /> My Active Pickups
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm">Deliveries currently assigned to you. Keep your statuses updated in real-time during transit.</p>
        </div>

        {myActiveMissions.length === 0 ? (
          <EmptyState
            title="No active deliveries"
            message="You don't have any active pickup missions. Accept an unassigned claim from the list below!"
            icon={Truck}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myActiveMissions.map((item) => (
              <FoodCard
                key={item.id}
                food={item}
              />
            ))}
          </div>
        )}
      </div>

      <hr className="border-slate-100" />

      {/* Available Jobs list */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold font-display text-slate-800 tracking-tight flex items-center gap-2">
            <Navigation className="h-5.5 w-5.5 text-emerald-600 animate-pulse" /> Unassigned Transport Missions
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm">Nearby claimed food awaiting a volunteer courier to initiate pickup.</p>
        </div>

        {availablePickups.length === 0 ? (
          <EmptyState
            title="All caught up!"
            message="There are no pending unassigned NGO claims at the moment. Good job, team!"
            icon={Navigation}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availablePickups.map((item) => (
              <FoodCard
                key={item.id}
                food={item}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default VolunteerPickups;
