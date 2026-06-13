import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Public pages
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

// Dashboards - Provider
import ProviderDashboard from '../pages/ProviderDashboard';
import ProviderAddFood from '../pages/ProviderAddFood';
import ProviderListings from '../pages/ProviderListings';
import ProviderHistory from '../pages/ProviderHistory';

// Dashboards - NGO
import NGODashboard from '../pages/NGODashboard';
import NGOAvailableFood from '../pages/NGOAvailableFood';
import NGOClaimedFood from '../pages/NGOClaimedFood';

// Dashboards - Volunteer
import VolunteerDashboard from '../pages/VolunteerDashboard';
import VolunteerPickups from '../pages/VolunteerPickups';
import VolunteerHistory from '../pages/VolunteerHistory';

// Dashboards - Needy Individual
import NeedyDashboard from '../pages/NeedyDashboard';
import NeedyClaimedFood from '../pages/NeedyClaimedFood';

// Dashboards - Admin
import AdminDashboard from '../pages/AdminDashboard';
import AdminUsers from '../pages/AdminUsers';
import AdminListings from '../pages/AdminListings';
import AdminNGOs from '../pages/AdminNGOs';
import AdminVolunteers from '../pages/AdminVolunteers';
import AdminAnalytics from '../pages/AdminAnalytics';

// Shared
import MapPage from '../pages/MapPage';
import ProfilePage from '../pages/ProfilePage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* 1. PUBLIC ROUTES */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* 2. PROTECTED DASHBOARD ROUTES */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        
        {/* Food Provider Views */}
        <Route path="provider" element={<ProviderDashboard />} />
        <Route path="provider/add-food" element={<ProviderAddFood />} />
        <Route path="provider/listings" element={<ProviderListings />} />
        <Route path="provider/history" element={<ProviderHistory />} />
        <Route path="provider/profile" element={<ProfilePage />} />

        {/* NGO Views */}
        <Route path="ngo" element={<NGODashboard />} />
        <Route path="ngo/available" element={<NGOAvailableFood />} />
        <Route path="ngo/claimed" element={<NGOClaimedFood />} />
        <Route path="ngo/map" element={<MapPage />} />
        <Route path="ngo/profile" element={<ProfilePage />} />

        {/* Volunteer Views */}
        <Route path="volunteer" element={<VolunteerDashboard />} />
        <Route path="volunteer/pickups" element={<VolunteerPickups />} />
        <Route path="volunteer/history" element={<VolunteerHistory />} />
        <Route path="volunteer/map" element={<MapPage />} />
        <Route path="volunteer/profile" element={<ProfilePage />} />

        {/* Needy Individual Views */}
        <Route path="needy" element={<NeedyDashboard />} />
        <Route path="needy/claimed" element={<NeedyClaimedFood />} />
        <Route path="needy/map" element={<MapPage />} />
        <Route path="needy/profile" element={<ProfilePage />} />

        {/* Admin Console Views */}
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/users" element={<AdminUsers />} />
        <Route path="admin/listings" element={<AdminListings />} />
        <Route path="admin/ngos" element={<AdminNGOs />} />
        <Route path="admin/volunteers" element={<AdminVolunteers />} />
        <Route path="admin/analytics" element={<AdminAnalytics />} />
        <Route path="admin/profile" element={<ProfilePage />} />

      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
