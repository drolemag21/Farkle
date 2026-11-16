// Table simulator: how often plain dice clear a target under each boss house rule.
// Usage: node tools/sim.js [turns=4] [rerolls=1] [tables=20000]
//
// Scoring and the bot strategy are copied from Farkle Table (farkle-table.html: `best`, `botKeep`,
// `BOT_POT`, `BOT_BANK`). The bot doesn't adapt its banking to a target or a house rule, so compare
// rules with each other rather than reading the numbers as exact. Uses Math.random: this is a
// tuning tool, not game code. Once src/rules exists, replace the copies here with imports.
const [TURNS = 4, REROLLS = 1, N = 20000] = process.argv.slice(2).map(Number);

function counts(v) { const c = [0, 0, 0, 0, 0, 0, 0]; for (const x of v) c[x]++; return c; }
function kind(f, k) { return k === 3 ? (f === 1 ? 1000 : f * 100) : { 4: 1000, 5: 2000, 6: 3000 }[k]; }
const memo = new Map();
// Highest classic score that uses every die in counts `c`, or -Infinity if some die can't score.
function best(c) {
  const key = c.join("");
  if (memo.has(key)) return memo.get(key);
  let t = 0; for (let f = 1; f <= 6; f++) t += c[f];
  if (!t) return 0;
  let r = -Infinity;
  if (t === 6) {
    const nz = []; for (let f = 1; f <= 6; f++) if (c[f]) nz.push(c[f]); nz.sort((a, b) => a - b);
    if (nz.length === 6) r = 1500;
    else if (nz.length === 3 && nz.every((x) => x === 2)) r = 1500;
    else if (nz.length === 2 && nz[0] === 2 && nz[1] === 4) r = 1500;
    else if (nz.length === 2 && nz[0] === 3 && nz[1] === 3) r = 2500;
  }
  let f = 1; while (!c[f]) f++;
  if (f === 1 || f === 5) { const c2 = c.slice(); c2[f]--; const s = best(c2); if (s > -Infinity) r = Math.max(r, (f === 1 ? 100 : 50) + s); }
  for (let k = 3; k <= c[f]; k++) { const c2 = c.slice(); c2[f] -= k; const s = best(c2); if (s > -Infinity) r = Math.max(r, kind(f, k) + s); }
  memo.set(key, r);
  return r;
}
const POT = [0, 25, 50, 90, 150, 250, 400], BANK = [0, 300, 300, 400, 650, 2000, Infinity];
const roll = (n) => Array.from({ length: n }, () => 1 + ((Math.random() * 6) | 0));

// One table under house rule `R`: { dice, noRerolls, deadAce, pairRule, doubleTrouble, thumb }.
function table(R) {
  const nDice = R.dice || 6;
  const score = (v) => {
    if (R.deadAce) { const c = counts(v); if (c[1] > 0 && c[1] < 3) return -1; }   // a single 1 can't be kept
    return v.length ? best(counts(v)) : 0;
  };
  // Best legal keep as [points, dice left], or null for a Farkle (no legal keep).
  const keep = (v) => {
    let pick = null, top = -Infinity;
    for (let m = 1; m < 1 << v.length; m++) {
      const idx = v.filter((_, j) => m & (1 << j));
      if (R.pairRule && idx.length < 2) continue;
      const s = score(idx); if (s <= 0) continue;
      const left = v.length - idx.length || nDice, val = s + POT[left];
      if (val > top) { top = val; pick = [s, left]; }
    }
    return pick;
  };
  // Dutch's Thumb: one die moved ±1, whichever hurts the best keep most.
  const thumb = (v) => {
    let out = v, low = Infinity;
    for (let i = 0; i < v.length; i++) for (const d of [-1, 1]) {
      const x = v[i] + d; if (x < 1 || x > 6) continue;
      const w = v.slice(); w[i] = x;
      const k = keep(w), val = k ? k[0] + POT[k[1]] : -1;
      if (val < low) { low = val; out = w; }
    }
    return out;
  };
  let rerolls = R.noRerolls ? 0 : REROLLS, total = 0, turns = TURNS;
  while (turns > 0) {
    let n = nDice, tp = 0, first = true, farkled = false;
    for (;;) {
      const throwDice = () => { const v = roll(n); return R.thumb && first ? thumb(v) : v; };
      let k = keep(throwDice());
      if (!k && rerolls > 0) { rerolls--; k = keep(throwDice()); }   // a reroll rescues the Farkle
      first = false;
      if (!k) { farkled = true; break; }
      tp += k[0]; n = k[1];
      if (n !== nDice && tp >= BANK[n]) break;
    }
    if (!farkled) total += tp;
    turns -= farkled && R.doubleTrouble ? 2 : 1;
  }
  return total;
}

const RULES = [
  ["No house rule", {}],
  ["1 Cold Dice (no rerolls)", { noRerolls: 1 }],
  ["2 Double Trouble (Farkle = 2 turns)", { doubleTrouble: 1 }],
  ["3 Pair Rule (keep 2+ dice)", { pairRule: 1 }],
  ["4 Dead Ace (single 1s dead)", { deadAce: 1 }],
  ["5 Short Hand (5 dice)", { dice: 5 }],
  ["6 Dutch's Thumb (first roll of turn)", { thumb: 1 }],
];
console.log(`${N} tables, ${TURNS} turns, ${REROLLS} reroll(s), plain dice`);
for (const [name, R] of RULES) {
  const xs = Array.from({ length: N }, () => table(R)).sort((a, b) => a - b);
  const q = (p) => xs[Math.floor(p * N)], clears = (t) => Math.round((100 * xs.filter((x) => x >= t).length) / N) + "%";
  console.log(`${name.padEnd(38)} p25 ${q(0.25)}  median ${q(0.5)}  p75 ${q(0.75)}  | clears 1,200 ${clears(1200)}  2,000 ${clears(2000)}`);
}
