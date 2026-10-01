# Dhinova Daily Blog — n8n workflow

Daily auto-blog: **Keyword Agent** → research → long human blog → Unsplash (no repeats) → GitHub → auto deploy.

## Flow

```
Daily 09:00 IST
  → Pick business niche (why app / SME / industry)
  → Load existing blogs (titles, tags, used images)
  → FreeLLM /v1/models → Auto Pick Models
  → Keyword Agent (FreeLLM)  ★ dedicated
       • business “app keno joruri” intent
       • low-competition long-tail (4–8 words)
       • real Google-style phrasing
  → DuckDuckGo research on primaryKeyword
  → Blog writer (1500–2000 words, internal links)
  → Unsplash (skip used photo ids)
  → Commit blogs.json on main
  → GitHub Actions deploy
```

## Which model (auto)

Uses FreeLLMAPI **router modes** (not one pinned model — pinning caused `1–2 routes checked` 429s):

| Job | Model | Why |
|---|---|---|
| Keyword Agent | `auto:fast` | Fast JSON |
| Keyword fallback | `auto` | Broader chain |
| Blog | `glm-4.7-flash` + `max_tokens: 8192` | High quota; Gemini often 429 after keyword |
| Blog fallback | `gemma-4-26b` (fail-fast, no 3× hammer) | Different provider on 429 |
| Before blog | **Wait 3 minutes** | Let FreeLLM cooldowns clear |
| Short draft (&lt;1200 words) | **Expand Short Blog** → Final gate | Turns ~800–900 word drafts into 1500+ |

Also: short wait before keyword, **3 min wait** before blog, on 429 another **3 min** then Gemma fallback.

n8n-er “batching under Options” message **ignore** — 1 item workflow e batching lagbe na. Problem FreeLLM upstream rate limit.

**Permanent fix (FreeLLM dashboard):**
1. Clear all cooldowns
2. Add **extra provider API keys** (error often says models skipped = no keys)
3. Don’t spam Execute while testing

If you still see `All models exhausted`, wait ~2 min or add another FreeLLM API key in the dashboard.

## Keyword Agent rules

| Focus | Example style |
|---|---|
| Business need | why clinics need a patient app |
| Low competition | long-tail, niche + intent |
| Searchable | how owners actually type queries |
| Avoid | bare `app development`, `android app` as primary |

Platform rotation: iOS / Android / mobile / web.

## Credentials (n8n)

1. **FreeLLMAPI** — Header `Authorization: Bearer KEY` (used by Keyword Agent + Blog writer)
2. **Unsplash** — Header `Authorization: Client-ID KEY`
3. **GitHub PAT** — Header `Authorization: Bearer ghp_...` (Contents write on `Tulsipada/dhinova.com`)

## Import

1. n8n → Import `dhinova-daily-blog.workflow.json`
2. Re-select credentials on HTTP nodes
3. Execute once → Done shows routed `keywordModel` / `blogModel`
4. Check GitHub commit + Actions
5. Activate

## Quality gates

- Keyword must be long-tail (3+ words), not banned head terms
- Blog ≥ ~1200 words (target 1500–2000)
- ≥ 3 internal `dhinova.com` links
- Primary keyword reflected in title/intro
- Unsplash image not already in `blogs.json`
- Optional fields saved: `primaryKeyword`, `secondaryKeywords`
