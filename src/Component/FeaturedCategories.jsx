import React, { useEffect, useRef, useState } from "react";
import {
  FaCode, FaPaintBrush, FaBullhorn,
  FaDatabase, FaMobileAlt, FaBriefcase,
} from "react-icons/fa";

const categories = [
  {
    id: 1,
    name: "Web Development",
    jobs: "120+ Jobs",
    icon: FaCode,
    accent: "#00f5a0",
    tag: "Most Popular",
    bg: "linear-gradient(135deg,#0a2a1a 0%,#0d1f14 100%)",
    num: "01",
  },
  {
    id: 2,
    name: "UI/UX Design",
    jobs: "85+ Jobs",
    icon: FaPaintBrush,
    accent: "#ff6fd8",
    tag: "Creative",
    bg: "linear-gradient(135deg,#2a0a20 0%,#1a0d18 100%)",
    num: "02",
  },
  {
    id: 3,
    name: "Digital Marketing",
    jobs: "95+ Jobs",
    icon: FaBullhorn,
    accent: "#ffd93d",
    tag: "Fast Growing",
    bg: "linear-gradient(135deg,#2a220a 0%,#1a180d 100%)",
    num: "03",
  },
  {
    id: 4,
    name: "Data Science",
    jobs: "70+ Jobs",
    icon: FaDatabase,
    accent: "#4fc3f7",
    tag: "High Demand",
    bg: "linear-gradient(135deg,#0a1a2a 0%,#0d1520 100%)",
    num: "04",
  },
  {
    id: 5,
    name: "Mobile App",
    jobs: "65+ Jobs",
    icon: FaMobileAlt,
    accent: "#ff8a65",
    tag: "Trending",
    bg: "linear-gradient(135deg,#2a150a 0%,#1a100d 100%)",
    num: "05",
  },
  {
    id: 6,
    name: "Business Analyst",
    jobs: "55+ Jobs",
    icon: FaBriefcase,
    accent: "#b39ddb",
    tag: "Strategic",
    bg: "linear-gradient(135deg,#180a2a 0%,#120d1a 100%)",
    num: "06",
  },
];

function CategoryCard({ cat, index, visible }) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 18,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 18,
    });
  };

  const Icon = cat.icon;

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMousePos({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        background: cat.bg,
        border: `1px solid ${hovered ? cat.accent + "55" : "rgba(255,255,255,0.07)"}`,
        borderRadius: "24px",
        padding: "2.2rem 2rem",
        cursor: "pointer",
        overflow: "hidden",
        transform: visible
          ? hovered
            ? `perspective(800px) rotateX(${-mousePos.y * 0.4}deg) rotateY(${mousePos.x * 0.4}deg) translateY(-6px) scale(1.02)`
            : "perspective(800px) rotateX(0) rotateY(0) translateY(0) scale(1)"
          : "translateY(40px) scale(0.95)",
        opacity: visible ? 1 : 0,
        transition: hovered
          ? "transform 0.12s ease, opacity 0.6s ease, border-color 0.3s"
          : "transform 0.5s cubic-bezier(.4,0,.2,1), opacity 0.6s ease, border-color 0.3s",
        transitionDelay: visible ? `${index * 0.09}s` : "0s",
        boxShadow: hovered
          ? `0 24px 60px ${cat.accent}22, 0 0 0 1px ${cat.accent}33`
          : "0 4px 24px rgba(0,0,0,0.4)",
      }}
    >
      {/* shimmer on hover */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(circle at ${50 + mousePos.x * 2}% ${50 + mousePos.y * 2}%, ${cat.accent}18 0%, transparent 65%)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s",
        pointerEvents: "none",
      }} />

      {/* top row: number + tag */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.8rem" }}>
        <span style={{
          fontSize: "0.7rem",
          fontWeight: "700",
          letterSpacing: "0.2em",
          color: "rgba(255,255,255,0.2)",
          fontFamily: "'DM Mono', monospace",
        }}>
          {cat.num}
        </span>
        <span style={{
          fontSize: "0.65rem",
          fontWeight: "700",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: cat.accent,
          background: cat.accent + "18",
          border: `1px solid ${cat.accent}44`,
          padding: "3px 10px",
          borderRadius: "99px",
          fontFamily: "'DM Mono', monospace",
        }}>
          {cat.tag}
        </span>
      </div>

      {/* icon block */}
      <div style={{
        width: "54px", height: "54px",
        borderRadius: "16px",
        background: cat.accent + "18",
        border: `1px solid ${cat.accent}33`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: cat.accent,
        fontSize: "22px",
        marginBottom: "1.4rem",
        transition: "transform 0.35s cubic-bezier(.4,0,.2,1), background 0.3s",
        transform: hovered ? "scale(1.12) rotate(-8deg)" : "scale(1) rotate(0)",
        background: hovered ? cat.accent + "28" : cat.accent + "18",
      }}>
        <Icon />
      </div>

      {/* name */}
      <h2 style={{
        fontSize: "1.35rem",
        fontWeight: "800",
        color: "#fff",
        margin: 0,
        letterSpacing: "-0.02em",
        fontFamily: "'Clash Display', 'Sora', sans-serif",
        lineHeight: 1.2,
      }}>
        {cat.name}
      </h2>

      {/* jobs count */}
      <p style={{
        marginTop: "0.5rem",
        fontSize: "0.82rem",
        color: "rgba(255,255,255,0.38)",
        fontFamily: "'DM Mono', monospace",
        letterSpacing: "0.05em",
      }}>
        {cat.jobs}
      </p>

      {/* bottom arrow — appears on hover */}
      <div style={{
        position: "absolute",
        bottom: "1.8rem", right: "1.8rem",
        width: "36px", height: "36px",
        borderRadius: "50%",
        background: cat.accent,
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: hovered ? 1 : 0,
        transform: hovered ? "scale(1) translateX(0)" : "scale(0.6) translateX(8px)",
        transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
      }}>
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#000" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15M4.5 4.5h15v15" />
        </svg>
      </div>

      {/* corner glow */}
      <div style={{
        position: "absolute",
        bottom: "-30px", right: "-30px",
        width: "120px", height: "120px",
        borderRadius: "50%",
        background: cat.accent,
        filter: "blur(50px)",
        opacity: hovered ? 0.18 : 0.07,
        transition: "opacity 0.3s",
        pointerEvents: "none",
      }} />
    </div>
  );
}

const FeaturedCategories = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          background: "#080b0f",
          padding: "7rem 1.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* huge bg text watermark */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          fontSize: "clamp(8rem, 20vw, 18rem)",
          fontWeight: "900",
          color: "rgba(255,255,255,0.015)",
          fontFamily: "'Sora',sans-serif",
          letterSpacing: "-0.05em",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
        }}>
          CAREERS
        </div>

        {/* header */}
        <div style={{
          maxWidth: "1100px", margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          marginBottom: "4rem",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.7s cubic-bezier(.4,0,.2,1)",
        }}>
          {/* eyebrow */}
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            marginBottom: "1.2rem",
          }}>
            <div style={{ width: "32px", height: "2px", background: "#00f5a0", borderRadius: "99px" }} />
            <span style={{
              fontSize: "0.72rem",
              fontWeight: "700",
              letterSpacing: "0.2em",
              color: "#00f5a0",
              textTransform: "uppercase",
              fontFamily: "'DM Mono', monospace",
            }}>
              Explore Fields
            </span>
          </div>

          <h1 style={{
            fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
            fontWeight: "800",
            color: "#fff",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            margin: 0,
            fontFamily: "'Sora', sans-serif",
          }}>
            Featured<br />
            <span style={{
              WebkitTextStroke: "1.5px rgba(255,255,255,0.25)",
              WebkitTextFillColor: "transparent",
            }}>
              Categories
            </span>
          </h1>

          <p style={{
            marginTop: "1.2rem",
            color: "rgba(255,255,255,0.35)",
            fontSize: "0.95rem",
            maxWidth: "380px",
            lineHeight: 1.7,
            fontFamily: "'Sora', sans-serif",
          }}>
            Discover opportunities across the most popular industries.
          </p>
        </div>

        {/* grid */}
        <div style={{
          maxWidth: "1100px", margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.25rem",
        }}>
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} cat={cat} index={i} visible={visible} />
          ))}
        </div>

        {/* scrolling ticker at bottom */}
        <div style={{
          marginTop: "5rem",
          overflow: "hidden",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          padding: "0.9rem 0",
          opacity: visible ? 1 : 0,
          transition: "opacity 1s ease 0.8s",
        }}>
          <div style={{
            display: "flex",
            whiteSpace: "nowrap",
            animation: "ticker 18s linear infinite",
            gap: "3rem",
          }}>
            {[...Array(2)].map((_, ri) => (
              <div key={ri} style={{ display: "flex", gap: "3rem" }}>
                {categories.map((c, i) => (
                  <span key={i} style={{
                    fontSize: "0.72rem",
                    fontWeight: "700",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: c.accent,
                    fontFamily: "'DM Mono', monospace",
                    display: "flex", alignItems: "center", gap: "10px",
                  }}>
                    <span style={{ opacity: 0.4, color: "#fff" }}>✦</span>
                    {c.name}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedCategories;
