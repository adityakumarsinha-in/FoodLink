import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useFood } from '../context/FoodContext';
import FoodCard from '../components/FoodCard';
import EmptyState from '../components/EmptyState';
import Modal from '../components/Modal';
import { ClipboardList, Trash2, Edit, AlertCircle } from 'lucide-react';

const ProviderListings = () => {
  const { currentUser } = useAuth();
  const { listings, updateFoodListing, deleteFoodListing } = useFood();
  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter listings for this specific provider that are NOT delivered yet
  const myListings = listings.filter(
    (l) => l.providerId === currentUser?.id && l.status !== 'delivered'
  );

  const handleEditClick = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editingItem) return;

    updateFoodListing(editingItem.id, {
      foodName: editingItem.foodName,
      quantity: editingItem.quantity,
      category: editingItem.category,
      description: editingItem.description,
      expiryTime: editingItem.expiryTime,
      pickupAddress: editingItem.pickupAddress,
      contactNumber: editingItem.contactNumber
    });

    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to cancel/remove this food listing?')) {
      deleteFoodListing(id);
    }
  };

  return (
    <div className="space-y-6">
      
      <div>
        <h2 className="text-2xl font-bold font-display text-slate-800 tracking-tight">Active Listings</h2>
        <p className="text-slate-500 text-xs sm:text-sm">Manage your listed surplus food. NGO claims and volunteer statuses update automatically.</p>
      </div>

      {myListings.length === 0 ? (
        <EmptyState 
          title="No active listings" 
          message="You don't have any active surplus food listed at the moment."
          icon={ClipboardList}
          actionText="Add Surplus Food"
          onAction={() => window.location.href = '/dashboard/provider/add-food'}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myListings.map((item) => (
            <FoodCard
              key={item.id}
              food={item}
              onEdit={handleEditClick}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Editing Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        title="Edit Food Listing"
      >
        {editingItem && (
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Food Item Title</label>
              <input
                type="text"
                required
                value={editingItem.foodName}
                onChange={(e) => setEditingItem({ ...editingItem, foodName: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Quantity</label>
                <input
                  type="text"
                  required
                  value={editingItem.quantity}
                  onChange={(e) => setEditingItem({ ...editingItem, quantity: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Category</label>
                <select
                  value={editingItem.category}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option>Cooked Meals</option>
                  <option>Bakery</option>
                  <option>Dairy</option>
                  <option>Fruits & Salads</option>
                  <option>Groceries</option>
                  <option>Beverages</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description</label>
              <textarea
                rows="2"
                value={editingItem.description}
                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Pickup Address</label>
              <input
                type="text"
                required
                value={editingItem.pickupAddress}
                onChange={(e) => setEditingItem({ ...editingItem, pickupAddress: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Contact Phone</label>
                <input
                  type="text"
                  required
                  value={editingItem.contactNumber}
                  onChange={(e) => setEditingItem({ ...editingItem, contactNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Expiry time</label>
                <input
                  type="datetime-local"
                  required
                  value={editingItem.expiryTime.slice(0, 16)}
                  onChange={(e) => setEditingItem({ ...editingItem, expiryTime: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-lg shadow-xs transition-all active:scale-98 cursor-pointer"
            >
              Update Listing
            </button>
          </form>
        )}
      </Modal>

    </div>
  );
};

export default ProviderListings;
