# Roguelite mode: design

Status: **design only, nothing built.** Decisions below were agreed with the owner (2026-11-16). Open questions are listed at the end; settle them here before building the part they touch.

Main influence: Balatro. Rule of thumb: reuse the existing table (physics, dice art, turn flow, host path, sound, sheets) and add the mode as its own bounded section of `farkle-table.html`.

## The idea in one line
Play a solo roguelite run, extract after a boss to open a pack and keep one altered die, then risk your dice against friends in multiplayer duels.

The whole game is one choice repeated at three levels:

| Level | Push on | Cash out |
|---|---|---|
| Turn | Roll again | Bank |
| Run | Fight the next boss | Extract, open a pack |
| Duel | Keep the streak, grow the pot | Cash the pot into dust |

## 1. The run (solo)
- **Structure:** 8 antes × (small blind, big blind, boss) = 24 tables, Balatro's full shape. Roughly 40-50 min, so save/resume is required.
- **Table (blind):** bank a target score within a set number of turns. Turns are Balatro's hands.
- **Rerolls:** a limited per-table currency to reroll chosen dice without keeping (Balatro's discards). The main tool the player has against Farkle's randomness.
- **Scoring:** every keep scores **points × mult**. The count-up belongs at the Keep moment.
- **Combo levels:** the planet-card equivalent: level up a combo (three 2s, a straight, ...) to raise its base points.
- **Charms:** Balatro's jokers. 5 slots, passive rule-benders. Favour ones that bend the push-your-luck tension (e.g. Hot Hand: ×2 mult after hot dice; Insurance: first Farkle at each table keeps half the turn; Miser: +1 mult per die left unrolled on a bank).
- **Your six dice are the deck:** altered during the run with the four layers in section 3.
- **Bosses are house rules:** e.g. 1s don't score, play with 5 dice, must keep 2+ dice per roll, a Farkle costs a turn.
- **Shop** between tables: charms, dice upgrades, combo levels, rerolls. Money comes from leftover turns plus interest.
- **Skip blinds** (small or big) for a reward, as in Balatro: shortens the run for confident players.
- **Fast dice** setting: plays the same simulated throw back faster and shortens the keep glide. Same result, less waiting.
- **Losing the run before extracting: you leave with nothing.**

## 2. Extraction and packs
- After **each boss** (8 chances) the player may **extract**: the run ends and they open a pack.
- The pack shows **3 random dice; keep 1.** Rarity improves with depth: extract early for a weak pack, push on for a better one.
- Pack dice are random; they are not copies of the dice built during the run. The run's build decides how deep you get.

## 3. Dice: four layers
| Layer | What it does | Examples |
|---|---|---|
| **Face stamps** | Change single faces, and so the die's odds | Face becomes a 5, wild, ×2 mult, +$1 |
| **Material** (tiers I, II, III) | Whole-die behaviour, same tier pattern for every material | Glass: ×1.5 / ×2 / ×3 points, shatters on a Farkle 1 in 3 / 4 / 6. Gold: $1 / $2 / $4 when kept. Steel, Lead (biased) |
| **Edition** | The rare shine plus a small bonus | Foil: +50 when it scores. Holographic: +1 mult |
| **Trigger** | A build-around event effect (reuses the charm event system) | Earn $3 when part of hot dice. Can't Farkle if it's the last die |

**Rarities** (six):

| Rarity | Stamps | Material | Edition | Trigger | Durability (times it can change hands) |
|---|---|---|---|---|---|
| Common | 1 | none | none | none | 5 |
| Uncommon | 2 | I | none | none | 4 |
| Rare | 3 | I | possible | none | 3 |
| Epic | 4 | II | possible | possible | 3 |
| Legendary | 5 | II | likely | 1 | 2 |
| Ultra | 6 | III | always | 1 | 2 |

**Power budget:** stamps aren't equal ("counts as a 1" is far stronger than "+$1"), so each stamp has a cost and each rarity a budget as well as a slot count. Packs roll within the budget; an Ultra always has some cheap stamps. The host later uses the same budget to reject tampered dice.

**Not doing: polyhedral dice (d4, d8, d10, d20).** The physics treats dice as cubes and lands them through the tumble path; `drawDie` builds a cube; Farkle scoring assumes 1-6. Each shape would need new collision code (still deterministic), landing logic, art and its own scoring rules. Face stamps already make d6s that behave like different dice (1,1,5,5,5,5 never Farkles alone).

## 4. Collection
- The bag: the dice you own, kept per device in localStorage for v1. Dice earned on the Artifact and on GitHub Pages are separate; the UI should say so.
- **Dust** is the only second currency. Sources: breaking unwanted dice, crumbled dice, cashed-out streak pots. Spent on rerolling or upgrading faces.

## 5. The duel (multiplayer)
- **Format:** best of 3 rounds; each round both players get 3 turns, most points wins; a tie is one sudden-death turn each.
- **Relics:** each round presents a shared relic both players play under (it can bend the round's rules, e.g. last turn scores double).
- **Before Start:** both bags and both streak pots are shown, and both players accept. Nobody gets ambushed.
- **Stakes:** the **winner picks one die from the loser's whole bag.** That's the risk of bringing your dice, and the zero-to-hero payoff.
- **Streak pot:** each win adds game-created dust to the winner's own pot, scaled by the **opponent's** bag strength (beating a Common bag adds almost nothing; beating a strong bag adds a lot). The pot is at risk: losing a match hands it to the winner. Cash out any time into dust, which resets it. This is what the strong player plays for, and every match against them is a jackpot for the underdog.
- **Durability:** a die loses 1 durability each time it changes hands (table above). At 0 it **crumbles into dust for the winner**, scaled by rarity. Big dice leave circulation fastest; new Ultras only come from runs. A fresh Ultra can be stolen once; the next time it's lost it crumbles.
- The economy only moves between people who play each other; in a friend group the same dice will change hands.

## 6. Cheating and storage
- **v1: no verification.** Dice live in the player's browser and can be hand-edited.
- **Host check now:** the host rejects any die over its rarity's budget (cheap, in `cleanState`).
- **Designed for later verification:** run dice come from a **seeded RNG** (not `crypto`), and every run action goes through one **action log**. Later, the server hands out the seed, the client sends the log, and a Supabase Edge Function replays it with the same scoring code before granting the pack. That needs accounts (anonymous auth at minimum), a server copy of the scoring and charm logic, and database rules. The seed + log also give save/resume for free.

## 7. Code plan
- **Reused as is:** `makeLaunch` / `simulate` and the dice renderer, the turn stages (`pre → rolled → kept → banked/farkle`), `SoloNet` and the host path the bots use, `FIRE` / `hotFlair`, `SND`, sheets, the phone layout.
- **Custom faces don't touch physics:** the host picks a face index, the die lands on it, and the renderer draws that face's contents. Determinism is unaffected.
- **Refactor:** `scoreOf` returns one number from `best(counts)`; charms and mult need a **breakdown** (which combos, base points each). Classic scoring must stay exactly the same.
- **Multiplayer:** each roller's dice faces ride in the snapshot (`player.bag` or similar), switched per roller the way `BODY` colour is today; add the field to `cleanState`.
- **Six is hard-coded** in a few places (hot dice, the tray). Fine while every bag is six dice.
- Keep the single file (publishing needs it), but put the mode in its own clearly bounded section with its own `NOTES.md` entry.

## 8. Build order
1. Solo roguelite with extraction (seeded RNG, action log, save/resume from day one). Must be fun on its own.
2. The bag screen and packs.
3. The duel.

## Open questions
- Stamp list and costs; per-rarity budgets.
- Materials list and their tier values; editions list; triggers list.
- Charm list; house-rule (boss) list; relic list.
- Table targets, turns and rerolls per ante; money and interest; shop prices.
- Pack rarity odds per extraction depth.
- Dust values (breaking, crumbling, pot growth) and dust costs.
- Duel bag rules: a points cap by rarity, or open bags? Decide after simulating bot duels (e.g. Ultra bag vs Common bag win rates).
- Duel player count: strictly 2, or 3-4 using the existing rooms?
- What's in the shop's reroll vs the table's reroll (one currency or two)?
