import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Heart, ClipboardList, CheckCircle2, Users, Plus, 
  ArrowRight, BarChart3, AlertCircle, ShoppingBag
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useFood } from '../context/FoodContext';
import DashboardCard from '../components/DashboardCard';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const ProviderDashboard = () => {
  const { currentUser } = useAuth();
  const { listings } = useFood();
  const navigate = useNavigate();

  // Filter listings for this specific provider
  const myListings = listings.filter(l => l.providerId === currentUser?.id);
  
  // Calculate dynamic stats
  const activeCount = myListings.filter(l => l.status === 'available').length;
  const deliveredListings = myListings.filter(l => l.status === 'delivered');
  const deliveredCount = deliveredListings.length;

  const totalMealsShared = deliveredListings.reduce((acc, curr) => {
    return acc + (parseInt(curr.quantity) || 10);
  }, 0) + (currentUser?.mealsSharedCount || 0);

  const peopleHelped = totalMealsShared * 1.2; // Estimation logic

  // Mock analytics data for donation history chart
  const chartData = [
    { name: 'Mon', meals: 45 },
    { name: 'Tue', meals: 65 },
    { name: 'Wed', meals: 30 },
    { name: 'Thu', meals: 80 },
    { name: 'Fri', meals: 120 },
    { name: 'Sat', meals: 95 },
    { name: 'Sun', meals: totalMealsShared > 0 ? Math.min(totalMealsShared, 150) : 40 }
  ];

  const recentListings = myListings.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-800 tracking-tight">Provider Dashboard</h2>
          <p className="text-slate-500 text-xs sm:text-sm">Welcome back, {currentUser?.name}. Manage your surplus food redistribution.</p>
        </div>
        <Link
          to="/dashboard/provider/add-food"
          className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 self-start cursor-pointer"
        >
          <Plus className="h-4.5 w-4.5" /> List Excess Food
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard 
          title="Total Meals Shared" 
          value={totalMealsShared} 
          subtext="Cumulative meals donated"
          icon={Heart} 
          color="green" 
        />
        <DashboardCard 
          title="Active Listings" 
          value={activeCount} 
          subtext="Awaiting NGO claims"
          icon={ClipboardList} 
          color="orange" 
        />
        <DashboardCard 
          title="Successful Deliveries" 
          value={deliveredCount} 
          subtext="Safely reached shelters"
          icon={CheckCircle2} 
          color="blue" 
        />
        <DashboardCard 
          title="People Helped" 
          value={Math.round(peopleHelped)} 
          subtext="Estimated individuals fed"
          icon={Users} 
          color="purple" 
        />
      </div>

      {/* Chart & Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recharts Analytics Card */}
        <div className="lg:col-span-8 bg-white border border-slate-100 p-6 rounded-2xl shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-display">Redistribution Impact Trend</h3>
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <BarChart3 className="h-4 w-4" /> Weekly meals saved
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMeals" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #f1f5f9', borderRadius: '12px' }} 
                  labelStyle={{ fontWeight: 'bold', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="meals" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorMeals)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity List */}
        <div className="lg:col-span-4 bg-white border border-slate-100 p-6 rounded-2xl shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-display mb-4">Active Operations</h3>
            <div className="space-y-4">
              {recentListings.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs">
                  No listings created yet.
                </div>
              ) : (
                recentListings.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">{item.foodName}</p>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{item.quantity} • {item.category}</span>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-sm font-semibold uppercase ${
                      item.status === 'available' ? 'bg-emerald-50 text-emerald-700' :
                      item.status === 'delivered' ? 'bg-teal-50 text-teal-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <Link
            to="/dashboard/provider/listings"
            className="w-full py-2.5 border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5 transition-all mt-4 cursor-pointer"
          >
            Manage Listings <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ProviderDashboard;
