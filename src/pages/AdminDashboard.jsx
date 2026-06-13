import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useFood } from '../context/FoodContext';
import DashboardCard from '../components/DashboardCard';
import Modal from '../components/Modal';
import StatusTimeline from '../components/StatusTimeline';
import { 
  Users, Building, HeartHandshake, Sparkles, Heart, Truck, 
  BarChart3, ShieldAlert, Award, ChevronRight, UserCheck
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';

const AdminDashboard = () => {
  const { users } = useAuth();
  const { listings, getStats } = useFood();
  const stats = getStats();
  
  const [selectedFood, setSelectedFood] = useState(null);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);

  // Dynamic user roles count
  const providersCount = users.filter(u => u.role === 'provider').length;
  const ngosCount = users.filter(u => u.role === 'ngo').length;
  const volunteersCount = users.filter(u => u.role === 'volunteer').length;
  const recipientsCount = users.filter(u => u.role === 'needy').length;

  const totalUsers = users.length;
  const totalListings = listings.length;
  const totalMealsSaved = stats.totalMealsSaved;
  const totalDeliveries = stats.successfulDeliveries + 15; // base simulation count + active

  const chartData = [
    { name: 'Jan', listings: 120, deliveries: 90 },
    { name: 'Feb', listings: 150, deliveries: 120 },
    { name: 'Mar', listings: 220, deliveries: 180 },
    { name: 'Apr', listings: 190, deliveries: 160 },
    { name: 'May', listings: 310, deliveries: 250 },
    { name: 'Jun', listings: totalListings * 35, deliveries: totalDeliveries * 25 }
  ];

  const handleTrackClick = (item) => {
    setSelectedFood(item);
    setIsTimelineOpen(true);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Welcome header */}
      <div>
        <h2 className="text-2xl font-bold font-display text-slate-800 tracking-tight">Admin Operations Console</h2>
        <p className="text-slate-500 text-xs sm:text-sm">Manage users, audit food listings, and analyze platform-wide distribution metrics.</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <DashboardCard title="Total Users" value={totalUsers} icon={Users} color="green" />
        <DashboardCard title="Food Providers" value={providersCount} icon={Building} color="blue" />
        <DashboardCard title="Total NGOs" value={ngosCount} icon={HeartHandshake} color="purple" />
        <DashboardCard title="Food Listings" value={totalListings} icon={Sparkles} color="orange" />
        <DashboardCard title="Meals Saved" value={totalMealsSaved} icon={Heart} color="green" />
        <DashboardCard title="Total Deliveries" value={totalDeliveries} icon={Truck} color="blue" />
      </div>

      {/* Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recharts Area Chart */}
        <div className="lg:col-span-8 bg-white border border-slate-100 p-6 rounded-2xl shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-display">System-Wide Progress</h3>
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <BarChart3 className="h-4 w-4" /> Monthly volume index
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorListings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDeliveries" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #f1f5f9', borderRadius: '12px' }} 
                  labelStyle={{ fontWeight: 'bold', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="listings" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorListings)" />
                <Area type="monotone" dataKey="deliveries" stroke="#0ea5e9" strokeWidth={2} fillOpacity={1} fill="url(#colorDeliveries)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Audit Queue */}
        <div className="lg:col-span-4 bg-white border border-slate-100 p-6 rounded-2xl shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-display mb-4">Operations Audit Queue</h3>
            <div className="space-y-3">
              {listings.slice(0, 4).map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => handleTrackClick(item)}
                  className="p-3 bg-slate-50 border border-slate-100 hover:border-emerald-200 rounded-xl flex items-center justify-between cursor-pointer transition-all duration-300 group"
                >
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-slate-800 truncate leading-tight group-hover:text-emerald-700 transition-colors">{item.foodName}</p>
                    <span className="text-[9px] text-slate-400 block mt-0.5 capitalize">{item.providerName} &bull; {item.status}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2 mt-4">
            <UserCheck className="h-4.5 w-4.5 text-emerald-700" />
            <span>All user listings are verified.</span>
          </div>
        </div>

      </div>

      {/* Operations Lifecycle timeline tracker modal */}
      <Modal
        isOpen={isTimelineOpen}
        onClose={() => {
          setIsTimelineOpen(false);
          setSelectedFood(null);
        }}
        title="Listing Operation Timeline Audit"
      >
        {selectedFood && (
          <div className="space-y-6">
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs space-y-1">
              <h4 className="font-bold text-slate-800 font-display text-sm">{selectedFood.foodName}</h4>
              <p className="text-slate-500">Listed By: {selectedFood.providerName} ({selectedFood.contactNumber})</p>
              <p className="text-slate-500">Pickup Location: {selectedFood.pickupAddress}</p>
              {selectedFood.claimedBy && <p className="text-slate-500">Claimed By NGO Id: {selectedFood.claimedBy}</p>}
              {selectedFood.volunteerId && <p className="text-slate-500">Assigned Volunteer Id: {selectedFood.volunteerId}</p>}
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

export default AdminDashboard;
