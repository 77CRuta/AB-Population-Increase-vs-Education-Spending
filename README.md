# Alberta Population & Education Spending Analysis (2012–2025)

## Executive Summary

This report examines the relationship between Alberta's population growth and provincial education spending across 13 fiscal years (2012-13 to 2025-26), drawing on quarterly population estimates from Statistics Canada and ministry-level operating expenditure extracted from official Alberta Budget Fiscal Plans.

Over this period, Alberta's population grew from 3,822,425 to 4,988,181 — an increase of 30.5%, adding over 1.1 million residents. Total education operating expense (K-12 and post-secondary combined) rose from $9,035 million to $16,518 million — a nominal increase of 82.8%. Education spending grew at approximately **2.7 times the rate of population growth** in nominal terms. On a per-capita basis, education spending rose from approximately $2,363 to $3,312 per Albertan — a 40.1% nominal increase.

The per-sector breakdown reveals an important structural shift: post-secondary spending grew by 132.3% — more than double the rate of K-12 growth (59.9%) — and its share of the total education budget rose from approximately 32% to 40%. However, given that Canada's Consumer Price Index rose approximately 35–40% over the same period, real per-capita gains are more modest than the headline nominal figures suggest. K-12 per-capita spending in particular likely experienced a real-terms decline when adjusted for inflation.

> **Note on data:** Figures for fiscal year 2025-26 are budget estimates. Intermediate years (2014–2022) are not available in this dataset; trends within that decade cannot be observed from this data alone.

---

## Table of Contents

1. [Background and Objective](#1-background-and-objective)
2. [Summary of Findings](#2-summary-of-findings)
3. [Population Growth Analysis (2012–2025)](#3-population-growth-analysis-20122025)
4. [Education Spending Analysis (2012–2026)](#4-education-spending-analysis-20122026)
5. [Population vs. Education Spending — Integration](#5-population-vs-education-spending--integration)
6. [Data Sources and Methodology](#6-data-sources-and-methodology)
7. [Limitations and Caveats](#7-limitations-and-caveats)
8. [Technical Appendix](#8-technical-appendix)

---

## 1. Background and Objective

Alberta has experienced one of the fastest rates of population growth among Canadian provinces over the past decade, driven by strong interprovincial and international migration. This demographic expansion places direct pressure on public services — including the education system — raising the question of whether government spending has kept pace with a growing population.

This report addresses that question with respect to education spending specifically, using publicly available data from two sources:

- **Population data:** Statistics Canada Table 17-10-0009-01, providing quarterly estimates of Alberta's population from 1946 to the present.
- **Spending data:** Alberta Budget Fiscal Plans, providing ministry-level operating expenditure for fiscal years 2012-13, 2013-14, 2023-24, 2024-25, and 2025-26.

The central objective is to determine whether Alberta's education spending grew proportionally to, faster than, or slower than its population between 2012 and 2025 — and to examine how the K-12 and post-secondary sectors compare in this regard. All spending figures are expressed in nominal (non-inflation-adjusted) terms unless otherwise stated.

---

## 2. Summary of Findings

### Table 1: Key Indicators, 2012-13 to 2025-26

| Indicator | 2012-13 / Q1 2012 | 2025-26 / Q1 2025 | Change |
|---|---|---|---|
| Alberta Population | 3,822,425 | 4,988,181 | **+30.5%** |
| K-12 Operating Expense | $6,179M | $9,883M | **+59.9%** |
| Post-Secondary Operating Expense | $2,856M | $6,635M | **+132.3%** |
| Total Education Expense | $9,035M | $16,518M | **+82.8%** |
| Education Spending per Capita | ~$2,363 | ~$3,312 | **+40.1%** |

### Table 2: Per-Capita Education Spending

| Sector | 2012-13 | 2025-26 | Change |
|---|---|---|---|
| K-12 per Capita | $1,617 | $1,981 | **+22.5%** |
| Post-Secondary per Capita | $747 | $1,330 | **+78.0%** |
| Total Education per Capita | $2,363 | $3,312 | **+40.1%** |

### Key Observations

1. **Education spending substantially outpaced population growth.** Total education spending grew at 82.8% — nearly 2.7 times the 30.5% population growth rate. Even K-12, the slower-growing sector, grew at nearly twice the rate of population.

2. **Post-secondary is the primary driver of growth.** At 132.3% nominal growth, post-secondary spending grew at 4.3 times the rate of population — effectively doubling in absolute terms. Its share of the education budget rose from approximately 32% to 40%.

3. **K-12 per-capita gains are modest after inflation.** K-12 per-capita spending rose 22.5% in nominal terms. Given cumulative CPI inflation of approximately 35–40% over the same period, this likely represents a near-flat or slightly declining real per-capita investment.

4. **Alberta's population growth itself was exceptional.** The province added over 1.1 million people between 2012 and 2025 — a 30.5% increase — with the fastest growth occurring in 2022–2024, when quarterly rates exceeded 1% per quarter, more than double the long-run average.

---

## 3. Population Growth Analysis (2012–2025)

**Source notebook:** `Population Predictions Canada 2025.ipynb`

This section examines Alberta's population growth using quarterly estimates from Statistics Canada, covering the period from Q1 2012 to Q1 2025.

---

### Figure 1: Alberta Population Growth (2012–2025)

![Figure 1: Alberta Population Growth](plots/alberta_population_growth.png)

Figure 1 presents Alberta's total population as a time series from Q1 2012 to Q1 2025. The trend reveals consistent upward growth throughout the full 13-year period, with a pronounced acceleration beginning in 2022. The province's population reached 4,988,181 by Q1 2025 — approaching 5 million residents for the first time in provincial history.

The acceleration from 2022 onward is the most significant feature of this chart. Unlike the gradual, relatively linear growth of the 2012–2019 period, the post-pandemic phase saw a surge in interprovincial and international migration, compressing into two years the equivalent of several prior years of growth.

---

### Figure 2: Quarterly Population Growth Rate (2012–2025)

![Figure 2: Quarterly Growth Rate](plots/quarterly_growth_rate.png)

Figure 2 displays the quarter-over-quarter percentage change in Alberta's population for each quarter from 2012 to 2025. Bars are colour-coded by magnitude: green (≥1.0%, high growth), blue (moderate growth), and red (near-zero or negative growth). The orange dashed line represents the long-run average quarterly growth rate of approximately 0.51%.

Three distinct phases are visible:

- **2012–2019:** Moderate, relatively consistent growth tracking close to the long-run average, with some variability tied to commodity price cycles.
- **2020 (COVID-19 impact):** A sharp deceleration, with Q3 2020 recording the lowest quarterly growth rate in the dataset at just 0.046% — essentially zero net growth.
- **2022–2024 (post-pandemic surge):** A significant acceleration, with multiple quarters exceeding 1.0% growth — more than double the historical average. Q4 2023 recorded the peak quarterly growth rate of 1.356%.

---

### Figure 3: Alberta's Share of Canada's Total Population (1951–2025)

![Figure 3: Alberta Population Share](plots/alberta_population_share.png)

Figure 3 places Alberta's growth in national context, tracking the province's share of Canada's total population from 1951 to 2025. Alberta's share has risen from 6.7% in 1951 to 12.1% in 2025 — a near-doubling of its relative demographic weight within Confederation over 74 years.

The trend has been consistently upward, with only minor interruptions during periods of economic contraction. The steepest segment of the curve coincides with the post-2020 period, reflecting the recent migration surge. At 12.1%, Alberta now accounts for approximately one in eight Canadians.

---

### Figure 4: Year-over-Year Growth Analysis

![Figure 4: Year-over-Year Growth](plots/yoy_growth_analysis.png)

Figure 4 presents a two-panel chart using Q1 (January) data to enable clean year-over-year comparisons. The upper panel shows the absolute change in population from one January to the next; the lower panel shows the corresponding year-over-year percentage growth rate.

By using annual snapshots rather than quarterly data, this view smooths out intra-year fluctuations and reveals long-run structural trends more clearly. The 2022–2024 bars are the most prominent feature: absolute year-over-year gains of approximately 150,000–180,000 people in successive years represent historically anomalous growth — more than three times the gains recorded in the moderate years of 2016–2019.

---

## 4. Education Spending Analysis (2012–2026)

**Source notebook:** `Alberta Education Spending Comparison.ipynb`

This section examines Alberta's K-12 and post-secondary operating expenditures across five budget years: 2012-13, 2013-14, 2023-24, 2024-25, and 2025-26. All figures are nominal operating expenses in millions of Canadian dollars.

### Table 3: Education Operating Expenditure by Budget Year

| Budget Year | Fiscal Year | K-12 ($M) | Post-Secondary ($M) | Total ($M) |
|---|---|---|---|---|
| Budget 2012 | 2012-13 | 6,179 | 2,856 | 9,035 |
| Budget 2013 | 2013-14 | 6,210 | 2,682 | 8,892 |
| Budget 2023 | 2023-24 | 8,836 | 5,604 | 14,440 |
| Budget 2024 | 2024-25 | 9,252 | 6,305 | 15,557 |
| Budget 2025 | 2025-26 | 9,883 | 6,635 | 16,518 |

---

### Figure 5: Total Education Spending by Budget Year

![Figure 5: Total Education Spending](plots/infographic_total_stacked.png)

Figure 5 presents total education operating expenditure as a stacked horizontal bar chart, with K-12 and post-secondary spending shown as distinct segments. Total spending grew from $9,035M (Budget 2012) to $16,518M (Budget 2025) — an 83% nominal increase.

The most significant observation is the step-change between the 2013 and 2023 budget years. Spending was essentially flat between the two early budgets ($9,035M → $8,892M), before surging to $14,440M by Budget 2023 — a 62% jump across the sampled gap. The dataset does not contain the intervening fiscal years (2014–2022), so the timing and trajectory of this increase within that decade cannot be determined from this data alone.

---

### Figure 6: K-12 vs Post-Secondary Operating Expenditure

![Figure 6: K-12 vs Post-Secondary](plots/infographic_k12_vs_postsec.png)

Figure 6 places K-12 and post-secondary spending side by side across all five budget years, making the divergence in growth rates immediately visible.

In 2012, post-secondary spending ($2,856M) was less than half of K-12 ($6,179M). By 2025, post-secondary ($6,635M) is approaching two-thirds of K-12 ($9,883M). This convergence reflects the substantially higher growth rate of post-secondary (132.3%) versus K-12 (59.9%). At current trajectories, the funding gap between the two sectors will continue to narrow.

---

### Figure 7: K-12 vs Post-Secondary Share by Budget Year

![Figure 7: Budget Composition](plots/infographic_donut_composition.png)

Figure 7 presents five donut charts — one per budget year — showing the proportional split between K-12 and post-secondary spending within total education expenditure. This view isolates the structural composition of the education budget from its absolute size.

In 2012 and 2013, post-secondary represented approximately 31–32% of total education spending. By 2023–2025, that share climbed to 38–40%. This sustained shift reflects a consistent policy direction of increasing investment in colleges and universities at a faster rate than the K-12 system across multiple budget cycles.

---

### Figure 8: Education Spending Growth, 2012 to 2025

![Figure 8: Growth 2012 vs 2025](plots/infographic_growth_2012_vs_2025.png)

Figure 8 directly compares Budget 2012 and Budget 2025 spending side by side for each spending category, annotated with the percentage change. This single chart distills the full 13-year trend into one reference figure.

| Category | 2012-13 | 2025-26 | Change |
|---|---|---|---|
| K-12 | $6,179M | $9,883M | **+60%** |
| Post-Secondary | $2,856M | $6,635M | **+132%** |
| Total Education | $9,035M | $16,518M | **+83%** |

Post-secondary effectively doubled in absolute terms. K-12 grew by 60%. The 83% total growth figure sits between the two sector rates, weighted by their relative sizes.

---

### Figure 9: Education Spending Heatmap

![Figure 9: Spending Heatmap](plots/infographic_heatmap.png)

Figure 9 encodes spending magnitude as colour intensity across a grid of budget years and spending categories. Darker red cells indicate higher absolute expenditure; lighter yellow cells indicate lower expenditure. This format allows simultaneous comparison of all years and categories in a single view.

The dark red cells in the Total column for Budget 2024 and Budget 2025 signal that combined education spending has entered a distinctly higher regime than the early 2010s. The post-secondary column transitions from pale yellow in 2012–2013 to warm orange in 2023–2025, visually capturing the more-than-doubling of that funding stream. K-12 shows a more moderate shift from yellow-orange to orange, consistent with its slower but still substantial growth trajectory.

---

### Figure 10: Spending Growth by Category — Lollipop Chart

![Figure 10: Lollipop Growth](plots/infographic_lollipop_growth.png)

Figure 10 presents the core percentage growth figures as a horizontal lollipop chart, stripping away all absolute values to focus purely on the rate of change from the 2012-13 baseline to 2025-26.

Post-secondary's +132% lollipop extends furthest to the right, immediately identifying it as the outlier. Total education at +83% and K-12 at +60% provide the comparative context. The visual hierarchy makes the fastest-growing sector immediately apparent without requiring the reader to calculate differences between bars.

---

## 5. Population vs. Education Spending — Integration

**Source notebook:** `Alberta Population vs Education Spending.ipynb`

This section directly addresses the central research question: **did Alberta's education spending grow proportionally to its rising population?** Population figures are aligned to Q1 (January) of each fiscal year's starting calendar year.

---

### Figure 11: Indexed Growth — Population vs. Education Spending (2012-13 = 100)

![Figure 11: Indexed Growth](plots/integration_indexed_growth.png)

Figure 11 indexes all four series — population, K-12 spending, post-secondary spending, and total education spending — to a baseline of 100 at 2012-13. This normalization enables direct comparison of relative growth trajectories regardless of the absolute magnitude of each series.

By 2025-26, the indexed values are:

| Series | Index Value (2012-13 = 100) |
|---|---|
| Post-Secondary | ~232 |
| Total Education | ~183 |
| K-12 | ~160 |
| Population | ~130 |

Every education spending category grew substantially faster than population across every period in the dataset. The shaded region between 2013-14 and 2023-24 denotes the 9-year gap in available spending data — intermediate-year dynamics within that window are not observable from this dataset.

---

### Figure 12: Education Spending per Capita

![Figure 12: Per-Capita Spending](plots/integration_per_capita.png)

Figure 12 normalizes raw education spending by Alberta's population at each data point, translating absolute dollar figures into per-person investment amounts. This view controls for population growth and shows how the province's commitment to education on a per-resident basis has changed over time.

Key observations:

- **K-12 per capita** rose from $1,617 (2012-13) to $1,981 (2025-26) — a 22.5% nominal increase. Given cumulative CPI inflation of approximately 35–40%, this likely represents a real-terms decline in per-capita K-12 investment when adjusted for purchasing power.
- **Post-secondary per capita** rose from $747 (2012-13) to $1,330 (2025-26) — a 78.0% nominal increase, which, even after inflation adjustment, represents a meaningful real increase in per-person post-secondary investment.
- Between 2012-13 and 2013-14, both per-capita metrics declined slightly — the only period in the dataset where per-capita spending fell.
- The dashed vertical line marks the beginning of the 9-year data gap; per-capita trends within the 2014–2022 period are not observable from this dataset.

---

### Figure 13: Education Spending vs. Population Growth — Growth Rate Comparison

![Figure 13: Growth Rate Comparison](plots/integration_growth_rates.png)

Figure 13 presents cumulative growth rates for all metrics as a horizontal lollipop chart, with Alberta's population growth rate (+30.5%) drawn as a vertical reference line. Any metric whose lollipop extends beyond the population line grew faster than population.

All three education spending categories extend well beyond the population reference line:

| Metric | Growth | Multiple of Population Growth |
|---|---|---|
| Population | +30.5% | 1.0× (reference) |
| K-12 Spending | +59.9% | **1.97×** |
| Total Education | +82.8% | **2.72×** |
| Post-Secondary | +132.3% | **4.34×** |

The answer to the central research question is unambiguous: **Alberta's education spending outpaced population growth by a wide margin in every measured category.** In nominal terms, the province substantially increased its per-person education investment between 2012-13 and 2025-26 — though inflation accounts for a meaningful share of that nominal gain.

---

## 6. Data Sources and Methodology

### 6.1 Data Sources

| Source | Description |
|---|---|
| [Statistics Canada, Table 17-10-0009-01](https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1710000901) | Quarterly population estimates for Alberta and all provinces/territories, 1946–present |
| [Alberta Budget Fiscal Plans](https://open.alberta.ca/publications/budget) | Official provincial budget documents for fiscal years 2012-13, 2013-14, 2023-24, 2024-25, and 2025-26 |

### 6.2 Population Data

Statistics Canada Table 17-10-0009-01 was loaded into a pandas DataFrame and filtered for `GEO == 'Alberta'`. Q1 (January) snapshots were used for all annual comparisons to ensure consistency across time periods.

Derived population metrics:

| Metric | Formula |
|---|---|
| `Population_Change` | Quarter-over-quarter absolute change (`.diff()`) |
| `Growth_Rate_Pct` | Quarter-over-quarter percentage change (`.pct_change() × 100`) |
| `AB_Share_Pct` | `(Alberta population / Canada population) × 100` |
| `YoY_Change` / `YoY_Growth_Pct` | Annual comparisons using Q1 data only |

### 6.3 Spending Data

Operating expense figures for K-12 and post-secondary education were extracted from Alberta Budget Fiscal Plans. For fiscal years 2023-24, 2024-25, and 2025-26, data was extracted from Excel-format expense tables published by Alberta Treasury Board and Finance. For 2012-13 and 2013-14, figures were extracted from the corresponding PDF fiscal plan documents.

One headline estimate row was retained per budget year — corresponding to the total operating expense for the Ministry of Education (K-12) and the Ministry of Advanced Education (post-secondary). Figures do not include capital expenditure.

### 6.4 Fiscal Year Alignment

Each fiscal year is aligned to the Q1 population of its starting calendar year:

| Fiscal Year | Population Reference |
|---|---|
| 2012-13 | Q1 2012 (January 2012) |
| 2013-14 | Q1 2013 (January 2013) |
| 2023-24 | Q1 2023 (January 2023) |
| 2024-25 | Q1 2024 (January 2024) |
| 2025-26 | Q1 2025 (January 2025) |

### 6.5 Derived Metrics

| Metric | Formula |
|---|---|
| Per-Capita Spending | `Spending ($) / Population` |
| Indexed Value | `(Current Value / 2012-13 Baseline Value) × 100` |
| Growth Percentage | `(Latest Value / Baseline Value − 1) × 100` |

### 6.6 Visualization

All charts use a dark infographic theme (`#0D1117` background) produced with `matplotlib` and `seaborn`.

---

## 7. Limitations and Caveats

1. **Nominal figures only.** All spending figures are expressed in nominal (non-inflation-adjusted) dollars. Canada's Consumer Price Index rose approximately 35–40% between 2012 and 2025. Real gains in education spending, while still positive for post-secondary, are considerably more modest than the nominal figures suggest — and K-12 per-capita spending likely experienced a real-terms decline when adjusted for inflation.

2. **Nine-year data gap.** The dataset contains spending observations for only five fiscal years: 2012-13, 2013-14, 2023-24, 2024-25, and 2025-26. The 9-year gap between 2013-14 and 2023-24 prevents any analysis of intermediate trends, year-to-year volatility, or the timing of spending changes within that decade.

3. **Budget estimates vs. actuals.** The 2025-26 spending figure is a budget estimate and may differ from the audited actual result. The 2024-25 figure may also be subject to minor revision.

4. **Operating expense only.** This analysis covers operating expenditure only. Capital expenditure (school construction, post-secondary infrastructure) is excluded. Total education investment including capital is higher than the figures presented here.

5. **Population alignment.** Per-capita calculations use Q1 population as the denominator for each fiscal year. This is an approximation; the true average population over the fiscal year may differ slightly from the January snapshot.

6. **Spending categories.** "K-12" refers to the Ministry of Education operating expense. "Post-secondary" refers to the Ministry of Advanced Education operating expense. These figures may not capture all education-related expenditures made through other ministries.

---

## 8. Technical Appendix

### Project Structure

```
Alberta-Population-vs-Education-Spending/
├── README.md                                          # This report
├── Population Predictions Canada 2025.ipynb           # Part 1: Population analysis
├── Alberta Education Spending Comparison.ipynb        # Part 2: Education spending analysis
├── Alberta Population vs Education Spending.ipynb     # Part 3: Integration analysis
├── _generate_integration_charts.py                    # Integration chart generation script
├── 17100009.csv                                       # Statistics Canada population data
├── alberta_yoy_growth.csv                             # Derived year-over-year growth data
├── alberta_yoy_growth.py                              # YoY growth calculation script
├── budget_data/
│   └── population_vs_spending.csv                     # Integrated dataset (all metrics)
└── plots/                                             # Generated figures (Figures 1–13)
```

### Software Requirements

```
Python 3.12
pandas
numpy
matplotlib
seaborn
```

### Reproduction

To reproduce the analysis, execute the three Jupyter notebooks in sequence:

1. `Population Predictions Canada 2025.ipynb` — generates population figures and Figures 1–4
2. `Alberta Education Spending Comparison.ipynb` — generates spending figures and Figures 5–10
3. `Alberta Population vs Education Spending.ipynb` — generates integration figures and Figures 11–13

---

*Population data: Statistics Canada, Table 17-10-0009-01.*
*Spending data: Alberta Budget Fiscal Plans (Government of Alberta).*
*This analysis uses publicly available data. All figures, calculations, and visualizations are original work.*
