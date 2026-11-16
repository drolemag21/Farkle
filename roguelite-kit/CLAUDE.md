# Miami Dice

A single-player Farkle roguelite (Balatro-style runs, a vice-detective premise) feeding a dice bag you risk in duels. Built on a copy of Farkle Table's dice engine.

## Read first
- `HANDOFF.md`: where the project stands, how the repository was bootstrapped, architecture, publishing.
- `DESIGN.md`: the game design, decisions, open questions, and the step-1 content set. Settle an open question there before building the part it touches, and record decisions there with the date.
- `ENGINE.md`: what came from Farkle Table (pinned commit), and the invariants.
- `NOTES.md` (create it with the first code): how the code is organized, function names, links. Keep it current when you change a system.

## Working with the owner
- Bring up design and structural suggestions on your own when they'd pay off. Keep them brief, explain the payoff, and propose rather than silently doing big refactors.
- Discuss design before building when the owner is exploring ideas; build when they say go. They often ask for a plan or options first.
- Explain trade-offs with a recommendation, not an exhaustive survey.
- Ask one question at a time.
- The owner tests on phones: keep everything usable at 375 px wide.

## Code conventions
- Native ES modules, no bundler, no npm dependencies (`HANDOFF.md` → Architecture). `src/rules/` and `src/run/` never touch the DOM: they must run in Node for tests and the simulator.
- The run reducer is the only writer of run state. Every random draw comes from the run's seeded RNG, never `Math.random` or `crypto`, so the seed plus the action log replays a run exactly.
- The dice physics must stay deterministic across browsers: only + - * / and sqrt in `simulate` (`ENGINE.md` → Invariants).
- One theme: a casino table at night. CSS tokens on `:root`.
- Comments explain why, not what. Match the surrounding comment density and naming.

## Testing
- Unit tests: `node --test tests/`. With no rules and no charms, scoring must equal classic Farkle exactly.
- Tuning: `node tools/sim.js [turns] [rerolls] [tables]`.
- Browser: `node tests/serve.js` (or the `game` server in `.claude/launch.json`), open `/index.html`.
- Close old game tabs and test in fresh ones; leftover timers corrupt results.
- On localhost, expose a `window.__game` handle (state, actions, sound) for scripted tests, as Farkle Table does with `window.__farkle`.
- A hidden browser pane delivers no real clicks and may not draw frames: drive tests with `.click()` from JavaScript and don't wait on animation-frame-only state.
- Synthesized sound can't be heard here. Check that it plays without errors and compare levels with `SND.measure(part)`.
- Verify a change in the browser before publishing, and say plainly what was and wasn't covered.
