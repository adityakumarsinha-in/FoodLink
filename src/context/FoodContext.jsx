import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const FoodContext = createContext(null);

export const useFood = () => {
  const context = useContext(FoodContext);
  if (!context) throw new Error('useFood must be used within a FoodProvider');
  return context;
};

// Initial mock food listings
const INITIAL_LISTINGS = [
  {
    id: 'f1',
    foodName: 'Surplus Fresh Veg Biryani',
    quantity: '40 Meals',
    category: 'Cooked Meals',
    description: 'Fresh aromatic basmati vegetable biryani prepared for a corporate luncheon. Packed and chilled immediately.',
    preparationTime: '2026-06-12T13:00',
    expiryTime: '2026-06-13T02:00', // Expressed as ISO or relative
    pickupAddress: 'Green Garden Bistro, 102 Eco Drive',
    contactNumber: '+1 555-0199',
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600&auto=format&fit=crop',
    providerName: 'Green Garden Bistro',
    providerId: '1',
    status: 'available', // available, claimed, scheduled, pickedup, delivered
    distance: 0.8, // miles away
    coordinates: { lat: 40.7128, lng: -74.0060 },
    claimedBy: null,
    volunteerId: null,
    createdAt: '2026-06-12T15:30:00Z'
  },
  {
    id: 'f2',
    foodName: 'Assorted Gourmet Bread & Pastries',
    quantity: '15 kg',
    category: 'Bakery',
    description: 'A selection of sourdough bread, baguettes, croissants, and sweet muffins baked fresh this morning.',
    preparationTime: '2026-06-12T07:00',
    expiryTime: '2026-06-12T22:00',
    pickupAddress: 'Golden Grain Bakery, 45 Bread Lane',
    contactNumber: '+1 555-0210',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop',
    providerName: 'Golden Grain Bakery',
    providerId: '6', // Other provider
    status: 'available',
    distance: 1.4,
    coordinates: { lat: 40.7150, lng: -74.0120 },
    claimedBy: null,
    volunteerId: null,
    createdAt: '2026-06-12T16:00:00Z'
  },
  {
    id: 'f3',
    foodName: 'Paneer Butter Masala & Roti',
    quantity: '25 Meals',
    category: 'Cooked Meals',
    description: 'Rich paneer butter masala with whole wheat rotis. Untouched catering excess from a small birthday celebration.',
    preparationTime: '2026-06-12T19:00',
    expiryTime: '2026-06-13T04:00',
    pickupAddress: 'Royal Celebration Hall, 12 Royal Road',
    contactNumber: '+1 555-0300',
    imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=600&auto=format&fit=crop',
    providerName: 'Royal Banquet Services',
    providerId: '7',
    status: 'claimed',
    distance: 2.1,
    coordinates: { lat: 40.7210, lng: -74.0010 },
    claimedBy: '2', // claimed by Hope Food Alliance
    volunteerId: null,
    createdAt: '2026-06-12T19:30:00Z'
  },
  {
    id: 'f4',
    foodName: 'Fresh Organic Milk & Yogurts',
    quantity: '20 Cartons',
    category: 'Dairy',
    description: 'Whole milk cartons and Greek yogurt cups reaching sell-by date. Still perfectly sealed and stored in refrigerator.',
    preparationTime: '2026-06-11T08:00',
    expiryTime: '2026-06-13T12:00',
    pickupAddress: 'Eco Mart Grocery, 33 Plaza Way',
    contactNumber: '+1 555-0450',
    imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=600&auto=format&fit=crop',
    providerName: 'Eco Mart Grocery',
    providerId: '8',
    status: 'delivered',
    distance: 3.5,
    coordinates: { lat: 40.7090, lng: -74.0200 },
    claimedBy: '2',
    volunteerId: '3', // assigned/delivered by Alex Rivera
    createdAt: '2026-06-11T10:00:00Z',
    deliveredAt: '2026-06-12T11:00:00Z'
  },
  {
    id: 'f5',
    foodName: 'Mixed Fruit Platters',
    quantity: '8 Platters',
    category: 'Fruits & Salads',
    description: 'Platters of sliced melons, grapes, strawberries, and pineapples from a morning convention center brunch.',
    preparationTime: '2026-06-12T09:00',
    expiryTime: '2026-06-12T20:00',
    pickupAddress: 'Grand Plaza Hotel, 88 Grand Ave',
    contactNumber: '+1 555-0988',
    imageUrl: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=600&auto=format&fit=crop',
    providerName: 'Grand Plaza Hotel',
    providerId: '9',
    status: 'scheduled',
    distance: 1.1,
    coordinates: { lat: 40.7180, lng: -74.0040 },
    claimedBy: '2',
    volunteerId: '3',
    createdAt: '2026-06-12T11:00:00Z'
  }
];

const INITIAL_NOTIFICATIONS = [
  {
    id: 'n1',
    title: 'New Food Available Nearby',
    message: 'Surplus Fresh Veg Biryani (40 Meals) listed by Green Garden Bistro - 0.8 miles away.',
    time: '5 mins ago',
    type: 'new_food',
    read: false
  },
  {
    id: 'n2',
    title: 'Food Claimed',
    message: 'Hope Food Alliance has claimed the Paneer Butter Masala listing.',
    time: '20 mins ago',
    type: 'claimed',
    read: true
  },
  {
    id: 'n3',
    title: 'Delivery Successful',
    message: 'Organic Milk & Yogurts was safely delivered to Hope Food Alliance by Alex Rivera.',
    time: '2 hours ago',
    type: 'delivered',
    read: true
  }
];

export const FoodProvider = ({ children }) => {
  const { currentUser } = useAuth();
  
  const [listings, setListings] = useState(() => {
    const local = localStorage.getItem('foodlink_listings');
    return local ? JSON.parse(local) : INITIAL_LISTINGS;
  });

  const [notifications, setNotifications] = useState(() => {
    const local = localStorage.getItem('foodlink_notifications');
    return local ? JSON.parse(local) : INITIAL_NOTIFICATIONS;
  });

  useEffect(() => {
    localStorage.setItem('foodlink_listings', JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem('foodlink_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Helper: Dispatch new notification
  const addNotification = (title, message, type = 'general') => {
    const newNotif = {
      id: 'notif_' + Date.now(),
      title,
      message,
      time: 'Just now',
      type,
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Add Food Listing
  const addFoodListing = (foodData) => {
    const newId = 'f_' + Date.now();
    const newListing = {
      id: newId,
      foodName: foodData.foodName,
      quantity: foodData.quantity,
      category: foodData.category || 'Cooked Meals',
      description: foodData.description,
      preparationTime: foodData.preparationTime,
      expiryTime: foodData.expiryTime,
      pickupAddress: foodData.pickupAddress || currentUser?.address || '102 Eco Drive, Green City',
      contactNumber: foodData.contactNumber || currentUser?.phone || '+1 555-0199',
      imageUrl: foodData.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop',
      providerName: currentUser?.name || 'Green Garden Bistro',
      providerId: currentUser?.id || '1',
      status: 'available',
      distance: parseFloat((Math.random() * 3 + 0.2).toFixed(1)),
      coordinates: {
        lat: 40.7128 + (Math.random() - 0.5) * 0.02,
        lng: -74.0060 + (Math.random() - 0.5) * 0.02
      },
      claimedBy: null,
      volunteerId: null,
      createdAt: new Date().toISOString()
    };

    setListings(prev => [newListing, ...prev]);
    addNotification(
      'New Food Available',
      `${newListing.foodName} (${newListing.quantity}) has been listed by ${newListing.providerName}.`,
      'new_food'
    );
    return newListing;
  };

  // Update Food Listing (Edit)
  const updateFoodListing = (id, updatedData) => {
    setListings(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updatedData } : item))
    );
    addNotification('Listing Updated', 'Your food listing was successfully updated.', 'general');
  };

  // Delete Food Listing
  const deleteFoodListing = (id) => {
    setListings(prev => prev.filter(item => item.id !== id));
    addNotification('Listing Cancelled', 'The food listing was cancelled/removed.', 'general');
  };

  // Claim Food Listing (NGO or Needy)
  const claimFoodListing = (id, claimerId, claimerName) => {
    setListings(prev =>
      prev.map(item =>
        item.id === id ? { ...item, status: 'claimed', claimedBy: claimerId } : item
      )
    );
    addNotification(
      'Food Claimed',
      `${claimerName} has claimed the listing for ${listings.find(l => l.id === id)?.foodName}.`,
      'claimed'
    );
  };

  // Assign Volunteer / Self-Assign Volunteer
  const assignVolunteer = (id, volunteerId, volunteerName) => {
    setListings(prev =>
      prev.map(item =>
        item.id === id ? { ...item, status: 'scheduled', volunteerId } : item
      )
    );
    addNotification(
      'Pickup Scheduled',
      `Volunteer ${volunteerName} is assigned to collect "${listings.find(l => l.id === id)?.foodName}".`,
      'scheduled'
    );
  };

  // Update Timeline Status (Volunteer Workflow)
  const updateDeliveryStatus = (id, nextStatus) => {
    // nextStatus: claimed -> scheduled -> pickedup -> delivered
    setListings(prev =>
      prev.map(item => {
        if (item.id === id) {
          const update = { status: nextStatus };
          if (nextStatus === 'delivered') {
            update.deliveredAt = new Date().toISOString();
          }
          return { ...item, ...update };
        }
        return item;
      })
    );

    const foodName = listings.find(l => l.id === id)?.foodName;
    let title = 'Delivery Progress Update';
    let message = `Food "${foodName}" status is now ${nextStatus}.`;

    if (nextStatus === 'pickedup') {
      title = 'Food Picked Up';
      message = `Volunteer has picked up "${foodName}" and is en route.`;
    } else if (nextStatus === 'delivered') {
      title = 'Food Delivered Successfully';
      message = `"${foodName}" was successfully delivered and distributed!`;
    }

    addNotification(title, message, nextStatus);
  };

  // Calculate stats for admin / dashboards
  const getStats = () => {
    const totalMealsSaved = listings
      .filter(l => l.status === 'delivered')
      .reduce((acc, curr) => {
        const qty = parseInt(curr.quantity) || 10; // parse e.g. "40 Meals"
        return acc + qty;
      }, 0) + 1420; // adding constant base for demo metrics realism

    const activeListings = listings.filter(l => l.status === 'available').length;
    const successfulDeliveries = listings.filter(l => l.status === 'delivered').length;
    const claimedListingsCount = listings.filter(l => l.status !== 'available' && l.status !== 'delivered').length;

    return {
      totalMealsSaved,
      activeListings,
      successfulDeliveries,
      claimedListingsCount
    };
  };

  return (
    <FoodContext.Provider
      value={{
        listings,
        notifications,
        addFoodListing,
        updateFoodListing,
        deleteFoodListing,
        claimFoodListing,
        assignVolunteer,
        updateDeliveryStatus,
        getStats,
        markAllNotificationsRead,
        clearNotification,
        addNotification
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};
