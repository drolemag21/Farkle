# Hand-off: Farkle Table

Written 2026-11-06, when the project moved into its own folder and GitHub repository so another Claude account can continue it.

## Where it stands
Classic Farkle for 2-4 players online, host-authoritative, with deterministic 3D dice physics that every screen replays identically. Lobby with 4-digit room codes, ready-up, host migration, reconnect after reload, synthesized jazz-lounge music and table sounds. Most recent additions: six dice colours per player, a crown on the leader's card, set-aside dice gliding into the tray before each throw, applause / farkle / your-turn sounds, an optional "music during games" toggle, a name-length hint, and the Supabase publishable key.

It runs in two places, from one source file:
| Where | Network | Who can play |
|---|---|---|
| Claude Artifact (`farkle-table.html`, capabilities `{"room": {}}`) | Claude room | People signed in to claude.ai with access to the artifact |
| GitHub Pages (`docs/index.html`, built from the same file) | Supabase Realtime | Anyone with the link |

The Artifact can't use Supabase: Claude Artifacts block outside connections.

## What's in this repository
| File | What it is |
|---|---|
| `farkle-table.html` | The game, and the only source file |
| `docs/index.html`, `docs/.nojekyll` | **Generated** GitHub Pages copy. Rebuild, don't edit |
| `tools/build-site.js` | Builds `docs/` from `farkle-table.html` + `site.config.json` |
| `site.config.json` | Supabase project URL and publishable key (public by design) |
| `tests/serve.js` | Tiny local static server for testing in the browser pane |
| `.claude/launch.json` | Local servers: `farkle-table` (:8765) and `farkle-site` (:8766) |
| `CLAUDE.md` | Instructions Claude loads automatically: how the owner works, publishing, testing, conventions |
| `NOTES.md` | How the code is organized, and the links |
| `README.md` | Short public description for the GitHub page |
| `HANDOFF.md` | This file |

## Putting it on GitHub (one time)
1. Create a repository on GitHub. For GitHub Pages on a free account it must be **public**; everything committed is visible, which is fine for this code and the publishable key.
2. From this `Farkle` folder: `git init`, `git add .`, `git commit -m "Initial commit"`, add the GitHub remote, push to `main`.
3. On GitHub: **Settings → Pages → Build and deployment → Deploy from a branch**, branch `main`, folder `/docs`, Save. After about a minute the game is at `https://<user>.github.io/<repo>/`.
4. Record that link in `NOTES.md`.

## Supabase (already set up)
- Project URL `https://shmufgduaylmqyqajbgj.supabase.co`, publishable key in `site.config.json`. The dashboard login belongs to the owner.
- Recommended settings (confirm in the dashboard; whatever was chosen at creation passed the 2026-11-06 test): Data API **off**, automatically expose new tables **off**, automatic RLS **on**. The game uses no tables, only Realtime Broadcast and Presence on public channels, so **Realtime → Settings** must keep public channel access allowed. Nothing under Realtime → Policies is needed.
- Free projects pause after about a week without use; the hosted game then says it can't reach Supabase. Restore the project from the dashboard.
- Verified 2026-11-06: two tabs of the built copy, served locally, played a full round over this project with the publishable key (supabase-js 2.118.0). Connections without a signed-in user last 24 hours, far longer than a game.

## First steps on a new account or machine
1. Clone the repository and open it as the project in Claude Code.
2. Start the session with: "Read HANDOFF.md, CLAUDE.md and NOTES.md."
3. To keep a Claude Artifact version, publish `farkle-table.html` with capabilities `{room: {}}`. A new account can't update the old link, so this makes a new one; record it in `NOTES.md`. (The GitHub Pages version doesn't depend on any Claude account.)
4. Check the hosted copy: start `farkle-site` from `.claude/launch.json`, open `/index.html` in two tabs, create a room in one and join from the other.

## Shipping a change
1. Edit `farkle-table.html` and test it (see `CLAUDE.md` → Testing).
2. `node tools/build-site.js`, then test `docs/` with the `farkle-site` server if the change touches networking or layout.
3. Republish the Artifact if you keep one.
4. Commit and push: GitHub Pages redeploys `docs/` automatically.

## Unverified or worth watching
- The newest sounds (applause, farkle horn, turn chime) were level-checked offline but never heard by Claude; the owner should judge them by ear.
- The GitHub Pages deployment itself hasn't been opened yet, and no game has been played on real phones over Supabase.

## Good next steps
- Play a real game on the GitHub Pages link with friends on phones, and collect feedback.
