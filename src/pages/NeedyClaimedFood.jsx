import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useFood } from '../context/FoodContext';
import FoodCard from '../components/FoodCard';
import EmptyState from '../components/EmptyState';
import Modal from '../components/Modal';
import StatusTimeline from '../components/StatusTimeline';
import { CheckSquare } from 'lucide-react';

const NeedyClaimedFood = () => {
  const { currentUser } = useAuth();
  const { listings } = useFood();
  const [selectedFood, setSelectedFood] = useState(null);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);

  // Filter listings claimed by this recipient
  const myClaims = listings.filter((l) => l.claimedBy === currentUser?.id);

  const handleViewTimeline = (item) => {
    setSelectedFood(item);
    setIsTimelineOpen(true);
  };

  return (
    <div className="space-y-6">
      
      <div>
        <h2 className="text-2xl font-bold font-display text-slate-800 tracking-tight">My Claimed Meals</h2>
        <p className="text-slate-500 text-xs sm:text-sm">View and track your claimed food orders. Contact the provider or wait for volunteer transport details.</p>
      </div>

      {myClaims.length === 0 ? (
        <EmptyState
          title="No claims yet"
          message="You haven't claimed any free surplus food yet. Head to the listings feed to find nearby meals!"
          icon={CheckSquare}
          actionText="Find Nearby Food"
          onAction={() => window.location.href = '/dashboard/needy'}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myClaims.map((item) => (
            <FoodCard
              key={item.id}
              food={item}
              onViewTimeline={handleViewTimeline}
            />
          ))}
        </div>
      )}

      {/* Timeline tracking modal */}
      <Modal
        isOpen={isTimelineOpen}
        onClose={() => {
          setIsTimelineOpen(false);
          setSelectedFood(null);
        }}
        title="Meal Delivery Status"
      >
        {selectedFood && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
              <h4 className="font-bold text-slate-800 font-display text-sm">{selectedFood.foodName}</h4>
              <p className="text-xs text-slate-500">Provider: {selectedFood.providerName}</p>
              <p className="text-xs text-slate-500">Contact Number: {selectedFood.contactNumber}</p>
              <p className="text-xs text-slate-500">Pickup Address: {selectedFood.pickupAddress}</p>
            </div>
            
            <div className="py-4 border-y border-slate-50">
              <StatusTimeline status={selectedFood.status} />
            </div>

            <div className="text-center text-xs text-slate-400 font-medium">
              Food Status Flow: Available &rarr; Claimed &rarr; Scheduled &rarr; Picked Up &rarr; Delivered
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};

export default NeedyClaimedFood;
