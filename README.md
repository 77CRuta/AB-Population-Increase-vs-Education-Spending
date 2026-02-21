# Alberta Education Spending vs. Population Growth (2012–2025)

**A data analysis of whether Alberta's provincial education budget kept pace with its rising population.**

*Data sources: Statistics Canada (Table 17-10-0009-01); Alberta Budget Fiscal Plans (2012-13 through 2025-26).*

---

## Abstract

Between 2012 and 2025, Alberta's population grew by approximately 30.5%, adding over 1.1 million residents. Over the same period, nominal education spending rose by 82.8% — nearly 2.7 times the rate of population growth. This report examines Alberta's population trajectory, the evolution of its education budget across five fiscal years, and the relationship between those two variables. The central finding is that education spending substantially outpaced population growth in every category — K-12, post-secondary, and combined — though a portion of that nominal gain is attributable to inflation.

---

## 1. Introduction

Rapid population growth strains public services. When a province's population grows faster than its public investment, per-capita service capacity effectively declines. Conversely, when spending grows faster than population, governments are either expanding service quality or compensating for prior underfunding.

Alberta provides an instructive case. The province's population grew steadily from 2012 onward, then accelerated sharply after 2020 — driven by interprovincial and international migration. This raises a natural question for education policy: **did the provincial education budget grow proportionally to the rising population, or did it fall behind?**

This report addresses that question using quarterly population data from Statistics Canada and operating expense figures from Alberta's published Budget Fiscal Plans. The analysis spans the 2012-13 to 2025-26 fiscal years and covers both K-12 and post-secondary education.

---

## 2. Data & Methodology

### 2.1 Data Sources

| Dataset | Source | Description |
|---|---|---|
| Quarterly population estimates | Statistics Canada, Table 17-10-0009-01 | Population by province, 1946–present |
| K-12 operating expense | Alberta Budget Fiscal Plans | Nominal figures in millions of CAD |
| Post-secondary operating expense | Alberta Budget Fiscal Plans | Nominal figures in millions of CAD |

Education spending data is available for five budget years only: 2012-13, 2013-14, 2023-24, 2024-25, and 2025-26. The intervening years (2014–2022) are absent from this dataset, which limits the ability to identify *when* changes occurred within that decade.

### 2.2 Derived Metrics

- **Population change**: Quarter-over-quarter absolute change and percentage change.
- **Alberta's national share**: Alberta population divided by Canada population, expressed as a percentage.
- **Year-over-year (YoY) growth**: Annual comparisons using Q1 (January) data to remove seasonal noise.
- **Per-capita spending**: Operating expense in dollars divided by the Alberta population for the corresponding Q1.
- **Indexed growth**: All series normalized to 100 at the 2012-13 baseline to allow direct comparison of relative trajectories.
- **Growth percentage**: `(latest value / baseline value − 1) × 100`.

### 2.3 Fiscal Year Alignment

Each fiscal year is aligned to the Q1 population of its starting calendar year (e.g., fiscal 2012-13 is paired with the January 2012 population estimate).

### 2.4 Limitations

All spending figures are **nominal** (not inflation-adjusted). Canada's CPI rose approximately 35–40% between 2012 and 2025. Real gains in education spending, while still positive, are more modest than nominal figures suggest — particularly for K-12, where the nominal per-capita gain of ~22.5% may represent near-flat or slight real-terms growth once adjusted for inflation. The 9-year gap in budget data (2014–2022) prevents analysis of intermediate dynamics.

---

## 3. Population Analysis (2012–2025)

### 3.1 Overall Growth

Alberta's population grew from **3,822,425** in Q1 2012 to **4,988,181** in Q1 2025 — an increase of **1,165,756 people (+30.5%)** over 13 years. The average quarterly growth rate over this period was **0.514%**.

| Metric | Value |
|---|---|
| Alberta Population (Q1 2012) | 3,822,425 |
| Alberta Population (Q1 2025) | 4,988,181 |
| Total Growth | +1,165,756 (+30.5%) |
| Average Quarterly Growth Rate | 0.514% |
| Peak Quarterly Growth Rate | 1.356% (Q4 2023) |
| Lowest Quarterly Growth Rate | 0.046% (Q3 2020 — COVID-19) |

The line chart below plots the full population trajectory from 2012 to 2025. Growth was steady and consistent until approximately 2022, at which point the rate of increase visibly accelerated.

![Alberta Population Growth (2012–2025)](plots/alberta_population_growth.png)

### 3.2 Quarterly Volatility and COVID-19 Impact

Growth was not uniform. The bar chart below shows quarter-over-quarter percentage change for every quarter from 2012 to 2025. The orange dashed line marks the long-run average (~0.51%).

![Quarterly Population Growth Rate](plots/quarterly_growth_rate.png)

Two structural breaks are apparent:

1. **COVID-19 (2020)**: Q3 2020 recorded the lowest quarterly growth rate in the dataset — just 0.046% — as international migration halted and interprovincial movement slowed.
2. **Post-pandemic surge (2022–2024)**: Quarterly rates exceeded 1.0% in multiple quarters of 2023, more than double the long-run average. Q4 2023 recorded the peak rate of 1.356%.

### 3.3 Alberta's Growing Share of Canada's Population

Alberta's demographic weight within Canada has risen substantially over the long run. The line chart below tracks the province's share of Canada's total population from 1951 to 2025.

![Alberta's Share of Canada's Total Population](plots/alberta_population_share.png)

In 1951, Alberta accounted for **6.7%** of Canada's population. By Q1 2025, that share had risen to **12.1%** — nearly double — reflecting the province's sustained draw of both interprovincial and international migration over seven decades.

### 3.4 Year-over-Year Perspective

The two-panel chart below uses Q1 (January) data to produce clean annual comparisons, smoothing out within-year quarterly fluctuations. The top panel shows absolute year-over-year change; the bottom shows the percentage growth rate.

![Year-over-Year Growth Analysis](plots/yoy_growth_analysis.png)

The 2023 and 2024 bars in both panels represent the largest annual population gains in the dataset, confirming that recent growth is historically elevated — not simply a statistical artifact of one exceptional quarter.

---

## 4. Education Spending Analysis (2012–2025)

### 4.1 Total Spending Trajectory

Alberta's combined K-12 and post-secondary operating expense rose from **$9,035M in 2012-13 to $16,518M in 2025-26** — an **83% nominal increase** over 13 years.

| Budget Year | K-12 ($M) | Post-Secondary ($M) | Total ($M) |
|---|---|---|---|
| 2012-13 | 6,179 | 2,856 | 9,035 |
| 2013-14 | 6,210 | 2,682 | 8,892 |
| 2023-24 | 8,836 | 5,604 | 14,440 |
| 2024-25 | 9,252 | 6,305 | 15,557 |
| 2025-26 | 9,883 | 6,635 | 16,518 |

The stacked bar chart below shows the K-12 and post-secondary composition of total education spending at each budget year. The step-change between the 2013-14 and 2023-24 budgets is the most prominent feature — total spending jumped from $8,892M to $14,440M, a 62% increase between the two sampled periods. Because the intervening years are absent, the chart cannot identify when within 2014–2022 this increase occurred.

![Total Education Spending by Budget Year](plots/infographic_total_stacked.png)

### 4.2 K-12 vs. Post-Secondary: Divergent Growth Rates

While both sectors grew, their growth rates differ substantially. The grouped bar chart below places each funding stream side by side across all five budget years.

![K-12 vs. Post-Secondary Operating Expense](plots/infographic_k12_vs_postsec.png)

| Category | 2012-13 ($M) | 2025-26 ($M) | Nominal Growth |
|---|---|---|---|
| K-12 | 6,179 | 9,883 | **+59.9%** |
| Post-Secondary | 2,856 | 6,635 | **+132.3%** |
| Total Education | 9,035 | 16,518 | **+82.8%** |

Post-secondary spending more than doubled in nominal terms. In 2012-13, post-secondary represented approximately 31.6% of the education budget; by 2025-26, its share had grown to 40.2%. This is not simply a uniform scale-up — it represents a structural shift in how Alberta allocates education funding.

![Education Spending Growth: 2012 → 2025](plots/infographic_growth_2012_vs_2025.png)

### 4.3 Budget Composition Over Time

The five donut charts below display the K-12 / post-secondary split at each budget year. In 2012 and 2013, post-secondary represented roughly 31–32% of total education spending. By 2023–2025, that share had climbed to 38–40%.

![K-12 vs. Post-Secondary Share by Budget Year](plots/infographic_donut_composition.png)

This sustained compositional shift — visible across three consecutive recent budgets — suggests a deliberate policy direction of increasing investment in post-secondary education at a faster rate than the K-12 system.

### 4.4 Spending Level Comparisons — Heatmap

The heatmap below encodes spending magnitude as colour intensity, enabling rapid comparison across all budget years and categories simultaneously.

![Education Spending Heatmap](plots/infographic_heatmap.png)

The darkest cells appear in the Total column for Budget 2024 and 2025, confirming that combined spending has entered a distinctly higher regime compared to the early 2010s. Post-secondary transitions from pale yellow (2012–2013) to warm orange (2023–2025), visually capturing its more-than-doubling. K-12 shows a more moderate shift, consistent with its slower but still substantial 60% growth.

### 4.5 Growth Rate Summary — Lollipop Chart

The lollipop chart below isolates percentage growth from the 2012-13 baseline for each category, stripping away absolute values to focus on rate of change.

![Education Spending Growth by Category (2012–2025)](plots/infographic_lollipop_growth.png)

Post-secondary's +132% lollipop extends the furthest right, immediately identifying it as the outlier. K-12 at +60% and total education at +83% provide structural context. Every category substantially exceeded growth rates typical of a 13-year inflationary period.

---

## 5. Integration Analysis: Spending vs. Population

### 5.1 Core Finding — Spending Outpaced Population Growth

The central research question is whether education spending kept pace with Alberta's rising population. The lollipop chart below answers this directly, plotting the total percentage growth for each metric and overlaying Alberta's +30.5% population growth as a vertical reference line.

![Education Spending vs. Population Growth (2012–2025)](plots/integration_growth_rates.png)

The result is unambiguous: **education spending outpaced population growth by a wide margin in every category**.

| Metric | Growth (2012–2025) | Ratio to Population Growth |
|---|---|---|
| Alberta Population | +30.5% | 1.0× (baseline) |
| K-12 Operating Expense | +59.9% | ~2.0× |
| Total Education Expense | +82.8% | ~2.7× |
| Post-Secondary Operating Expense | +132.3% | ~4.3× |

In nominal terms, Alberta substantially increased its per-person education investment across all categories. However, as discussed in the methodology section, a portion of this gain is attributable to inflation.

### 5.2 Indexed Growth Trajectories

The indexed growth chart below normalizes all four series — population, K-12, post-secondary, and total education — to 100 at the 2012-13 baseline, allowing direct comparison of relative growth trajectories over the full period. The shaded region marks the 9-year data gap.

![Indexed Growth (2012–13 = 100)](plots/integration_indexed_growth.png)

By 2025-26:
- **Post-secondary** reached index **232** (more than doubled from baseline).
- **Total education** reached index **183**.
- **K-12** reached index **160**.
- **Population** reached index **130**.

The divergence between population and spending trajectories is the defining visual feature of this chart. Even K-12 — the most moderately growing category — separated from the population line and maintained that gap.

### 5.3 Per-Capita Spending

Per-capita spending normalizes raw dollars for population size, isolating the change in resource allocation per Albertan.

![Alberta Education Spending per Capita](plots/integration_per_capita.png)

| Category | 2012-13 ($/person) | 2025-26 ($/person) | Nominal Change |
|---|---|---|---|
| K-12 per capita | $1,617 | $1,981 | **+22.5%** |
| Post-secondary per capita | $747 | $1,330 | **+78.0%** |
| Total education per capita | ~$2,363 | ~$3,312 | **+40.1%** |

Several observations stand out:

- Between 2012-13 and 2013-14, both K-12 and post-secondary per-capita spending *declined* slightly — the only period in the dataset where this occurred — before the 9-year gap.
- K-12 per-capita growth of +22.5% nominally is likely near-flat or slightly negative in real terms given Canada's ~35–40% CPI increase over the same period. This indicates that K-12 spending broadly tracked population growth in real terms, without a meaningful expansion of per-person capacity.
- Post-secondary per-capita growth of +78.0% nominally represents a substantial real increase of approximately 30–40% after inflation. This is the clearest evidence of expanded investment rather than mere maintenance of the status quo.

---

## 6. Discussion

### 6.1 Interpreting the Divergence

The gap between spending growth and population growth is nominal. Canada's CPI rose approximately 35–40% between 2012 and 2025. Adjusting for this:

- **K-12**: A nominal gain of +59.9% implies a real gain of roughly +15–18%. On a per-capita basis, the nominal +22.5% likely implies near-flat real per-capita spending — consistent with maintaining, rather than expanding, K-12 service levels.
- **Post-secondary**: A nominal gain of +132.3% implies a real gain of roughly +65–72%. Even on a per-capita basis (+78.0% nominal), the real increase is substantial — approximately +30–40%.

The divergence between K-12 and post-secondary growth is the most policy-relevant finding. It may reflect several non-mutually-exclusive factors:
- Structural shifts in the 18–24 year-old cohort relative to the K-12 school-age population.
- Catch-up funding for post-secondary after a period of relative underfunding.
- Deliberate policy prioritization of higher education and workforce training.

### 6.2 The 9-Year Data Gap

The absence of budget data between 2014 and 2022 is a significant structural limitation. The analysis can confirm that spending rose from ~$8,892M to ~$14,440M between those sampled endpoints, but cannot determine whether the increase was gradual, concentrated in specific years, or front-loaded/back-loaded relative to the population surge that began around 2022. Incorporating the full annual budget series would materially improve the precision of any causal or trend inference.

### 6.3 What Spending Data Cannot Determine

Aggregate operating expense data cannot answer whether the spending increases translated into proportional gains in educational outcomes or capacity. Enrollment counts, student-to-educator ratios, capital investment, and program quality metrics would be required to assess whether Alberta's per-capita investment increase represents genuine service expansion.

---

## 7. Conclusion

Alberta's education spending grew substantially faster than its population between 2012 and 2025 across all categories, in both aggregate and per-capita terms. Total nominal education spending increased 82.8% — 2.7 times the population growth rate of 30.5%. Post-secondary spending more than doubled nominally (+132.3%), growing at 4.3 times the population rate, while K-12 grew at roughly twice the population rate (+59.9%).

After adjusting for inflation, the picture is more nuanced: K-12 per-capita spending likely held roughly flat in real terms, suggesting the sector kept pace with population growth but did not materially expand capacity. Post-secondary, by contrast, achieved a genuine real-terms increase in per-person investment of approximately 30–40%.

The province's population itself underwent a structural shift in this period — growing from a stable ~0.5% quarterly rate pre-2020 to rates exceeding 1.0% per quarter in 2023 — and Alberta's share of Canada's total population rose from 6.7% (1951) to 12.1% (2025). Against that demographic backdrop, the education budget increases represent a policy choice to invest ahead of, rather than simply in proportion to, population growth — at least in the post-secondary sector.

---

## References

- Statistics Canada. *Table 17-10-0009-01 — Estimates of population (2016 Census and administrative data), by age group and sex for July 1st, Canada, provinces, territories, health regions (2011 boundaries) and peer groups.* Retrieved from [https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1710000901](https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1710000901)
- Government of Alberta. *Budget 2012 — Fiscal Plan.* Alberta Treasury Board and Finance.
- Government of Alberta. *Budget 2013 — Fiscal Plan.* Alberta Treasury Board and Finance.
- Government of Alberta. *Budget 2023 — Fiscal Plan.* Alberta Treasury Board and Finance.
- Government of Alberta. *Budget 2024 — Fiscal Plan.* Alberta Treasury Board and Finance.
- Government of Alberta. *Budget 2025 — Fiscal Plan.* Alberta Treasury Board and Finance.

---

## Appendix: Notebooks & Code

| Notebook | Description |
|---|---|
| [`Population Predictions Canada 2025.ipynb`](Population%20Predictions%20Canada%202025.ipynb) | Population trends — growth rates, COVID impact, Alberta's national share |
| [`Alberta Education Spending Comparison.ipynb`](Alberta%20Education%20Spending%20Comparison.ipynb) | Education spending across five budget years — K-12 vs. post-secondary |
| [`Alberta Population vs Education Spending.ipynb`](Alberta%20Population%20vs%20Education%20Spending.ipynb) | Integration analysis — spending growth relative to population growth |

**Libraries**: Python 3.12, pandas, numpy, matplotlib, seaborn.
