import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, ClipboardCheck, Truck, Users, ArrowRight,
  Sparkles, CheckCircle2, ChevronRight, Play
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useFood } from '../context/FoodContext';
import DashboardCard from '../components/DashboardCard';
import Modal from '../components/Modal';
import StatusTimeline from '../components/StatusTimeline';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const NGODashboard = () => {
  const { currentUser } = useAuth();
  const { listings } = useFood();
  const navigate = useNavigate();
  const [selectedFood, setSelectedFood] = useState(null);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);

  // Filter listings claimed by this specific NGO
  const myClaims = listings.filter(l => l.claimedBy === currentUser?.id);
  const activeClaims = myClaims.filter(l => l.status !== 'delivered');
  const deliveredCount = myClaims.filter(l => l.status === 'delivered').length;

  const totalMealsClaimed = myClaims.reduce((acc, curr) => {
    return acc + (parseInt(curr.quantity) || 10);
  }, 0) + (currentUser?.mealsDistributed || 0);

  // Mock analytics data
  const chartData = [
    { name: 'Mon', claimed: 20 },
    { name: 'Tue', claimed: 40 },
    { name: 'Wed', claimed: 15 },
    { name: 'Thu', claimed: 50 },
    { name: 'Fri', claimed: 90 },
    { name: 'Sat', claimed: 60 },
    { name: 'Sun', claimed: totalMealsClaimed > 0 ? Math.min(totalMealsClaimed, 80) : 35 }
  ];

  const handleTrackClick = (item) => {
    setSelectedFood(item);
    setIsTimelineOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-800 tracking-tight">NGO Dashboard</h2>
          <p className="text-slate-500 text-xs sm:text-sm">Welcome back, {currentUser?.name}. Locate and claim surplus meals for distribution.</p>
        </div>
        <Link
          to="/dashboard/ngo/available"
          className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 self-start cursor-pointer"
        >
          <ShoppingBag className="h-4.5 w-4.5" /> Find Available Food
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard 
          title="Total Meals Claimed" 
          value={totalMealsClaimed} 
          subtext="Total food bags secured"
          icon={ShoppingBag} 
          color="green" 
        />
        <DashboardCard 
          title="Active Claims" 
          value={activeClaims.length} 
          subtext="In transit or scheduled"
          icon={Truck} 
          color="orange" 
        />
        <DashboardCard 
          title="Meals Distributed" 
          value={deliveredCount} 
          subtext="Successfully delivered"
          icon={CheckCircle2} 
          color="blue" 
        />
        <DashboardCard 
          title="Volunteer Partners" 
          value={12} 
          subtext="Registered transport links"
          icon={Users} 
          color="purple" 
        />
      </div>

      {/* Analytics chart and current tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recharts Bar Analytics */}
        <div className="lg:col-span-7 bg-white border border-slate-100 p-6 rounded-2xl shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-display">Acquisition Trend</h3>
            <span className="text-xs text-slate-500 font-semibold uppercase">Weekly Claims Graph</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #f1f5f9', borderRadius: '12px' }} 
                  labelStyle={{ fontWeight: 'bold', fontSize: '12px' }}
                />
                <Bar dataKey="claimed" fill="#10b981" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dynamic active status timeline tracking list */}
        <div className="lg:col-span-5 bg-white border border-slate-100 p-6 rounded-2xl shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-display mb-4">Operations Tracker</h3>
            <div className="space-y-4">
              {activeClaims.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs">
                  No active claims at the moment.
                </div>
              ) : (
                activeClaims.map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => handleTrackClick(item)}
                    className="p-3.5 bg-slate-50 border border-slate-100 hover:border-emerald-200 rounded-xl flex items-center justify-between cursor-pointer transition-all duration-300 group"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 group-hover:text-emerald-700 transition-colors truncate">{item.foodName}</p>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{item.quantity} • {item.providerName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[9px] px-1.5 py-0.5 bg-amber-50 text-amber-700 font-bold uppercase rounded-sm">
                        {item.status}
                      </span>
                      <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <Link
            to="/dashboard/ngo/claimed"
            className="w-full py-2.5 border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5 transition-all mt-4 cursor-pointer"
          >
            Track Claimed History <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>

      {/* Operations Lifecycle timeline tracker modal */}
      <Modal
        isOpen={isTimelineOpen}
        onClose={() => {
          setIsTimelineOpen(false);
          setSelectedFood(null);
        }}
        title="Delivery Status Timeline"
      >
        {selectedFood && (
          <div className="space-y-6">
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
              <h4 className="font-bold text-slate-800 font-display text-sm">{selectedFood.foodName}</h4>
              <p className="text-xs text-slate-500 mt-1">Provider: {selectedFood.providerName}</p>
              <p className="text-xs text-slate-500 mt-0.5">Address: {selectedFood.pickupAddress}</p>
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

export default NGODashboard;
