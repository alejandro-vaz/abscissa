## Repository guide for AI pair‑programming (Abscissa)

Purpose: give an AI assistant enough context to navigate, read, and safely modify this repo without the human repeating basics each time. There are no runtime “agents” here; this is documentation for development.

Note on maintenance by AI
- The AI pair‑programmer is explicitly allowed to update `AGENTS.md` at any time, without being prompted, to keep information accurate and to add details the AI believes will be useful in the future.
- Updates should remain concise, factual, high‑signal, and reflect the current repository state. Do not include secrets or ephemeral environment data.

### Quick facts
- **Project**: Abscissa (interactive math practice + Mathsys language)
- **Frontend**: SPA in `public/` (TypeScript/React via ESM import maps; SASS)
- **Backend**: FastAPI (Uvicorn), async MariaDB via `aiomysql`
- **Routing**: Dynamic include of route modules listed in `SUG.SRC`
- **Deploy**: Nginx serves static and proxies `/api` to Uvicorn
- **Live**: `https://abscissa.eu`

### Top-level layout
- `API.py`: FastAPI app entrypoint that dynamically includes route modules from `SUG.SRC`
- `__init__.py`: shared imports/utilities for handlers (exports `Request`, `APIRouter`, `JSONResponse`, helpers `debug`, `add`, `º`)
- `api/`: backend route handlers grouped by domain (`mathsys`, `problem`, `session`, `user`)
- `extensions/`: reusable helpers used by handlers (`database`, `response`, `mathsys`, `cryptography`, `binary`, `time`, `random`)
- `public/`: SPA source (TSX modules via import map, SASS, assets, templates)
- `server/`: Nginx and systemd service configs
- `SUG.py`: superglobals (routes list, regex patterns, DB config, constants)

### Backend architecture (how routes are wired)
- `API.py` sets `app = FastAPI()` and includes each module in `SUG.SRC`, resolving to files at `SUG.DIR + '/api' + script + '.py'`
- Each route module:
  - Declares `router = APIRouter()`
  - Imports required `website.extensions`
  - In handler: `await <ext>.namespace().init(request)`, validate with `post.checks()` and `post.exists(...)`, then return via `response.get()` or stream via `binary.get()`

### Superglobals (`SUG.py`) essentials
- `SRC`: list of route module paths to include (e.g., `/mathsys/compile`, `/user/login`)
- `DBC`: MariaDB connection params
- `PDR`/`DIR`: filesystem base paths used for dynamic imports (prod: `/srv/www`, `/srv/www/website`)
- `PAT`: validation rules (regex or required-key sets) used by `extensions/post.py`
- `PER`: permission thresholds per domain
- `ERR`: standard HTTPException payloads
- `ACT`: analytics action codes

Validation behavior (`extensions/post.py`)
- For each key in request JSON: if pattern is a set, provided value must contain at least those keys; else must full‑match the regex when stringified.
- Important keys: `Pid` (hex uppercase), `Mcode` (any text), `Uemail` (gmail only), `Uname` (4–32 alnum/_/-), `Uhashpass` (8–64).

### Extensions (reusable building blocks)
- `post`: parse JSON body, `exists`, `checks`
- `response`: normalize data (datetime→ISO, bytes→HEX), `tojson` to decode selected fields, `get()` returns `JSONResponse`
- `database`: `aiomysql` connection, session cookie `Sid` management, `query`, `analytics`
- `mathsys`: `validate`, `view`, `compile` wrappers
- `binary`: hex/bytes load, `get()` streams `application/wasm`
- `cryptography`: Argon2 hash/verify
- `time`, `random`: small utilities

### API endpoints (current)
- POST `/api/mathsys/validate` — body `{Mcode}`; returns validation result
- POST `/api/mathsys/compile` — body `{Mcode}`; returns WASM stream
- POST `/api/mathsys/view` — body `{Mcode}`; returns KaTeX‑friendly string or `false`
- POST `/api/problem/lookup` — body `{Pid}`; returns row with decoded JSON fields (`Pmeta`, `Pdata*`, `Psolution`)
- POST `/api/session/validate` — no body; returns whether `Sid` cookie is valid
- POST `/api/user/login` — `{Uname, Uhashpass}`; sets session cookie on success
- POST `/api/user/register` — `{Uemail, Uname, Uhashpass}`; creates user

### Frontend architecture
- Entry: `public/base/index.html`
  - Loads CSS for base/interface/app/view modules
  - Defines an import map mapping short aliases to ESM URLs and local compiled JS paths
  - Boots `public/base/script.js`
- Core app bootstrap: `public/base/script.tsx`
  - SPA router: `redirect()` switches views based on `window.location.pathname` into `&`, `&dashboard`, `&playground`, else `&error`
  - Module loader: `modulator("navbar","tooltip","topbar")` activates/deactivates interface modules
  - HTTP helpers: `curl(script, data)` JSON POST to `/api/<script>`; `stream(script, data)` for binary responses
  - Utilities: `inject(HTMLElement, ReactNode)`, `connect(path)`, `delay`, regex `check`, and `SUG` superglobals (frontend validation patterns mirror backend)
- View modules
  - `public/content/&/script.tsx`: landing page
  - `public/content/&dashboard/script.tsx`: dashboard view
  - `public/content/&playground/script.tsx`: Mathsys playground; mounts editor and output
  - `public/content/&error/script.tsx`: error views
- App modules
  - `public/app/mathsys/script.tsx`: CodeMirror editor, KaTeX render via `/api/mathsys/view`, WASM runtime via `/api/mathsys/compile`
  - `public/app/popup/script.tsx`: popup system; auth form uses `/api/user/login` and `/api/user/register`
  - `public/app/dicebear/*`: avatar utilities
- Interface modules
  - `public/interface/navbar/script.tsx`: navbar; uses `/api/session/validate` and `/api/user/data`
  - `public/interface/tooltip`, `public/interface/topbar`: UI components
- Styling
  - SASS sources under `public/**/style.sass` compiled to `style.css`

### Module alias conventions (JS/TS)
Aliases are enforced consistently across `tsconfig.json` paths, `globals.d.ts` ambient module declarations, and the `importmap` in `public/base/index.html`.

- **`€` prefix (externals)**: Pinned third‑party ESM packages loaded from a CDN.
  - Examples: `"€react"`, `"€react-dom/client"`, `"€@codemirror/view"`, `"€katex/contrib/auto-render"`.
  - Defined in `tsconfig.json::compilerOptions.paths` and in the import map.
- **`$` (core base module)**: SPA bootstrap utilities and superglobals.
  - Maps to `public/base/script.js`. Declared in `globals.d.ts` under module `"$"`.
- **`&` prefix (views)**: Top‑level routed views.
  - Examples: `"&"`, `"&dashboard"`, `"&playground"`, `"&error"`.
- **`#` prefix (app modules)**: Feature modules that power app functionality.
  - Examples: `"#mathsys"`, `"#popup"`, `"#dicebear"`.
- **`=` prefix (interface modules)**: Cross‑view UI components.
  - Examples: `"=navbar"`, `"=tooltip"`, `"=topbar"`.

Rules for adding a new module alias
1. Add the alias to `tsconfig.json` under `compilerOptions.paths`.
2. Add a matching entry to the `importmap` in `public/base/index.html`.
3. If it is a local module (not `€*`), add a matching ambient module declaration block in `globals.d.ts` describing its exported API.

### Build & dev commands
- `npm run build/tsx` — transpiles `*.tsx` → `*.js` (Babel presets: env, react with `importSource`="€react", typescript)
- `npm run build/sass` — compiles SASS to CSS under `public/`
- Local API: `uvicorn API:app --reload` (ensure `SUG.DIR`/`SUG.PDR` point to your working path or mirror to `/srv/www/website`)

### Deployment
- Nginx (`server/abscissa.conf`) serves static and proxies `/api/` to `127.0.0.1:8000`
- systemd (`server/abscissa.service`) runs Uvicorn with `--reload` and `WorkingDirectory=/srv/www/website`

### Editing guardrails (for AI)
- Follow handler pattern; always return `response.get()` for JSON
- Extend `SUG.PAT` when adding POST fields; keep frontend `SUG.PAT` in sync if UI depends on it
- Don’t log PII; use minimal analytics via `database.analytics`
- Keep DB writes idempotent and explicit
- Keep import map paths stable; if you add a module, add it to `index.html` importmap and `tsconfig.json` paths
- Keep frontend ESM and React importSource `€react` consistent with Babel config

### Where to look for things
- API contracts: backend `api/*` and frontend callers in `public/**/script.tsx` using `$.curl`/`$.stream`
- Validation: `SUG.PAT` and frontend `SUG.PAT`
- Session logic: `extensions/database.py` and `navbar`/`popup` flows
- Math rendering: `app/mathsys` using KaTeX and WASM
