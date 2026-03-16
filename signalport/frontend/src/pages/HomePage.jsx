import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchFeatured, fetchCompanies, fetchMarketPulse, triggerPipeline } from "../api";
import CompanyCard from "../components/CompanyCard";
import SectorBadge from "../components/SectorBadge";
import MarketPulse from "../components/MarketPulse";
import { formatCurrency, formatLargeNumber, formatPercent } from "../utils/format";

export default function HomePage() {
  const [featured, setFeatured] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [pulse, setPulse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pipelineRunning, setPipelineRunning] = useState(false);
  const [pipelineStatus, setPipelineStatus] = useState(null);
  const [pipelineError, setPipelineError] = useState("");

  async function loadData() {
    const [feat, comps, mp] = await Promise.all([
      fetchFeatured(),
      fetchCompanies(),
      fetchMarketPulse().catch(() => null),
    ]);
    setFeatured(feat);
    setCompanies(comps);
    setPulse(mp);
  }

  useEffect(() => {
    loadData()
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleRunPipeline() {
    setPipelineRunning(true);
    setPipelineStatus(null);
    setPipelineError("");
    try {
      await triggerPipeline();
      await loadData();
      setPipelineStatus("success");
    } catch (err) {
      setPipelineStatus("error");
      setPipelineError(err.message);
    } finally {
      setPipelineRunning(false);
    }
  }

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="loading">Error: {error}</div>;

  const featuredCompanies = featured?.companies || [];

  return (
    <div>
      <MarketPulse pulse={pulse} />

      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
        <h1 style={{ margin: 0 }}>Top Picks</h1>
        <button
          onClick={handleRunPipeline}
          disabled={pipelineRunning}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.75rem",
            padding: "0.35rem 0.85rem",
            border: "1px solid var(--accent-green)",
            borderRadius: "4px",
            background: pipelineRunning ? "var(--bg-base)" : "transparent",
            color: "var(--accent-green)",
            cursor: pipelineRunning ? "not-allowed" : "pointer",
            opacity: pipelineRunning ? 0.6 : 1,
            transition: "opacity 0.2s",
          }}
        >
          {pipelineRunning ? "Running\u2026" : "Run Pipeline"}
        </button>
      </div>
      {pipelineStatus === "success" && (
        <div style={{ fontSize: "0.8rem", color: "var(--accent-green)", marginBottom: "0.75rem" }}>
          Pipeline complete &mdash; data refreshed
        </div>
      )}
      {pipelineStatus === "error" && (
        <div style={{ fontSize: "0.8rem", color: "var(--signal-negative)", marginBottom: "0.75rem" }}>
          Pipeline error: {pipelineError}
        </div>
      )}

      {featuredCompanies.length > 0 ? (
        <div className="featured-grid">
          {featuredCompanies.map((c) => (
            <CompanyCard key={c.ticker} company={c} />
          ))}
        </div>
      ) : (
        <div className="card" style={{ marginBottom: "2rem", color: "var(--muted)" }}>
          No featured companies yet. Run the pipeline to generate reports.
        </div>
      )}

      <div style={{ borderTop: "1px solid var(--accent-green-dim)", paddingTop: "1.5rem", marginTop: "1rem" }}>
        <h2>Coverage Universe</h2>
        {companies.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Name</th>
                <th>Sector</th>
                <th>Signal</th>
                <th className="numeric">Quality</th>
                <th className="numeric">Price</th>
                <th className="numeric">DCF Upside</th>
                <th className="numeric">Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((c) => (
                <tr key={c.ticker}>
                  <td>
                    <Link to={`/company/${encodeURIComponent(c.ticker)}`} style={{ fontWeight: 500 }}>
                      {c.ticker}
                    </Link>
                  </td>
                  <td>{c.name}</td>
                  <td><SectorBadge sector={c.sector} /></td>
                  <td>
                    {c.signal && (
                      <span className={`signal-badge signal-${c.signal.toLowerCase()}`}>
                        {c.signal}
                      </span>
                    )}
                  </td>
                  <td className="numeric">
                    {c.quality_score != null ? `${c.quality_score}/10` : "\u2014"}
                  </td>
                  <td className="numeric">{formatCurrency(c.current_price)}</td>
                  <td className="numeric" style={{
                    color: c.dcf_upside_pct > 0 ? "var(--signal-positive)" : c.dcf_upside_pct < 0 ? "var(--signal-negative)" : "var(--text-body)",
                  }}>
                    {c.dcf_upside_pct != null ? formatPercent(c.dcf_upside_pct * 100) : "\u2014"}
                  </td>
                  <td className="numeric">{formatLargeNumber(c.market_cap)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ color: "var(--muted)" }}>
            No companies seeded yet. Run <code>python run.py seed</code> to populate.
          </div>
        )}
      </div>
    </div>
  );
}
