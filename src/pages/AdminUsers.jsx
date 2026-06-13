import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Users, Search, Ban, UserCheck, ShieldAlert } from 'lucide-react';

const AdminUsers = () => {
  const { users } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRole === 'All' || user.role === selectedRole;

    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role) => {
    const colors = {
      provider: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      ngo: 'bg-indigo-50 text-indigo-700 border-indigo-100',
      volunteer: 'bg-sky-50 text-sky-700 border-sky-100',
      needy: 'bg-amber-50 text-amber-700 border-amber-100',
      admin: 'bg-rose-50 text-rose-700 border-rose-100'
    };
    return (
      <span className={`px-2 py-0.5 border text-xs font-semibold rounded-md capitalize ${colors[role] || 'bg-slate-50'}`}>
        {role}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold font-display text-slate-800 tracking-tight">Users Moderation</h2>
        <p className="text-slate-500 text-xs sm:text-sm">Vet, verify, or suspend accounts registered in the FoodLink network.</p>
      </div>

      {/* Filter and Search */}
      <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
        </div>

        {/* Roles Filter dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Role:</span>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-3 py-1.5 border border-slate-200 bg-white rounded-xl text-xs font-semibold text-slate-700 focus:outline-hidden focus:border-emerald-500"
          >
            <option value="All">All Roles</option>
            <option value="provider">Food Provider</option>
            <option value="ngo">NGO</option>
            <option value="volunteer">Volunteer</option>
            <option value="needy">Recipient</option>
            <option value="admin">Admin</option>
          </select>
        </div>

      </div>

      {/* Table */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-4">User Details</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Phone Number</th>
                <th className="px-6 py-4">Address</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center font-display font-bold text-slate-600">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 font-display">{user.name}</p>
                      <span className="text-[10px] text-slate-400">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-500">
                    {user.phone}
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate" title={user.address}>
                    {user.address}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => alert(`Simulated: Verification status updated for ${user.name}`)}
                        className="p-1.5 border border-slate-200 hover:border-emerald-200 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                        title="Verify Account"
                      >
                        <UserCheck className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => alert(`Simulated: ${user.name} has been suspended.`)}
                        className="p-1.5 border border-slate-200 hover:border-rose-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Suspend Account"
                      >
                        <Ban className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AdminUsers;
