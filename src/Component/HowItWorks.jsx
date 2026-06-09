import React, { useState } from "react";
import { FaSearch, FaBuilding, FaPaperPlane } from "react-icons/fa";

// ৩D টিল্ট এবং নিয়ন গ্লো সহ আল্ট্রা-প্রফেশনাল কার্ড কম্পোনেন্ট
const InteractiveCard = ({ step, index }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // মাউসের পজিশন অনুযায়ী ৩D রোটেশন ক্যালকুলেশন
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // রোটেশনের মাত্রা নিয়ন্ত্রণ (বেশি বাঁকা যেন না হয়)
    setRotateX(-y / 12);
    setRotateY(x / 12);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      className="relative group perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      {/* ব্যাকগ্রাউন্ডে অ্যানিমেটেড নিয়ন বর্ডার লাইট */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${step.color} rounded-3xl opacity-30 group-hover:opacity-100 blur-md transition duration-500 group-hover:duration-200 animate-tilt`} />

      {/* মেইন প্রিমিয়াম কার্ড */}
      <div className="relative bg-slate-900/90 border border-slate-800 p-8 md:p-10 rounded-3xl text-left h-full flex flex-col justify-between overflow-hidden backdrop-blur-xl">
        
        {/* কার্ডের ভেতরের গ্রিড বা শাইনিং ইফেক্ট */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.03),transparent)] pointer-events-none" />

        <div>
          {/* টপ বার: আইকন এবং নাম্বার */}
          <div className="flex items-center justify-between mb-8">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} text-white flex items-center justify-center text-2xl shadow-lg shadow-indigo-500/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
              {step.icon}
            </div>
            <span className="text-5xl font-black text-slate-800/80 group-hover:text-slate-700/50 transition-colors duration-300 select-none font-mono">
              {step.id}
            </span>
          </div>

          {/* টাইটেল এবং ডেসক্রিপশন */}
          <h2 className="text-2xl font-bold text-white tracking-tight mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all duration-300">
            {step.title}
          </h2>
          <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed">
            {step.description}
          </p>
        </div>

        {/* বটম অ্যাকশন ট্র্যাকার (ডিজাইন ভ্যালু বাড়াতে) */}
        <div className="mt-8 pt-4 border-t border-slate-800/60 flex items-center justify-between">
          <span className="text-xs font-semibold tracking-widest text-slate-500 uppercase group-hover:text-indigo-400 transition-colors duration-300">
            Step {step.id} Setup
          </span>
          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.color} animate-pulse`} />
        </div>

      </div>
    </div>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      id: "01",
      title: "Search Intelligent Jobs",
      description: "Filter through thousands of high-paying tech opportunities tailor-made for your skillset.",
      icon: <FaSearch />,
      color: "from-blue-600 to-cyan-500",
    },
    {
      id: "02",
      title: "Explore Tech Giants",
      description: "Deep dive into company cultures, verified salaries, and direct recruitment pipelines.",
      icon: <FaBuilding />,
      color: "from-indigo-600 to-purple-600",
    },
    {
      id: "03",
      title: "One-Click Application",
      description: "Deploy your professional resume straight into the tracking systems with instantaneous delivery.",
      icon: <FaPaperPlane />,
      color: "from-fuchsia-600 to-pink-500",
    },
  ];

  return (
    <div className="bg-[#030712] text-slate-100 py-28 px-6 relative overflow-hidden">
      
      {/* গ্লোবাল ব্যাকগ্রাউন্ড ম্যাট্রিক্স এবং গ্রিড লাইন্স */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      {/* লার্জ অ্যাম্বিয়েন্ট লাইট অরবস */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* আল্ট্রা-মডার্ন হেডার */}
        <div className="text-center mb-24 space-y-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-indigo-400 text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(99,102,241,0.05)]">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
            The Recruitment Pipeline
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
            Engineered For <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Success</span>
          </h1>
          
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            An automated, streamlined architecture designed to connect premium talent with global enterprises flawlessly.
          </p>
        </div>

        {/* ৩D ইন্টারেক্টিভ গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {steps.map((step, index) => (
            <InteractiveCard key={step.id} step={step} index={index} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default HowItWorks;