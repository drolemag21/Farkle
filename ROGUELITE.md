# Roguelite mode: design

Status: **design only, nothing built.** Decisions below were agreed with the owner (2026-11-16). Open questions are listed at the end; settle them here before building the part they touch.

Main influences: Balatro (the run), extraction shooters (bring gear in, lose it if you die; seasonal wipes). Rule of thumb: reuse the existing table (physics, dice art, turn flow, host path, sound, sheets) and add the mode as its own bounded section of `farkle-table.html`.

## The idea in one line
Play a solo roguelite run, extract after a boss to open a pack and keep one altered die, then risk your dice against friends in multiplayer duels. Duels feed back into runs: dice you win can be carried into a run, and duels unlock the season's workshop, which makes runs stronger.

The whole game is one choice repeated at three levels:

| Level | Push on | Cash out |
|---|---|---|
| Turn | Roll again | Bank |
| Run | Fight the next boss | Extract, open a pack |
| Duel | Keep the streak, grow the pot | Cash the pot into dust |

**The loop:** run → pack → bag → duel → (dice won, dust, workshop milestones, relic unlocks) → next run. The duel → run half is the point: duels must be strongly worth playing for what they give solo runs, for winners and losers alike. A season wipe (section 6) bounds the snowball that strong rewards would otherwise cause.

## Premise
Agreed with the owner (2026-11-16). **You're a gray vice detective** in a city run on backroom dice games. You take down dens, and to get deeper you break the rules: pocketing seized dice, working cases with evidence that should be locked up, and gambling it with other detectives after hours. Grounded in real police corruption around gambling (the Lexow and Seabury inquiries; the Knapp Commission's "grass-eaters and meat-eaters", NYC 1970-72). It fits the casino-at-night theme, so no new art direction.

**A premise, not a story.** Like Balatro: no cutscenes or narrative arc. The fiction lives in boss names and house rules, extraction and pack wording, lineage text and titles.

| Mechanic | In the fiction |
|---|---|
| Run | Working a case up an organisation: street games → backroom dens → the people who run them → the kingpin (ante 8) |
| Table / boss house rules | A den's game; the boss is its owner, and the house rule is how that den rigs things. You play it straight to stay undercover |
| Extract | Call the raid. Early is a small bust, deep is chasing the kingpin |
| Pack (3 dice, keep 1) | Seized dice go to evidence; you pocket one |
| Lose the run | Your cover is blown and you leave with nothing |
| Carry slot | Taking evidence out of the locker to work a case with it. **This is the "gray" part**, see the carry slot open question |
| Heat | Using evidence draws attention: dens are warier, targets rise |
| Carried die lost | The evidence goes missing on your watch |
| Carried die extracted altered | It comes back "processed"; nobody asks |
| Duels | The after-hours locker-room game. Each detective is building their own case and needs particular tools, so evidence moves between them this way. Unofficial and competitive, and everyone involved knows it's wrong |
| Durability / crumbling | A die that's been through too many hands is "hot", too recognisable to keep, so it's destroyed |
| Season wipe | Internal Affairs audits the precinct; everything is confiscated |
| Trophy case | What you hid well enough to keep |
| Workshop | Your contacts inside the department (Vault: people in records who look the other way; Forge: covering your tracks) |
| Dust | Open: needs an in-world name (cash? favours?) |

**Keep the "takes down dens" half visible**, or players read the character as plain corrupt rather than gray: a city map where beaten dens are marked closed, a "Case closed" stamp on extraction, the season's kingpin named at the top of the workshop track. These are copy and small screens, not story systems.

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
- **Losing the run before extracting: you leave with nothing**, and a carried die is lost (below).
- **Carry slot (proposed, undecided):** at run start, pick one bag die (more with the workshop's Vault) to replace one of the six starting dice. During the run it can be altered like any die, **up to its rarity's power budget**; a rarity upgrade can be a rare boss reward. **Extract:** it comes home changed, on top of the pack pick. **Lose the run:** it's gone (open: lost outright, or crumbles into dust). This is the extraction-shooter risk, and how a die won in a duel seeds a run.
- **Heat (only with the carry slot):** each carried die raises table targets by its rarity (about +8% per tier, to tune). A carried die shapes the build rather than being free power, and stops Ultra → deep runs → better packs from snowballing.
- **Stakes** (Balatro's): higher stakes mean harder tables and better packs. As the workshop makes runs easier over a season, players step up a stake on their own, so runs stay tense.

## 2. Extraction and packs
- After **each boss** (8 chances) the player may **extract**: the run ends and they open a pack.
- The pack shows **3 random dice; keep 1.** Rarity improves with depth: extract early for a weak pack, push on for a better one.
- Pack dice are random; they are not copies of the dice built during the run. The run's build decides how deep you get. If the carry slot is adopted, a carried die is the one exception: it comes home with what the run did to it, because it was at risk.

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
- The bag: the dice you own, kept per device in localStorage for v1. Dice earned on the Artifact and on GitHub Pages are separate; the UI should say so. The bag belongs to the current season (section 6).
- **Lineage:** every die records its history: where it came from (run, pack, duel), who it was taken from and when ("Taken from Ana, 16 Nov"). Nearly free to build and the strongest emotional hook in the design.
- **Dust** is the only second currency. Sources: breaking unwanted dice, crumbled dice, cashed-out streak pots, duel spoils (both players). Spent on rerolling or upgrading faces, pack upgrades (see 4 dice instead of 3, or one rarity tier better at the next extraction), small run-start boons (+1 reroll at ante 1, +$5; nothing that stacks), and workshop upgrades.

## 5. The duel (multiplayer)
- **Format:** best of 3 rounds; each round both players get 3 turns, most points wins; a tie is one sudden-death turn each.
- **Relics:** each round presents a shared relic both players play under (it can bend the round's rules, e.g. last turn scores double).
- **Before Start:** both bags and both streak pots are shown, and both players accept. Nobody gets ambushed.
- **Stakes:** the **winner picks one die from the loser's whole bag.** That's the risk of bringing your dice, and the zero-to-hero payoff.
- **Streak pot:** each win adds game-created dust to the winner's own pot, scaled by the **opponent's** bag strength (beating a Common bag adds almost nothing; beating a strong bag adds a lot). The pot is at risk: losing a match hands it to the winner. Cash out any time into dust, which resets it. This is what the strong player plays for, and every match against them is a jackpot for the underdog.
- **Durability:** a die loses 1 durability each time it changes hands (table above). At 0 it **crumbles into dust for the winner**, scaled by rarity. Big dice leave circulation fastest; new Ultras only come from runs. A fresh Ultra can be stolen once; the next time it's lost it crumbles.
- **Spoils for both players:** every match pays dust to both, the loser less, both scaled by the opponent's bag strength. Losing to a strong bag still pays. Without this the weaker player's best move is not to duel.
- **Relic unlocks:** win a round under a relic and its run-side counterpart joins your charm or boss pool for the season. Variety, not power (Balatro's unlocks), and a reason to duel different friends under different relics.
- **Reactions:** a small fixed set (tip hat, raise glass, slow clap), rate-limited, no free text. Cosmetic (section 7).
- The economy only moves between people who play each other; in a friend group the same dice will change hands.
- **Not doing:** flat run power per duel win (starting money, permanent mult). It snowballs strong players and trivialises solo runs. Duels give options and better dice to put at risk, gated by the workshop.

## 6. Seasons
- **Full wipe** each season: the bag, the workshop, unlocked relics and dust all reset. Strong duel → run rewards are only affordable because they can't compound past a season. A wipe also restores late joiners and losers, and caps what a hand-edited bag is worth.
- **Frozen bag:** at season end every bag die moves into the **trophy case**. Unplayable, but kept with its lineage and stats. Wipe the power, keep the memory.
- **Kept across seasons:** the trophy case, cosmetics, titles.
- **Length:** about 6-8 weeks to start. A group of 2-4 plays far fewer duels than a public game, so size everything so someone playing once a week finishes the track.
- **v1 is cheap:** tag the bag with a season id computed from the date on each device. A new id freezes the old bag and starts a fresh one. No server.

### The workshop (season progression)
Permanent upgrades **within the season** that make runs stronger, with **duels as the gate** (the hideout from extraction shooters). Upgrades cost dust and require duel milestones; no new currency.

| Station | Effect on runs | Gate |
|---|---|---|
| Vault* | Carry slots 1 → 2 → 3 | Duels played |
| Forge* | A carried die keeps 1 extra stamp after a failed run | Duels won |
| Scout | See the next boss's house rule one table early | Distinct opponents faced |
| Pack table | +1 die shown per pack, better rarity odds | Duels played + dust |
| Bank | Starting money, interest cap | Dust |

\* Only with the carry slot. Without it the workshop needs other run-side stations.

- **Gates count mostly duels played, a few count wins.** Paying for participation narrows the gap between players; paying only for wins widens it.
- **"Distinct opponents" gates** stop two people (or two tabs) farming each other, and reward bringing new players in.
- Milestones in tens of duels per season, not hundreds.
- The track's top tiers pay out cosmetics (section 7).

## 7. Cosmetics
**Rule: gameplay owns the die's surface; cosmetics live around the die.** In the roguelite every layer shows on the die (material = body finish, edition = shine, stamps = face contents, triggers = a marker), and in multiplayer the dice colour says whose dice are rolling. A cosmetic gold or crystal die would read as Gold or Glass material.
- **Material sets the finish, the player's colour sets only the hue** (matte, opaque). A Glass die in your red is red glass. Colour stays a free identity choice, not an unlock.
- **No yellow, gold or pale icy colours in the roguelite.** The holiday `ornament` (gold) and `frost` (pale blue) colours in `DICE_COLORS` clash with Gold and Glass: classic mode only (open question below).
- **Never fire or sparks:** `FIRE` / `hotFlair` already mean hot dice.

| Slot | What it is | Notes |
|---|---|---|
| Felt | Table cloth: colour, weave, an emblem in the centre | In duels the **champion's** felt (longer streak) is used: beating them on their own table is part of the payoff |
| Tray lining | Velvet, leather, wood where kept dice glide | Seen on every keep |
| Player card | Frame, nameplate, leader-crown variant | The crown exists already |
| Showcase die | One trophy-case die shown by your name in lobbies and duels | Safe because it's never played; lineage on tap |
| Titles | Pickpocket (most dice taken), Collector, High Roller (biggest pot cashed), season rank | Earned |
| Bank flourish | Chip stack, stamp, bell | |
| Sound | Bank chime variants, unlockable lounge tunes | Music is synthesized: new tunes cost code, not files |
| Duel reactions | Small fixed set, rate-limited, no free text | |
| Trophy case | Frozen season bags in a cabinet | |

- **Sources:** workshop top tiers, end-of-season rank, feats (steal an Ultra, win on the champion's felt). Mostly earned through duels.
- Anything other players see (felt, card, showcase die, reactions) rides in the snapshot and must be added to `cleanState`.

## 8. Cheating and storage
- **v1: no verification.** Dice live in the player's browser and can be hand-edited. Seasons limit the damage.
- **Host check now:** the host rejects any die over its rarity's budget (cheap, in `cleanState`). Required, not optional, once carried dice feed runs.
- **Designed for later verification:** run dice come from a **seeded RNG** (not `crypto`), and every run action goes through one **action log**. Later, the server hands out the seed, the client sends the log, and a Supabase Edge Function replays it with the same scoring code before granting the pack. That needs accounts (anonymous auth at minimum), a server copy of the scoring and charm logic, and database rules. The seed + log also give save/resume for free.

## 9. Code plan
- **Reused as is:** `makeLaunch` / `simulate` and the dice renderer, the turn stages (`pre → rolled → kept → banked/farkle`), `SoloNet` and the host path the bots use, `FIRE` / `hotFlair`, `SND`, sheets, the phone layout.
- **Custom faces don't touch physics:** the host picks a face index, the die lands on it, and the renderer draws that face's contents. Determinism is unaffected.
- **Refactor:** `scoreOf` returns one number from `best(counts)`; charms and mult need a **breakdown** (which combos, base points each). Classic scoring must stay exactly the same.
- **Multiplayer:** each roller's dice faces ride in the snapshot (`player.bag` or similar), switched per roller the way `BODY` colour is today; add the field to `cleanState`.
- **Six is hard-coded** in a few places (hot dice, the tray). Fine while every bag is six dice.
- Keep the single file (publishing needs it), but put the mode in its own clearly bounded section with its own `NOTES.md` entry.

## 10. Build order
1. Solo roguelite with extraction (seeded RNG, action log, save/resume from day one). Must be fun on its own.
2. The bag screen and packs. Design the bag and the run start for carry slots from day one (a carry slot of zero until the workshop exists), and give every die a lineage field.
3. The duel.
4. Seasons: wipe, trophy case, workshop. Then cosmetics.

## Open questions
- **Carry slot: adopt it or not?** The owner is undecided (2026-11-16). With it, dice won in duels enter runs and the loop is strongest; without it, runs stay clean (Balatro) and the duel → run loop rests on dust, the workshop and relic unlocks. Heat, the Vault and the Forge depend on this. Settle it first. **The premise leans toward adopting it:** using seized evidence to get deeper is what makes the detective gray rather than corrupt. Without the carry slot, evidence is only pocketed and gambled, and the premise loses its justification.
- Premise copy: names for dust, the kingpin per season, den and boss names, how the city map shows closed dens.
- Stamp list and costs; per-rarity budgets.
- Materials list and their tier values; editions list; triggers list.
- Charm list; house-rule (boss) list; relic list.
- Table targets, turns and rerolls per ante; money and interest; shop prices.
- Pack rarity odds per extraction depth.
- Dust values (breaking, crumbling, pot growth) and dust costs.
- Duel bag rules: a points cap by rarity, or open bags? Decide after simulating bot duels (e.g. Ultra bag vs Common bag win rates).
- Duel player count: strictly 2, or 3-4 using the existing rooms?
- What's in the shop's reroll vs the table's reroll (one currency or two)?
- Carried die on a failed run: lost outright, or crumbles into dust?
- Heat per rarity tier (+8% is a placeholder); how stakes scale targets and pack odds.
- Duel spoils: dust for winner and loser, and the scaling by opponent bag strength.
- Workshop: stations, tier costs, milestone counts; season length and start dates (the same on every device).
- Which relics map to which charms or bosses for relic unlocks.
- Holiday colours `ornament` and `frost`: classic mode only, or recolour them?
- Champion's felt in duels: decided by streak, or by whoever has the bigger pot?
