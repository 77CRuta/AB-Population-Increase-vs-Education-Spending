import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchReport } from "../api";
import SectorBadge from "../components/SectorBadge";
import QualityRadar from "../components/QualityRadar";
import InvestmentThesis from "../components/InvestmentThesis";
import PriceChart from "../components/PriceChart";
import ProfitabilityChart from "../components/ProfitabilityChart";
import CashFlowWaterfall from "../components/CashFlowWaterfall";
import BalanceSheetChart from "../components/BalanceSheetChart";
import GrowthTrends from "../components/GrowthTrends";
import ValuationComps from "../components/ValuationComps";
import DcfSummary from "../components/DcfSummary";
import KeyMetrics from "../components/KeyMetrics";
import FinancialTable from "../components/FinancialTable";
import EarningsCalendar from "../components/EarningsCalendar";
import CfaMetrics from "../components/CfaMetrics";
import ScreeningGates from "../components/ScreeningGates";
import AnalystConsensus from "../components/AnalystConsensus";
import OwnershipBreakdown from "../components/OwnershipBreakdown";
import PriceContext from "../components/PriceContext";
import MethodologyPanel from "../components/MethodologyPanel";
import ExecutiveSummary from "../components/ExecutiveSummary";
import ReverseDcf from "../components/ReverseDcf";
import RiskFlags from "../components/RiskFlags";
import CapitalAllocation from "../components/CapitalAllocation";
import DividendHealth from "../components/DividendHealth";
import ScenarioAnalysisSection from "../components/ScenarioAnalysis";
import RiskMetricsSection from "../components/RiskMetrics";
import EarningsSurprise from "../components/EarningsSurprise";
import { formatCurrency, formatLargeNumber } from "../utils/format";

function getSectionRenderers(report) {
  const profile = report.profile || {};
  const financials = report.financials || {};
  const dcf = report.dcf;
  const metrics = report.key_metrics;
  const earnings = report.earnings || [];
  const priceHistory = report.price_history || [];

  return {
    quality: (
      <section key="quality" id="quality">
        <QualityRadar qualityScore={report.quality_score} />
        <MethodologyPanel sectionId="quality" />
      </section>
    ),
    thesis: (
      <section key="thesis" id="thesis">
        <InvestmentThesis thesis={report.thesis} />
        <MethodologyPanel sectionId="thesis" />
      </section>
    ),
    screening_gates: (
      <section key="screening_gates" id="screening_gates">
        <ScreeningGates screening={report.screening} />
        <MethodologyPanel sectionId="screening_gates" />
      </section>
    ),
    dcf: (
      <section key="dcf" id="dcf">
        <DcfSummary dcf={dcf} skipReason={report.dcf_skip_reason} />
        <MethodologyPanel sectionId="dcf" />
      </section>
    ),
    reverse_dcf: (
      <section key="reverse_dcf" id="reverse_dcf">
        <ReverseDcf reverseDcf={report.reverse_dcf} marginOfSafety={report.margin_of_safety} />
        <MethodologyPanel sectionId="reverse_dcf" />
      </section>
    ),
    scenario: (
      <section key="scenario" id="scenario">
        <ScenarioAnalysisSection scenarioAnalysis={report.scenario_analysis} />
        <MethodologyPanel sectionId="scenario" />
      </section>
    ),
    valuation: (
      <section key="valuation" id="valuation">
        <ValuationComps valuation={report.valuation} />
        <MethodologyPanel sectionId="valuation" />
      </section>
    ),
    risk: (
      <section key="risk" id="risk">
        <RiskFlags riskAnalysis={report.risk_analysis} />
        <MethodologyPanel sectionId="risk" />
      </section>
    ),
    risk_metrics: (
      <section key="risk_metrics" id="risk_metrics">
        <RiskMetricsSection riskMetrics={report.risk_metrics} />
        <MethodologyPanel sectionId="risk_metrics" />
      </section>
    ),
    analyst: (
      <section key="analyst" id="analyst">
        <AnalystConsensus analyst={report.analyst_consensus} dcf={dcf} />
        <MethodologyPanel sectionId="analyst" />
      </section>
    ),
    ownership: (
      <section key="ownership" id="ownership">
        <OwnershipBreakdown ownership={report.ownership} />
        <MethodologyPanel sectionId="ownership" />
      </section>
    ),
    price: (
      <section key="price" id="price">
        <PriceContext marketContext={report.market_context} currentPrice={profile.current_price} />
        <PriceChart data={priceHistory} />
        <MethodologyPanel sectionId="price" />
      </section>
    ),
    profitability: (
      <section key="profitability" id="profitability">
        <ProfitabilityChart profitability={report.profitability} />
        <MethodologyPanel sectionId="profitability" />
      </section>
    ),
    growth: (
      <section key="growth" id="growth">
        <GrowthTrends growth={report.growth} />
        <MethodologyPanel sectionId="growth" />
      </section>
    ),
    cfa: (
      <section key="cfa" id="cfa">
        <CfaMetrics cfa={report.cfa_analysis} />
        <MethodologyPanel sectionId="cfa" />
      </section>
    ),
    cashflow: (
      <section key="cashflow" id="cashflow">
        <CashFlowWaterfall cashFlowAnalysis={report.cash_flow_analysis} />
        <MethodologyPanel sectionId="cashflow" />
      </section>
    ),
    capital_allocation: (
      <section key="capital_allocation" id="capital_allocation">
        <CapitalAllocation capitalAllocation={report.capital_allocation} />
        <MethodologyPanel sectionId="capital_allocation" />
      </section>
    ),
    dividend: (
      <section key="dividend" id="dividend">
        <DividendHealth dividendAnalysis={report.dividend_analysis} />
        <MethodologyPanel sectionId="dividend" />
      </section>
    ),
    balance: (
      <section key="balance" id="balance">
        <BalanceSheetChart balanceSheet={report.balance_sheet} />
        <MethodologyPanel sectionId="balance" />
      </section>
    ),
    metrics: (
      <section key="metrics" id="metrics">
        <KeyMetrics metrics={metrics} />
        <MethodologyPanel sectionId="metrics" />
      </section>
    ),
    financials: (
      <section key="financials" id="financials">
        <FinancialTable financials={financials} cashFlowAnalysis={report.cash_flow_analysis} />
        <MethodologyPanel sectionId="financials" />
      </section>
    ),
    earnings_surprise: (
      <section key="earnings_surprise" id="earnings_surprise">
        <EarningsSurprise earningsSurprises={report.earnings_surprises} />
        <MethodologyPanel sectionId="earnings_surprise" />
      </section>
    ),
    earnings: earnings.length > 0 ? (
      <section key="earnings" id="earnings">
        <h2>Earnings History</h2>
        <EarningsCalendar events={earnings} />
        <MethodologyPanel sectionId="earnings" />
      </section>
    ) : null,
  };
}

const CARD_DEFINITIONS = [
  {
    id: "verdict",
    label: "Verdict",
    sectionIds: ["quality", "thesis", "screening_gates"],
  },
  {
    id: "valuation",
    label: "Valuation",
    sectionIds: ["dcf", "reverse_dcf", "scenario", "valuation"],
  },
  {
    id: "risk",
    label: "Risk",
    sectionIds: ["risk", "risk_metrics"],
  },
  {
    id: "market",
    label: "Market & Analyst",
    sectionIds: ["analyst", "ownership", "price"],
  },
  {
    id: "profitability",
    label: "Profitability & Growth",
    sectionIds: ["profitability", "growth", "cfa"],
  },
  {
    id: "cashflow",
    label: "Cash & Capital",
    sectionIds: ["cashflow", "capital_allocation", "dividend", "balance"],
  },
  {
    id: "dataroom",
    label: "Data Room",
    sectionIds: ["metrics", "financials", "earnings_surprise", "earnings"],
  },
];

function isSectionAvailable(sectionId, report) {
  const earnings = report.earnings || [];
  const checks = {
    quality: Boolean(report.quality_score),
    thesis: Boolean(report.thesis),
    screening_gates: Boolean(report.screening),
    dcf: true,
    reverse_dcf: Boolean(report.reverse_dcf || report.margin_of_safety),
    scenario: Boolean(report.scenario_analysis),
    valuation: Boolean(report.valuation),
    risk: Boolean(report.risk_analysis),
    risk_metrics: Boolean(report.risk_metrics),
    analyst: Boolean(report.analyst_consensus),
    ownership: Boolean(report.ownership),
    price: true,
    profitability: Boolean(report.profitability),
    growth: Boolean(report.growth),
    cfa: Boolean(report.cfa_analysis),
    cashflow: Boolean(report.cash_flow_analysis),
    capital_allocation: Boolean(report.capital_allocation),
    dividend: Boolean(report.dividend_analysis),
    balance: Boolean(report.balance_sheet),
    metrics: true,
    financials: true,
    earnings_surprise: Boolean(report.earnings_surprises && report.earnings_surprises.length > 0),
    earnings: earnings.length > 0,
  };
  return checks[sectionId] ?? false;
}

function getCardSummary(cardId, report) {
  const dcf = report.dcf;
  const metrics = report.key_metrics;
  const earnings = report.earnings || [];

  switch (cardId) {
    case "verdict": {
      const overall = report.quality_score?.overall;
      const signal = report.thesis?.signal;
      const passRate = report.screening
        ? `${report.screening.gates_passed}/${report.screening.gates_total}`
        : null;
      return {
        lines: [
          { label: "Quality", value: overall != null ? `${overall}/10` : "\u2014" },
          { label: "Signal", value: signal || "\u2014" },
          { label: "Gates", value: passRate || "\u2014" },
        ],
        status: signal === "BUY" ? "green" : signal === "SELL" ? "red" : "amber",
      };
    }
    case "valuation": {
      const upside = dcf?.upside_pct;
      const intrinsic = dcf?.intrinsic_value_per_share;
      return {
        lines: [
          { label: "DCF Upside", value: upside != null ? `${upside.toFixed(1)}%` : "\u2014" },
          { label: "Intrinsic Value", value: intrinsic != null ? formatCurrency(intrinsic) : "\u2014" },
        ],
        status: upside != null ? (upside > 15 ? "green" : upside > 0 ? "amber" : "red") : "amber",
      };
    }
    case "risk": {
      const riskLevel = report.risk_analysis?.overall_risk_level;
      const flagCount =
        report.risk_analysis
          ? report.risk_analysis.flag_count_warning + report.risk_analysis.flag_count_critical
          : null;
      return {
        lines: [
          { label: "Risk Level", value: riskLevel || "\u2014" },
          { label: "Flags", value: flagCount != null ? String(flagCount) : "\u2014" },
        ],
        status: riskLevel === "low" ? "green" : riskLevel === "moderate" ? "amber" : "red",
      };
    }
    case "market": {
      const rec = report.analyst_consensus?.recommendation_key;
      const target = report.analyst_consensus?.target_mean_price;
      const high = report.market_context?.fifty_two_week_high;
      const low = report.market_context?.fifty_two_week_low;
      const rangeStr = high != null && low != null
        ? `${formatCurrency(low)} \u2013 ${formatCurrency(high)}`
        : "\u2014";
      return {
        lines: [
          { label: "Recommendation", value: rec || "\u2014" },
          { label: "Target Price", value: target != null ? formatCurrency(target) : "\u2014" },
          { label: "52-wk Range", value: rangeStr },
        ],
        status: rec === "buy" || rec === "strong_buy" ? "green" : rec === "sell" ? "red" : "amber",
      };
    }
    case "profitability": {
      const netMargin = metrics?.net_margin;
      const roe = metrics?.roe;
      const fScore = report.cfa_analysis?.piotroski_f?.f_score;
      return {
        lines: [
          { label: "Net Margin", value: netMargin != null ? `${(netMargin * 100).toFixed(1)}%` : "\u2014" },
          { label: "ROE", value: roe != null ? `${(roe * 100).toFixed(1)}%` : "\u2014" },
          { label: "Piotroski F", value: fScore != null ? `${fScore}/9` : "\u2014" },
        ],
        status: fScore != null ? (fScore >= 7 ? "green" : fScore >= 4 ? "amber" : "red") : "amber",
      };
    }
    case "cashflow": {
      const fcfList = report.cash_flow_analysis?.free_cash_flow;
      const fcfTrend = fcfList && fcfList.length >= 2
        ? (fcfList[fcfList.length - 1] > fcfList[fcfList.length - 2] ? "Up" : "Down")
        : null;
      const de = metrics?.debt_to_equity;
      const divScore = report.dividend_analysis?.sustainability_score;
      return {
        lines: [
          { label: "FCF Trend", value: fcfTrend || "\u2014" },
          { label: "D/E Ratio", value: de != null ? de.toFixed(2) : "\u2014" },
          { label: "Dividend Score", value: divScore != null ? `${divScore}/10` : "\u2014" },
        ],
        status: fcfTrend === "Up" ? "green" : fcfTrend === "Down" ? "red" : "amber",
      };
    }
    case "dataroom": {
      const fyCount = report.financials?.fiscal_years?.length;
      const surprises = report.earnings_surprises;
      const latestBeat = surprises && surprises.length > 0
        ? (surprises[0].beat === true ? "Beat" : surprises[0].beat === false ? "Miss" : "\u2014")
        : null;
      return {
        lines: [
          { label: "Fiscal Years", value: fyCount != null ? String(fyCount) : "\u2014" },
          { label: "Latest Earnings", value: latestBeat || "\u2014" },
          { label: "Upcoming", value: earnings.filter((e) => e.status === "upcoming").length > 0 ? "Yes" : "No" },
        ],
        status: latestBeat === "Beat" ? "green" : latestBeat === "Miss" ? "red" : "amber",
      };
    }
    default:
      return { lines: [], status: "amber" };
  }
}

function DashboardCard({ card, report, isSelected, onSelect }) {
  const summary = getCardSummary(card.id, report);
  const availableCount = card.sectionIds.filter((id) => isSectionAvailable(id, report)).length;

  if (availableCount === 0) return null;

  return (
    <button
      className={`dashboard-card${isSelected ? " dashboard-card--selected" : ""}`}
      onClick={() => onSelect(card.id)}
      type="button"
    >
      <div className="dashboard-card-header">
        <span className={`dashboard-card-status dashboard-card-status--${summary.status}`} />
        <span className="dashboard-card-label">{card.label}</span>
      </div>
      <div className="dashboard-card-summary">
        {summary.lines.map((line) => (
          <div key={line.label} className="dashboard-card-metric">
            <span className="dashboard-card-metric-label">{line.label}</span>
            <span className="dashboard-card-metric-value">{line.value}</span>
          </div>
        ))}
      </div>
    </button>
  );
}

function DetailPanel({ card, report, onBack }) {
  const renderers = getSectionRenderers(report);
  const availableSections = card.sectionIds.filter((id) => isSectionAvailable(id, report));

  return (
    <div className="dashboard-detail">
      <div className="dashboard-detail-header">
        <button className="dashboard-back-btn" onClick={onBack} type="button">
          &larr; Cards
        </button>
        <h2 style={{ margin: 0, border: "none", padding: 0 }}>{card.label}</h2>
      </div>
      <div className="dashboard-detail-content">
        {availableSections.map((sectionId) => renderers[sectionId])}
      </div>
    </div>
  );
}

export default function CompanyPage() {
  const { ticker } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCard, setSelectedCard] = useState("verdict");
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await fetchReport(ticker);
        setReport(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [ticker]);

  if (loading) return <div className="loading">Loading report for {ticker}...</div>;
  if (error) return <div className="loading">Error: {error}</div>;
  if (!report) return <div className="loading">No report found for {ticker}.</div>;

  const profile = report.profile || {};

  const activeCard = CARD_DEFINITIONS.find((c) => c.id === selectedCard) || CARD_DEFINITIONS[0];

  const handleSelectCard = (cardId) => {
    setSelectedCard(cardId);
    setShowDetail(true);
  };

  const handleBack = () => {
    setShowDetail(false);
  };

  return (
    <div className="dashboard-layout">
      <div style={{ marginBottom: "0.5rem" }}>
        <Link to="/" style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
          &larr; Back to Research
        </Link>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
        <div>
          <h1 style={{ marginBottom: "0.25rem" }}>
            {profile.ticker || ticker}
            <span style={{ fontWeight: 300, color: "var(--muted)", marginLeft: "0.75rem" }}>
              {profile.name}
            </span>
          </h1>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <SectorBadge sector={profile.sector} />
            <span style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
              {profile.exchange} &middot; {profile.country}
            </span>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "1.1rem", fontWeight: 500 }}>
            {formatCurrency(profile.current_price)}
          </div>
          <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
            Mkt Cap: {formatLargeNumber(profile.market_cap)}
          </div>
        </div>
      </div>

      <ExecutiveSummary executiveSummary={report.executive_summary} />

      <div className={`dashboard-body${showDetail ? " dashboard-body--detail-open" : ""}`}>
        <div className="dashboard-cards">
          {CARD_DEFINITIONS.map((card) => (
            <DashboardCard
              key={card.id}
              card={card}
              report={report}
              isSelected={selectedCard === card.id}
              onSelect={handleSelectCard}
            />
          ))}
        </div>

        <DetailPanel card={activeCard} report={report} onBack={handleBack} />
      </div>

      <div style={{ marginTop: "2rem", fontSize: "0.68rem", color: "var(--muted)" }}>
        Report generated: {report.generated_at || "\u2014"}
      </div>
    </div>
  );
}
