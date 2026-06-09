import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

const MyProfile = () => {
  const user = {
    displayName: "Md Masud Rana",
    email: "masud@gmail.com",
    photoURL: "https://i.ibb.co/4pDNDk1/user.png",
  };

  const [visible, setVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const onMouseMove = (e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 24,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 24,
    });
  };

  const info = [
    {
      id: 0,
      icon: (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      ),
      label: "Full Name",
      value: user.displayName,
      accent: "#818cf8",
      glow: "rgba(129,140,248,0.25)",
    },
    {
      id: 1,
      icon: (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
      ),
      label: "Email Address",
      value: user.email,
      accent: "#34d399",
      glow: "rgba(52,211,153,0.25)",
    },
    {
      id: 2,
      icon: (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ),
      label: "Account Status",
      value: "Active",
      accent: "#00f5a0",
      glow: "rgba(0,245,160,0.25)",
      isStatus: true,
    },
    {
      id: 3,
      icon: (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
      ),
      label: "Member Type",
      value: "Job Seeker",
      accent: "#ffd93d",
      glow: "rgba(255,217,61,0.25)",
    },
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes floatOrb  { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-20px) scale(1.04)} }
        @keyframes rotatRing { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes pulseRing { 0%,100%{box-shadow:0 0 0 0 rgba(129,140,248,0.5)} 50%{box-shadow:0 0 0 10px rgba(129,140,248,0)} }
        @keyframes fadeSlide { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer   { 0%,100%{opacity:0.5} 50%{opacity:1} }
        @keyframes gradShift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes statusBlink { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>

      <div
        ref={heroRef}
        onMouseMove={onMouseMove}
        style={{
          minHeight: "100vh",
          background: "#080b0f",
          fontFamily: "'Sora', sans-serif",
          position: "relative",
          overflow: "hidden",
          padding: "4rem 1.5rem",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        {/* ── bg orbs ── */}
        {[
          { top:"-8%",  left:"-6%",  w:420, h:420, c:"rgba(99,102,241,0.1)",  d:"0s"   },
          { top:"50%",  right:"-5%", w:380, h:380, c:"rgba(168,85,247,0.08)", d:"1.5s" },
          { bottom:"5%",left:"35%",  w:300, h:280, c:"rgba(0,245,160,0.06)",  d:"0.8s" },
        ].map((o,i)=>(
          <div key={i} style={{
            position:"absolute", top:o.top, left:o.left, right:o.right, bottom:o.bottom,
            width:o.w, height:o.h, borderRadius:"50%",
            background:o.c, filter:"blur(80px)",
            animation:`floatOrb 9s ease-in-out ${o.d} infinite`,
            pointerEvents:"none",
          }}/>
        ))}

        {/* dot grid */}
        <div style={{
          position:"absolute", inset:0,
          backgroundImage:"radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize:"26px 26px", pointerEvents:"none",
        }}/>

        {/* watermark */}
        <div style={{
          position:"absolute", top:"50%", left:"50%",
          transform:"translate(-50%,-50%)",
          fontSize:"clamp(6rem,16vw,14rem)",
          fontWeight:"900", color:"rgba(255,255,255,0.012)",
          letterSpacing:"-0.06em", whiteSpace:"nowrap",
          pointerEvents:"none", userSelect:"none",
        }}>PROFILE</div>

        {/* ── main content ── */}
        <div style={{ maxWidth:"820px", width:"100%", position:"relative", zIndex:10 }}>

          {/* ── HERO CARD ── */}
          <div style={{
            position:"relative",
            background:"linear-gradient(135deg,rgba(13,16,24,0.95) 0%,rgba(18,22,32,0.95) 100%)",
            border:"1px solid rgba(255,255,255,0.07)",
            borderRadius:"32px",
            padding:"3rem 2.5rem",
            overflow:"hidden",
            boxShadow:"0 40px 80px rgba(0,0,0,0.6)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition:"all 0.8s cubic-bezier(.4,0,.2,1)",
          }}>

            {/* inner shimmer top */}
            <div style={{
              position:"absolute", top:0, left:0, right:0, height:"1px",
              background:"linear-gradient(90deg,transparent,rgba(129,140,248,0.6),transparent)",
              animation:"shimmer 3s ease-in-out infinite",
            }}/>

            {/* corner glow */}
            <div style={{
              position:"absolute", top:"-40px", right:"-40px",
              width:200, height:200, borderRadius:"50%",
              background:"rgba(129,140,248,0.12)", filter:"blur(60px)",
              pointerEvents:"none",
            }}/>

            {/* ── avatar + name row ── */}
            <div style={{
              display:"flex", flexWrap:"wrap",
              alignItems:"center", gap:"2rem",
              marginBottom:"2.5rem",
            }}>

              {/* avatar */}
              <div style={{
                position:"relative", flexShrink:0,
                transform:`translate3d(${mousePos.x*0.3}px,${mousePos.y*0.3}px,0)`,
                transition:"transform 0.2s ease",
              }}>
                {/* rotating dashed ring */}
                <div style={{
                  position:"absolute", inset:"-10px",
                  borderRadius:"50%",
                  border:"1.5px dashed rgba(129,140,248,0.3)",
                  animation:"rotatRing 8s linear infinite",
                }}/>
                {/* second ring opposite */}
                <div style={{
                  position:"absolute", inset:"-18px",
                  borderRadius:"50%",
                  border:"1px dashed rgba(0,245,160,0.15)",
                  animation:"rotatRing 14s linear reverse infinite",
                }}/>
                {/* glow ring */}
                <div style={{
                  position:"absolute", inset:"-4px", borderRadius:"50%",
                  background:"linear-gradient(135deg,#6366f1,#8b5cf6,#6366f1)",
                  backgroundSize:"200% auto",
                  animation:"gradShift 3s ease infinite",
                  padding:"3px",
                }}>
                  <div style={{
                    width:"100%", height:"100%",
                    borderRadius:"50%", background:"#080b0f",
                  }}/>
                </div>
                <img
                  src={user.photoURL}
                  alt="Profile"
                  style={{
                    position:"relative", zIndex:2,
                    width:"100px", height:"100px",
                    borderRadius:"50%",
                    objectFit:"cover",
                    animation:"pulseRing 3s ease-in-out infinite",
                  }}
                />
                {/* online dot */}
                <div style={{
                  position:"absolute", bottom:"4px", right:"4px", zIndex:3,
                  width:"16px", height:"16px", borderRadius:"50%",
                  background:"#00f5a0",
                  border:"2.5px solid #080b0f",
                  animation:"statusBlink 2.5s ease-in-out infinite",
                }}/>
              </div>

              {/* name + badge */}
              <div style={{ flex:1, minWidth:"180px" }}>
                <div style={{
                  display:"inline-flex", alignItems:"center", gap:"6px",
                  background:"rgba(99,102,241,0.12)",
                  border:"1px solid rgba(99,102,241,0.25)",
                  borderRadius:"99px", padding:"3px 12px",
                  marginBottom:"10px",
                }}>
                  <div style={{ width:6, height:6, borderRadius:"50%", background:"#818cf8", animation:"statusBlink 2s ease-in-out infinite" }}/>
                  <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.62rem", fontWeight:"700", letterSpacing:"0.14em", color:"#a5b4fc", textTransform:"uppercase" }}>
                    Verified Member
                  </span>
                </div>

                <h1 style={{
                  fontSize:"clamp(1.5rem,3.5vw,2.2rem)",
                  fontWeight:"900", letterSpacing:"-0.03em",
                  color:"#fff", margin:"0 0 6px", lineHeight:1.1,
                }}>
                  {user.displayName}
                </h1>

                <p style={{
                  fontFamily:"'DM Mono',monospace",
                  fontSize:"0.75rem", color:"rgba(255,255,255,0.3)",
                  letterSpacing:"0.05em", margin:0,
                }}>
                  {user.email}
                </p>

                {/* skill chips */}
                <div style={{ display:"flex", flexWrap:"wrap", gap:"6px", marginTop:"14px" }}>
                  {["Job Seeker","React Dev","Open to Work"].map((chip,i)=>(
                    <span key={i} style={{
                      fontFamily:"'DM Mono',monospace",
                      fontSize:"0.6rem", fontWeight:"600",
                      letterSpacing:"0.08em",
                      color:["#818cf8","#34d399","#ffd93d"][i],
                      background:["rgba(129,140,248,0.1)","rgba(52,211,153,0.1)","rgba(255,217,61,0.1)"][i],
                      border:`1px solid ${["rgba(129,140,248,0.25)","rgba(52,211,153,0.25)","rgba(255,217,61,0.25)"][i]}`,
                      padding:"4px 10px", borderRadius:"6px",
                    }}>{chip}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* divider */}
            <div style={{
              height:"1px", marginBottom:"2rem",
              background:"linear-gradient(90deg,rgba(129,140,248,0.4),rgba(0,245,160,0.2),transparent)",
            }}/>

            {/* ── info cards grid ── */}
            <div style={{
              display:"grid",
              gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
              gap:"1rem",
              marginBottom:"2.5rem",
            }}>
              {info.map((item, i) => (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredCard(item.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    position:"relative",
                    background: hoveredCard===item.id
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(255,255,255,0.03)",
                    border:`1px solid ${hoveredCard===item.id ? item.accent+"55" : "rgba(255,255,255,0.06)"}`,
                    borderRadius:"18px",
                    padding:"1.4rem 1.2rem",
                    overflow:"hidden",
                    cursor:"default",
                    transform: visible
                      ? hoveredCard===item.id ? "translateY(-4px)" : "translateY(0)"
                      : "translateY(20px)",
                    opacity: visible ? 1 : 0,
                    transition:`all 0.45s cubic-bezier(.4,0,.2,1) ${0.1+i*0.08}s`,
                    boxShadow: hoveredCard===item.id
                      ? `0 12px 40px ${item.glow}`
                      : "none",
                  }}
                >
                  {/* corner glow */}
                  <div style={{
                    position:"absolute", bottom:"-20px", right:"-20px",
                    width:80, height:80, borderRadius:"50%",
                    background:item.accent, filter:"blur(35px)",
                    opacity: hoveredCard===item.id ? 0.18 : 0.06,
                    transition:"opacity 0.3s", pointerEvents:"none",
                  }}/>

                  {/* icon */}
                  <div style={{
                    width:"38px", height:"38px", borderRadius:"12px",
                    background:item.accent+"18",
                    border:`1px solid ${item.accent}33`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    color:item.accent, marginBottom:"1rem",
                    transition:"transform 0.35s",
                    transform: hoveredCard===item.id ? "scale(1.12) rotate(-8deg)" : "scale(1)",
                  }}>
                    {item.icon}
                  </div>

                  <div style={{
                    fontFamily:"'DM Mono',monospace",
                    fontSize:"0.6rem", fontWeight:"600",
                    letterSpacing:"0.14em", textTransform:"uppercase",
                    color:"rgba(255,255,255,0.28)", marginBottom:"6px",
                  }}>
                    {item.label}
                  </div>

                  <div style={{
                    fontFamily:"'Sora',sans-serif",
                    fontSize:"0.95rem", fontWeight:"700",
                    color: item.isStatus ? item.accent : "#fff",
                    display:"flex", alignItems:"center", gap:"6px",
                  }}>
                    {item.isStatus && (
                      <div style={{ width:7, height:7, borderRadius:"50%", background:item.accent, animation:"statusBlink 2s ease-in-out infinite" }}/>
                    )}
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            {/* ── CTA button ── */}
            <div style={{ display:"flex", justifyContent:"center" }}>
              <Link to="/update-profile" style={{ textDecoration:"none" }}>
                <button
                  style={{
                    position:"relative",
                    background:"linear-gradient(135deg,#6366f1,#8b5cf6)",
                    backgroundSize:"200% auto",
                    border:"none",
                    borderRadius:"14px",
                    padding:"14px 36px",
                    color:"#fff",
                    fontFamily:"'Sora',sans-serif",
                    fontSize:"0.88rem",
                    fontWeight:"700",
                    letterSpacing:"0.03em",
                    cursor:"pointer",
                    display:"flex", alignItems:"center", gap:"10px",
                    boxShadow:"0 8px 30px rgba(99,102,241,0.4)",
                    transition:"all 0.3s cubic-bezier(.4,0,.2,1)",
                    overflow:"hidden",
                    animation:"gradShift 3s ease infinite",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-2px) scale(1.03)";
                    e.currentTarget.style.boxShadow = "0 14px 40px rgba(99,102,241,0.5)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = "0 8px 30px rgba(99,102,241,0.4)";
                  }}
                >
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />
                  </svg>
                  Update Information
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15M4.5 4.5h15v15" />
                  </svg>
                </button>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
