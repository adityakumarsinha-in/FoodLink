import React from 'react';
import ProfileCard from '../components/ProfileCard';

const ProfilePage = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-display text-slate-800 tracking-tight">Account Profile</h2>
        <p className="text-slate-500 text-xs sm:text-sm">Manage your personal credentials, contact info, and view performance metrics.</p>
      </div>
      <ProfileCard />
    </div>
  );
};

export default ProfilePage;
