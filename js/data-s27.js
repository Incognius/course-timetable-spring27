// Course data for Spring 2027 (2026-27 Semester II), curated from:
//   CourseOfferings-S27-V1.pdf (24 Nov 2026)
// The Spring 2027 lecture timetable and syllabus documents are not published
// yet, so no course has meeting slots: every course has an empty `sections`
// list. Course details come from the Spring 2026 syllabus (js/syllabi-s26.js)
// for courses offered in both semesters, matched by course code.
// When the timetable arrives, add meet:"Mon1 Thu1" / sec:{...} exactly as in
// js/data.js (same period definitions), then build out spring27/timetable.html.
// half: "H1" | "H2" | "H" (full-sem, one class a week) | null (regular full-sem).

(function () {
  "use strict";

  // Same institute period grid as Monsoon; kept so the shared helpers work.
  var PERIODS = [
    { n: 1, start: "08:30", end: "09:55" },
    { n: 2, start: "10:05", end: "11:30" },
    { n: 3, start: "11:40", end: "13:05" },
    { n: 4, start: "14:00", end: "15:25" },
    { n: 5, start: "15:35", end: "17:00" },
    { n: 6, start: "17:10", end: "18:40" }
  ];

  var COURSES = {};

  // def(code, name, ltpc, "Fac A + Fac B", {half, cap, cat:[], area, nonCourse, note})
  function def(code, name, ltpc, faculty, opts) {
    opts = opts || {};
    var credits = null;
    var m = /^(\d+)-(\d+)-(\d+)-(\d+)$/.exec(ltpc);
    if (m) credits = parseInt(m[4], 10);
    else if (/^(\d+)\s*Cr$/i.test(ltpc)) credits = parseInt(ltpc, 10);
    COURSES[code] = {
      code: code,
      name: name,
      ltpc: ltpc,
      credits: credits,
      faculty: faculty ? faculty.split(" + ") : [],
      area: opts.area || code.replace(/[^A-Z].*$/, ""),
      half: opts.half || null,
      cap: opts.cap || null,
      categories: opts.cat || [],
      sections: [],
      nonCourse: !!opts.nonCourse,
      note: opts.note || null
    };
  }

  var NEW_CODE = "Listed as 'New' in the offerings document; course code not yet assigned.";

  /* ---------------- UG1 cores ---------------- */
  def("CS6.201", "Introduction to Software Systems (H)", "1-0-3-2", "Anil Nelakanti + Anoop Namboodiri",
      { half: "H" });
  def("CS1.201", "Data Structures and Algorithms", "3-1-3-5", "Lini Thomas + Kshitij Gajjar + Raghavendra GS");
  def("CS2.201", "Computer Systems Organization", "3-1-0-4", "Deepak Gangadharan + Abhishek Kumar Singh");
  def("CS3.303", "Introduction to IoT", "1-0-3-3", "Kavitha Vemuri + Sourav Garg");
  def("MA2.101", "Linear Algebra", "3-1-0-4", "Siddhartha Das + Gowtham Kurri + Atul Kumar Singh");
  def("EC2.103", "Analog Electronic Circuits", "3-1-3-5", "Zia Abbas");
  def("EC5.102", "Information and Communication", "3-1-0-4", "Arti Yardi");
  def("SC4.102", "Computing in Sciences II (H1)", "3-1-0-2", "Abhishek Deshpande", { half: "H1" });
  def("SC1.102", "Classical Mechanics (H1)", "3-1-0-2", "Diganta Das", { half: "H1" });
  def("SC1.101", "Electrodynamics (H2)", "3-1-0-2", "Diganta Das", { half: "H2" });
  def("SC2.101", "General and Structural Chemistry", "3-1-0-4", "Tapan Kumar Sau");
  def("CL1.102", "Introduction to Linguistics II", "3-1-0-4", "Aditi Mukherjee");
  def("CL3.101", "Computational Linguistics 1", "3-1-0-4", "Parameshwari Krishnamurthy");
  def("HS8.101", "Making of Contemporary World", "3-1-0-4", "Khaliq Parkar + Angarika Rakshit");
  def("HS0.201", "Thinking and Knowing in the Human Sciences-I", "3-1-0-4", "Ashwin J + Sushmita Banerji");
  def("GS0.301", "Introduction to Spatial Sciences & Technology (H2)", "3-1-0-2", "R C Prasad + Kuldeep Kurte",
      { half: "H2", cat: ["breadth-systems"],
        note: "Core for UG1 CGD; also a UG2 Systems/Applications breadth elective." });
  def("OC2.102", "Arts-2 (H1&H2)", "2-0-0-2", "Saroja TK (Coordinator)",
      { note: "Listed as H1 & H2 in the offerings document." });
  def("OC1.102", "Sports-2", "0-2-0-1", "Physical Education Centre");

  /* ---------------- UG2 cores ---------------- */
  def("CS6.301", "Design and Analysis of Software Systems", "3-1-0-4", "Karthik Vaidhyanathan");
  def("CS7.301", "Machine, Data and Learning", "3-1-0-4", "Naresh Manwani + Praveen P");
  def("HS8.102a", "Intro to Human Sciences (Section A: UG2 ECE/ECD/LED/CLD/CGD, UG3 CND)", "3-1-0-4",
      "Aniket Alam + Saurabh Todariya (Coordinators)",
      { note: "Co-taught by 6 HSRC teachers." });
  def("HS8.102b", "Intro to Human Sciences (Section B: UG2 CSE/CSD, LE-CSD)", "3-1-0-4",
      "Aniket Alam + Saurabh Todariya (Coordinators)",
      { note: "Co-taught by 6 HSRC teachers." });
  def("SC1.111a", "Science II (Section A: UG2 CSE/CSD)", "3-1-0-4", "Prabhakar B + Chittaranjan Hens");
  def("SC1.111b", "Science II (Section B: UG3 ECE/ECD/CLD/CHD/CGD)", "3-1-0-4", "Prabhakar B + Chittaranjan Hens");
  def("OC3.102", "Value Education II (H)", "0-2-0-2", "Indranil Ch + Saurabh Todariya (Coordinators)",
      { half: "H" });
  def("OC1.104", "Sports-4", "0-2-0-1", "Physical Education Centre",
      { note: "LED students register this as their Sports-2." });
  def("EC5.203", "Communication Theory", "3-1-0-4", "Sachin Chaudhari");
  def("EC2.202", "Electronics Workshop II", "0-1-3-4", "Rajeev Gangula + Hari Kumar K");
  def("EC2.204", "Intro to Processor Architecture (H1)", "3-1-0-2", "Priyesh Shukla", { half: "H1" });
  def("SC1.204", "Thermodynamics (H1)", "3-1-0-2", "Tapan Kumar Sau", { half: "H1" });
  def("SC1.205", "Statistical Mechanics (H2)", "3-1-0-2", "Marimuthu Krishnan", { half: "H2" });
  def("SC2.203", "Biomolecular Structures (H1)", "3-1-0-2", "Prabhakar Bhimalapuram", { half: "H1" });
  def("SC2.202", "Organic Chemistry (H2)", "3-1-0-2", "Prabhakar Bhimalapuram", { half: "H2" });
  def("SC4.111", "Science Lab II (H)", "0-0-3-2", "Tapan Kumar Sau + Chittaranjan Hens", { half: "H" });
  def("CL2.204", "Language Typology and Universals", "3-1-0-4", "Radhika Mamidi");
  def("HS0.302", "Research Methods in Human Sciences", "3-1-0-4", "Angarika Rakshit + Rajorshi Ray");
  def("HS1.211", "Literary Translation: Theory and Practice (H1)", "3-1-0-2", "Nazia Akhtar", { half: "H1" });
  def("GS3.401", "Geospatial for Sustainable Development (Project based)", "3-1-0-4",
      "Kiran Chand T (Coordinator)");

  /* ---------------- UG3 cores ---------------- */
  def("SC3.203", "Systems Biology (H2)", "3-1-0-2", "Vinod PK", { half: "H2" });

  /* ---------------- UG2 breadth electives (limit 90 per course) ----------------
     CSE/CSD (and LE-CSD) must take at least one from each bucket. */
  def("CS8.301", "Introduction to Information Security (H1)", "3-1-0-2", "Ashok Kumar Das",
      { half: "H1", cap: 90, cat: ["breadth-theory"] });
  def("EC5.205", "Introduction to Coding Theory (H1)", "3-1-0-2", "Arti Yardi",
      { half: "H1", cap: 90, cat: ["breadth-theory", "ecef-spc"] });
  def("CS1.305", "Introduction to Algorithms Engineering (H2)", "3-1-0-2", "Kishore Kothapalli",
      { half: "H2", cap: 90, cat: ["breadth-theory"] });
  def("CS9.312", "Introduction to Quantum Information and Computation (H1)", "3-1-0-2", "Uttam Singh",
      { half: "H1", cap: 90, cat: ["breadth-theory"] });
  def("CS1.306", "Numerical Algorithms (H2)", "3-1-0-2", "Pawan Kumar",
      { half: "H2", cap: 90, cat: ["breadth-theory"] });
  def("EC5.207", "The Mathematics of Information: Theory & Application (H2)", "3-1-0-2", "Prasad Krishnan",
      { half: "H2", cap: 90, cat: ["breadth-theory", "ecef-spc"] });
  def("CS6.303", "Foundations for Trustworthy Parallel Computing (H1)", "3-1-0-2", "Abhishek Kumar Singh",
      { half: "H1", cap: 90, cat: ["breadth-theory"] });
  def("CS7.303", "Digital Signal Analysis (H1)", "3-1-0-2", "Chiranjeevi Yarra",
      { half: "H1", cap: 90, cat: ["breadth-systems"], note: "Core for UG2 CLD." });
  def("CS4.302", "Data Visualisation (H1)", "2-0-1-2", "Vikram Pudi",
      { half: "H1", cap: 45, cat: ["breadth-systems"] });
  def("CS9.311", "Introduction to Brain and Cognition (H2)", "3-1-0-2", "Bapi Raju S",
      { half: "H2", cap: 90, cat: ["breadth-systems"] });
  def("CS7.302", "Computer Graphics (H2)", "3-1-0-2", "PJ Narayanan + Raghavendra GS",
      { half: "H2", cap: 90, cat: ["breadth-systems"] });
  def("CS3.307", "Performance Modeling of Computer Systems (H1)", "3-1-0-2", "Tejas Bodas",
      { half: "H1", cap: 90, cat: ["breadth-systems"] });
  def("EC4.202", "Intro to Robotics: Perception and Planning (H1)", "3-1-0-2", "K Madhava Krishna + Antony Thomas",
      { half: "H1", cap: 20, cat: ["breadth-systems", "ecef-robotics"],
        note: "Max 20 when taken as a CSE/CSD breadth elective." });

  /* ---------------- UG2 ECE/ECD/LED 2-credit stream foundation electives ----------------
     Two 2-credit courses from two different streams. */
  def("EC5.206", "Introduction to Statistical Signal Processing (H2)", "3-1-0-2", "Santosh Nannuru",
      { half: "H2", cat: ["ecef-spc"] });
  def("EC2.206", "Foundations of RF and Microwave Sensors (H2)", "3-1-0-2", "Andleeb Zahra",
      { half: "H2", cat: ["ecef-vlsi"] });
  def("EC2.207", "Intro to VLSI and Embedded Systems (H1)", "3-1-0-2", "Aftab Hussain (Coordinator)",
      { half: "H1", cat: ["ecef-vlsi"] });

  /* ---------------- Ethics 2 electives (UG4) ----------------
     Random selection on preferences; Basics of Ethics must be passed (A–D). Max 50 each. */
  var ETH = "Ethics 2 sub-elective: random selection based on preferences; requires a pass grade (A to D) in Basics of Ethics.";
  def("CS7.504", "Fairness, Privacy and Ethics in AI (H1)", "3-0-0-2", "Sujit Gujar",
      { half: "H1", cap: 50, cat: ["ethics2"], note: ETH });
  def("HS0.208", "Questions of Crime and Punishment in Literature (H2)", "3-0-0-2", "Nazia Akhtar",
      { half: "H2", cap: 50, cat: ["ethics2"], note: ETH });
  def("HS0.222", "Sustainable AI: Hardware, Software and Policy Landscape (H1)", "3-0-0-2",
      "Aakansha Natani + Karthik Vaidhyanathan + Priyesh Shukla",
      { half: "H1", cap: 50, cat: ["ethics2"], note: ETH });
  def("HS0.225", "Ethics in Applied Linguistics Research (H1)", "3-0-0-2", "Priya Prithviraj",
      { half: "H1", cap: 50, cat: ["ethics2"], note: ETH });
  def("HS0.210", "Literature and the Ethics of Telling a Story (H2)", "3-0-0-2", "Sushmita Banerji",
      { half: "H2", cap: 50, cat: ["ethics2"], note: ETH });
  def("HS0.223", "Thinking through design and use of artefacts (H2)", "3-0-0-2", "Ashwin Jayanti",
      { half: "H2", cap: 50, cat: ["ethics2"], note: ETH });
  def("HS0.224", "Algorithmic Ethics (H2)", "3-0-0-2", "Khaliq Parkar",
      { half: "H2", cap: 50, cat: ["ethics2"], note: ETH });

  /* ---------------- Bouquet courses (registration limit 150 unless noted) ---------------- */
  def("CS1.404", "Optimization Methods", "3-1-0-4", "Sujit Gujar",
      { cap: 150, cat: ["bouquet-theory"] });
  def("CS1.406", "Advanced Algorithms", "3-1-0-4", "Kishore Kothapalli + Girish Varma",
      { cap: 150, cat: ["bouquet-theory"] });
  def("CS8.401", "Principles of Information Security", "3-1-0-4", "Kannan Srinathan",
      { cap: 150, cat: ["bouquet-theory"], note: "Core for M.Tech I yr CSIS." });
  def("CS4.401", "Data Systems", "3-1-0-4", "Kamal Karlapalem",
      { cap: 160, cat: ["bouquet-systems"] });
  def("CS6.401", "Software Engineering", "3-1-0-4", "Raghu Reddy",
      { cap: 150, cat: ["bouquet-systems"], note: "Core for M.Tech I yr PDM." });
  def("CS3.401", "Distributed Systems", "3-1-0-4", "Suresh Purini",
      { cap: 150, cat: ["bouquet-systems"],
        note: "Prerequisite: Operating Systems. Networks desirable." });
  def("CS1.403", "Compilers", "3-1-0-4", "Venkatesh Choppella",
      { cap: 150, cat: ["bouquet-systems"] });
  def("CS7.403", "Statistical Methods in AI", "3-1-0-4", "Vineet Gandhi + CV Jawahar",
      { cap: 150, cat: ["bouquet-ai", "ece-spc", "ece-robotics"] });
  def("CS7.505", "Computer Vision", "3-1-0-4", "Makarand Tapaswi + Charu Sharma",
      { cap: 150, cat: ["bouquet-ai", "ece-spc", "ece-robotics", "cse-open"] });
  def("EC4.404", "Mechatronics System Design", "3-1-0-4", "Harikumar K + Antony Thomas",
      { cap: 150, cat: ["bouquet-cps", "ece-robotics"] });
  def("GS2.503", "Spatial Data Sciences", "3-1-0-4", "Kuldeep Kurte + K S Rajan",
      { cap: 150, cat: ["bouquet-itx", "cse-open"] });

  /* ---------------- Humanities (HSS) electives, UG3 & UG4 ----------------
     Random selection; max 50 each unless the document gives a number. */
  def("HS3.304", "Gutenberg Parenthesis", "3-1-0-4", "Aniket Alam",
      { cap: 25, cat: ["hss", "chd"] });
  def("HS4.303", "Digital Democracy and Data Governance in the EU", "3-1-0-4", "Aakansha Natani",
      { cap: 40, cat: ["hss", "chd"] });
  def("HS3.305", "Migrants and Migration in Modern South Asia", "3-1-0-4", "Isha Dubey",
      { cap: 50, cat: ["hss", "chd"] });
  def("HS4.301", "Environment and Politics in India", "3-1-0-4", "Radhika Krishnan",
      { cap: 40, cat: ["hss", "chd"] });
  def("HS0.306", "Debates in Indian Philosophy", "3-1-0-4", "Saurabh Todariya",
      { cap: 50, cat: ["hss", "chd"] });
  def("HS1.302", "Readings in Russian Literature", "3-1-0-4", "Nazia Akhtar",
      { cap: 40, cat: ["hss", "chd"] });
  def("HS8.304", "Digital City", "3-1-0-4", "Khaliq Parkar",
      { cap: 50, cat: ["hss", "chd"] });
  def("HS1.209", "Music, Language, Creativity", "3-1-0-4", "Saroja TK",
      { cap: 50, cat: ["hss", "chd"] });
  def("HS1.305", "Ethics of Witnessing", "3-1-0-4", "Subha Chakraburtty",
      { cap: 50, cat: ["hss", "chd"] });
  def("CS9.425", "Social Science Perspectives on HCI", "3-1-0-4", "Nimmi Rangaswamy",
      { cap: 50, cat: ["hss", "chd"] });
  def("HS7.301", "Science, Technology and Society", "3-1-0-4", "Radhika Krishnan",
      { cap: 25, cat: ["hss"], note: "Core for UG2 CHD; max 25 as an HSS elective." });

  /* ---------------- Science electives (random selection) ---------------- */
  def("SC4.411", "Machine Learning for Natural Sciences", "3-1-0-4", "Vinod PK + Deva Priyakumar + Prabhakar B",
      { cap: 20, cat: ["science", "cnd"] });
  def("SC2.301", "Physics of Soft Condensed Matter", "3-1-0-4", "Marimuthu Krishnan",
      { cap: 40, cat: ["science", "cnd"] });
  def("SC2.316", "Molecular Modeling and Simulations", "3-1-0-4", "Marimuthu Krishnan + Deva Priyakumar",
      { cap: 50, cat: ["science", "cnd"] });
  def("SC1.308", "The Universe Across Scales", "3-1-0-4", "Subhadip Mitra + Chittaranjan Hens + Diganta Das",
      { cap: 150, cat: ["science"] });
  def("SC1.420", "Introduction to Particle Physics", "3-1-0-4", "Subhadip Mitra",
      { cat: ["science", "cnd"] });
  def("SC3.316", "Mathematical Models in Biology", "3-1-0-4", "Abhishek Deshpande",
      { cat: ["science", "cnd"] });
  def("SC2.315", "Molecular Symmetry and Quantum Mechanics", "3-1-0-4", "Harjinder Singh",
      { cat: ["science"], note: "No enrolment limit." });
  def("SC5.450", "Mathematical Methods in Sciences", "3-1-0-4", "Monalisa Patra",
      { cat: ["science", "cnd"] });
  def("NEW-4", "Condensed Matter Physics with Ultracold atoms", "3-1-0-4", "Rukmani Bai",
      { area: "SC", cat: ["science"], note: NEW_CODE });
  def("SC3.404", "Molecular Biology", "3-1-0-4", "Jagan Pongubala", { cat: ["cnd"] });
  def("SC3.410", "NGS Data Analysis", "3-1-0-4", "Nita Parekh", { cat: ["cnd"] });

  /* ---------------- Math electives (random selection, max 50 each) ---------------- */
  def("MA4.303", "Linear Partial Differential Equations and Variational Calculus", "3-1-0-4",
      "Samyadeb Bhattacharya", { cap: 50, cat: ["math"] });
  def("MA7.501", "Continuous Variable Quantum Information Theory and Computation", "3-1-0-4",
      "Uttam Singh", { cap: 50, cat: ["math"] });
  def("CS1.502", "Information-Theoretic Methods in Computer Science", "3-1-0-4", "Gowtham Kurri",
      { cap: 50, cat: ["math", "ece-spc", "cse-open"],
        note: "Max 50 applies when taken as a Maths elective." });
  def("MA4.301", "Differential Equations", "3-1-0-4", "Lakshmi Burra", { cap: 50, cat: ["math"] });

  /* ---------------- CLD electives ---------------- */
  def("CL5.401", "Topics in SSMT", "3-1-0-4", "Chiranjeevi Yarra + Parameswari Krishnamurthy",
      { cat: ["cld"] });
  def("EC5.408", "Speech Signal Processing", "3-1-0-4", "Anil Kumar Vuppala",
      { cat: ["cld", "ece-spc"] });
  def("CL3.408", "Applications of Language Models", "3-1-0-4", "Vasudeva Varma",
      { cap: 25, cat: ["cld", "cse-open"] });
  def("CL3.409", "Evaluation Methods for NLP (H2)", "3-1-0-2", "Parameswari Krishnamurthy + Manish Shrivastava",
      { half: "H2", cat: ["cld", "cse-open"] });
  def("NEW-1", "Multimodal NLP", "3-1-0-4", "Chiranjeevi Yarra",
      { area: "CL", cat: ["cld", "cse-open"], note: NEW_CODE });
  def("CL3.406", "Linguistic Data 3: Data Modeling in ILs (H1)", "3-1-0-2", "Rajakrishnan P Rajkumar",
      { half: "H1", cat: ["cld"], note: "Only for B.Tech CLD students." });

  /* ---------------- ECE Star / Stream electives (also CSE / Open) ---------------- */
  // Signal Processing & Communication: CS7.505, CS7.403, CS1.502, EC5.408 above, plus:
  def("EC5.414", "Machine Learning for Communication", "3-1-0-4", "Saikiran Bulusu",
      { cat: ["ece-spc", "cse-open"] });
  // VLSI & Embedded Systems
  def("EC2.401", "Analog IC Design", "3-1-0-4", "Abhishek Srivastava", { cat: ["ece-vlsi", "cse-open"] });
  def("EC2.502", "Flexible Electronics", "3-1-0-4", "Aftab Hussain", { cat: ["ece-vlsi", "cse-open"] });
  def("EC2.413", "Instrumentation and Devices", "3-1-0-4", "Anshu Sarje", { cat: ["ece-vlsi", "cse-open"] });
  def("EC2.412", "CMOS Oscillator Design", "3-1-0-4", "Abhishek Pullela", { cat: ["ece-vlsi", "cse-open"] });
  // Robotics: CS7.505, CS7.403, EC4.404 above, plus:
  def("EC4.403", "Robotics: Planning and Navigation", "3-1-0-4", "Madhava Krishna K + Antony Thomas",
      { cat: ["ece-robotics", "cse-open"] });

  /* ---------------- CSE / Open electives ---------------- */
  def("CS7.401", "Introduction to NLP", "3-1-0-4", "Hrishikesh Rajesh Terdalkar",
      { cat: ["cse-open"], note: "Core for UG2 CLD." });
  def("CS8.403", "System and Network Security", "3-1-0-4", "Ashok Kumar Das",
      { cat: ["cse-open"], note: "Core for M.Tech I yr CSIS." });
  def("CS8.402", "Information Security Audit and Assurance", "3-1-0-4", "Shatrunjay Rawat",
      { cat: ["cse-open"], note: "Core for M.Tech II yr CSIS." });
  def("CS1.408", "Introduction to Game Theory", "3-1-0-4", "Sujit Gujar", { cat: ["cse-open"] });
  def("CS3.404", "Internals of Application Servers", "3-1-0-4", "Ramesh Loganathan + Arjun Rajashekar",
      { cat: ["cse-open"] });
  def("CG3.501", "Cognitive Science and AI", "3-1-0-4", "Bapi Raju S", { cat: ["cse-open"] });
  def("CG3.403", "Behavioral Research: Statistical Methods", "3-0-1-4", "Vishnu Sreekumar + Bapi Raju S",
      { cat: ["cse-open"] });
  def("CG2.401", "Cognitive Neuroscience", "3-1-0-4", "Bhaktee Dongaonkar", { cap: 80, cat: ["cse-open"] });
  def("CS7.603", "Topics in Reinforcement Learning", "3-1-0-4", "Tejas Bodas + Harikumar K",
      { cat: ["cse-open"] });
  def("CG9.600", "Cognitive Science Seminar (for Cognitive Science students)", "0-2-0-0",
      "Bapi Raju S + Priyanka Srivastava", { cat: ["cse-open"], nonCourse: true });
  def("CL2.404", "Computational Psycholinguistics", "3-1-0-4", "Rajakrishnan P Rajkumar", { cat: ["cse-open"] });
  def("CS7.405", "Responsible & Safe AI Systems", "3-1-0-4", "Ponnurangam Kumaraguru", { cat: ["cse-open"] });
  def("GS1.401", "Optical Remote Sensing", "3-1-0-4", "R C Prasad + Kiran Chand T",
      { cat: ["cse-open"], note: "Core for UG2 CGD." });
  def("CG4.401", "Music, Mind, and Technology", "3-1-0-4", "Vinoo Alluri", { cat: ["cse-open"] });
  def("EC5.411", "Modern Coding Theory", "3-1-0-4", "Prasad Krishnan", { cat: ["cse-open"] });

  /* ---------------- Open electives ---------------- */
  def("CG1.403", "Learning and Memory", "3-1-0-4", "Bhaktee Dongaonkar", { cap: 70, cat: ["open"] });
  def("CG5.405", "Art, Vision, & Feelings (H2)", "3-1-0-2", "Priyanka Srivastava + Shrikant Bharadwaj (LVPEI)",
      { half: "H2", cat: ["open"] });
  def("CS6.504", "Law, Technology and Digital Governance", "3-1-0-4", "Raman Saxena + G.K. Goswami",
      { cat: ["open"] });
  def("MA8.402", "Mathematics for Finance", "3-1-0-4", "Sukrit Mittal",
      { cap: 25, cat: ["open"], note: "Selection by faculty." });
  def("CS9.433", "Hydro Informatics & Climate Sciences", "3-1-0-4", "Shaik Rehana",
      { cap: 40, cat: ["open"] });
  def("CS5.401", "User Interaction and Usability of Digital Products", "3-1-0-4", "Raman Saxena",
      { cat: ["open", "pdm"] });
  def("CE8.401", "Disaster Management", "3-1-0-4", "Jofin George + Shubham Singhal", { cap: 40, cat: ["open"] });
  def("CS9.441", "Applied Attention Theory", "3-1-0-4", "Priyanka Srivastava", { cat: ["open"] });
  def("NEW-3", "Cyber Law and Cyber Security", "3-1-0-4", "K.V.K. Santhy + Aakansha Natani + Rohit Negi",
      { area: "OE", cap: 30, cat: ["open"],
        note: NEW_CODE + " Meets in the A4 slot (Mon/Thu 2 PM) plus one Wednesday slot; attending all three sessions is mandatory." });

  /* ---------------- M.Tech PDM electives (open to others, max 20) ---------------- */
  var PDM = "M.Tech PDM elective; open to other students as an Open Elective (max 20 students).";
  def("PD1.411", "Product Design Workshop", "3-1-0-4", "Prakash Yalla + Raghu Reddy",
      { cap: 20, cat: ["pdm"], note: PDM });
  def("NEW-2", "Speculative Design", "3-1-0-4", "Raman Saxena + Guest Faculty",
      { area: "PD", cap: 20, cat: ["pdm"], note: NEW_CODE + " " + PDM });
  def("CS9.424", "Technology Product Entrepreneurship", "3-1-0-4",
      "Ramesh Loganathan + Prakash Yalla + Satish Kathirisett", { cap: 20, cat: ["pdm"], note: PDM });
  def("PD2.403", "Sustainable Growth Strategy for Startup (H1)", "3-1-0-2", "Sridhar Kalyanasundaram",
      { half: "H1", cap: 20, cat: ["pdm"], note: PDM });
  def("PD2.502", "Product Lifecycle Management (H2)", "3-1-0-4", "Ravi Warrier",
      { half: "H2", cap: 20, cat: ["pdm"],
        note: PDM + " Credits are listed as 3-1-0-4 despite the H2 marking." });

  /* ---------------- PG CASE electives ---------------- */
  def("CE1.603", "Advanced Structural Analysis", "3-1-0-4", "Pravin Kumar Venkat Rao", { cat: ["pg-case"] });
  def("CE1.608", "Analysis & Design of Precast and Prestressed Structures", "3-1-0-4", "Shubham Singhal",
      { cat: ["pg-case"] });
  def("CE1.609", "Analysis and Design of Bridge Infrastructure", "3-1-0-4", "Jofin George",
      { cat: ["pg-case"] });
  def("CE1.601", "Earthquake Engineering", "3-1-0-4", "Sunitha Palissery", { cat: ["pg-case"] });

  /* ---------------- PG cores (dashboard visibility) ---------------- */
  def("CS0.302", "Computing Tools", "3-1-3-4", "Ravi Kiran Sarvadevabhatla",
      { note: "Core for M.Tech I yr CASE." });
  def("PD2.422", "Business Finance", "3-1-0-4", "Sarath Babu A (Guest Faculty)",
      { note: "Core for M.Tech I yr PDM." });

  /* ---------------- Honours / BTP / thesis / seminars / projects ----------------
     nonCourse: hidden from the dashboard; kept so programme cores resolve. */
  def("CS9.301", "BTP I", "0-2-6-2", "", { nonCourse: true });
  def("CS9.303", "CSE-Honours Project 2", "0-2-6-2", "", { nonCourse: true });
  def("EC9.301", "BTP-I (ECE)", "0-2-6-2", "", { nonCourse: true });
  def("EC9.303", "ECE-Honours Project 2", "0-2-6-2", "", { nonCourse: true });
  def("SC9.303", "CNS-Honours Project II", "0-2-6-2", "", { nonCourse: true });
  def("CL9.303", "CL-Honours Project 2", "0-2-6-2", "", { nonCourse: true });
  def("HS9.303", "HS-Honours Project 2", "0-2-6-2", "", { nonCourse: true });
  def("GS9.303", "Honours Project 2 (CGD)", "0-2-6-2", "", { nonCourse: true });
  def("CS9.403", "CS-Honours Project 4", "0-2-6-2", "", { nonCourse: true });
  def("EC9.403", "ECE-Honours Project 4", "0-2-6-2", "", { nonCourse: true });
  def("SC9.403", "CNS-Honours Project 4", "0-2-6-2", "", { nonCourse: true });
  def("CL9.403", "CL-Honours Project 4", "0-2-6-2", "", { nonCourse: true });
  def("HS9.403", "HS-Honours Project 4", "0-2-6-2", "", { nonCourse: true });
  def("SC9.600", "CCNSB Seminar", "0 Cr", "Abhishek Deshpande", { nonCourse: true });
  def("OC9.600", "Institute Seminar", "1 Cr", "", { nonCourse: true });
  def("CS9.605", "Thesis (CSD)", "12 Cr", "", { nonCourse: true });
  def("EC9.605", "Thesis (ECD)", "12 Cr", "", { nonCourse: true });
  def("CL9.605", "Thesis (CLD)", "12 Cr", "", { nonCourse: true });
  def("SC9.605", "Thesis (CND)", "12 Cr", "", { nonCourse: true });
  def("HS9.605", "Thesis (CHD)", "12 Cr", "", { nonCourse: true });
  def("CS9.412", "PG-Project (CSIS)", "0-2-6-4", "", { nonCourse: true });
  def("CE9.403", "CASE Project", "0-2-6-12", "", { nonCourse: true });
  def("PD9.404", "PDM Project-4", "0-2-6-8", "", { nonCourse: true });
  def("PD9.602", "PDM Seminar", "0 Cr", "Guest Speakers", { nonCourse: true });

  /* ---------------- Categories ---------------- */
  var CATEGORIES = {
    "math":            { label: "Maths Elective", group: "Electives" },
    "science":         { label: "Science Elective", group: "Electives" },
    "hss":             { label: "Humanities (HSS) Elective", group: "Electives" },
    "cse-open":        { label: "CSE / Open Elective", group: "Electives" },
    "open":            { label: "Open Elective", group: "Electives" },
    "ethics2":         { label: "Ethics 2 Elective (UG4)", group: "Electives" },
    "breadth-theory":  { label: "UG2 Breadth - Theory/Foundations", group: "UG2 Breadth (CSE/CSD)" },
    "breadth-systems": { label: "UG2 Breadth - Systems/Applications", group: "UG2 Breadth (CSE/CSD)" },
    "ecef-spc":        { label: "UG2 ECE Foundation - Signal Processing & Comms", group: "UG2 ECE Foundation (2 Cr)" },
    "ecef-robotics":   { label: "UG2 ECE Foundation - Robotics", group: "UG2 ECE Foundation (2 Cr)" },
    "ecef-vlsi":       { label: "UG2 ECE Foundation - VLSI & Embedded", group: "UG2 ECE Foundation (2 Cr)" },
    "bouquet-theory":  { label: "Bouquet - Theory", group: "Bouquet" },
    "bouquet-systems": { label: "Bouquet - Systems", group: "Bouquet" },
    "bouquet-ai":      { label: "Bouquet - AI", group: "Bouquet" },
    "bouquet-cps":     { label: "Bouquet - CPS", group: "Bouquet" },
    "bouquet-itx":     { label: "Bouquet - IT+X", group: "Bouquet" },
    "ece-spc":         { label: "ECE - Signal Processing & Comms", group: "ECE Star / Streams" },
    "ece-vlsi":        { label: "ECE - VLSI & Embedded", group: "ECE Star / Streams" },
    "ece-robotics":    { label: "ECE - Robotics", group: "ECE Star / Streams" },
    "chd":             { label: "For CHD Students", group: "Branch Lists" },
    "cnd":             { label: "For CND Students", group: "Branch Lists" },
    "cld":             { label: "For CLD Students", group: "Branch Lists" },
    "pg-case":         { label: "PG CASE Elective", group: "PG Lists" },
    "pdm":             { label: "M.Tech PDM Elective", group: "PG Lists" }
  };

  /* ---------------- Programmes (UG) ----------------
     required = this semester's fixed core courses. totalCredits = the
     programme's semester total from the offerings doc (cores + the elective
     slots it lists). Used for "Core for" in the course details now, and by
     the timetable builder once the Spring timetable is published. */
  var PROGRAMMES = {
    "ug1-cse": { label: "B.Tech I yr - CSE / CSD", year: 1,
      required: ["CS6.201", "CS1.201", "CS2.201", "CS3.303", "MA2.101", "OC2.102", "OC1.102"],
      totalCredits: "21" },
    "ug1-ece": { label: "B.Tech I yr - ECE / ECD", year: 1,
      required: ["EC2.103", "CS1.201", "MA2.101", "EC5.102", "OC2.102", "OC1.102"],
      totalCredits: "21" },
    "ug1-cnd": { label: "B.Tech I yr - CND", year: 1,
      required: ["CS6.201", "CS1.201", "MA2.101", "SC4.102", "SC1.102", "SC1.101", "SC2.101", "OC2.102", "OC1.102"],
      totalCredits: "24" },
    "ug1-cld": { label: "B.Tech I yr - CLD", year: 1,
      required: ["MA2.101", "CS6.201", "CS1.201", "CS2.201", "CL1.102", "CL3.101", "OC2.102", "OC1.102"],
      totalCredits: "26" },
    "ug1-chd": { label: "B.Tech I yr - CHD", year: 1,
      required: ["MA2.101", "CS6.201", "CS1.201", "HS8.101", "HS0.201", "OC2.102", "OC1.102"],
      totalCredits: "22" },
    "ug1-cgd": { label: "B.Tech I yr - CGD", year: 1,
      required: ["MA2.101", "CS3.303", "CS6.201", "CS1.201", "CS2.201", "GS0.301", "OC2.102", "OC1.102"],
      totalCredits: "23" },

    "ug2-cse": { label: "B.Tech II yr - CSE / CSD", year: 2,
      required: ["CS6.301", "CS7.301", "HS8.102b", "SC1.111a", "OC3.102", "OC1.104"],
      electiveCredits: 6, electiveNote: "3 breadth electives (2 Cr each), at least one per bucket",
      totalCredits: "25" },
    "le-csd-1": { label: "LE-CSD-2K26 I yr", year: 2,
      required: ["CS6.301", "CS7.301", "HS8.102b", "OC3.102", "OC1.102"],
      electiveCredits: 10, electiveNote: "3 breadth electives (2 Cr each) + Open Elective-1",
      totalCredits: "25" },
    "ug2-ece": { label: "B.Tech II yr - ECE / ECD & LED-2K26 I yr", year: 2,
      required: ["EC5.203", "EC2.202", "EC2.204", "HS8.102a", "OC3.102", "OC1.104"],
      electiveCredits: 4, electiveNote: "two 2-credit stream foundation electives from two different streams",
      totalCredits: "21" },
    "ug2-cnd": { label: "B.Tech II yr - CND", year: 2,
      required: ["CS2.201", "CS7.301", "CS6.301", "SC1.204", "SC1.205", "SC2.203", "SC2.202", "SC4.111",
                 "OC3.102", "OC1.104"],
      totalCredits: "25" },
    "ug2-cld": { label: "B.Tech II yr - CLD", year: 2,
      required: ["CL2.204", "CS7.401", "CS7.303", "CS6.301", "CS7.301", "HS8.102a", "OC3.102", "OC1.104"],
      totalCredits: "25" },
    "ug2-chd": { label: "B.Tech II yr - CHD", year: 2,
      required: ["CS2.201", "CS7.301", "CS6.301", "HS0.302", "HS7.301", "HS1.211", "OC3.102", "OC1.104"],
      totalCredits: "25" },
    "ug2-cgd": { label: "B.Tech II yr - CGD", year: 2,
      required: ["GS1.401", "GS3.401", "CS7.301", "CS6.301", "HS8.102a", "OC1.104", "OC3.102"],
      electiveCredits: 2, electiveNote: "Theory/Foundation breadth elective",
      totalCredits: "25" },

    "ug3-cse": { label: "B.Tech III yr - CSE", year: 3,
      required: ["CS9.301"], electiveCredits: 16,
      electiveNote: "2 Bouquet + HSS Elective-2 + Open Elective-2 (BTP I or CSE-Honours Project 2)",
      totalCredits: "18" },
    "ug3-csd": { label: "B.Tech III yr - CSD & LCD-2K25 II yr", year: 3,
      required: ["CS9.303"], electiveCredits: 20,
      electiveNote: "2 Bouquet + HSS-2 + Open-2 (3 for LCD) + Stream-2",
      totalCredits: "22" },
    "ug3-ece": { label: "B.Tech III yr - ECE", year: 3,
      required: ["SC1.111b", "EC9.301"], electiveCredits: 12,
      electiveNote: "Open-2 + Star/Stream-2 + HSS-2 (BTP-I or ECE-Honours Project 2)",
      totalCredits: "18" },
    "ug3-ecd": { label: "B.Tech III yr - ECD & LED-2K25 II yr", year: 3,
      required: ["SC1.111b", "EC9.303"], electiveCredits: 16,
      electiveNote: "Open-2 + Star/Stream-2 + Star/Stream-3 + HSS-2",
      totalCredits: "22" },
    "ug3-cnd": { label: "B.Tech III yr - CND", year: 3,
      required: ["SC9.303", "HS8.102a", "SC3.203", "SC9.600"], electiveCredits: 12,
      electiveNote: "CNS Elective-1, CNS Elective-2, CS Elective-2",
      totalCredits: "20" },
    "ug3-cld": { label: "B.Tech III yr - CLD", year: 3,
      required: ["SC1.111b", "CL9.303"], electiveCredits: 16,
      electiveNote: "CL-Stream-1 + CS-1 + Open-1 + HSS-2",
      totalCredits: "22" },
    "ug3-chd": { label: "B.Tech III yr - CHD", year: 3,
      required: ["HS9.303", "SC1.111b"], electiveCredits: 16,
      electiveNote: "CS-2 + CS-3 + Open-1 + HSS-3",
      totalCredits: "22" },
    "ug3-cgd": { label: "B.Tech III yr - CGD", year: 3,
      required: ["SC1.111b", "GS9.303"], electiveCredits: 14,
      electiveNote: "Theory/Foundation breadth-2 (2 Cr) + HSS-1 + CS/Bouquet-1 + GS Stream-2",
      totalCredits: "20" },

    "ug4-cse": { label: "B.Tech IV yr - CSE", year: 4,
      required: [], electiveCredits: 18,
      electiveNote: "Bouquet Core 5 + Ethics 2 (2 Cr) + Open-5 + HSS-3 + Science-2; +2 Cr HP4 for Honours",
      totalCredits: "18" },
    "ug4-csd": { label: "B.Tech IV yr - CSD & LCD-2K24 III yr", year: 4,
      required: ["CS9.403"], electiveCredits: 18,
      electiveNote: "Bouquet Core 5 + Ethics 2 (2 Cr) + Open-5 + HSS-3 + Science-2",
      totalCredits: "20" },
    "ug4-ece": { label: "B.Tech IV yr - ECE", year: 4,
      required: [], electiveCredits: 18,
      electiveNote: "Ethics 2 (2 Cr) + Open-4 + Open-5 + Science-2 + HSS-3; +2 Cr HP4 for Honours",
      totalCredits: "18" },
    "ug4-ecd": { label: "B.Tech IV yr - ECD & LED-2K24 III yr", year: 4,
      required: ["EC9.403"], electiveCredits: 22,
      electiveNote: "Ethics 2 (2 Cr) + Open-4 + Open-5 + Science-2 + HSS-3 + Stream-6",
      totalCredits: "24" },
    "ug4-cnd": { label: "B.Tech IV yr - CND", year: 4,
      required: ["SC9.403", "SC9.600"], electiveCredits: 18,
      electiveNote: "Ethics 2 (2 Cr) + CNS-4 + CNS-5 + CS-5 + HSS-1",
      totalCredits: "20" },
    "ug4-cld": { label: "B.Tech IV yr - CLD", year: 4,
      required: ["CL9.403"], electiveCredits: 16,
      electiveNote: "Ethics 2 (2 Cr) + Maths + CL-4 (2 Cr) + CS-4 + Open-3",
      totalCredits: "18" },
    "ug4-chd": { label: "B.Tech IV yr - CHD", year: 4,
      required: ["HS9.403"], electiveCredits: 14,
      electiveNote: "Ethics 2 (2 Cr) + HSS-6 + Open-4 + CS-5",
      totalCredits: "18" },

    "ug5-csd": { label: "B.Tech V yr - CSD & LE-CSD-2K23 IV yr", year: 5,
      required: ["CS9.605", "OC9.600"], totalCredits: "13" },
    "ug5-ecd": { label: "B.Tech V yr - ECD & LE-ECD-2K23 IV yr", year: 5,
      required: ["EC9.605", "OC9.600"], totalCredits: "13" },
    "ug5-cld": { label: "B.Tech V yr - CLD", year: 5,
      required: ["CL9.605", "OC9.600"], totalCredits: "13" },
    "ug5-cnd": { label: "B.Tech V yr - CND", year: 5,
      required: ["SC9.605", "SC9.600"], electiveCredits: 4, electiveNote: "Open Elective 1",
      totalCredits: "16" },
    "ug5-chd": { label: "B.Tech V yr - CHD", year: 5,
      required: ["HS9.605", "OC9.600"], totalCredits: "13" }
  };

  window.COURSE_DATA = {
    meta: {
      semester: "Spring 2027 (2026-27 Semester II)",
      offeringsVersion: "V1 (24 November 2026)",
      timetableVersion: null,
      syllabusVersion: "Spring 2026 syllabus V1 (04 Dec 2025), used as a stand-in",
      // Shown in the course details while there is no timetable / syllabus.
      scheduleMissing: "Will Be Updated Once document is available",
      syllabusMissing: "Will be updated once Syllabus doc is released.",
      // Course details come from the Spring 2026 syllabus (js/syllabi-s26.js).
      syllabusSource: "Spring 2026",
      syllabusNote: "Details about the Course are based on 26 Spring Syllabus and might not be completely accurate for 27 Spring"
    },
    periods: PERIODS,
    courses: COURSES,
    categories: CATEGORIES,
    programmes: PROGRAMMES
  };
})();
