import React, { useEffect, useRef, useState } from 'react';
import CompanyCard from '../Component/CompanyCard';
import Hero from '../Component/Hero';
import HowItWorks from '../Component/HowItWorks';
import FeaturedCategories from '../Component/FeaturedCategories';
import CareerStatistics from '../Component/CareerStatistics';

const TopCompaniesSection = ({ companies }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes floatOrbHome {
          0%,100% { transform: translateY(0) scale(1); }
          50%      { transform: translateY(-20px) scale(1.05); }
        }
        @keyframes tickerHome {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes shimmerBar {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
      `}</style>

      <section
        ref={ref}
        style={{
          background: "#080b0f",
          padding: "7rem 1.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ── floating bg orbs ── */}
        {[
          { top: "5%",  left: "2%",   size: 350, color: "rgba(0,245,160,0.045)",   delay: "0s"   },
          { top: "55%", right: "1%",  size: 280, color: "rgba(255,111,216,0.04)",  delay: "2s"   },
          { bottom:"4%",left: "45%",  size: 220, color: "rgba(79,195,247,0.04)",   delay: "1.1s" },
          { top: "30%", left: "50%",  size: 180, color: "rgba(255,217,61,0.03)",   delay: "0.5s" },
        ].map((o, i) => (
          <div key={i} style={{
            position: "absolute",
            top: o.top, left: o.left, right: o.right, bottom: o.bottom,
            width: o.size, height: o.size, borderRadius: "50%",
            background: o.color, filter: "blur(70px)",
            animation: `floatOrbHome 9s ease-in-out ${o.delay} infinite`,
            pointerEvents: "none",
          }} />
        ))}

        {/* ── watermark ── */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          fontSize: "clamp(6rem,18vw,16rem)",
          fontWeight: "900",
          color: "rgba(255,255,255,0.012)",
          fontFamily: "'Sora',sans-serif",
          letterSpacing: "-0.05em",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
        }}>
          COMPANIES
        </div>

        {/* ── header ── */}
        <div style={{
          maxWidth: "1100px", margin: "0 auto 4.5rem",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(28px)",
          transition: "all 0.75s cubic-bezier(.4,0,.2,1)",
        }}>
          {/* eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.2rem" }}>
            <div style={{ width: "32px", height: "2px", background: "#4fc3f7", borderRadius: "99px" }} />
            <span style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: "0.72rem", fontWeight: "700",
              letterSpacing: "0.2em", color: "#4fc3f7",
              textTransform: "uppercase",
            }}>
              Hiring Now
            </span>
          </div>

          {/* title + subtitle row */}
          <div style={{
            display: "flex", flexWrap: "wrap",
            justifyContent: "space-between", alignItems: "flex-end",
            gap: "1.5rem",
          }}>
            <h1 style={{
              fontFamily: "'Sora',sans-serif",
              fontSize: "clamp(2.2rem,5vw,3.8rem)",
              fontWeight: "800",
              color: "#fff",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              margin: 0,
            }}>
              Top<br />
              <span style={{
                WebkitTextStroke: "1.5px rgba(255,255,255,0.22)",
                WebkitTextFillColor: "transparent",
              }}>
                Companies
              </span>
            </h1>

            <p style={{
              fontFamily: "'Sora',sans-serif",
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.32)",
              maxWidth: "360px",
              lineHeight: 1.75,
              margin: 0,
            }}>
              Handpicked industry leaders actively looking for talented people like you.
            </p>
          </div>

          {/* shimmer progress bar */}
          <div style={{
            marginTop: "2.5rem",
            height: "1px",
            borderRadius: "99px",
            background: "linear-gradient(90deg, #4fc3f7 0%, #ff6fd8 40%, #00f5a0 70%, transparent 100%)",
            backgroundSize: "400px 1px",
            animation: "shimmerBar 3s linear infinite",
            opacity: 0.45,
          }} />
        </div>

        {/* ── cards grid ── */}
        <div style={{
          maxWidth: "1100px", margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "1.25rem",
        }}>
          {companies.map((company, i) => (
            <div
              key={company.id}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
                transition: `opacity 0.6s ease ${0.1 + i * 0.08}s, transform 0.6s cubic-bezier(.4,0,.2,1) ${0.1 + i * 0.08}s`,
              }}
            >
              <CompanyCard company={company} />
            </div>
          ))}
        </div>

        {/* ── "view all" CTA ── */}
        <div style={{
          display: "flex", justifyContent: "center",
          marginTop: "3.5rem",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.8s ease 0.6s",
        }}>
          <button style={{
            fontFamily: "'Sora',sans-serif",
            fontSize: "0.85rem",
            fontWeight: "700",
            color: "#4fc3f7",
            background: "transparent",
            border: "1px solid rgba(79,195,247,0.35)",
            borderRadius: "12px",
            padding: "0.75rem 2rem",
            cursor: "pointer",
            letterSpacing: "0.04em",
            display: "flex", alignItems: "center", gap: "8px",
            transition: "all 0.3s",
          }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#4fc3f7";
              e.currentTarget.style.color = "#000";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#4fc3f7";
            }}
          >
            View All Companies
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15M4.5 4.5h15v15" />
            </svg>
          </button>
        </div>

        {/* ── scrolling ticker ── */}
        <div style={{
          marginTop: "5rem",
          overflow: "hidden",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          padding: "0.85rem 0",
          opacity: visible ? 1 : 0,
          transition: "opacity 1s ease 0.9s",
        }}>
          <div style={{
            display: "flex",
            whiteSpace: "nowrap",
            animation: "tickerHome 20s linear infinite",
            gap: "3rem",
          }}>
            {[...Array(2)].map((_, ri) => (
              <div key={ri} style={{ display: "flex", gap: "3rem" }}>
                {["Google", "Microsoft", "Amazon", "Meta", "Apple", "Netflix", "Spotify", "Airbnb", "Tesla", "OpenAI"].map((n, i) => (
                  <span key={i} style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: "0.7rem",
                    fontWeight: "700",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: ["#00f5a0","#ff6fd8","#ffd93d","#4fc3f7","#ff8a65","#b39ddb"][i % 6],
                    display: "flex", alignItems: "center", gap: "10px",
                  }}>
                    <span style={{ opacity: 0.3, color: "#fff" }}>✦</span>
                    {n}
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

const Home = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch("/companies.json")
      .then(res => res.json())
      .then(data => setCompanies(data));
  }, []);

  return (
    <div style={{ background: "#080b0f" }}>
      <Hero />
      <HowItWorks />
      <FeaturedCategories />
      <TopCompaniesSection companies={companies} />
      <CareerStatistics />
    </div>
  );
};

export default Home;
