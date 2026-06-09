import React, { useState, useEffect } from "react";
import { FaBriefcase, FaUsers, FaBuilding, FaRocket } from "react-icons/fa";

// স্ট্যাটস নাম্বার অ্যানিমেশনের জন্য কাস্টম সাব-কম্পোনেন্ট (duration=4000 মানে ৪ সেকেন্ড ধরে স্লো কাউন্ট হবে)
const AnimatedCounter = ({ target, duration = 4000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      const easeOutQuad = (x) => x * (2 - x);
      const currentCount = Math.floor(easeOutQuad(progress) * target);
      
      setCount(currentCount);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [target, duration]);

  return <span>{count}</span>;
};

const About = () => {
  const features = [
    {
      icon: <FaBriefcase />,
      title: "Latest Jobs",
      desc: "Explore job opportunities from trusted companies instantly.",
      color: "from-blue-500 to-indigo-600",
      shadow: "shadow-blue-500/10"
    },
    {
      icon: <FaBuilding />,
      title: "Top Companies",
      desc: "Connect with leading giants across various industries.",
      color: "from-purple-500 to-pink-600",
      shadow: "shadow-purple-500/10"
    },
    {
      icon: <FaUsers />,
      title: "Thousands of Users",
      desc: "Join a massive, fast-growing community of top professionals.",
      color: "from-amber-500 to-orange-600",
      shadow: "shadow-amber-500/10"
    },
    {
      icon: <FaRocket />,
      title: "Career Growth",
      desc: "Find fast-track opportunities that multiply your career goals.",
      color: "from-emerald-500 to-teal-600",
      shadow: "shadow-emerald-500/10"
    }
  ];

  const stats = [
    { target: 50, suffix: "+", label: "Partner Companies" },
    { target: 1000, suffix: "+", label: "Job Opportunities" },
    { target: 5000, suffix: "+", label: "Registered Users" }
  ];

  return (
    <div className="relative max-w-7xl mx-auto px-6 py-20 overflow-hidden">
      
      {/* ব্যাকগ্রাউন্ড ডেকোরেশন */}
      <div className="absolute top-20 right-0 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-40 left-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* ================= HERO SECTION ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28">
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold tracking-wider uppercase">
            ✨ Who We Are
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">JobTrack</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
            JobTrack is an ecosystem engineered to seamlessly connect high-tier professional talent with world-class tech giants. We build transparent pipelines for your ultimate career leap.
          </p>
        </div>
        
        {/* রাইট সাইড মিশন কার্ড (গ্লাস-মরফিজম লুক) */}
        <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-8 sm:p-10 rounded-[32px] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl" />
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Our Mission</h2>
          <p className="text-slate-300 font-medium text-sm sm:text-base leading-relaxed">
            Our driving force is to de-clutter and simplify global recruitment architectures. By mapping raw skills to perfect opportunities, we destroy the gap between brilliant minds and industry leaders.
          </p>
        </div>
      </div>

      {/* ================= FEATURES SECTION ================= */}
      <div className="mb-28">
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Why Choose JobTrack?
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base font-medium">
            We offer cutting-edge features crafted specifically to give you an unfair advantage in today's competitive job market.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, idx) => (
            <div 
              key={idx} 
              className="group bg-white border border-slate-100 p-8 rounded-3xl shadow-[0_15px_40px_-15px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 ease-out hover:-translate-y-3"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} ${item.shadow} text-white flex items-center justify-center text-2xl mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                {item.icon}
              </div>
              <h3 className="font-extrabold text-xl text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= ANIMATED STATS SECTION ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 text-white rounded-[24px] p-8 text-center shadow-xl shadow-indigo-600/10 hover:shadow-indigo-600/20 transition-all duration-300 group"
          >
            {/* ইনডোর গ্লো ইফেক্ট */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-2 flex items-center justify-center">
              <AnimatedCounter target={stat.target} />
              <span>{stat.suffix}</span>
            </h2>
            <p className="text-white/80 text-sm sm:text-base font-semibold tracking-wide uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default About;