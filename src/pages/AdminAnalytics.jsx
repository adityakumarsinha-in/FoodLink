import React from 'react';
import { useFood } from '../context/FoodContext';
import { useAuth } from '../context/AuthContext';
import { BarChart3, TrendingUp, Sparkles, PieChart as PieIcon } from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, 
  BarChart, Bar, PieChart, Pie, Cell, Legend 
} from 'recharts';

const AdminAnalytics = () => {
  const { listings } = useFood();
  const { users } = useAuth();

  // Dynamic user data
  const providerCount = users.filter(u => u.role === 'provider').length;
  const ngoCount = users.filter(u => u.role === 'ngo').length;
  const volunteerCount = users.filter(u => u.role === 'volunteer').length;
  const needyCount = users.filter(u => u.role === 'needy').length;

  const usersData = [
    { name: 'Providers', count: providerCount },
    { name: 'NGOs', count: ngoCount },
    { name: 'Volunteers', count: volunteerCount },
    { name: 'Recipients', count: needyCount }
  ];

  // Dynamic category counting
  const categoriesMap = listings.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.keys(categoriesMap).map(key => ({
    name: key,
    value: categoriesMap[key]
  }));

  // Standard fallback if listings are empty
  const defaultPieData = [
    { name: 'Cooked Meals', value: 45 },
    { name: 'Bakery', value: 25 },
    { name: 'Dairy', value: 15 },
    { name: 'Fruits & Salads', value: 10 },
    { name: 'Groceries', value: 5 }
  ];

  const chartPieData = pieData.length > 0 ? pieData : defaultPieData;

  const COLORS = ['#10b981', '#0ea5e9', '#6366f1', '#f59e0b', '#ec4899', '#8b5cf6'];

  // Impact timeline
  const impactData = [
    { month: 'Jan', saved: 150, carbon: 90 },
    { month: 'Feb', saved: 320, carbon: 210 },
    { month: 'Mar', saved: 480, carbon: 310 },
    { month: 'Apr', saved: 690, carbon: 450 },
    { month: 'May', saved: 920, carbon: 610 },
    { month: 'Jun', saved: 1250, carbon: 840 }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold font-display text-slate-800 tracking-tight">System Performance & Analytics</h2>
        <p className="text-slate-500 text-xs sm:text-sm">Real-time statistics auditing carbon offset savings and food waste reductions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 1. Sustainability Trend Area Chart */}
        <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 font-display flex items-center gap-1.5">
              <TrendingUp className="text-emerald-500 h-5 w-5" /> Carbon Offset & Food Savings
            </h3>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md font-bold uppercase">Impact index</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={impactData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSaved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #f1f5f9', borderRadius: '12px' }} 
                  labelStyle={{ fontWeight: 'bold', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="saved" name="Meals Saved" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorSaved)" />
                <Area type="monotone" dataKey="carbon" name="CO₂ Offset (kg)" stroke="#0ea5e9" strokeWidth={2} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. User Segments Bar Chart */}
        <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 font-display flex items-center gap-1.5">
              <BarChart3 className="text-sky-500 h-5 w-5" /> Active Network Registrants
            </h3>
            <span className="text-[10px] bg-sky-50 text-sky-700 px-2 py-0.5 rounded-md font-bold uppercase font-mono">User count</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usersData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #f1f5f9', borderRadius: '12px' }} 
                />
                <Bar dataKey="count" fill="#3b82f6" name="Users Registered" radius={[4, 4, 0, 0]} barSize={32}>
                  {usersData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Category Distribution Pie Chart */}
        <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-xs space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 font-display flex items-center gap-1.5">
              <PieIcon className="text-indigo-500 h-5 w-5" /> Food Distribution Categories
            </h3>
            <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md font-bold uppercase">Stock Share</span>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-4">
            <div className="h-56 w-56 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {chartPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Custom Legend */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
              {chartPieData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-xs shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-slate-800 truncate block leading-tight">{entry.name}</span>
                    <span className="text-[10px] text-slate-400 font-medium">Share: {entry.value} items</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminAnalytics;
