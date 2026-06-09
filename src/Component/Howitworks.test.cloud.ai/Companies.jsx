import React, { useRef, useState } from "react";
import { Link } from "react-router";

const CompanyCard = ({ company }) => {
  const { id, name, logo, location, industry } = company;

  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setMouse({
      x: ((e.clientX - r.left) / r.width - 0.5) * 20,
      y: ((e.clientY - r.top) / r.height - 0.5) * 20,
    });
  };

  // generate a consistent accent color from name
  const accents = ["#00f5a0", "#ff6fd8", "#ffd93d", "#4fc3f7", "#ff8a65", "#b39ddb"];
  const accent = accents[(name?.charCodeAt(0) || 0) % accents.length];
  const glowColor = accent + "33";

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

      <div
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setMouse({ x: 0, y: 0 }); }}
        onMouseMove={onMove}
        style={{
          position: "relative",
          background: "linear-gradient(135deg,#0e0e16 0%,#13131e 100%)",
          border: `1px solid ${hovered ? accent + "55" : "rgba(255,255,255,0.07)"}`,
          borderRadius: "24px",
          padding: "2rem 1.75rem",
          overflow: "hidden",
          cursor: "default",
          transform: hovered
            ? `perspective(900px) rotateX(${-mouse.y * 0.35}deg) rotateY(${mouse.x * 0.35}deg) translateY(-8px) scale(1.02)`
            : "perspective(900px) rotateX(0) rotateY(0) translateY(0) scale(1)",
          transition: hovered
            ? "transform 0.1s ease, border-color 0.3s, box-shadow 0.3s"
            : "transform 0.55s cubic-bezier(.4,0,.2,1), border-color 0.3s, box-shadow 0.3s",
          boxShadow: hovered
            ? `0 28px 70px ${glowColor}, 0 0 0 1px ${accent}22`
            : "0 4px 24px rgba(0,0,0,0.45)",
        }}
      >
        {/* shimmer spotlight */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: "24px",
          background: `radial-gradient(circle at ${50 + mouse.x * 2.5}% ${50 + mouse.y * 2.5}%, ${accent}18 0%, transparent 60%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s",
          pointerEvents: "none",
        }} />

        {/* top-right corner glow */}
        <div style={{
          position: "absolute", top: "-40px", right: "-40px",
          width: "140px", height: "140px", borderRadius: "50%",
          background: accent,
          filter: "blur(60px)",
          opacity: hovered ? 0.18 : 0.07,
          transition: "opacity 0.35s",
          pointerEvents: "none",
        }} />

        {/* industry badge top-right */}
        <div style={{
          position: "absolute", top: "1.25rem", right: "1.25rem",
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.6rem",
          fontWeight: "700",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: accent,
          background: accent + "18",
          border: `1px solid ${accent}44`,
          padding: "3px 10px",
          borderRadius: "99px",
        }}>
          {industry?.split(" ")[0] || "Tech"}
        </div>

        {/* logo area */}
        <div style={{
          width: "70px", height: "70px",
          borderRadius: "18px",
          background: "rgba(255,255,255,0.05)",
          border: `1px solid ${hovered ? accent + "44" : "rgba(255,255,255,0.08)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: "1.4rem",
          overflow: "hidden",
          transition: "transform 0.4s cubic-bezier(.4,0,.2,1), border-color 0.3s",
          transform: hovered ? "scale(1.1) rotate(-5deg)" : "scale(1) rotate(0)",
          padding: "10px",
        }}>
          <img
            src={logo}
            alt={name}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>

        {/* company name */}
        <h2 style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: "1.2rem",
          fontWeight: "800",
          color: "#fff",
          letterSpacing: "-0.02em",
          margin: "0 0 0.35rem",
          lineHeight: 1.25,
        }}>
          {name}
        </h2>

        {/* industry full */}
        <p style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: "0.82rem",
          color: "rgba(255,255,255,0.38)",
          margin: "0 0 0.3rem",
        }}>
          {industry}
        </p>

        {/* location */}
        <div style={{
          display: "flex", alignItems: "center", gap: "6px",
          marginBottom: "1.75rem",
        }}>
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke={accent} strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.72rem",
            color: accent,
            letterSpacing: "0.04em",
          }}>
            {location}
          </span>
        </div>

        {/* divider */}
        <div style={{
          height: "1px",
          background: `linear-gradient(90deg, ${accent}44, transparent)`,
          marginBottom: "1.4rem",
          transition: "opacity 0.3s",
          opacity: hovered ? 1 : 0.4,
        }} />

        {/* CTA button */}
        <Link to={`/company/${id}`} style={{ textDecoration: "none" }}>
          <button
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "12px",
              border: `1px solid ${hovered ? accent : accent + "55"}`,
              background: hovered ? accent : "transparent",
              color: hovered ? "#000" : accent,
              fontFamily: "'Sora', sans-serif",
              fontSize: "0.85rem",
              fontWeight: "700",
              letterSpacing: "0.02em",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            View Details
            <svg
              width="14" height="14" fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              style={{
                transform: hovered ? "translateX(3px)" : "translateX(0)",
                transition: "transform 0.3s",
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15M4.5 4.5h15v15" />
            </svg>
          </button>
        </Link>

        {/* bottom-left number watermark */}
        <div style={{
          position: "absolute", bottom: "1rem", right: "1.2rem",
          fontFamily: "'DM Mono', monospace",
          fontSize: "4rem",
          fontWeight: "900",
          color: "rgba(255,255,255,0.025)",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
          letterSpacing: "-0.05em",
        }}>
          {String(id).padStart(2, "0")}
        </div>
      </div>
    </>
  );
};

export default CompanyCard;
