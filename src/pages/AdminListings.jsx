import React, { useState } from 'react';
import { useFood } from '../context/FoodContext';
import { Sparkles, Trash2, Eye, Search } from 'lucide-react';
import Modal from '../components/Modal';
import StatusTimeline from '../components/StatusTimeline';

const AdminListings = () => {
  const { listings, deleteFoodListing } = useFood();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedFood, setSelectedFood] = useState(null);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);

  const filteredListings = listings.filter(item => {
    const matchesSearch = 
      item.foodName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.providerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this listing as administrator?')) {
      deleteFoodListing(id);
    }
  };

  const handleTrackClick = (item) => {
    setSelectedFood(item);
    setIsTimelineOpen(true);
  };

  const getStatusBadge = (status) => {
    const colors = {
      available: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      claimed: 'bg-amber-50 text-amber-700 border-amber-100',
      scheduled: 'bg-sky-50 text-sky-700 border-sky-100',
      pickedup: 'bg-indigo-50 text-indigo-700 border-indigo-100',
      delivered: 'bg-teal-50 text-teal-700 border-teal-100'
    };
    return (
      <span className={`px-2.5 py-0.5 border text-xs font-semibold rounded-md capitalize ${colors[status] || 'bg-slate-50'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold font-display text-slate-800 tracking-tight">All Food Listings</h2>
        <p className="text-slate-500 text-xs sm:text-sm">Audit and oversee all surplus meals, logs, or delete outdated listings.</p>
      </div>

      {/* Filter and Search */}
      <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <input
            type="text"
            placeholder="Search meals or providers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Status:</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 border border-slate-200 bg-white rounded-xl text-xs font-semibold text-slate-700 focus:outline-hidden focus:border-emerald-500"
          >
            <option value="All">All Statuses</option>
            <option value="available">Available</option>
            <option value="claimed">Claimed</option>
            <option value="scheduled">Scheduled</option>
            <option value="pickedup">Picked Up</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>

      </div>

      {/* Table */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-4">Food Name</th>
                <th className="px-6 py-4">Provider</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600">
              {filteredListings.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800 font-display">
                    {item.foodName}
                  </td>
                  <td className="px-6 py-4 text-xs font-semibold text-slate-600">
                    {item.providerName}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs rounded-sm font-semibold">
                      {item.quantity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {item.category}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(item.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleTrackClick(item)}
                        className="p-1.5 border border-slate-200 hover:border-emerald-200 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                        title="Audit Lifecycle Timeline"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 border border-slate-200 hover:border-rose-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Remove Listing"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Timeline tracker */}
      <Modal
        isOpen={isTimelineOpen}
        onClose={() => {
          setIsTimelineOpen(false);
          setSelectedFood(null);
        }}
        title="Admin Lifecycle Review"
      >
        {selectedFood && (
          <div className="space-y-6">
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-1 text-xs">
              <h4 className="font-bold text-slate-800 font-display text-sm">{selectedFood.foodName}</h4>
              <p className="text-slate-500">Listed By: {selectedFood.providerName}</p>
              <p className="text-slate-500">Address: {selectedFood.pickupAddress}</p>
              {selectedFood.claimedBy && <p className="text-slate-500">Claimer Profile Id: {selectedFood.claimedBy}</p>}
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

export default AdminListings;
