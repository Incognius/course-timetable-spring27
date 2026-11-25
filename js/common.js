// Shared helpers for both pages. Depends on js/data.js (window.COURSE_DATA)
// and js/syllabi.js (window.SYLLABI).

(function () {
  "use strict";
  var D = window.COURSE_DATA;

  var DAY_ORDER = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // From the offerings doc legend (MA-Maths; CS-Comp Sci; EC-Electronics;
  // CG-Cognitive Science; HS-Human Sci; SC-Science; CL-Compu. Linguistics),
  // extended with the code prefixes the doc uses but doesn't gloss.
  var AREA_LABELS = {
    CS: "Computer Science",
    EC: "Electronics",
    MA: "Mathematics",
    SC: "Science",
    HS: "Human Sciences",
    CG: "Cognitive Science",
    CL: "Computational Linguistics",
    CE: "Civil / Structural Engineering",
    GS: "Geospatial Sciences",
    PD: "Product Design & Management",
    OC: "Institute-wide (Arts / Sports / Value Ed)",
    OE: "Open Elective (no area code yet)"
  };

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function periodTime(n) {
    var p = D.periods[n - 1];
    return p.start + "–" + p.end;
  }

  // "Mon/Thu 08:30-09:55" style summary for a section's meetings
  function meetingsText(meetings) {
    if (!meetings || !meetings.length) return "No scheduled slot";
    var byPeriod = {};
    meetings.forEach(function (m) {
      (byPeriod[m.period] = byPeriod[m.period] || []).push(m.day);
    });
    return Object.keys(byPeriod).sort().map(function (p) {
      var days = byPeriod[p].sort(function (a, b) {
        return DAY_ORDER.indexOf(a) - DAY_ORDER.indexOf(b);
      });
      return days.join("/") + " " + periodTime(parseInt(p, 10));
    }).join(", ");
  }

  // H1 and H2 do not overlap; every other combination does.
  function halvesOverlap(a, b) {
    if ((a === "H1" && b === "H2") || (a === "H2" && b === "H1")) return false;
    return true;
  }

  function categoryLabel(id) {
    return D.categories[id] ? D.categories[id].label : id;
  }

  function courseInAnyCategory(course, cats) {
    if (!cats || !cats.length) return false;
    return course.categories.some(function (c) { return cats.indexOf(c) !== -1; });
  }

  // Search that tolerates punctuation in course codes: "cs7403", "cs7.403"
  // and "CS 7.403" all match CS7.403; otherwise plain substring on
  // code+name+faculty.
  function matchesQuery(course, q) {
    q = q.trim().toLowerCase();
    if (!q) return true;
    var qCode = q.replace(/[^a-z0-9]/g, "");
    if (qCode && course.code.toLowerCase().replace(/[^a-z0-9]/g, "").indexOf(qCode) !== -1) return true;
    var hay = (course.code + " " + course.name + " " + course.faculty.join(" ")).toLowerCase();
    return hay.indexOf(q) !== -1;
  }

  // ---- theme toggle (system default; explicit choice persisted) ----
  function initThemeToggle(btn) {
    function current() {
      var forced = document.documentElement.getAttribute("data-theme");
      if (forced) return forced;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    function label() {
      btn.textContent = current() === "dark" ? "Light mode" : "Dark mode";
    }
    btn.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("m26-theme", next);
      label();
    });
    label();
  }

  // Programmes that require this course as core
  function requiredBy(code) {
    return Object.keys(D.programmes).filter(function (pid) {
      return D.programmes[pid].required.indexOf(code) !== -1;
    }).map(function (pid) { return D.programmes[pid].label; });
  }

  // ---- faculty change between a course and an older syllabus record ----
  // Names in the docs are spelled inconsistently ("Gowtham Kurii", "S. BAPI
  // RAJU", "R C Prasad" vs "Ramachandra Prasad"), so people are matched
  // loosely. Returns {before, added, removed} or null when nothing changed
  // or the old record has no usable faculty.
  var NOT_A_PERSON = /^(tbd|ips|lvpei|guest faculty|guest speakers?|director.*|hsrc.*)$/;

  function people(str) {
    return String(str || "")
      .replace(/\([^)]*\)/g, " ")
      .split(/\s*(?:\+|,|&|\band\b)\s*/i)
      .map(function (p) {
        return p.toLowerCase().replace(/\b(dr|prof|mr|ms|mrs)\b\.?/g, " ")
          .replace(/\./g, " ").replace(/[^a-z ]/g, "").replace(/\s+/g, " ").trim();
      })
      .filter(function (p) { return p && !NOT_A_PERSON.test(p); })
      .map(function (p) {
        var toks = p.split(" ");
        return { toks: toks, words: toks.filter(function (t) { return t.length > 1; }) };
      })
      .filter(function (p) { return p.words.length; });
  }

  // Similarity of two words: 1 - edit distance / longer length.
  function close(a, b) {
    if (a === b) return true;
    if (Math.abs(a.length - b.length) > 2) return false;
    var prev = [], cur, i, j;
    for (j = 0; j <= b.length; j++) prev[j] = j;
    for (i = 1; i <= a.length; i++) {
      cur = [i];
      for (j = 1; j <= b.length; j++)
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = cur;
    }
    return 1 - prev[b.length] / Math.max(a.length, b.length) >= 0.75;
  }

  function samePerson(x, y) {
    if (close(x.words.join(""), y.words.join(""))) return true;
    var xs = x.words.slice().sort().join(" "), ys = y.words.slice().sort().join(" ");
    if (xs === ys) return true;
    var xw = x.words, yw = y.words;
    // Same first name; surnames agree, or one side abbreviates/omits it.
    if (close(xw[0], yw[0])) {
      if (xw.length === 1 || yw.length === 1) return true;
      return xw.slice(1).some(function (a) {
        return yw.slice(1).some(function (b) { return close(a, b); });
      });
    }
    // Same surname and the same first initial ("R C Prasad" / "Ramachandra Prasad").
    return close(xw[xw.length - 1], yw[yw.length - 1]) && x.toks[0][0] === y.toks[0][0];
  }

  function facultyChange(courseFaculty, oldFaculty) {
    var now = people(courseFaculty.join(" + ")), then = people(oldFaculty);
    if (!then.length || !now.length) return null;
    function missingFrom(list) {
      return function (p) { return !list.some(function (q) { return samePerson(p, q); }); };
    }
    var addedIdx = now.map(missingFrom(then)), removedIdx = then.map(missingFrom(now));
    if (addedIdx.indexOf(true) === -1 && removedIdx.indexOf(true) === -1) return null;
    return { before: oldFaculty };
  }

  window.APP = {
    D: D,
    SYLLABI: window.SYLLABI || {},
    DAY_ORDER: DAY_ORDER,
    AREA_LABELS: AREA_LABELS,
    matchesQuery: matchesQuery,
    initThemeToggle: initThemeToggle,
    esc: esc,
    periodTime: periodTime,
    meetingsText: meetingsText,
    halvesOverlap: halvesOverlap,
    categoryLabel: categoryLabel,
    courseInAnyCategory: courseInAnyCategory,
    requiredBy: requiredBy,
    facultyChange: facultyChange
  };
})();
