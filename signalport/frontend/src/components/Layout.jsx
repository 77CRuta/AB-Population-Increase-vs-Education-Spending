import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { checkFreshness, triggerPipeline } from "../api";

const FRESHNESS_CHECK_KEY = "signalport_last_freshness_check";
const DEBOUNCE_SECONDS = 60;

export default function Layout({ children }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  useEffect(() => {
    const lastCheck = sessionStorage.getItem(FRESHNESS_CHECK_KEY);
    const now = Date.now();
    if (lastCheck && now - Number(lastCheck) < DEBOUNCE_SECONDS * 1000) {
      return;
    }

    let dismissed = false;

    async function refreshIfStale() {
      try {
        const freshness = await checkFreshness();
        sessionStorage.setItem(FRESHNESS_CHECK_KEY, String(Date.now()));

        if (!freshness.stale) {
          return;
        }

        if (dismissed) return;
        setIsUpdating(true);
        setStatusMessage("Updating data\u2026");

        await triggerPipeline();

        if (dismissed) return;
        setIsUpdating(false);
        setStatusMessage("Data refreshed");
        setTimeout(() => {
          if (!dismissed) setStatusMessage(null);
        }, 5000);
      } catch {
        if (!dismissed) {
          setIsUpdating(false);
          setStatusMessage(null);
        }
      }
    }

    refreshIfStale();

    return () => {
      dismissed = true;
    };
  }, []);

  return (
    <>
      {isUpdating && <div className="update-bar" />}
      <header className="nav-header">
        <NavLink to="/" className="nav-brand">
          SignalPort
        </NavLink>
        {statusMessage && (
          <span className="update-status">{statusMessage}</span>
        )}
        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""} end>
            Research
          </NavLink>
          <NavLink to="/earnings" className={({ isActive }) => isActive ? "active" : ""}>
            Earnings
          </NavLink>
          <NavLink to="/screening" className={({ isActive }) => isActive ? "active" : ""}>
            Screening
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>
            About
          </NavLink>
        </nav>
      </header>
      <main className="page-container">
        {children}
      </main>
      <footer className="page-container">
        <div className="footer">
          SignalPort — Oil & Gas and Defence sector research.
          Data sourced from Yahoo Finance. Not investment advice.
        </div>
      </footer>
    </>
  );
}
