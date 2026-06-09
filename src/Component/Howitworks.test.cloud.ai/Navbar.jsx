import React, { useContext, useEffect, useRef, useState } from "react";
import { FaBriefcase } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";

const NAV_LINKS = [
  { to: "/",          label: "Home"      },
  { to: "/companies", label: "Companies" },
  { to: "/about",     label: "About"     },
];

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  const [scrolled,     setScrolled]     = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [profileOpen,  setProfileOpen]  = useState(false);
  const [mouseX,       setMouseX]       = useState(0);
  const navRef   = useRef(null);
  const profileRef = useRef(null);

  /* scroll → glass effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close profile dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target))
        setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* subtle magnetic mouse trail on navbar */
  const onMouseMove = (e) => {
    const rect = navRef.current?.getBoundingClientRect();
    if (rect) setMouseX(((e.clientX - rect.left) / rect.width) * 100);
  };

  const handleLogout = () => {
    logoutUser()
      .then(() => toast.success("👋 Logged out successfully!"))
      .catch((err) => toast.error(err.message));
    setProfileOpen(false);
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <style>{`
        @keyframes navFadeIn {
          from { opacity:0; transform:translateY(-10px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes shimmerNav {
          0%,100% { opacity:0.4; }
          50%      { opacity:0.8; }
        }
        @keyframes pulseAvatar {
          0%,100% { box-shadow: 0 0 0 0 rgba(129,140,248,0.5); }
          50%      { box-shadow: 0 0 0 6px rgba(129,140,248,0); }
        }
        .nav-link-item {
          position: relative;
          font-family: 'Sora', sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          padding: 6px 2px;
          transition: color 0.25s;
        }
        .nav-link-item::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 1.5px;
          background: linear-gradient(90deg, #818cf8, #c084fc);
          border-radius: 99px;
          transition: width 0.3s cubic-bezier(.4,0,.2,1);
        }
        .nav-link-item:hover { color: #fff; }
        .nav-link-item:hover::after { width: 100%; }
        .nav-link-item.active { color: #fff; }
        .nav-link-item.active::after { width: 100%; }

        .mobile-link {
          font-family: 'Sora', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: block;
          transition: color 0.2s, padding-left 0.2s;
          letter-spacing: 0.02em;
        }
        .mobile-link:hover { color:#fff; padding-left:8px; }
        .mobile-link.active { color:#818cf8; }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav
        ref={navRef}
        onMouseMove={onMouseMove}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          background: scrolled
            ? "rgba(8,11,15,0.85)"
            : "rgba(8,11,15,0.6)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.07)"
            : "1px solid transparent",
          transition: "all 0.4s cubic-bezier(.4,0,.2,1)",
          animation: "navFadeIn 0.6s ease both",
        }}
      >
        {/* mouse-follow shimmer line */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "1px",
          background: `radial-gradient(circle at ${mouseX}% 50%, rgba(129,140,248,0.7) 0%, transparent 60%)`,
          animation: "shimmerNav 3s ease-in-out infinite",
          pointerEvents: "none",
          transition: "background 0.1s",
        }} />

        <div style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1.5rem",
        }}>

          {/* ── LOGO ── */}
          <Link to="/" style={{ textDecoration: "none", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/* icon box */}
              <div style={{
                width: "34px", height: "34px",
                borderRadius: "10px",
                background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontSize: "15px",
                boxShadow: "0 4px 16px rgba(99,102,241,0.4)",
                flexShrink: 0,
              }}>
                <FaBriefcase />
              </div>
              {/* wordmark */}
              <span style={{
                fontFamily: "'Sora',sans-serif",
                fontSize: "1.15rem",
                fontWeight: "800",
                letterSpacing: "-0.03em",
                color: "#fff",
              }}>
                Job<span style={{
                  background: "linear-gradient(90deg,#818cf8,#c084fc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>Track</span>
              </span>
            </div>
          </Link>

          {/* ── CENTER LINKS (desktop) ── */}
          {user && (
            <ul style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              listStyle: "none",
              margin: 0, padding: 0,
            }}
              className="hidden-mobile"
            >
              {[...NAV_LINKS, { to: "/profile", label: "My Profile" }].map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      "nav-link-item" + (isActive ? " active" : "")
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}

          {/* spacer when logged out */}
          {!user && <div style={{ flex: 1 }} />}

          {/* ── RIGHT SIDE ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>

            {user ? (
              <>
                {/* profile dropdown */}
                <div ref={profileRef} style={{ position: "relative" }}>
                  <button
                    onClick={() => setProfileOpen(p => !p)}
                    style={{
                      background: "none", border: "none",
                      cursor: "pointer", padding: 0,
                      display: "flex", alignItems: "center", gap: "8px",
                    }}
                  >
                    <img
                      src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                      alt="profile"
                      style={{
                        width: "36px", height: "36px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "2px solid rgba(129,140,248,0.6)",
                        animation: "pulseAvatar 2.5s ease-in-out infinite",
                        transition: "transform 0.2s",
                        transform: profileOpen ? "scale(1.1)" : "scale(1)",
                      }}
                    />
                    {/* chevron */}
                    <svg
                      width="12" height="12" fill="none"
                      viewBox="0 0 24 24" stroke="rgba(255,255,255,0.35)" strokeWidth={2.5}
                      style={{
                        transition: "transform 0.3s",
                        transform: profileOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>

                  {/* dropdown */}
                  {profileOpen && (
                    <div style={{
                      position: "absolute", top: "calc(100% + 12px)", right: 0,
                      minWidth: "200px",
                      background: "rgba(13,16,24,0.97)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "16px",
                      padding: "8px",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.7)",
                      animation: "navFadeIn 0.2s ease both",
                      zIndex: 100,
                    }}>
                      {/* user info */}
                      <div style={{
                        padding: "10px 12px 12px",
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                        marginBottom: "6px",
                      }}>
                        <div style={{
                          fontFamily: "'Sora',sans-serif",
                          fontSize: "0.82rem", fontWeight: "700",
                          color: "#fff",
                          whiteSpace: "nowrap", overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}>
                          {user?.displayName || "User"}
                        </div>
                        <div style={{
                          fontFamily: "'DM Mono',monospace",
                          fontSize: "0.65rem", color: "rgba(255,255,255,0.3)",
                          marginTop: "2px",
                          whiteSpace: "nowrap", overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}>
                          {user?.email}
                        </div>
                      </div>

                      {/* links */}
                      {[
                        { to: "/profile", label: "My Profile", icon: "👤" },
                        { to: "/companies", label: "Companies", icon: "🏢" },
                      ].map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={() => setProfileOpen(false)}
                          style={{
                            display: "flex", alignItems: "center", gap: "10px",
                            padding: "9px 12px",
                            borderRadius: "10px",
                            textDecoration: "none",
                            fontFamily: "'Sora',sans-serif",
                            fontSize: "0.82rem", fontWeight: "600",
                            color: "rgba(255,255,255,0.55)",
                            transition: "background 0.2s, color 0.2s",
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                            e.currentTarget.style.color = "#fff";
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                          }}
                        >
                          <span>{item.icon}</span> {item.label}
                        </Link>
                      ))}

                      {/* logout */}
                      <button
                        onClick={handleLogout}
                        style={{
                          display: "flex", alignItems: "center", gap: "10px",
                          width: "100%",
                          padding: "9px 12px",
                          borderRadius: "10px",
                          background: "transparent",
                          border: "none", cursor: "pointer",
                          fontFamily: "'Sora',sans-serif",
                          fontSize: "0.82rem", fontWeight: "600",
                          color: "rgba(239,68,68,0.7)",
                          marginTop: "4px",
                          borderTop: "1px solid rgba(255,255,255,0.05)",
                          paddingTop: "12px",
                          transition: "color 0.2s, background 0.2s",
                          textAlign: "left",
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = "rgba(239,68,68,0.08)";
                          e.currentTarget.style.color = "#ef4444";
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = "rgba(239,68,68,0.7)";
                        }}
                      >
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <button style={{
                    fontFamily: "'Sora',sans-serif",
                    fontSize: "0.82rem", fontWeight: "700",
                    color: "rgba(255,255,255,0.6)",
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "10px",
                    padding: "8px 18px",
                    cursor: "pointer",
                    transition: "all 0.25s",
                    letterSpacing: "0.02em",
                  }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                    }}
                  >
                    Login
                  </button>
                </Link>

                <Link to="/register" style={{ textDecoration: "none" }}>
                  <button style={{
                    fontFamily: "'Sora',sans-serif",
                    fontSize: "0.82rem", fontWeight: "700",
                    color: "#fff",
                    background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                    border: "none",
                    borderRadius: "10px",
                    padding: "8px 18px",
                    cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(99,102,241,0.35)",
                    transition: "opacity 0.2s, transform 0.2s",
                    letterSpacing: "0.02em",
                  }}
                    onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                    onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                    onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
                    onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
                  >
                    Register
                  </button>
                </Link>
              </>
            )}

            {/* mobile hamburger */}
            <button
              onClick={() => setMenuOpen(p => !p)}
              className="show-mobile"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "10px",
                padding: "8px",
                cursor: "pointer",
                display: "none",
                flexDirection: "column",
                gap: "4px",
                transition: "background 0.2s",
              }}
            >
              {[0,1,2].map(i => (
                <div key={i} style={{
                  width: i === 1 ? (menuOpen ? "20px" : "14px") : "20px",
                  height: "1.5px",
                  background: "#fff",
                  borderRadius: "99px",
                  transition: "width 0.3s",
                }} />
              ))}
            </button>
          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        <div style={{
          maxHeight: menuOpen ? "400px" : "0",
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(.4,0,.2,1)",
          borderTop: menuOpen ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}>
          <div style={{ padding: "1rem 1.5rem 1.5rem" }}>
            {user && [...NAV_LINKS, { to: "/profile", label: "My Profile" }].map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => "mobile-link" + (isActive ? " active" : "")}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            {!user && (
              <div style={{ display:"flex", gap:"10px", paddingTop:"8px" }}>
                <Link to="/login" style={{ flex:1, textDecoration:"none" }}>
                  <button onClick={() => setMenuOpen(false)} style={{
                    width:"100%", padding:"10px",
                    background:"transparent",
                    border:"1px solid rgba(255,255,255,0.15)",
                    borderRadius:"10px", color:"#fff",
                    fontFamily:"'Sora',sans-serif", fontWeight:"600",
                    fontSize:"0.85rem", cursor:"pointer",
                  }}>Login</button>
                </Link>
                <Link to="/register" style={{ flex:1, textDecoration:"none" }}>
                  <button onClick={() => setMenuOpen(false)} style={{
                    width:"100%", padding:"10px",
                    background:"linear-gradient(135deg,#6366f1,#8b5cf6)",
                    border:"none", borderRadius:"10px", color:"#fff",
                    fontFamily:"'Sora',sans-serif", fontWeight:"600",
                    fontSize:"0.85rem", cursor:"pointer",
                  }}>Register</button>
                </Link>
              </div>
            )}
            {user && (
              <button onClick={handleLogout} style={{
                marginTop:"12px", width:"100%",
                padding:"10px",
                background:"rgba(239,68,68,0.08)",
                border:"1px solid rgba(239,68,68,0.2)",
                borderRadius:"10px", color:"#ef4444",
                fontFamily:"'Sora',sans-serif", fontWeight:"600",
                fontSize:"0.85rem", cursor:"pointer",
              }}>
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* responsive helper */}
      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
