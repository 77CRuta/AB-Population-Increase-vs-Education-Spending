# Project Conventions

## Data Analysis Workflow Rule
When creating or editing any data analysis file (`.py` scripts with pandas/matplotlib, `.ipynb` notebooks), **always use the `kds` shared module**:
- Start every analysis file with `from kds import apply_theme, PALETTE, save_fig` and call `apply_theme()` before any plotting
- Use `from kds import load_statscan_csv, filter_geo, filter_quarterly` for Statistics Canada data
- Use `from kds import indexed_growth, pct_change_col` instead of manual base-100 or pct_change calculations
- Use `kds.theme.style_axes(ax)` after creating axes for consistent spine/grid treatment
- Use `kds.theme.title(ax, "...")` for left-aligned titles
- Use `save_fig(fig, path)` instead of raw `plt.savefig()` calls
- Use `PALETTE.ordered` for multi-series color assignments: `ax.plot(..., color=PALETTE.ordered[i])`
- Reference individual colors as `PALETTE.dark_blue`, `PALETTE.teal`, `PALETTE.coral`, `PALETTE.amber`, `PALETTE.slate`

## Hard Prohibitions
- **NEVER** run `git push` unless the user explicitly requests it in the current conversation
- **NEVER** delete files unless the spec names the exact file(s)
- **NEVER** modify `.env`, secrets, credentials, or auth config files
- **NEVER** install new dependencies unless the spec requires it  -- if needed but unlisted, stop and report
- **NEVER** modify CI/CD files (`.github/workflows/`, `Dockerfile`, deployment configs) unless the spec targets them
- **NEVER** merge branches
- **NEVER** use mock, random, or placeholder numbers. If a value is needed, ask where the data should come from. All numbers must be real or derived from real data

## Git Commits
Never include a "Co-Authored-By" trailer in commit messages.

## Quality Gates
All gates must pass before committing. If any fail, fix first or report  -- do not commit broken code.

1. **Lint**: zero warnings, zero errors, strictest rules. No suppression comments (`eslint-disable`, `noqa`, etc.)
2. **Tests**: 100% pass rate. No `.skip()` or `xit()`. If you break an existing test, fix it before committing. If unfixable within scope, scrap and report
3. **Coverage**: minimum 85%. Write tests for every new function, endpoint, or component
4. **Build**: must succeed. Run lint, typecheck, test, and build commands for the project

## Code Cleanliness
- No dead code, no commented-out code, no TODO comments (log TODOs in the issue tracker)
- No unused imports
- No magic numbers or strings  -- use named constants
- Clean code compounds: every file you write becomes context for future work

## Agent Workflow

### Worker agents
- Implement the spec  -- nothing more, nothing less
- If the spec is ambiguous, stop and ask. Do not infer intent
- Out-of-scope discoveries go in the activity log, not into code

### Coordinator agents
- Break tasks into the smallest independent units  -- one agent, one prompt, no file conflicts
- Each sub-task gets its own spec
- After all sub-agents complete, verify all quality gates on the merged result

### Agent types
- **Scout**: read-only, reports findings, may not write files
- **Builder**: creates/modifies files within spec scope
- **Test**: may only add/modify test files
- **Review**: read-only, reviews output against spec and quality standards

### Isolation
Every agent works in its own git worktree or isolated branch.

## Specs
Every task requires a spec with:
1. **Objective**: one sentence
2. **Files to modify**: exact paths (new files get exact path + filename)
3. **Requirements**: detailed, unambiguous
4. **Constraints**: what's out of scope
5. **Acceptance criteria**: how to verify completion
6. **Code references**: relevant snippets, line numbers, patterns to follow

## Python Conventions

### Imports
Follow PEP 8 grouping with blank-line separators:
1. stdlib
2. (blank line)
3. third-party (pandas, numpy, matplotlib, etc.)
4. (blank line)
5. local/relative imports

Alphabetize within each group. Use `from __future__ import annotations` only in library/tool code (AI Indexing Tool), not in analysis scripts.

### Type Hints
- Use modern syntax: `X | None` (not `Optional[X]`), `list[str]` (not `List[str]`)
- Always type function signatures in application code (SignalApp, Panama, AI Indexing Tool)
- Type hints are optional in one-off analysis scripts and notebooks
- Use `from __future__ import annotations` when back-compat is needed

### Naming
- Files: `snake_case.py` always
- Variables/functions: `snake_case`
- Private functions: `_prefixed_snake_case`
- Classes: `PascalCase`
- Constants: `SCREAMING_SNAKE_CASE`
- Dataclass fields: `snake_case`

### Data Structures
- Use `@dataclass` for all structured data containers and contracts
- Use a `contracts.py` file per subpackage for pure dataclass definitions
- Plain dicts only for ad-hoc intermediate results or YAML/JSON config
- Never use NamedTuple or TypedDict

### Docstrings
- One-liner docstrings for simple functions
- NumPy-style (Parameters / Returns sections) only on complex public functions
- No docstrings needed on internal helpers or analysis script functions

### Error Handling
- Application code: use `logging` (`logger = logging.getLogger(__name__)`), never `print`
- Catch specific exception types (OSError, ValueError), not bare `except Exception`
- Analysis scripts: `print()` is fine; no logging infrastructure needed
- UI code: surface errors via the UI framework (messagebox, toast, etc.)

### Module Organization
- One `__init__.py` per package, re-exporting only the main entry-point class
- Flat subpackage structure: one directory per functional domain
- No deep nesting beyond two levels

## DataFrame Conventions

### Column Naming
- Use **lowercase snake_case** for all column names: `year`, `population`, `yoy_growth_pct`
- Rename StatsCan columns on load: `REF_DATE` -> `ref_date`, `GEO` -> `geo`, `VALUE` -> `value`
- Derived columns: descriptive snake_case (`cumulative_growth_pct`, `per_capita_spending`)
- Never use spaces or units in column names  -- document units in comments or markdown

### Loading CSVs
- StatsCan data: load with `dtype=str, encoding='utf-8'`, then cast explicitly
- Replace StatsCan suppressed-value markers: `.replace({'..': np.nan, '': np.nan})`
- Use `pd.to_numeric(col, errors='coerce')` for numeric conversion
- Use `pd.to_datetime(col)` for date parsing  -- specify `format=` when known
- Strip GEO codes: `.str.replace(r'\s*\[\d+\]', '', regex=True).str.strip()`

### Index Usage
- Default to integer index with `reset_index(drop=True)` after sorts/filters
- `set_index` only for persistent lookup tables (e.g., fiscal year as named index)
- Always `reset_index()` after `groupby().agg()`

### Exports
- CSV: always `index=False`
- Findings/text: write to `.txt` or `.md` file

## Notebook Structure

Follow this cell ordering:
1. **Title cell** (markdown H1): project name, data source, date
2. **Imports + constants**: all imports, path constants, palette/style setup
3. **Load data**: 1–2 cells
4. **Clean/prepare** (if needed): filtering, renaming, type casting
5. **Analysis sections** (markdown H2 each): one code cell per chart/finding
6. **Each chart cell**: compute -> plot -> `savefig()` -> `plt.show()`
7. **Summary/export** (final cell): key findings or CSV export

