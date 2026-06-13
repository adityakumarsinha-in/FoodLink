import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

// Initial mock users list for simulation
const DEFAULT_USERS = [
  {
    id: '1',
    name: 'Green Garden Bistro',
    email: 'provider@foodlink.org',
    phone: '+1 555-0199',
    role: 'provider', // provider, ngo, volunteer, needy, admin
    orgType: 'Restaurant',
    address: '102 Eco Drive, Green City',
    mealsSharedCount: 1250,
    deliveriesCount: 42,
    rating: 4.8
  },
  {
    id: '2',
    name: 'Hope Food Alliance',
    email: 'ngo@foodlink.org',
    phone: '+1 555-0144',
    role: 'ngo',
    orgType: 'NGO Shelter',
    address: '789 Care Ave, Green City',
    mealsDistributed: 980,
    claimsCount: 38
  },
  {
    id: '3',
    name: 'Alex Rivera',
    email: 'volunteer@foodlink.org',
    phone: '+1 555-0188',
    role: 'volunteer',
    vehicleType: 'Car',
    address: '456 Rover Blvd, Green City',
    deliveriesAssigned: 3,
    deliveriesCompleted: 15
  },
  {
    id: '4',
    name: 'Maria Santos & Family',
    email: 'needy@foodlink.org',
    phone: '+1 555-0122',
    role: 'needy',
    address: '321 Community St, Green City',
    mealsClaimedCount: 12
  },
  {
    id: '5',
    name: 'Sarah Jenkins',
    email: 'admin@foodlink.org',
    phone: '+1 555-0100',
    role: 'admin',
    address: 'HQ Administrative Block, Green City'
  }
];

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const localUsers = localStorage.getItem('foodlink_users');
    return localUsers ? JSON.parse(localUsers) : DEFAULT_USERS;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const localUser = localStorage.getItem('foodlink_current_user');
    return localUser ? JSON.parse(localUser) : DEFAULT_USERS[0]; // Default to provider
  });

  useEffect(() => {
    localStorage.setItem('foodlink_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('foodlink_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  // Login handler
  const login = (email, password) => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setCurrentUser(user);
      return { success: true, user };
    }
    return { success: false, message: 'Invalid credentials. Use provider@foodlink.org, ngo@foodlink.org, volunteer@foodlink.org, needy@foodlink.org, or admin@foodlink.org' };
  };

  // Register handler
  const register = (userData) => {
    const exists = users.some(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (exists) {
      return { success: false, message: 'Email already registered.' };
    }
    
    // Map human readable role selection to simple keys
    let roleKey = 'needy';
    if (userData.role.includes('Provider')) roleKey = 'provider';
    else if (userData.role.includes('NGO')) roleKey = 'ngo';
    else if (userData.role.includes('Volunteer')) roleKey = 'volunteer';
    else if (userData.role.includes('Admin')) roleKey = 'admin';

    const newUser = {
      id: String(users.length + 1),
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      role: roleKey,
      address: userData.address || 'Green City Center',
      mealsSharedCount: 0,
      deliveriesCount: 0,
      rating: 5.0,
      ...userData
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  // Logout handler
  const logout = () => {
    setCurrentUser(null);
  };

  // Profile update helper
  const updateProfile = (profileData) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...profileData };
    
    setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));
    setCurrentUser(updatedUser);
  };

  // Switch role directly (convenience for demo purposes)
  const switchRole = (role) => {
    const demoUser = users.find(u => u.role === role);
    if (demoUser) {
      setCurrentUser(demoUser);
    } else {
      // Create a default if not found
      const newDemo = DEFAULT_USERS.find(u => u.role === role);
      if (newDemo) {
        setUsers(prev => [...prev, newDemo]);
        setCurrentUser(newDemo);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, users, login, register, logout, updateProfile, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};
