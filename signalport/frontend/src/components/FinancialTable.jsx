import { formatLargeNumber } from "../utils/format";

export default function FinancialTable({ financials, cashFlowAnalysis }) {
  if (!financials || !financials.fiscal_years) return null;

  const years = financials.fiscal_years;
  const cf = cashFlowAnalysis;

  const rows = [
    { label: "Revenue", data: financials.revenue },
    { label: "Net Income", data: financials.net_income },
    { label: "Free Cash Flow", data: financials.free_cash_flow },
  ];

  if (cf) {
    rows.splice(1, 0, {
      label: "Operating Cash Flow",
      data: cf.operating_cash_flow,
    });
    rows.splice(2, 0, {
      label: "Capital Expenditure",
      data: cf.capital_expenditure?.map((v) => -v),
    });
  }

  return (
    <div>
      <h2>Financial Statements</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            {years.map((y) => (
              <th key={y} className="numeric">{y}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <td>{row.label}</td>
              {(row.data || []).slice(0, years.length).map((val, i) => (
                <td key={i} className="numeric">{formatLargeNumber(val)}</td>
              ))}
            </tr>
          ))}
          <tr>
            <td style={{ background: "var(--bg-surface-alt)" }}>Total Debt</td>
            <td className="numeric" colSpan={years.length} style={{ background: "var(--bg-surface-alt)" }}>
              {formatLargeNumber(financials.total_debt)}
            </td>
          </tr>
          <tr>
            <td style={{ background: "var(--bg-surface-alt)" }}>Cash & Equivalents</td>
            <td className="numeric" colSpan={years.length} style={{ background: "var(--bg-surface-alt)" }}>
              {formatLargeNumber(financials.cash_and_equivalents)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
