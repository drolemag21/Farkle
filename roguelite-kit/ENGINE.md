# Engine: what comes from Farkle Table

This game starts from Farkle Table's engine, copied rather than shared. Farkle Table keeps classic multiplayer Farkle; this repository adds the roguelite run, the bag and duels around a copy of its physics, dice renderer, sound and look.

**Source, pinned:** `drolemag21/Farkle` at commit `62cdc2b7ae191d27a386bdbcca8ce0877dab5e8c` (2026-11-16), file `farkle-table.html` (3,568 lines). Line numbers below refer to that commit. That repository's `NOTES.md` at the same commit explains each system in depth: read it there rather than copying it here.

- Keep an untouched copy at `reference/farkle-table.html` (see `HANDOFF.md` → First session). It's for reading and diffing only: never served, never edited.
- **Fixes don't flow between the repositories.** When Farkle Table fixes something in the physics, renderer or sound, diff its `farkle-table.html` against `reference/`, port what applies, then update `reference/` and the pinned commit above.

## Invariants (break these and things go wrong quietly)
- **Deterministic physics:** `simulate` uses only + - * / and `Math.sqrt`, at a fixed 120 Hz step, so every browser replays an identical throw. Never add `Math.sin`, `Math.pow`, `**` or anything else to the step. `THROW` (throw strength) changes every roll.
- **Value first, then the throw:** the game decides each die's value, then `makeLaunch(seed, n)` and `simulate` produce a path whose tumble lands the die on that value. Custom faces (stamps) don't touch physics: the run picks a face index, the die lands on it, the renderer draws that face's contents.
- **Seeded randomness in runs:** Farkle Table rolls values with `crypto` (`rollDie`, `rand32`). Runs must use a seeded RNG (`mulberry32` is already there) so the seed + action log replays a run exactly (save/resume, later server verification). Keep `crypto` only for ids.
- **One writer:** in Farkle Table the host is the only writer of game state and clients render snapshots; anything from another browser goes through `cleanState`. Here the run reducer is the writer (see `DESIGN.md` section 9); duels bring the host and `cleanState` back, and every new shared field must be added to it.
- **Sound needs a gesture:** browsers allow no audio before a tap (`unlockAudio`). Keep a tap-to-start splash or equivalent.
- **Pages without a doctype:** the Artifact publisher wraps a page in a skeleton; the build for hosting adds the doctype, viewport and a `[hidden]{display:none!important}` rule. Several panels set `display: flex` and ignore `hidden` without that rule.

## Inventory by section of `farkle-table.html`
**Take** = copy with little change. **Adapt** = copy, then change as noted. **Later** = needed for duels (build step 3), not for the solo run. **Leave** = classic-only.

| Lines | Section | Verdict | Notes |
|---|---|---|---|
| 6-525 | CSS (`:root` tokens, panels, buttons, sheets, game screen, title scene) | Take | The casino-at-night theme. Drop the lobby, rules-picker and holiday rules when you reach them |
| 526-776 | Markup (screens, sheets, the table canvas) | Adapt | Keep the game screen, sheets and splash; the lobby and rules sheet are classic-only |
| 803-835 | 1. Small helpers (`fmt`, `clamp`, `el`, `mulberry32`, `toast`, `load`/`save`, `loadScript`) | Take | `rollDie` / `rand32` use `crypto`: runs use the seeded RNG instead |
| 836-875 | 2. Constants (`DICE_COLORS`, glide timings, `CLASSIC`, `cleanRules`, `onBoard`) | Adapt | Keep colours (not the holiday ones: `DESIGN.md` section 7) and glide timings; leave `CLASSIC` / `cleanRules` / `onBoard` (opening score, three-Farkle penalty) |
| 876-909 | 3. Scoring (`counts`, `kind`, `best`, `scoreOf`, `hasScore`) | Adapt | Becomes the rule-aware scorer returning a breakdown. `hasScore` becomes "any legal keep" (`DESIGN.md` → What a house rule can change). Test: no rules + no charms = classic totals |
| 910-1031 | 4. Physics (`makeLaunch`, `simulate`, `simFor`, `W`/`H`, `THROW`) | Take | Unchanged. `makeLaunch(seed, n)` already takes a dice count |
| 1032-1111 | 5. 3D maths for the renderer (`CAM`, `proj`, `BOUNDS`, `DIE_PATCHES`, `TRAY_Y`) | Take | Display only |
| 1112-1136 | 6. Session state (`S`) | Leave | Room-oriented; the run has its own state |
| 1137-1292 | 7. Transports (`RoomNet`, `SupaNet`, `TabsNet`, `SoloNet`, `pickNet`) | Later | Real-player duels. `RoomNet` has a 4 KiB presence cap: bags must fit |
| 1293-1462 | 8. Messages (`applyHost`, `cleanState`, `playEvent`, `glideToTray`) | Adapt / Later | `playEvent` + `glideToTray` (turning events into effects) are needed now; the rest for duels |
| 1463-1731 | 9. Host (`hostKeep`, `hostRoll`, `hostFarkle`, `hostBank`, `passTurn`, bots) | Adapt | The turn logic moves into the run reducer. Bot strategy (`botKeep`, `botBanks`, `BOT_POT`, `BOT_BANK`) is reused by `tools/sim.js` and duel bots. Presence, host takeover: Later |
| 1732-1763 | 10. Player actions (`toggleDie`, `canAct`, `act`) | Adapt | Same tap-to-pick, Keep, Roll, Bank flow; actions go to the reducer |
| 1764-1815 | 11. Rooms | Later | |
| 1816-2262 | 12a. Sound (`SND`, all synthesized) | Take | `SND.measure(part)` compares levels in tests |
| 2263-2700 | 12. Table renderer (`drawDie`, `poses`, `dieTop`, `hotFlair`, flames, `bankFlare`, `resize`) | Adapt | `drawDie` must draw face contents (stamps), material finish and edition shine (`DESIGN.md` section 7: gameplay owns the die's surface). Hot dice, the tray and the handful assume six dice: generalise for Short Hand. Holiday decorations: Leave |
| 2701-2926 | 12b. Title scene (circling camera, splash) | Take | Optional, but the splash is also the audio-unlock tap |
| 2927-3314 | 13. Screens | Adapt | Reuse the patterns (`openSheet`/`closeSheets`, `banner`, `floatText`, `renderTurn`); the screens themselves are new (run map, shop, locker) |
| 3315-3362 | 13b. Holiday look | Leave | Could come back later as a cosmetic |
| 3363-3420 | 14. Settings | Adapt | Sound and music switches; add Fast dice (`DESIGN.md` section 1) |
| 3421-3568 | 15. Wiring | Leave | Rewrite for this game |

## Other files worth copying
- `tools/build-site.js`: how the hosted copy gets its head and config. Copy it when GitHub Pages needs the Supabase config (duels); the solo run needs no network.
- `tests/serve.js`: already adapted here (serves `.js` as JavaScript so ES modules load).
- Farkle Table's `CLAUDE.md` → Testing: the browser-pane rules are already in this repository's `CLAUDE.md`.
