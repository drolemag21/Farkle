# Roguelite mode: design

Status: **design only, nothing built.** Decisions below were agreed with the owner (2026-11-16). Open questions are listed at the end; settle them here before building the part they touch.

Main influences: Balatro (the run), extraction shooters (bring gear in, lose it if you die; seasonal wipes). Rule of thumb: reuse the existing table (physics, dice art, turn flow, host path, sound, sheets) and add the mode as its own bounded section of `farkle-table.html`.

## The idea in one line
Play a solo roguelite run to build your tools: each boss you beat banks a better evidence locker, and when you stop or fail you open the last one you banked. Then risk your dice against friends in multiplayer duels, which is where the real extraction risk lives. Duels feed back into runs through your faction, which raises your power floor in both modes.

**Two modes, two kinds of freedom** (agreed 2026-11-16):
- **Runs are curated.** You start from a preset case file, with a few choices about how it begins, but your bag never enters a run. Low risk: failing costs only the locker upgrade you were working toward, never what you've banked or anything you own.
- **Duels are open.** You bring whatever you like from your bag, and the winner takes a die from the loser. Full control, full risk.

The whole game is one choice repeated at three levels:

| Level | Push on | Cash out |
|---|---|---|
| Turn | Roll again | Bank |
| Run | Fight the next ante for a better locker | Call the raid, open the banked locker (no risk: see section 2) |
| Duel | Keep the streak, grow the pot | Cash the pot into dust |

**The loop:** run → pack → bag → duel → (dice won, dust, faction rank, relic unlocks) → next run. Runs feed duels with dice; duels feed runs with faction rank, unlocked case files and relic unlocks. Duels must still be worth playing for what they give runs, for winners and losers alike. A season wipe (section 6) bounds the snowball.

## Premise
Agreed with the owner (2026-11-16). **You're a gray vice detective** in a city run on backroom dice games. You take down dens, and to get deeper you break the rules: pocketing seized dice, gambling them with other detectives after hours, and using what that earns you to keep compromised contacts (your faction) working for you. The factions carry the "gray": informants paid off, clerks who lose paperwork, bookmakers kept sweet, all in service of closing dens. Grounded in real police corruption around gambling (the Lexow and Seabury inquiries; the Knapp Commission's "grass-eaters and meat-eaters", NYC 1970-72). It fits the casino-at-night theme, so no new art direction.

**A premise, not a story.** Like Balatro: no cutscenes or narrative arc. The fiction lives in boss names and house rules, extraction and pack wording, lineage text and titles.

| Mechanic | In the fiction |
|---|---|
| Run | Working a case up an organisation: street games → backroom dens → the people who run them → the kingpin (ante 6) |
| Table / boss house rules | A den's game; the boss is its owner, and the house rule is how that den rigs things. You play it straight to stay undercover |
| Extract | Call the raid. Early is a small bust, deep is chasing the kingpin |
| Pack (3 dice, keep 1) | Seized dice go to evidence; you pocket one |
| Lose the run | Your cover is blown mid-ante; you keep what you'd already seized (the last banked locker) |
| Case file (preset run start) | The case you're assigned: who you're after and what you start with |
| Heat (stakes) | How hot the case is: the higher it is, the warier the dens and the better the seizures |
| Duels | The after-hours locker-room game. Each detective is building their own case and needs particular tools, so evidence moves between them this way. Unofficial and competitive, and everyone involved knows it's wrong |
| Durability / crumbling | A die that's been through too many hands is "hot", too recognisable to keep, so it's destroyed |
| Season wipe | Internal Affairs audits the precinct; everything is confiscated |
| Trophy case | What you hid well enough to keep |
| Factions | Your compromised contacts: the Street (informants), Records (clerks), the Book (bookmakers and fences). See section 6 |
| Dust | Open: needs an in-world name (cash? favours?) |

**Keep the "takes down dens" half visible**, or players read the character as plain corrupt rather than gray: a city map where beaten dens are marked closed, a "Case closed" stamp on extraction, the season's kingpin named at the top of the faction track. These are copy and small screens, not story systems.

## 1. The run (solo)
- **Structure:** 6 antes × (small blind, big blind, boss) = 18 tables (decided 2026-11-16; shorter than Balatro's 8 because runs are preparation for duels, not the main event). Roughly 30-35 min, so save/resume is still required, and each ante is a natural place to stop (the reference: an extraction game's PvE mode of 3 matches + a boss match per series).
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
- **Losing the run: you keep the last banked locker** (section 2). Failing in ante 1, before any boss, leaves you with nothing.
- **Case files: preset starts** (Balatro's decks). Each run starts from a case file: six starting dice, perhaps a charm, money, and a twist (e.g. a case that starts with Glass dice, or one with fewer turns but more rerolls). The player picks a case file and makes a few choices at the start, but **bag dice never enter a run**. New case files unlock through duels (variety, not power), which is part of what duels give runs.
- **No carry slot** (decided 2026-11-16). Runs stay curated and balanced, and all the risk and full control over what you bring lives in duels.
- **Heat** (Balatro's stakes): higher Heat means harder tables and better packs. As a faction raises a player's floor over a season, they step up a level of Heat on their own, so runs stay tense.

## 2. Extraction and packs
- **Banking (decided 2026-11-16, from the reference mode):** beating an ante's boss banks that ante's **evidence locker** (the pack). The banked locker is safe: if the run fails later, you still open it. Pushing on risks only the upgrade, never what's banked.
- **Runs are the safe mode** (decided 2026-11-16). Pushing is always free except for time, so there is no extract gamble at the run level: the only risk is not getting more. Push-your-luck in a run lives in the turn (roll or bank) and the table targets; losing what you own lives in duels. No clean raid bonus. Calling the raid is for ending the session, e.g. to duel tonight.
- After **each boss** (6 chances) the player chooses: **call the raid** (stop and open the banked locker) or push on toward the next tier.
- **The locker is on screen at that choice** ("Locker tier 3: 4 dice shown, Rare odds, 120 dust"), the way unbanked points are on screen during a Farkle turn. Push-your-luck needs the stake to be visible.
- **Locker contents (decided 2026-11-16): a die pick + dust + a part.** All three improve with tier.
  - **Die pick:** 3 random dice, keep 1. Rarity improves with depth.
  - **Dust:** a lump scaled by tier.
  - **Part:** one stamp, material, edition or trigger, applied later to any bag die of your choice. Parts are how a player shapes their duel bag on purpose instead of hoping a pack rolls the right die; that's the point of runs as tool-building.
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
- **Parts** wait in a parts drawer until applied (season-wiped like the bag; not at stake in duels, only dice are). Applying one is permanent and recorded in the die's lineage ("Glass II, seized at Dutch's, 16 Nov").
  - **Promotion part (decided 2026-11-16):** a rare part that raises a die one rarity tier (one more slot, a bigger budget). Drops only from tier 5-6 lockers, so depth still controls how many big dice exist. Durability becomes the new rarity's value, capped at what the die has left: promotion makes a die stronger and more fragile in duels at once, and never restores durability. A raised die keeps its lineage ("Taken from Ana as a Common, now Epic").
  - **A part fits only within the die's rarity:** a free slot of that layer and room in the power budget (section 3), or it replaces an existing stamp/material (the old one is lost). A Common can't become a monster, and the host's budget check still holds.
- The bag: the dice you own, kept per device in localStorage for v1. Dice earned on the Artifact and on GitHub Pages are separate; the UI should say so. The bag belongs to the current season (section 6).
- **Lineage:** every die records its history: where it came from (run, pack, duel), who it was taken from and when ("Taken from Ana, 16 Nov"). Nearly free to build and the strongest emotional hook in the design.
- **Dust** is the only second currency. Sources: breaking unwanted dice, crumbled dice, cashed-out streak pots, duel spoils (both players). Spent on rerolling or upgrading faces, pack upgrades (see 4 dice instead of 3, or one rarity tier better at the next extraction), small run-start boons (+1 reroll at ante 1, +$5; nothing that stacks), and faction ranks.

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
- **Not doing:** flat run power per duel win (starting money, permanent mult). It snowballs strong players and trivialises solo runs. Duels give faction rank (a capped floor, section 6), case file and relic unlocks, and better dice to put at risk.

## 6. Seasons
- **Full wipe** each season: the bag, faction ranks, unlocked relics and case files, and dust all reset. Strong duel → run rewards are only affordable because they can't compound past a season. A wipe also restores late joiners and losers, and caps what a hand-edited bag is worth.
- **Frozen bag:** at season end every bag die moves into the **trophy case**. Unplayable, but kept with its lineage and stats. Wipe the power, keep the memory.
- **Kept across seasons:** the trophy case, cosmetics, titles.
- **Length:** about 6-8 weeks to start. A group of 2-4 plays far fewer duels than a public game, so size everything so someone playing once a week finishes the track.
- **v1 is cheap:** tag the bag with a season id computed from the date on each device. A new id freezes the old bag and starts a fresh one. No server.

### Factions (season progression)
Factions replace the workshop (decided 2026-11-16). **Any player can rank up any faction; nobody is locked in.** Each faction has one main benefit that helps in **both** runs and duels, and the choice is which to invest in first. With limited dust and a wipe every season, that order is the decision. Ranks are permanent **within the season**, cost dust and require duel milestones (duels are the gate, the hideout from extraction shooters); no new currency.

**Factions raise the power floor, not the ceiling.** A flat bonus everyone gets moves everyone up and leaves the gap where it was. So every faction perk is one of:
1. **A guarantee:** a minimum outcome that only matters when things go badly.
2. **Front-loaded:** strong in early antes, fading by the deep ones. Helps newer players reach mid-game without making ante 6 easier.
3. **Catch-up in duels:** bigger the weaker your bag is than your opponent's.

Each perk caps out, so the floor never becomes a ceiling. Veterans who max a faction only reach the same guaranteed minimums.

| Faction | Direction | Runs | Duels |
|---|---|---|---|
| **The Street** (informants) | Information | Free reroll per table in antes 1-3; first boss's house rule revealed at run start | The underdog sees the next round's relic a round early |
| **Records** (clerks who lose paperwork) | Protection | Second chance: once per run, retry a failed table in antes 1-3 (banking already covers failure, so salvage is gone) | Your single best die can't be taken ("misfiled"). Needs a cost (dust per match, or once per match) or everyone picks Records |
| **The Book** (bookmakers and fences) | Economy / dust | Minimum starting money and an interest floor | Minimum dust per match, scaled up for the underdog |

Rank values and the exact perk per rank are open (below); the directions are decided.

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

- **Sources:** faction top ranks, end-of-season rank, feats (steal an Ultra, win on the champion's felt). Mostly earned through duels.
- Anything other players see (felt, card, showcase die, reactions) rides in the snapshot and must be added to `cleanState`.

## 8. Cheating and storage
- **v1: no verification.** Dice live in the player's browser and can be hand-edited. Seasons limit the damage.
- **Host check now:** the host rejects any die over its rarity's budget (cheap, in `cleanState`). Bag dice never enter runs, so this guards duels only.
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
2. Case files (preset starts), then the bag screen, lockers and the parts drawer (applying parts to bag dice). Give every die a lineage field.
3. The duel.
4. Seasons: wipe, trophy case, factions. Then cosmetics.

## Open questions
- **Is duel → run strong enough?** With no carry slot, duels give runs only faction rank (a capped floor), case file unlocks and relic unlocks. Check in playtests that this makes runners want to duel; if not, add more run-side faction perks before reopening the carry slot.
- Case file list: starting dice, charm, money and twist per file; which unlock through duels; what choices the player makes at run start.
- Factions: perks per rank, rank costs and milestone counts; Records' lock cost. Size costs so maxing all three takes most of a season.
- Premise copy: names for dust, the kingpin per season, den and boss names, how the city map shows closed dens.
- Stamp list and costs; per-rarity budgets.
- Materials list and their tier values; editions list; triggers list.
- Charm list; house-rule (boss) list; relic list.
- Table targets, turns and rerolls per ante; money and interest; shop prices.
- Locker rarity odds per tier.
- Part odds per tier: which layers (stamp, material, edition, trigger) can drop at which tier; can unwanted parts be broken into dust?

- Dust values (breaking, crumbling, pot growth) and dust costs.
- Duel bag rules: a points cap by rarity, or open bags? Decide after simulating bot duels (e.g. Ultra bag vs Common bag win rates).
- Duel player count: strictly 2, or 3-4 using the existing rooms?
- What's in the shop's reroll vs the table's reroll (one currency or two)?
- Heat levels: how each scales table targets and pack odds.
- Duel spoils: dust for winner and loser, and the scaling by opponent bag strength.
- Season length and start dates (the same on every device).
- Which relics map to which charms or bosses for relic unlocks.
- Holiday colours `ornament` and `frost`: classic mode only, or recolour them?
- Champion's felt in duels: decided by streak, or by whoever has the bigger pot?
