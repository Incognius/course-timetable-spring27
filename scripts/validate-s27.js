// Cross-checks js/data-s27.js (Spring 2027) for internal consistency and
// against the raw offerings extract (data/raw/offerings-s27.txt):
//   node scripts/validate-s27.js
// Exit code 1 on hard errors; warnings are informational.

"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.dirname(__dirname);
global.window = {};
eval(fs.readFileSync(path.join(ROOT, "js", "data-s27.js"), "utf8"));
const DATA = global.window.COURSE_DATA;
const RAW = fs.readFileSync(path.join(ROOT, "data", "raw", "offerings-s27.txt"), "utf8");

const errors = [], warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);
const codes = Object.keys(DATA.courses);

// Document totals that don't add up on their own (cores + listed elective
// slots != the "Total" line). Reported as warnings, not errors.
const KNOWN_TOTAL_MISMATCH = {
  "ug4-chd": "doc lists Ethics 2 + HSS + Open + CS + HP4 = 16 but prints Total 18"
};

/* ---- per-course ---- */
for (const code of codes) {
  const c = DATA.courses[code];
  if (!/^[A-Z]{2}\d\.\d{3}[ab]?$/.test(code) && !/^NEW-\d+$/.test(code))
    warn(`${code}: unusual course code format`);
  const m = /^(\d+)-(\d+)-(\d+)-(\d+)$/.exec(c.ltpc);
  if (m) {
    if (parseInt(m[4], 10) !== c.credits) err(`${code}: credits ${c.credits} != L-T-P-C ${c.ltpc}`);
  } else if (!/^\d+\s*Cr$/i.test(c.ltpc)) {
    err(`${code}: unparseable ltpc "${c.ltpc}"`);
  }
  if (c.half && !["H1", "H2", "H"].includes(c.half)) err(`${code}: bad half "${c.half}"`);
  const nameHalf = /\((H1|H2|H)\)/.exec(c.name);
  if (nameHalf && nameHalf[1] !== c.half) err(`${code}: name says ${nameHalf[1]} but half is ${c.half}`);
  if (c.sections.length) err(`${code}: has meeting slots, but no Spring timetable is published yet`);
  for (const cat of c.categories)
    if (!DATA.categories[cat]) err(`${code}: unknown category "${cat}"`);
  // Every real code must appear in the PDF text.
  if (!/^NEW-/.test(code)) {
    const base = code.replace(/[ab]$/, "");
    const inRaw = RAW.includes(code) || RAW.includes(base);
    if (!inRaw) err(`${code}: not found in offerings-s27.txt`);
  }
}

/* ---- every code in the PDF is in the data ---- */
const rawCodes = new Set((RAW.match(/\b[A-Z]{2}\d\.\d{3}[ab]?\b/g) || []));
// Known typos / split codes in the document.
const RAW_ALIASES = {
  "OC2.104": "OC1.104 (doc typo: UG2 CGD 'Sports-4' printed as OC2.104)"
};
for (const rc of rawCodes) {
  if (DATA.courses[rc] || RAW_ALIASES[rc]) continue;
  if (DATA.courses[rc + "a"] || DATA.courses[rc + "b"]) continue;
  err(`${rc}: appears in the offerings PDF but not in data-s27.js`);
}

/* ---- categories ---- */
const catCounts = {};
for (const code of codes)
  for (const cat of DATA.courses[code].categories) catCounts[cat] = (catCounts[cat] || 0) + 1;
for (const cat of Object.keys(DATA.categories))
  if (!catCounts[cat]) warn(`category "${cat}" has no courses`);

/* ---- programmes ---- */
for (const [pid, p] of Object.entries(DATA.programmes)) {
  let sum = 0;
  for (const code of p.required) {
    const c = DATA.courses[code];
    if (!c) { err(`${pid}: required course ${code} not found`); continue; }
    sum += c.credits || 0;
  }
  sum += p.electiveCredits || 0;
  const total = parseInt(p.totalCredits, 10);
  if (sum !== total) {
    const msg = `${pid}: cores + elective slots = ${sum}, doc total = ${total}`;
    if (KNOWN_TOTAL_MISMATCH[pid]) warn(`${msg} (${KNOWN_TOTAL_MISMATCH[pid]})`);
    else err(msg);
  }
}

const visible = codes.filter((c) => !DATA.courses[c].nonCourse).length;
console.log(`courses: ${codes.length} (${visible} shown on the dashboard), programmes: ${Object.keys(DATA.programmes).length}`);
warnings.forEach((w) => console.log("warn: " + w));
errors.forEach((e) => console.log("ERROR: " + e));
if (errors.length) { console.log(`${errors.length} error(s)`); process.exit(1); }
console.log("ok");
