import React, { useState, useEffect, useRef } from "react";
import { FiSearch, FiMapPin, FiArrowRight } from "react-icons/fi";

const AnimatedCounter = ({ target, duration = 2500, start }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [target, duration, start]);
  return <span>{count}</span>;
};

const stats = [
  { target: 50,  suffix: "+",  label: "Top Tech Giants",  accent: "#00f5a0" },
  { target: 12,  suffix: "K+", label: "Active Openings",  accent: "#ff6fd8" },
  { target: 98,  suffix: "%",  label: "Hiring Success",   accent: "#ffd93d" },
];

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handle = (e) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) / 45,
        y: (e.clientY - window.innerHeight / 2) / 45,
      });
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes floatA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
        @keyframes floatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes pulseGlow { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes scanLine {
          0%   { transform: translateY(-100%); opacity: 0; }
          10%  { opacity: 0.06; }
          90%  { opacity: 0.06; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        @keyframes gradShift {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        @keyframes borderGlow {
          0%,100% { border-color: rgba(0,245,160,0.3); }
          33%      { border-color: rgba(255,111,216,0.3); }
          66%      { border-color: rgba(79,195,247,0.3); }
        }
        .hero-input::placeholder { color: rgba(255,255,255,0.2); }
        .hero-input { background: transparent; border: none; outline: none; color: #fff; font-family: 'Sora', sans-serif; font-size: 0.9rem; width: 100%; }
      `}</style>

      <section
        ref={ref}
        style={{
          position: "relative",
          background: "#080b0f",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          padding: "2rem 1.5rem",
          fontFamily: "'Sora', sans-serif",
        }}
      >
        {/* ── dot grid ── */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
        }} />

        {/* ── scan line ── */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)",
          height: "200px", width: "100%",
          animation: "scanLine 6s linear infinite",
          pointerEvents: "none",
        }} />

        {/* ── bg orbs ── */}
        {[
          { top:"-10%", left:"-5%",  w:500, h:500, color:"rgba(99,102,241,0.12)", blur:100, delay:"0s"   },
          { top:"50%",  right:"-8%", w:450, h:450, color:"rgba(168,85,247,0.10)", blur:100, delay:"1.5s" },
          { bottom:"0", left:"30%",  w:400, h:300, color:"rgba(0,245,160,0.06)",  blur:100, delay:"0.8s" },
        ].map((o, i) => (
          <div key={i} style={{
            position:"absolute", top:o.top, left:o.left, right:o.right, bottom:o.bottom,
            width:o.w, height:o.h, borderRadius:"50%",
            background:o.color, filter:`blur(${o.blur}px)`,
            animation:`floatA 10s ease-in-out ${o.delay} infinite`,
            pointerEvents:"none",
          }} />
        ))}

        {/* ── watermark ── */}
        <div style={{
          position:"absolute", top:"50%", left:"50%",
          transform:"translate(-50%,-50%)",
          fontSize:"clamp(5rem,15vw,13rem)",
          fontWeight:"900",
          color:"rgba(255,255,255,0.012)",
          letterSpacing:"-0.06em",
          whiteSpace:"nowrap",
          pointerEvents:"none",
          userSelect:"none",
        }}>HIRENOW</div>

        {/* ── main grid ── */}
        <div style={{
          maxWidth:"1100px", width:"100%", margin:"0 auto",
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",
          gap:"3rem",
          alignItems:"center",
          position:"relative", zIndex:10,
        }}>

          {/* ════ LEFT ════ */}
          <div style={{
            display:"flex", flexDirection:"column", gap:"2rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition: "all 0.85s cubic-bezier(.4,0,.2,1)",
          }}>

            {/* badge */}
            <div style={{
              display:"inline-flex", alignItems:"center", gap:"8px",
              background:"rgba(99,102,241,0.12)",
              border:"1px solid rgba(99,102,241,0.3)",
              borderRadius:"99px",
              padding:"6px 16px",
              width:"fit-content",
              animation:"borderGlow 4s ease-in-out infinite",
            }}>
              <div style={{ width:7, height:7, borderRadius:"50%", background:"#818cf8", animation:"pulseGlow 2s ease-in-out infinite" }} />
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.68rem", fontWeight:"700", letterSpacing:"0.15em", color:"#a5b4fc", textTransform:"uppercase" }}>
                #1 Job Platform for Tech
              </span>
            </div>

            {/* headline */}
            <div>
              <h1 style={{
                fontSize:"clamp(2.4rem,5.5vw,4rem)",
                fontWeight:"900",
                lineHeight:1.08,
                letterSpacing:"-0.03em",
                margin:0,
                color:"#fff",
              }}>
                Find Your<br />
                <span style={{
                  background:"linear-gradient(90deg,#818cf8,#c084fc,#818cf8)",
                  backgroundSize:"200% auto",
                  WebkitBackgroundClip:"text",
                  WebkitTextFillColor:"transparent",
                  animation:"gradShift 4s ease infinite",
                }}>
                  Dream Job
                </span><br />
                <span style={{
                  WebkitTextStroke:"1.5px rgba(255,255,255,0.2)",
                  WebkitTextFillColor:"transparent",
                }}>
                  With Confidence
                </span>
              </h1>
            </div>

            {/* subtitle */}
            <p style={{
              fontSize:"0.95rem",
              color:"rgba(255,255,255,0.38)",
              lineHeight:1.8,
              maxWidth:"420px",
              margin:0,
            }}>
              Discover thousands of verified opportunities from top-tier global companies with transparent salaries and smart matching.
            </p>

            {/* search bar */}
            <div style={{
              background:"rgba(255,255,255,0.04)",
              border:"1px solid rgba(255,255,255,0.09)",
              borderRadius:"16px",
              padding:"6px",
              display:"flex",
              flexWrap:"wrap",
              gap:"6px",
              maxWidth:"520px",
              transition:"border-color 0.3s, box-shadow 0.3s",
            }}
              onFocus={e => {
                e.currentTarget.style.borderColor = "rgba(129,140,248,0.5)";
                e.currentTarget.style.boxShadow = "0 0 0 4px rgba(99,102,241,0.08)";
              }}
              onBlur={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* job input */}
              <div style={{ flex:1, minWidth:"130px", display:"flex", alignItems:"center", gap:"8px", padding:"8px 10px" }}>
                <FiSearch style={{ color:"rgba(255,255,255,0.25)", fontSize:"16px", flexShrink:0 }} />
                <input className="hero-input" type="text" placeholder="Job title, keywords..." />
              </div>
              {/* divider */}
              <div style={{ width:"1px", background:"rgba(255,255,255,0.07)", margin:"8px 0", alignSelf:"stretch" }} />
              {/* location input */}
              <div style={{ flex:1, minWidth:"120px", display:"flex", alignItems:"center", gap:"8px", padding:"8px 10px" }}>
                <FiMapPin style={{ color:"rgba(255,255,255,0.25)", fontSize:"16px", flexShrink:0 }} />
                <input className="hero-input" type="text" placeholder="Location or Remote" />
              </div>
              {/* button */}
              <button style={{
                background:"linear-gradient(135deg,#6366f1,#8b5cf6)",
                color:"#fff",
                border:"none",
                borderRadius:"10px",
                padding:"10px 20px",
                fontFamily:"'Sora',sans-serif",
                fontSize:"0.82rem",
                fontWeight:"700",
                cursor:"pointer",
                display:"flex",
                alignItems:"center",
                gap:"6px",
                whiteSpace:"nowrap",
                transition:"opacity 0.2s, transform 0.2s",
                boxShadow:"0 4px 20px rgba(99,102,241,0.35)",
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
                onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
              >
                Search <FiArrowRight />
              </button>
            </div>

            {/* stats */}
            <div style={{
              display:"flex", flexWrap:"wrap", gap:"2rem",
              paddingTop:"1.5rem",
              borderTop:"1px solid rgba(255,255,255,0.07)",
            }}>
              {stats.map((s, i) => (
                <div key={i} style={{ display:"flex", flexDirection:"column", gap:"4px" }}>
                  <span style={{
                    fontFamily:"'Sora',sans-serif",
                    fontSize:"1.8rem",
                    fontWeight:"900",
                    letterSpacing:"-0.03em",
                    color: s.accent,
                    lineHeight:1,
                  }}>
                    <AnimatedCounter target={s.target} start={visible} />{s.suffix}
                  </span>
                  <span style={{
                    fontFamily:"'DM Mono',monospace",
                    fontSize:"0.62rem",
                    fontWeight:"600",
                    letterSpacing:"0.12em",
                    textTransform:"uppercase",
                    color:"rgba(255,255,255,0.28)",
                  }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ════ RIGHT ════ */}
          <div style={{
            position:"relative",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition: "all 0.85s cubic-bezier(.4,0,.2,1) 0.2s",
          }}>

            {/* image card */}
            <div style={{
              position:"relative", zIndex:2,
              width:"100%", maxWidth:"400px",
              aspectRatio:"4/5",
              borderRadius:"28px",
              overflow:"hidden",
              border:"1px solid rgba(255,255,255,0.08)",
              boxShadow:"0 40px 80px rgba(0,0,0,0.6)",
              transition:"transform 0.25s ease",
              transform:`translate3d(${mousePos.x}px,${mousePos.y}px,0) rotateY(${mousePos.x/2.5}deg)`,
            }}>
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80"
                alt="Job Search"
                style={{ width:"100%", height:"100%", objectFit:"cover" }}
              />
              {/* dark overlay gradient */}
              <div style={{
                position:"absolute", inset:0,
                background:"linear-gradient(to top,rgba(8,11,15,0.7) 0%,transparent 50%)",
              }} />
              {/* overlay text */}
              <div style={{
                position:"absolute", bottom:"1.5rem", left:"1.5rem", right:"1.5rem",
              }}>
                <div style={{
                  fontFamily:"'DM Mono',monospace",
                  fontSize:"0.65rem", fontWeight:"700",
                  letterSpacing:"0.15em", color:"#00f5a0",
                  textTransform:"uppercase", marginBottom:"6px",
                }}>
                  Now Hiring
                </div>
                <div style={{
                  fontFamily:"'Sora',sans-serif",
                  fontSize:"1rem", fontWeight:"800",
                  color:"#fff",
                }}>
                  500+ New Jobs Today
                </div>
              </div>
            </div>

            {/* floating card 1 — top right */}
            <div style={{
              position:"absolute", top:"-16px", right:"-8px",
              zIndex:3,
              background:"rgba(13,16,24,0.95)",
              backdropFilter:"blur(12px)",
              border:"1px solid rgba(255,255,255,0.1)",
              borderRadius:"16px",
              padding:"12px 16px",
              display:"flex", alignItems:"center", gap:"10px",
              boxShadow:"0 16px 40px rgba(0,0,0,0.5)",
              animation:"floatB 4s ease-in-out infinite",
              transition:"transform 0.25s ease",
              transform:`translate3d(${mousePos.x*-1.5}px,${mousePos.y*-1.5}px,0)`,
            }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:"#00f5a0", animation:"pulseGlow 2s ease-in-out infinite" }} />
              <div>
                <div style={{ fontFamily:"'Sora',sans-serif", fontSize:"0.78rem", fontWeight:"700", color:"#fff" }}>
                  Software Engineer
                </div>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.6rem", color:"rgba(255,255,255,0.35)", letterSpacing:"0.08em" }}>
                  GOOGLE • REMOTE
                </div>
              </div>
            </div>

            {/* floating card 2 — bottom left */}
            <div style={{
              position:"absolute", bottom:"-16px", left:"-8px",
              zIndex:3,
              background:"rgba(13,16,24,0.95)",
              backdropFilter:"blur(12px)",
              border:"1px solid rgba(255,255,255,0.08)",
              borderRadius:"16px",
              padding:"14px 18px",
              boxShadow:"0 16px 40px rgba(0,0,0,0.5)",
              animation:"floatA 5s ease-in-out 1s infinite",
              transition:"transform 0.25s ease",
              transform:`translate3d(${mousePos.x*2}px,${mousePos.y*2}px,0)`,
            }}>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.6rem", color:"#818cf8", fontWeight:"700", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:"4px" }}>
                Avg. Tech Salary
              </div>
              <div style={{ fontFamily:"'Sora',sans-serif", fontSize:"1.4rem", fontWeight:"900", color:"#fff", letterSpacing:"-0.03em" }}>
                $145,000<span style={{ fontSize:"0.75rem", color:"rgba(255,255,255,0.3)", fontWeight:"400" }}>/yr</span>
              </div>
            </div>

            {/* ring decoration */}
            <div style={{
              position:"absolute", top:"50%", left:"50%",
              transform:"translate(-50%,-50%)",
              width:"115%", height:"115%",
              borderRadius:"50%",
              border:"1px dashed rgba(255,255,255,0.05)",
              pointerEvents:"none",
              zIndex:1,
            }} />
          </div>

        </div>
      </section>
    </>
  );
};

export default Hero;
