# Hand-off: starting Miami Dice

Written 2026-11-16. The roguelite run, the dice bag and duels outgrew Farkle Table (classic multiplayer Farkle in one HTML file), so they get their own repository and their own game: **Miami Dice** (named by the owner, 2026-11-16; repository `miami-dice`). This folder began as `roguelite-kit/` inside `drolemag21/Farkle`; its contents become the new repository's root.

## Where it stands
- **Design:** `DESIGN.md` holds every decision so far, the open questions, and the step-1 content set (six boss house rules, 12 charms, the Dutch case file, placeholder numbers), which the owner agreed to start with. **Nothing is built.**
- **Engine:** Farkle Table's physics, dice renderer, sound and look are the starting point. `ENGINE.md` lists what to take, adapt or leave from its `farkle-table.html`, pinned to one commit, and the invariants that keep the physics deterministic.
- **Tuning tool:** `tools/sim.js` simulates tables under each house rule with plain dice (`node tools/sim.js [turns] [rerolls] [tables]`). The figures in `DESIGN.md` came from it.
- **Name:** Miami Dice. "Farkle Showdown", an earlier separate single-player roguelite of the owner's, is unrelated and shares no code.

## What's here
| File | What it is |
|---|---|
| `DESIGN.md` | The game design: run, extraction, dice layers, collection, duels, seasons, step-1 content |
| `ENGINE.md` | What comes from Farkle Table, from where (pinned commit), and the invariants |
| `CLAUDE.md` | Instructions Claude loads automatically: how the owner works, architecture, testing |
| `README.md` | Short public description |
| `tools/sim.js` | Table simulator for tuning targets and house rules |
| `tests/serve.js` | Local static server (wraps skeleton-less pages like the Artifact publisher; serves ES modules) |
| `.claude/launch.json` | Local server for the browser pane (:8765) |

## Bootstrapping the repository (owner, once)
1. Create an empty GitHub repository, `miami-dice`, and clone it next to a clone of `drolemag21/Farkle`.
2. Copy the kit and the engine reference in, then commit:
   ```sh
   cp -r Farkle/roguelite-kit/. miami-dice/
   mkdir -p miami-dice/reference
   git -C Farkle show 62cdc2b7ae191d27a386bdbcca8ce0877dab5e8c:farkle-table.html > miami-dice/reference/farkle-table.html
   cd miami-dice && git add -A && git commit -m "Start from Farkle Table's roguelite kit" && git push
   ```
3. Give the Claude GitHub App access to the new repository, so cloud sessions can push to it.
4. Back in Farkle Table: delete `roguelite-kit/` and point its `CLAUDE.md` / `HANDOFF.md` at the new repository (a Claude session there can do this; ask it to).

## First session in the new repository
Start with: "Read HANDOFF.md, CLAUDE.md, DESIGN.md and ENGINE.md." Then, in order:
1. **Check multi-file publishing** (half an hour, before any real code): publish a two-file page (`index.html` importing `src/hello.js` as an ES module) as an Artifact with `files`, and open it through `tests/serve.js`. If either fails, fall back to a small build script that inlines the modules into one HTML file (the way Farkle Table's `tools/build-site.js` writes `docs/`), and update the Architecture section.
2. **Rules module:** `src/rules/scoring.js` with the breakdown and "any legal keep", plus `tests/` proving that with no rules and no charms it gives exactly the classic totals. Point `tools/sim.js` at it instead of its own copy.
3. **Engine split:** physics, renderer and sound from `reference/farkle-table.html` into `src/engine/`. Done when a plain turn plays on the table at 375 px with sound.
4. **Run reducer:** seeded RNG, `step(state, action)`, action log, save/resume. Then tables, antes, bosses, shop and charms from the step-1 content set.

## Architecture (recommended, confirm in the first session)
Farkle Table is one HTML file because Artifacts used to need one. This game will be several times larger, and its rules must run outside the browser (the simulator, tests, and later a Supabase Edge Function that replays a run to verify it: `DESIGN.md` section 8). So: **native ES modules, no bundler, no npm dependencies.**

```
index.html        markup + CSS tokens; loads src/main.js as a module
src/engine/       physics.js, render.js, sound.js, scene.js   (from Farkle Table)
src/rules/        scoring.js, hooks.js, bosses.js, charms.js   (pure: no DOM, runs in Node and Deno)
src/run/          rng.js, reducer.js, save.js                  (the run: seed + action log)
src/ui/           screens, sheets, input
tools/sim.js      tuning simulator (imports src/rules)
tests/            node:test unit tests for rules and reducer; serve.js
reference/        farkle-table.html at the pinned commit (read-only, never served)
```

- **The run is a pure reducer**, `step(state, action) → { state, events }`, deterministic from the seed. The UI sends actions and plays events, as Farkle Table's clients do with the host. One code path then gives save/resume, the simulator, tests, server verification and (later) the duel host.
- **Rules and charms share one hook set** (`DESIGN.md` → What a house rule can change).

## Publishing
- **Claude Artifact:** publish `index.html` with the Artifact tool, listing the other files in `files`. Republishing the same file path in the same conversation keeps the link; from a new conversation pass the recorded link as `url`. Record links in `NOTES.md` once it exists. The solo run needs no `room` capability; duels between real players will.
- **GitHub Pages:** serve from `/` on `main` while there's no build step. Duels will need the Supabase config injected the way Farkle Table's `tools/build-site.js` does it.
- **Supabase:** nothing until real-player duels. Then decide between Farkle Table's project (`https://shmufgduaylmqyqajbgj.supabase.co`) and a new one; a new one is cleaner once Edge Functions and database rules for run verification arrive. Only ever commit a publishable key (`sb_publishable_...`), never a secret or service_role key.

## Not decided yet
Beyond `DESIGN.md` → Open questions:
- Whether players reach this game from Farkle Table (a link on its home screen) or it stands alone.
