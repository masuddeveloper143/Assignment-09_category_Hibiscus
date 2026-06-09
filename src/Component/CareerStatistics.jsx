import React, { useEffect, useRef, useState } from "react";

const stats = [
  {
    value: 50,
    suffix: "+",
    label: "Partner Companies",
    sublabel: "Trusted by top firms",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.35)",
  },
  {
    value: 1000,
    suffix: "+",
    label: "Available Jobs",
    sublabel: "New listings daily",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0" />
      </svg>
    ),
    color: "#38bdf8",
    glow: "rgba(56,189,248,0.35)",
  },
  {
    value: 5000,
    suffix: "+",
    label: "Registered Users",
    sublabel: "Growing community",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
    color: "#34d399",
    glow: "rgba(52,211,153,0.35)",
  },
  {
    value: 95,
    suffix: "%",
    label: "Success Rate",
    sublabel: "Industry leading",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
      </svg>
    ),
    color: "#fb923c",
    glow: "rgba(251,146,60,0.35)",
  },
];

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function StatCard({ stat, index, animate }) {
  const count = useCountUp(stat.value, 2000 + index * 200, animate);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? "rgba(255,255,255,0.10)"
          : "rgba(255,255,255,0.06)",
        border: `1px solid ${hovered ? stat.color + "80" : "rgba(255,255,255,0.10)"}`,
        borderRadius: "20px",
        padding: "2rem 1.5rem",
        textAlign: "center",
        cursor: "default",
        transition: "all 0.35s cubic-bezier(.4,0,.2,1)",
        transform: animate
          ? hovered
            ? "translateY(-8px) scale(1.03)"
            : "translateY(0) scale(1)"
          : "translateY(30px)",
        opacity: animate ? 1 : 0,
        transitionDelay: animate ? `${index * 0.12}s` : "0s",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* glow blob */}
      <div style={{
        position: "absolute",
        top: "-30px", left: "50%",
        transform: "translateX(-50%)",
        width: "120px", height: "120px",
        borderRadius: "50%",
        background: stat.glow,
        filter: "blur(40px)",
        opacity: hovered ? 0.9 : 0.4,
        transition: "opacity 0.35s",
        pointerEvents: "none",
      }} />

      {/* icon */}
      <div style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "52px", height: "52px",
        borderRadius: "14px",
        background: stat.color + "22",
        color: stat.color,
        marginBottom: "1rem",
        transition: "transform 0.3s",
        transform: hovered ? "scale(1.15) rotate(-5deg)" : "scale(1)",
      }}>
        {stat.icon}
      </div>

      {/* number */}
      <div style={{
        fontSize: "3rem",
        fontWeight: "800",
        color: "#fff",
        lineHeight: 1,
        letterSpacing: "-1px",
        fontFamily: "'Sora', sans-serif",
      }}>
        <span style={{ color: stat.color }}>{count.toLocaleString()}</span>
        <span style={{ color: stat.color }}>{stat.suffix}</span>
      </div>

      {/* label */}
      <p style={{
        marginTop: "0.6rem",
        fontSize: "1rem",
        fontWeight: "600",
        color: "rgba(255,255,255,0.9)",
        letterSpacing: "0.01em",
      }}>
        {stat.label}
      </p>

      {/* sublabel */}
      <p style={{
        marginTop: "0.25rem",
        fontSize: "0.78rem",
        color: "rgba(255,255,255,0.45)",
        letterSpacing: "0.03em",
      }}>
        {stat.sublabel}
      </p>

      {/* bottom accent line */}
      <div style={{
        position: "absolute",
        bottom: 0, left: "50%",
        transform: hovered ? "translateX(-50%) scaleX(1)" : "translateX(-50%) scaleX(0)",
        width: "60%", height: "2px",
        borderRadius: "99px",
        background: stat.color,
        transition: "transform 0.35s cubic-bezier(.4,0,.2,1)",
      }} />
    </div>
  );
}

const CareerStatistics = () => {
  const sectionRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes floatDot { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.4} 100%{transform:scale(1.6);opacity:0} }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          position: "relative",
          background: "linear-gradient(135deg, #0f0c29 0%, #1a1060 40%, #24243e 100%)",
          padding: "6rem 1.5rem",
          overflow: "hidden",
          fontFamily: "'Sora', sans-serif",
        }}
      >
        {/* decorative dots */}
        {[
          { top:"10%", left:"5%", color:"#a78bfa", delay:"0s", size:8 },
          { top:"80%", left:"8%", color:"#38bdf8", delay:"0.8s", size:5 },
          { top:"20%", right:"6%", color:"#34d399", delay:"1.4s", size:6 },
          { top:"70%", right:"4%", color:"#fb923c", delay:"0.4s", size:9 },
          { top:"50%", left:"50%", color:"#a78bfa", delay:"1s", size:4 },
        ].map((d, i) => (
          <div key={i} style={{
            position:"absolute", top:d.top, left:d.left, right:d.right,
            width:d.size, height:d.size, borderRadius:"50%",
            background:d.color, opacity:0.6,
            animation:`floatDot 3.5s ease-in-out ${d.delay} infinite`,
          }} />
        ))}

        {/* big blurred bg orbs */}
        <div style={{ position:"absolute", top:"-10%", left:"-5%", width:"420px", height:"420px", borderRadius:"50%", background:"rgba(124,58,237,0.18)", filter:"blur(80px)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"-10%", right:"-5%", width:"380px", height:"380px", borderRadius:"50%", background:"rgba(56,189,248,0.12)", filter:"blur(80px)", pointerEvents:"none" }} />

        {/* header */}
        <div style={{
          textAlign:"center", marginBottom:"3.5rem",
          transform: animate ? "translateY(0)" : "translateY(20px)",
          opacity: animate ? 1 : 0,
          transition: "all 0.7s cubic-bezier(.4,0,.2,1)",
        }}>
          <div style={{
            display:"inline-block",
            background:"rgba(167,139,250,0.15)",
            border:"1px solid rgba(167,139,250,0.3)",
            borderRadius:"99px",
            padding:"0.3rem 1.1rem",
            fontSize:"0.75rem",
            fontWeight:"600",
            color:"#c4b5fd",
            letterSpacing:"0.1em",
            textTransform:"uppercase",
            marginBottom:"1rem",
          }}>
            Platform Insights
          </div>

          <h1 style={{
            fontSize:"clamp(2rem, 5vw, 3.2rem)",
            fontWeight:"800",
            color:"#fff",
            letterSpacing:"-1px",
            margin:0,
          }}>
            Career{" "}
            <span style={{
              background:"linear-gradient(90deg,#a78bfa,#38bdf8)",
              WebkitBackgroundClip:"text",
              WebkitTextFillColor:"transparent",
            }}>
              Statistics
            </span>
          </h1>

          <p style={{
            marginTop:"0.75rem",
            color:"rgba(255,255,255,0.5)",
            fontSize:"1rem",
            maxWidth:"420px",
            margin:"0.75rem auto 0",
          }}>
            Our platform is helping thousands of job seekers worldwide.
          </p>
        </div>

        {/* cards grid */}
        <div style={{
          maxWidth:"1100px",
          margin:"0 auto",
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",
          gap:"1.25rem",
        }}>
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} animate={animate} />
          ))}
        </div>
      </section>
    </>
  );
};

export default CareerStatistics;