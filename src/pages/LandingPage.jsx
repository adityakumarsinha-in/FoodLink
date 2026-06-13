import React from 'react';
import { Link } from 'react-router-dom';
import {
  Heart, ShieldCheck, Zap, BarChart, Map, Handshake, Users, ArrowRight,
  TrendingDown, Globe, UtensilsCrossed, AlertTriangle, ShieldAlert
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="w-full flex-grow bg-slate-50">

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden py-20 lg:py-32 bg-linear-to-b from-emerald-50/70 to-slate-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <span className="px-3.5 py-1.5 bg-emerald-100/60 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200/50 uppercase tracking-wider inline-block">
              Zero Food Waste initiative
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display leading-[1.1] text-slate-800 tracking-tight">
              Connecting Surplus Food <br />
              <span className="text-emerald-600 bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">With People Who Need It</span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Reduce food waste and help communities by redistributing surplus meals from restaurants, hotels, hostels, and food providers to NGOs and needy individuals.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 group"
              >
                Join as a Partner <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto px-8 py-3.5 border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-sm bg-white rounded-xl hover:bg-slate-50 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center"
              >
                Sign In to Console
              </Link>
            </div>
          </div>
          <div className="relative flex justify-center lg:justify-end">
            {/* Visual illustration box */}
            <div className="w-full max-w-md aspect-square bg-linear-to-br from-emerald-500 to-teal-600 rounded-3xl overflow-hidden shadow-2xl p-6 relative flex flex-col justify-between text-white group hover:scale-[1.01] transition-all duration-300">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />

              <div className="flex justify-between items-start z-10">
                <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
                  <UtensilsCrossed className="h-6 w-6" />
                </div>
                <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold">
                  Live Network
                </div>
              </div>

              <div className="space-y-4 z-10">
                <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-100">Active Redistributor</span>
                <blockquote className="text-lg font-bold font-display leading-snug">
                  "We shared 120 meals last evening. The local shelter claimed and distributed them in under 45 minutes!"
                </blockquote>
                <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                  <div className="h-8 w-8 rounded-full bg-emerald-100/20 flex items-center justify-center font-bold text-xs text-white">R</div>
                  <div>
                    <p className="text-xs font-bold leading-none">Green City Catering</p>
                    <p className="text-[10px] text-emerald-100 mt-0.5">Hotel & Event Organizer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEM & MISSION SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block">The Food Dilemma</span>
          <h2 className="text-3xl font-bold font-display text-slate-800 tracking-tight">Bridging Excess and Necessity</h2>
          <p className="text-slate-500 text-sm leading-relaxed font-medium">
            Food wastage is a critical issue that harms the economy and environment, yet millions face meals insecurity daily. We exist to close this gap.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Problem */}
          <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-2xs hover:shadow-xs transition-shadow space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-3 bg-rose-50 rounded-2xl text-rose-500 inline-block">
                <TrendingDown className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 font-display">The Waste Challenge</h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                Restaurants, bakeries, hostels, and weddings produce excessive freshly cooked meals daily. Due to logistics, liability rules, or storage limits, fresh food ends up in trash cans, contributing heavily to greenhouse gases.
              </p>
            </div>
            <div className="border-t border-slate-50 pt-4 flex justify-between items-center text-xs text-rose-600 font-semibold">
              <span>Over 30% of edible food is lost annually</span>
              <ShieldAlert className="h-4 w-4" />
            </div>
          </div>

          {/* Card 2: Mission */}
          <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-2xs hover:shadow-xs transition-shadow space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 inline-block">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 font-display">The FoodLink Solution</h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                We provide a simplified real-time digital notification bridge. Food providers post active surplus meals, nearby verified NGOs receive alerts to claim, and community volunteers assist with rapid transit.
              </p>
            </div>
            <div className="border-t border-slate-50 pt-4 flex justify-between items-center text-xs text-emerald-600 font-semibold">
              <span>Helping feeds families, shelters, and orphanages</span>
              <Heart className="h-4 w-4" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="py-20 bg-slate-100/50 border-y border-slate-200/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block">Operational Workflow</span>
            <h2 className="text-3xl font-bold font-display text-slate-800 tracking-tight">How FoodLink Connects Communities</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Post Excess Food', desc: 'Food Providers upload surplus meal counts, category, expiry details, and pickup address via our portal.', icon: UtensilsCrossed, bg: 'bg-emerald-50 text-emerald-600' },
              { step: '02', title: 'NGO Alert & Claim', desc: 'Nearby registered NGOs discover listings in real-time, claim meals, and coordinate pickups.', icon: Handshake, bg: 'bg-amber-50 text-amber-600' },
              { step: '03', title: 'Volunteer Transit', desc: 'Local volunteers are notified of unclaimed transport links, claiming pickup assignments.', icon: Users, bg: 'bg-sky-50 text-sky-600' },
              { step: '04', title: 'Secure Distribution', desc: 'Meals are picked up, scanned, and delivered directly to families, shelters, or orphanages.', icon: ShieldCheck, bg: 'bg-indigo-50 text-indigo-600' }
            ].map((s, idx) => (
              <div key={idx} className="bg-white border border-slate-100 p-6 rounded-2xl relative shadow-2xs hover:shadow-xs transition-shadow">
                <span className="absolute right-6 top-6 text-3xl font-black text-slate-100 font-display">{s.step}</span>
                <div className={`p-3 rounded-xl inline-block mb-4 ${s.bg}`}>
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-800 font-display mb-2">{s.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. STATISTICS */}
      <section className="py-20 max-w-7xl mx-auto px-6 text-center">
        <div className="bg-emerald-900 rounded-3xl py-12 px-6 sm:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-white relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.2),transparent_40%)]" />

          {[
            { value: '14,250+', label: 'Meals Saved' },
            { value: '120+', label: 'Food Providers' },
            { value: '45+', label: 'Partner NGOs' },
            { value: '350+', label: 'Active Volunteers' }
          ].map((item, idx) => (
            <div key={idx} className="space-y-1 relative z-10">
              <span className="text-3xl sm:text-4xl font-extrabold font-display text-emerald-300 tracking-tight block">
                {item.value}
              </span>
              <span className="text-xs sm:text-sm text-emerald-100 font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FEATURES BENTO GRID */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/20 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block">Platform Core Engine</span>
          <h2 className="text-3xl font-bold font-display text-slate-800 tracking-tight">Engineered for Social Impact</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-2xs space-y-3 md:col-span-2">
            <div className="p-2.5 bg-emerald-50 rounded-lg text-emerald-600 inline-block">
              <Map className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-slate-800 font-display">Interactive Food Location Mapping</h4>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Find, view, and claim surplus food posts via our integrated live coordinate map grid. Perfect for NGOs searching for proximity-based claims to reduce fuel costs and ensure freshness.
            </p>
          </div>

          <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-2xs space-y-3">
            <div className="p-2.5 bg-amber-50 rounded-lg text-amber-600 inline-block">
              <Zap className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-slate-800 font-display">Real-Time Alerts</h4>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Instant alerts sent directly to nearby registered NGOs as soon as fresh donations are uploaded.
            </p>
          </div>

          <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-2xs space-y-3">
            <div className="p-2.5 bg-sky-50 rounded-lg text-sky-600 inline-block">
              <BarChart className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-slate-800 font-display">SaaS Analytics</h4>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Track your carbon savings footprint and total meals distributed with rich Recharts dashboards.
            </p>
          </div>

          <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-2xs space-y-3 md:col-span-2">
            <div className="p-2.5 bg-violet-50 rounded-lg text-violet-600 inline-block">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-slate-800 font-display">Safety and Verification Control</h4>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Every food listing details its preparation timestamp and expiry countdown. Strict NGO registration vetting keeps food distribution secure, compliant, and trustworthy.
            </p>
          </div>
        </div>
      </section>

      {/* 6. CALL-TO-ACTION */}
      <section className="py-20 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight leading-tight">
            Ready to Reduce Waste and Make an Impact?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Register your restaurant, hostel, or bakery to donate food, or join our network as an NGO or volunteer to distribute meals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-md hover:-translate-y-0.5 active:translate-y-0"
            >
              Sign Up Now
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-3.5 border border-slate-800 hover:border-slate-700 bg-slate-800 text-slate-200 hover:text-white font-bold text-sm rounded-xl transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Partner Sign In
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
