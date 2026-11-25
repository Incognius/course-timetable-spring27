# IIIT-H Spring 2027 — Course Dashboard

A static site for exploring the courses offered in **Spring 2027 (2026-27
Semester II)**.

- **Courses** (`index.html`) — every course from `CourseOfferings-S27-V1.pdf`
  (24 Nov 2026) as a filterable tile (code, credits, faculty, category, seat
  cap), with Spring-only lists (UG2 breadth buckets, UG2 ECE 2-credit
  foundation streams, Ethics 2 electives, Bouquet CPS). Four courses listed as
  "New" have no code yet and show as `NEW-1`…`NEW-4`.
- **Timetable** (`timetable.html`) — placeholder: *"Will Be Updated Once
  document is available"*. The Spring lecture timetable and syllabus haven't
  been published, so no course has a slot or syllabus yet.

Everything is client-side vanilla JS — no build step, no backend.

Data: `js/data-s27.js`, checked by `node scripts/validate-s27.js`. That check
confirms every course code in the PDF is in the data and that each
programme's cores plus elective slots add up to the document's total. One known
doc mismatch, UG4 CHD (adds to 16 but printed as 18), is a warning, not an
error.

When the Spring timetable arrives: add `meet:` / `sec:` slots in
`js/data-s27.js` (same format as `js/data.js`), then bring back the timetable
builder page from Monsoon (`git show 76e2a81:timetable.html`) and point it at
`js/data-s27.js`. `js/timetable.js` and `js/ics.js` also hard-code Monsoon
assumptions (the ICS date range and the syllabus file), so check those too.

## Monsoon 2026 (archived)

The Monsoon 2026 site (course dashboard + timetable builder with `.ics`
export) is no longer served. Its data and code are kept for reuse —
`js/data.js`, `js/syllabi.js`, `js/timetable.js`, `js/ics.js`, the M26 PDFs
and `scripts/validate.js` — and the last Monsoon version of the pages is
commit `76e2a81`. The sections below describe that Monsoon pipeline.

## Running locally

Any static file server works. For example:

```bash
python -m http.server 8321
# then open http://localhost:8321
```

Opening `index.html` directly from disk (`file://`) also works, because the
data is shipped as plain `<script>` files rather than fetched.

## Where the data comes from

All data is derived from the three official PDFs (kept in the repo root):

| PDF | Used for |
| --- | --- |
| `CourseOfferings-M26-V5.pdf` | courses, credits, faculty, programme cores |
| `Consolidated Lecture Time Table_M26.pdf` | weekly slot for each course |
| `Courses-Syllabus_M26-V1.pdf` | verbatim syllabus text |
| `CourseOfferings-S27-V1.pdf` | Spring 2027 courses, credits, faculty, programme cores |

Generated / curated files:

- `js/data.js` — curated courses, categories, programmes and the timetable
  slot for each course.
- `js/syllabi.js` — generated verbatim syllabus text, keyed by course code.

## Updating when a new PDF version is published

1. Drop the new PDF(s) in the repo root and run
   `python scripts/extract_pdfs.py` to regenerate `data/raw/*.txt`. The old
   raw text is committed, so `git diff data/raw/` shows exactly what the
   university changed.
2. If the syllabus PDF changed, run `python scripts/build_syllabi.py` to
   regenerate `js/syllabi.js`. It reports any titles it could not map to a
   course code.
3. If offerings/timetable changed, apply the diff to `js/data.js` by hand
   (course names in the timetable grid often differ from the offerings names).
4. Run `node scripts/validate.js` — it must exit 0. It cross-checks every
   timetable grid cell against the curated data, so a silently moved slot is
   caught. Genuine grid anomalies live in `KNOWN_ANOMALIES` with a reason.

## Data conventions

- Meetings are stored per explicit day (`"Mon1 Thu1"`), because the official
  grid has real asymmetries (e.g. Introduction to Linguistics-1 meets
  Mon + Fri, not Mon + Thu).
- Clash rule: same day + same period + overlapping halves. Two H1/H2 courses
  sharing a slot do **not** clash.
- Programmes list only their fixed cores plus a normal credit load. Elective
  requirements (HSS / Science / Maths / Bouquet / ECE Star & Stream counts)
  are graduation-level, not per-semester, so they are intentionally not
  enforced here. **The Star / Stream elective rules in particular are
  involved — read the official documents before registering.**
- Course descriptions shown in the UI come verbatim from the syllabus PDF.

## Known document facts (not bugs)

- A handful of offered courses have no entry in the syllabus PDF; the detail
  view says so explicitly.
- The syllabus PDF contains a few courses not offered this semester
  (Causal Inference, Design for Testability, Neuroinformatics, Quantum
  Materials & Devices) — harmless.
- `Thu 08:30 "Computer Aided Drug Design"` in the grid is a duplication (CADD
  is a 10:05 course) — whitelisted in the validator.

## ICS export

Weekly recurring events from **1 Aug 2026**, `TZID=Asia/Kolkata`, through the
final teaching day **19 Nov 2026**.
