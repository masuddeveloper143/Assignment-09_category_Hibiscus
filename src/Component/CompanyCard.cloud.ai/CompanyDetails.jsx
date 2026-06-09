import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import JobCard from "../Component/JobCard";

/* ── tiny reusable pill ── */
const Chip = ({ label, accent }) => (
  <span style={{
    fontFamily: "'DM Mono',monospace",
    fontSize: "0.62rem", fontWeight: "600",
    letterSpacing: "0.1em", textTransform: "uppercase",
    color: accent,
    background: accent + "18",
    border: `1px solid ${accent}33`,
    padding: "4px 12px", borderRadius: "99px",
  }}>{label}</span>
);

/* ── job detail modal ── */
const JobModal = ({ job, company, onClose }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { requestAnimationFrame(() => setMounted(true)); }, []);

  const accents = ["#818cf8","#34d399","#ffd93d","#ff6fd8","#4fc3f7","#ff8a65"];
  const accent  = accents[(job?.title?.charCodeAt(0) || 0) % accents.length];

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1.5rem",
        opacity: mounted ? 1 : 0,
        transition: "opacity 0.3s",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: "620px",
          background: "linear-gradient(135deg,#0d1018 0%,#131720 100%)",
          border: `1px solid ${accent}44`,
          borderRadius: "28px",
          overflow: "hidden",
          boxShadow: `0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px ${accent}22`,
          transform: mounted ? "translateY(0) scale(1)" : "translateY(30px) scale(0.96)",
          transition: "transform 0.4s cubic-bezier(.4,0,.2,1)",
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        {/* top shimmer */}
        <div style={{
          height: "2px",
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          opacity: 0.8,
        }} />

        {/* corner glow */}
        <div style={{
          position: "absolute", top: "-30px", right: "-30px",
          width: 180, height: 180, borderRadius: "50%",
          background: accent, filter: "blur(70px)", opacity: 0.12,
          pointerEvents: "none",
        }} />

        <div style={{ padding: "2rem 2.2rem" }}>

          {/* header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.8rem", gap: "1rem" }}>
            <div>
              <div style={{ marginBottom: "10px" }}>
                <Chip label={job.jobType} accent={accent} />
              </div>
              <h2 style={{
                fontFamily: "'Sora',sans-serif",
                fontSize: "clamp(1.3rem,3vw,1.8rem)",
                fontWeight: "800", color: "#fff",
                letterSpacing: "-0.03em", margin: 0, lineHeight: 1.2,
              }}>{job.title}</h2>
            </div>
            <button
              onClick={onClose}
              style={{
                width: "36px", height: "36px", borderRadius: "10px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.5)", fontSize: "16px",
                cursor: "pointer", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background="rgba(239,68,68,0.15)"; e.currentTarget.style.color="#ef4444"; }}
              onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.05)"; e.currentTarget.style.color="rgba(255,255,255,0.5)"; }}
            >✕</button>
          </div>

          {/* meta chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "1.8rem" }}>
            {[
              { icon: "📍", label: job.location, accent: "#34d399" },
              { icon: "💰", label: job.salary,   accent: "#ffd93d" },
              { icon: "💼", label: job.jobType,  accent: "#818cf8" },
            ].map((m, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "6px",
                background: m.accent + "12",
                border: `1px solid ${m.accent}30`,
                borderRadius: "10px", padding: "7px 14px",
              }}>
                <span style={{ fontSize: "13px" }}>{m.icon}</span>
                <span style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: "0.72rem", fontWeight: "500",
                  color: m.accent, letterSpacing: "0.04em",
                }}>{m.label}</span>
              </div>
            ))}
          </div>

          {/* description */}
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "16px", padding: "1.2rem 1.4rem",
            marginBottom: "1.8rem",
          }}>
            <div style={{
              fontFamily: "'DM Mono',monospace", fontSize: "0.6rem",
              fontWeight: "700", letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.25)", textTransform: "uppercase",
              marginBottom: "8px",
            }}>About this role</div>
            <p style={{
              fontFamily: "'Sora',sans-serif", fontSize: "0.88rem",
              color: "rgba(255,255,255,0.5)", lineHeight: 1.75, margin: 0,
            }}>{job.description}</p>
          </div>

          {/* requirements */}
          <div style={{ marginBottom: "2rem" }}>
            <div style={{
              fontFamily: "'DM Mono',monospace", fontSize: "0.6rem",
              fontWeight: "700", letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.25)", textTransform: "uppercase",
              marginBottom: "12px",
            }}>Requirements</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {job.requirements?.map((req, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: "10px",
                  padding: "10px 14px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: "10px",
                }}>
                  <div style={{
                    width: "6px", height: "6px", borderRadius: "50%",
                    background: accent, flexShrink: 0, marginTop: "6px",
                  }} />
                  <span style={{
                    fontFamily: "'Sora',sans-serif", fontSize: "0.85rem",
                    color: "rgba(255,255,255,0.55)", lineHeight: 1.6,
                  }}>{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              onClick={() => window.open(company.website, "_blank")}
              style={{
                flex: 1, minWidth: "140px",
                background: `linear-gradient(135deg, ${accent}, ${accent}bb)`,
                border: "none", borderRadius: "12px",
                padding: "13px 24px", color: "#000",
                fontFamily: "'Sora',sans-serif", fontSize: "0.88rem",
                fontWeight: "700", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                boxShadow: `0 8px 24px ${accent}44`,
                transition: "all 0.25s",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 14px 32px ${accent}55`; }}
              onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow=`0 8px 24px ${accent}44`; }}
            >
              Apply Now
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15M4.5 4.5h15v15" />
              </svg>
            </button>
            <button
              onClick={onClose}
              style={{
                padding: "13px 24px",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px", color: "rgba(255,255,255,0.45)",
                fontFamily: "'Sora',sans-serif", fontSize: "0.88rem",
                fontWeight: "600", cursor: "pointer",
                transition: "all 0.25s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.25)"; e.currentTarget.style.color="#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"; e.currentTarget.style.color="rgba(255,255,255,0.45)"; }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════ */
const CompanyDetails = () => {
  const { id } = useParams();
  const [company,     setCompany]     = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [visible,     setVisible]     = useState(false);
  const [mousePos,    setMousePos]    = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    fetch("/companies.json")
      .then(r => r.json())
      .then(data => {
        const found = data.find(c => c.id === parseInt(id));
        setCompany(found);
        setTimeout(() => setVisible(true), 80);
      });
  }, [id]);

  const onMouseMove = (e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top)  / rect.height - 0.5) * 20,
    });
  };

  const accents = ["#818cf8","#34d399","#ffd93d","#ff6fd8","#4fc3f7","#ff8a65"];
  const accent  = company ? accents[(company.name?.charCodeAt(0) || 0) % accents.length] : "#818cf8";

  /* ── loading / not found ── */
  if (!company) return (
    <div style={{
      minHeight: "100vh", background: "#080b0f",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Sora',sans-serif",
    }}>
      <div style={{ textAlign: "center" }}>
        <div style={{
          width: "48px", height: "48px", borderRadius: "50%",
          border: "2px solid rgba(129,140,248,0.3)",
          borderTopColor: "#818cf8",
          animation: "spin 0.8s linear infinite",
          margin: "0 auto 1.5rem",
        }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.9rem" }}>Loading company...</p>
      </div>
    </div>
  );

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes floatOrb   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
        @keyframes shimmerBar { 0%,100%{opacity:0.4} 50%{opacity:0.9} }
        @keyframes gradShift  { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes rotatRing  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      `}</style>

      <div
        ref={heroRef}
        onMouseMove={onMouseMove}
        style={{
          minHeight: "100vh",
          background: "#080b0f",
          fontFamily: "'Sora',sans-serif",
          position: "relative",
          overflow: "hidden",
          paddingBottom: "5rem",
        }}
      >
        {/* bg orbs */}
        {[
          { top:"-8%",  left:"-6%",  w:420, c:"rgba(99,102,241,0.1)",  d:"0s"   },
          { top:"40%",  right:"-5%", w:360, c:"rgba(168,85,247,0.08)", d:"1.5s" },
          { bottom:"5%",left:"35%",  w:300, c: accent+"0a",             d:"0.8s" },
        ].map((o,i)=>(
          <div key={i} style={{
            position:"absolute", top:o.top, left:o.left, right:o.right, bottom:o.bottom,
            width:o.w, height:o.w, borderRadius:"50%",
            background:o.c, filter:"blur(80px)",
            animation:`floatOrb 9s ease-in-out ${o.d} infinite`,
            pointerEvents:"none",
          }}/>
        ))}

        {/* dot grid */}
        <div style={{
          position:"absolute", inset:0,
          backgroundImage:"radial-gradient(rgba(255,255,255,0.04) 1px,transparent 1px)",
          backgroundSize:"26px 26px", pointerEvents:"none",
        }}/>

        {/* watermark */}
        <div style={{
          position:"absolute", top:"18%", left:"50%",
          transform:"translateX(-50%)",
          fontSize:"clamp(5rem,14vw,12rem)", fontWeight:"900",
          color:"rgba(255,255,255,0.012)", letterSpacing:"-0.06em",
          whiteSpace:"nowrap", pointerEvents:"none", userSelect:"none",
        }}>
          {company.name?.toUpperCase()}
        </div>

        <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"3rem 1.5rem", position:"relative", zIndex:10 }}>

          {/* ══ COMPANY HERO CARD ══ */}
          <div style={{
            position:"relative",
            background:"linear-gradient(135deg,rgba(13,16,24,0.97) 0%,rgba(18,22,32,0.97) 100%)",
            border:`1px solid ${accent}44`,
            borderRadius:"32px",
            padding:"2.5rem",
            overflow:"hidden",
            boxShadow:`0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px ${accent}22`,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition:"all 0.8s cubic-bezier(.4,0,.2,1)",
            marginBottom:"2rem",
          }}>

            {/* shimmer top line */}
            <div style={{
              position:"absolute", top:0, left:0, right:0, height:"2px",
              background:`linear-gradient(90deg,transparent,${accent},transparent)`,
              animation:"shimmerBar 3s ease-in-out infinite",
            }}/>

            {/* corner glow */}
            <div style={{
              position:"absolute", top:"-40px", right:"-40px",
              width:200, height:200, borderRadius:"50%",
              background:accent, filter:"blur(70px)", opacity:0.12,
              pointerEvents:"none",
            }}/>

            <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:"2rem" }}>

              {/* logo with ring */}
              <div style={{
                position:"relative", flexShrink:0,
                transform:`translate3d(${mousePos.x*0.25}px,${mousePos.y*0.25}px,0)`,
                transition:"transform 0.2s ease",
              }}>
                <div style={{
                  position:"absolute", inset:"-10px", borderRadius:"50%",
                  border:`1.5px dashed ${accent}44`,
                  animation:"rotatRing 8s linear infinite",
                }}/>
                <div style={{
                  width:"90px", height:"90px", borderRadius:"22px",
                  background:"rgba(255,255,255,0.05)",
                  border:`1px solid ${accent}33`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  overflow:"hidden", padding:"12px",
                  boxShadow:`0 8px 30px ${accent}22`,
                }}>
                  <img src={company.logo} alt={company.name} style={{ width:"100%", height:"100%", objectFit:"contain" }} />
                </div>
              </div>

              {/* info */}
              <div style={{ flex:1, minWidth:"200px" }}>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"8px", marginBottom:"12px" }}>
                  <Chip label={company.industry} accent={accent} />
                  <Chip label="Hiring" accent="#00f5a0" />
                </div>
                <h1 style={{
                  fontSize:"clamp(1.8rem,4vw,2.8rem)", fontWeight:"900",
                  color:"#fff", letterSpacing:"-0.03em", margin:"0 0 8px", lineHeight:1.1,
                }}>{company.name}</h1>
                <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke={accent} strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.75rem", color:accent, letterSpacing:"0.04em" }}>
                    {company.location}
                  </span>
                </div>
              </div>

              {/* website button */}
              <a href={company.website} target="_blank" rel="noreferrer" style={{ textDecoration:"none" }}>
                <button style={{
                  background:`linear-gradient(135deg,${accent},${accent}bb)`,
                  border:"none", borderRadius:"14px",
                  padding:"12px 24px", color:"#000",
                  fontFamily:"'Sora',sans-serif", fontSize:"0.85rem",
                  fontWeight:"700", cursor:"pointer",
                  display:"flex", alignItems:"center", gap:"8px",
                  boxShadow:`0 8px 24px ${accent}44`,
                  transition:"all 0.25s", whiteSpace:"nowrap",
                }}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=`0 14px 32px ${accent}55`;}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow=`0 8px 24px ${accent}44`;}}
                >
                  Visit Website
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15M4.5 4.5h15v15" />
                  </svg>
                </button>
              </a>
            </div>
          </div>

          {/* ══ JOBS SECTION ══ */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition:"all 0.8s cubic-bezier(.4,0,.2,1) 0.2s",
          }}>

            {/* section header */}
            <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"2rem", marginTop:"1rem" }}>
              <div style={{ width:"32px", height:"2px", background:accent, borderRadius:"99px" }}/>
              <span style={{
                fontFamily:"'DM Mono',monospace", fontSize:"0.7rem",
                fontWeight:"700", letterSpacing:"0.2em",
                color:accent, textTransform:"uppercase",
              }}>Open Positions</span>
              {/* count badge */}
              <div style={{
                marginLeft:"auto",
                fontFamily:"'DM Mono',monospace", fontSize:"0.65rem",
                fontWeight:"700", color:accent,
                background:accent+"18", border:`1px solid ${accent}33`,
                borderRadius:"99px", padding:"3px 12px",
              }}>
                {company.jobs?.length} Jobs
              </div>
            </div>

            <h2 style={{
              fontSize:"clamp(1.6rem,3.5vw,2.4rem)", fontWeight:"800",
              color:"#fff", letterSpacing:"-0.03em",
              margin:"0 0 2rem", lineHeight:1.1,
            }}>
              Available <span style={{
                WebkitTextStroke:"1.5px rgba(255,255,255,0.2)",
                WebkitTextFillColor:"transparent",
              }}>Jobs</span>
            </h2>

            {/* job cards with stagger */}
            <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
              {company.jobs?.map((job, i) => (
                <div key={job.id} style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transition:`all 0.5s cubic-bezier(.4,0,.2,1) ${0.3+i*0.07}s`,
                }}>
                  <JobCard job={job} handleOpenModal={setSelectedJob} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ MODAL ══ */}
        {selectedJob && (
          <JobModal
            job={selectedJob}
            company={company}
            onClose={() => setSelectedJob(null)}
          />
        )}
      </div>
    </>
  );
};

export default CompanyDetails;
