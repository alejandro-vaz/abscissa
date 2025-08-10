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

### Local dev quickstart
- Backend
  - Python deps (suggested): `fastapi`, `uvicorn[standard]`, `aiomysql`, `argon2-cffi`, and the external `mathsys` package used by `extensions/mathsys.py`.
  - Start API: `uvicorn API:app --reload`. Note: the app dynamically imports route modules from absolute paths using `SUG.PDR`/`SUG.DIR`.
  - Paths: For local work, either create a symlink so these constants remain valid or temporarily change them:
    - Symlink (recommended, no repo edits):
      - `sudo mkdir -p /srv/www && sudo ln -s "$(pwd)" /srv/www/website` (run from repo root)
    - Or temporarily change `SUG.PDR`/`SUG.DIR` to your workspace absolute path and revert before committing.
- Database
  - Easiest: Docker MariaDB
    - `docker run --name abscissa-mariadb -e MARIADB_ALLOW_EMPTY_ROOT_PASSWORD=yes -p 3306:3306 -d mariadb:11`
    - Init schema: `docker exec -i abscissa-mariadb mysql -u root < database/setup.sql`
  - Or use provided scripts (require root): `npm run setup` and `npm run update` (they copy Nginx/MySQL configs and run SQL).
- Frontend
  - Build watchers (in separate terminal):
    - `npm run build/tsx` (TSX → JS)
    - `npm run build/sass` (SASS → CSS)
  - Open the site at `https://localhost/...` (see HTTPS note below). The SPA HTML entry is `public/base/index.html`.

### AI playbook (fast actions)
- Add API endpoint
  1) Create `api/<group>/<name>.py` from a similar file.
  2) Append `"/<group>/<name>"` to `SUG.SRC`.
  3) Extend `SUG.PAT` and mirror patterns in `public/base/script.tsx::SUG.PAT` if the UI validates.
  4) Return via `response.get()`; use `response.tojson(...)` when returning DB JSON.
- Add frontend module/view
  1) Create `public/content/&<view>/{script.tsx,style.sass}`.
  2) Add import map entry in `public/base/index.html`.
  3) Switch in `public/base/script.tsx::redirect()` for the route.
  4) If needed, add alias to `tsconfig.json` and declaration to `globals.d.ts`.
- Wire UI ↔ API
  - Call `$.curl("<group>/<name>", body)`; for binary, use `$.stream`.
  - Handle auth via `session/validate` and `user/data`.

### HTTPS in dev (important)
- `public/base/script.tsx` hardcodes `https://` in `curl()` and `stream()`. Cookies are set with `secure=True`.
- Use HTTPS locally or a browser profile that ignores self-signed certs:
  - `npm run chromium` launches Chromium with `--ignore-certificate-errors` and an isolated profile.
  - Alternatively serve via a local reverse proxy with TLS.

cURL smoke tests (dev; self-signed cert)
```bash
# 1) Validate session (should be false without Sid cookie)
curl -k -s https://localhost/api/session/validate -X POST -H 'Content-Type: application/json' -d '{}' 

# 2) Mathsys view
curl -k -s https://localhost/api/mathsys/view -X POST -H 'Content-Type: application/json' -d '{"Mcode":"1+1"}'

# 3) Register, then login (Gmail-only pattern)
curl -k -s https://localhost/api/user/register -X POST -H 'Content-Type: application/json' \
  -d '{"Uemail":"testuser01@gmail.com","Uname":"test_user01","Uhashpass":"abcdefgh"}'
curl -k -i https://localhost/api/user/login -X POST -H 'Content-Type: application/json' \
  -d '{"Uname":"test_user01","Uhashpass":"abcdefgh"}' | sed -n 's/^Set-Cookie: \(Sid=[^;]*\).*/\1/p'
```

### Top-level layout
- `API.py`: FastAPI app entrypoint that dynamically includes route modules from `SUG.SRC`
- `__init__.py`: shared imports/utilities for handlers (exports `Request`, `APIRouter`, `JSONResponse`, helpers `debug`, `add`, `º`)
- `api/`: backend route handlers grouped by domain (`mathsys`, `problem`, `session`, `user`)
- `extensions/`: reusable helpers used by handlers (`database`, `response`, `mathsys`, `cryptography`, `binary`, `time`, `random`)
- `public/`: SPA source (TSX modules via import map, SASS, assets, templates)
- `server/`: Nginx and systemd service configs
- `SUG.py`: superglobals (routes list, regex patterns, DB config, constants)

### File watching and build
- `npm run build/tsx` watches and rebuilds TSX to `.js` in-place.
- `npm run build/sass` watches and rebuilds SASS to CSS under `public/**/style.css` (note `.gitignore` excludes built `.css`/`.js`).

### Backend architecture (how routes are wired)
- `API.py` sets `app = FastAPI()` and includes each module in `SUG.SRC`, resolving to files at `SUG.DIR + '/api' + script + '.py'`
- Each route module:
  - Declares `router = APIRouter()`
  - Imports required `website.extensions`
  - In handler: `await <ext>.namespace().init(request)`, validate with `post.checks()` and `post.exists(...)`, then return via `response.get()` or stream via `binary.get()`

Recipe: add a new API endpoint
1. Create `api/<group>/<name>.py` with the standard handler skeleton (copy an existing file like `api/user/login.py`).
2. Add `"/<group>/<name>"` to `SUG.SRC` so it is included at startup.
3. If you introduce new POST fields, extend `SUG.PAT` accordingly and reflect in the frontend’s `SUG.PAT` (in `public/base/script.tsx`).
4. Return JSON via `response.get()` or a stream via `binary.get()`.

### Superglobals (`SUG.py`) essentials
- `SRC`: list of route module paths to include (e.g., `/mathsys/compile`, `/user/login`)
- `DBC`: MariaDB connection params
- `PDR`/`DIR`: filesystem base paths used for dynamic imports (prod: `/srv/www`, `/srv/www/website`)
- `PAT`: validation rules (regex or required-key sets) used by `extensions/post.py`
- `PER`: permission thresholds per domain
- `ERR`: standard HTTPException payloads
- `ACT`: analytics action codes

Notes
- `PDR`/`DIR` are absolute; dynamic imports depend on them. Prefer a symlink for local dev rather than committing changes.
- Cookies are `httponly`, `secure`, `samesite="lax"`; over plain HTTP they won't be set.

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

External Python dependencies of extensions
- `extensions/cryptography.py` → `argon2-cffi` (`import argon2`)
- `extensions/database.py` → `aiomysql`
- `extensions/mathsys.py` → external `mathsys` package (install or vendor as needed)

### API endpoints (current)
- POST `/api/mathsys/validate` — body `{Mcode}`; returns validation result
- POST `/api/mathsys/compile` — body `{Mcode}`; returns WASM stream
- POST `/api/mathsys/view` — body `{Mcode}`; returns KaTeX‑friendly string or `false`
- POST `/api/problem/lookup` — body `{Pid}`; returns row with decoded JSON fields (`Pmeta`, `Pdata*`, `Psolution`)
- POST `/api/session/validate` — no body; returns whether `Sid` cookie is valid
- POST `/api/user/data` — no body; returns current user row; requires session and `Urole >= PER.user.data`
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

Recipe: add a new view
1. Create `public/content/&newview/script.tsx` and `style.sass` (copy an existing view).
2. Add alias to import map in `public/base/index.html` (e.g., `"&newview": "/public/content/&newview/script.js"`).
3. Update SPA router in `public/base/script.tsx::redirect()` to route to your new view.
4. If the view needs app/interface modules, wire them via `$.modulator(...)` and add paths to the import map as needed.

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

Tip: after adding aliases, run both TSX and SASS watchers; the SPA will hot-reload modules from the ESM import map.

### Build & dev commands
- `npm run build/tsx` — transpiles `*.tsx` → `*.js` (Babel presets: env, react with `importSource`="€react", typescript)
- `npm run build/sass` — compiles SASS to CSS under `public/`
- Local API: `uvicorn API:app --reload` (ensure `SUG.DIR`/`SUG.PDR` point to your working path or mirror to `/srv/www/website`)

Manual test flow checklist
- Open `https://localhost` in a browser that accepts your cert (use `npm run chromium` if needed).
- Navigate: `/` (landing) → `/dashboard` → `/playground`.
- In Playground, verify KaTeX output updates as you type and that Run compiles via `/api/mathsys/compile`.
- Open the navbar; if logged out, trigger popup auth; verify `/api/user/register` then `/api/user/login` set the `Sid` cookie.
- Refresh and test `/api/session/validate` and `/api/user/data` via UI.

### Deployment
- Nginx (`server/abscissa.conf`) serves static and proxies `/api/` to `127.0.0.1:8000`
- systemd (`server/abscissa.service`) runs Uvicorn with `--reload` and `WorkingDirectory=/srv/www/website`

Release checklist
- Update `changelog.md`.
- Bump version in `package.json`.
- Ensure DB migrations are reflected in `database/update.sql` (and `setup.sql` for fresh installs).
- Verify import map and `tsconfig.json` paths are in sync.

### Editing guardrails (for AI)
- Follow handler pattern; always return `response.get()` for JSON
- Extend `SUG.PAT` when adding POST fields; keep frontend `SUG.PAT` in sync if UI depends on it
- Don’t log PII; use minimal analytics via `database.analytics`
- Keep DB writes idempotent and explicit
- Keep import map paths stable; if you add a module, add it to `index.html` importmap and `tsconfig.json` paths
- Keep frontend ESM and React importSource `€react` consistent with Babel config

Common pitfalls
- Hardcoded HTTPS in frontend requests: ensure you serve over HTTPS or use a browser that ignores self-signed certs.
- Absolute import paths (`SUG.DIR`/`SUG.PDR`): prefer a symlink during local dev rather than committing path changes.
- Cookies are `secure`; they will not be set over HTTP, which can make auth appear broken in dev.
- Remember to JSON-decode DB JSON columns on responses via `response.tojson(...)` (see `api/problem/lookup.py`).

### Invariants and security
- Always gate compile/view on `mathsys.validate` as done in existing handlers.
- Return JSON through `response.get()`; prefer normalized data (`datetime` → ISO, `bytes` → HEX uppercase).
- Never log PII; `extensions/database.query` logs DB errors via `debug()` only.
- Passwords: only ever handle hashed values on the backend; hashing uses Argon2 (`argon2.PasswordHasher`).
- Sessions: cookie `Sid` is hex uppercase of 32 random bytes; `secure`, `httponly`, `samesite=lax`, one session per user (`Uid` UNIQUE in `SESSIONS`).

### Notes on minor code details
- `extensions/random.py` defines class `_random` (not `namespace`); it appears unused and returns wrong type annotation in `init`. Safe to ignore or align to `namespace` if needed.

### Where to look for things
- API contracts: backend `api/*` and frontend callers in `public/**/script.tsx` using `$.curl`/`$.stream`
- Validation: `SUG.PAT` and frontend `SUG.PAT`
- Session logic: `extensions/database.py` and `navbar`/`popup` flows
- Math rendering: `app/mathsys` using KaTeX and WASM

### License & contributions
- License: see `LICENSE.md` (currently "All rights reserved"). Keep external dependencies' licenses compatible.
- Contributions: follow `README.md` guidelines; work on a branch, update `changelog.md`, and submit a PR.

### Dependencies (Python)
- fastapi
- uvicorn[standard]
- aiomysql
- argon2-cffi (as `import argon2`)
- mathsys (external package used by `extensions/mathsys.py`)

Example install
```bash
python -m venv .venv && source .venv/bin/activate
pip install fastapi "uvicorn[standard]" aiomysql argon2-cffi mathsys
```

### Endpoint → file map
- `/api/mathsys/validate` → `api/mathsys/validate.py`
- `/api/mathsys/compile` → `api/mathsys/compile.py`
- `/api/mathsys/view` → `api/mathsys/view.py`
- `/api/problem/lookup` → `api/problem/lookup.py`
- `/api/session/validate` → `api/session/validate.py`
- `/api/user/data` → `api/user/data.py`
- `/api/user/login` → `api/user/login.py`
- `/api/user/register` → `api/user/register.py`

### Database quick reference
- Tables: `USERS`, `SESSIONS`, `PROBLEMS`, `CONCEPTS`, `RESOURCES`, `COMPLETED`, `ANALYTICS`, `ORGANISATIONS`.
- Important columns
  - `USERS(Uid, Uname, Uemail, Uhashpass, Ujoined, Usettings(json), Oid, Urole)`
  - `SESSIONS(Sid(bytes32), Uid UNIQUE, Sip, Sexpires)`
  - `PROBLEMS(Pid(bytes4), Uid, Kid, Pedited, Pmeta(json), Psolution(json), Pdataen/json, Pdataes/json, Pdatade/json)`
- JSON decode on responses: use `response.tojson("Pmeta","Pdataen","Pdataes","Pdatade","Psolution")`.

### Validation rules quick view (from `SUG.PAT`)
- Sets (object must contain keys): `Cprocess{content,duration}`, `Pmeta{calculator,postResult,preResult}`, `Psolution{numericalResult,result}`, and language blocks `Pdataen/es/de{editor,instructions,svg}`.
- Regex highlights
  - `Pid`: `^[A-F0-9]{8}$` (front: hex string uppercase)
  - `Uemail`: Gmail only `^[A-Za-z0-9._%-]{8,64}@gmail\.com$`
  - `Uname`: `^[a-zA-Z0-9_-]{4,32}$`
  - `Uhashpass`: `^.{8,64}$`
  - `Mcode`: `[
\s\S]*` (any text)

### Dev symlink helper (keep `SUG.DIR` absolute without editing repo)
```bash
sudo mkdir -p /srv/www
sudo ln -s "$(pwd)" /srv/www/website || true
```

### Troubleshooting
- Auth appears broken in dev: ensure HTTPS; cookies are `secure=True` and won’t set over HTTP. Use `npm run chromium` or a TLS proxy.
- `ModuleNotFoundError` for `mathsys`: install the external `mathsys` package or vendor it locally.
- Dynamic import failure on startup: check that `/srv/www/website/api/...` exists or adjust the symlink.
- DB returns strings for JSON fields: remember to call `response.tojson(...)` before returning.
