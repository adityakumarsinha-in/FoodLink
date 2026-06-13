import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, CheckCircle2, Award, Navigation, ArrowRight, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useFood } from '../context/FoodContext';
import DashboardCard from '../components/DashboardCard';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const VolunteerDashboard = () => {
  const { currentUser } = useAuth();
  const { listings } = useFood();

  // Filter listings assigned/delivered by this volunteer
  const myMissions = listings.filter(l => l.volunteerId === currentUser?.id);
  const activeMissions = myMissions.filter(l => l.status !== 'delivered');
  const completedMissions = myMissions.filter(l => l.status === 'delivered');

  const totalDeliveries = completedMissions.length + (currentUser?.deliveriesCompleted || 0);
  const totalPoints = totalDeliveries * 15; // 15 points per delivery

  // Mock analytics data
  const chartData = [
    { name: 'Mon', miles: 2.5 },
    { name: 'Tue', miles: 5.4 },
    { name: 'Wed', miles: 0.0 },
    { name: 'Thu', miles: 4.8 },
    { name: 'Fri', miles: 8.2 },
    { name: 'Sat', miles: 6.0 },
    { name: 'Sun', miles: totalDeliveries > 0 ? parseFloat((totalDeliveries * 1.5).toFixed(1)) : 3.2 }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-800 tracking-tight">Volunteer Hub</h2>
          <p className="text-slate-500 text-xs sm:text-sm">Welcome back, {currentUser?.name}. Deliver hope by transporting surplus food meals.</p>
        </div>
        <Link
          to="/dashboard/volunteer/pickups"
          className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 self-start cursor-pointer"
        >
          <Truck className="h-4.5 w-4.5" /> View Pickup Missions
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard 
          title="Assigned Pickups" 
          value={activeMissions.length} 
          subtext="Missions currently active"
          icon={Truck} 
          color="orange" 
        />
        <DashboardCard 
          title="Completed Deliveries" 
          value={totalDeliveries} 
          subtext="Delivered to NGO hubs"
          icon={CheckCircle2} 
          color="green" 
        />
        <DashboardCard 
          title="Impact Points" 
          value={totalPoints} 
          subtext="Eco-points earned"
          icon={Award} 
          color="purple" 
        />
        <DashboardCard 
          title="Volunteer Rating" 
          value="4.9" 
          subtext="Based on pickup reliability"
          icon={Star} 
          color="blue" 
        />
      </div>

      {/* Charts & Map link section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recharts Area Chart */}
        <div className="lg:col-span-8 bg-white border border-slate-100 p-6 rounded-2xl shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-display">Transit Distance</h3>
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <Navigation className="h-4 w-4" /> Weekly miles traveled
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMiles" x1="0" y1="0" x2="0" y2="1">
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
                <Area type="monotone" dataKey="miles" stroke="#0ea5e9" strokeWidth={2.5} fillOpacity={1} fill="url(#colorMiles)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Action Panel */}
        <div className="lg:col-span-4 bg-white border border-slate-100 p-6 rounded-2xl shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-display">Active Mission</h3>
            {activeMissions.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs">
                No active pickups. Head to the pickups list to accept new requests!
              </div>
            ) : (
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                <div className="flex justify-between items-start">
                  <h4 className="text-xs font-bold text-slate-800 leading-tight">{activeMissions[0].foodName}</h4>
                  <span className="text-[9px] px-1.5 py-0.5 bg-amber-100 text-amber-800 font-bold uppercase rounded-sm">
                    {activeMissions[0].status}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 leading-normal">From: {activeMissions[0].pickupAddress}</p>
                <Link
                  to="/dashboard/volunteer/pickups"
                  className="w-full text-center py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold rounded-lg block transition-colors mt-2"
                >
                  Update Status
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/dashboard/volunteer/history"
            className="w-full py-2.5 border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5 transition-all mt-4 cursor-pointer"
          >
            Delivery Log History <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default VolunteerDashboard;
