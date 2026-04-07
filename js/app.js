// ── Helpers ───────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function pick10(pool) { return shuffle(pool).slice(0, 10); }
function shuffleQ(q) {
  const idxMap = q.c.map((_, i) => i);
  const sh     = shuffle(idxMap);
  return { ...q, c: sh.map(i => q.c[i]), a: sh.indexOf(q.a) };
}
function getGrade(score, max) {
  const p = (score / max) * 100;
  if (p >= 90) return 'A+';
  if (p >= 80) return 'A';
  if (p >= 70) return 'B+';
  if (p >= 60) return 'B';
  if (p >= 50) return 'C';
  if (p >= 40) return 'D';
  return 'F';
}
function finalMarks(raw) {
  return Math.round((raw / COLLEGE.testMarks) * COLLEGE.totalMarks * 10) / 10;
}
function pct(a, b) { return b ? Math.round((a / b) * 100) : 0; }

// ── Persistence ───────────────────────────────────────
const DB_KEY = 'aiml_portal_v3';
let DB = { users: {}, attempts: {} };
function saveDB() {
  try { localStorage.setItem(DB_KEY, JSON.stringify(DB)); } catch (e) {}
}
function loadDB() {
  try {
    const d = localStorage.getItem(DB_KEY);
    if (d) DB = JSON.parse(d);
  } catch (e) {}
}
loadDB();

// ── Constants ─────────────────────────────────────────
const SECS       = ['b', 'i', 'a'];
const SLABELS    = ['Beginner', 'Intermediate', 'Advanced'];
const SEC_COLORS = ['#7f77dd', '#1d9e75', '#d85a30'];
const SEC_LBL_C  = ['#534ab7', '#0f6e56', '#993c1d'];
const ADMIN_PASS = 'faculty123';

// ── App state ─────────────────────────────────────────
let session       = { user: null, view: 'home' };
let testState     = {};
let questions     = {};
let visCount      = 0;
let autoSubmitted = false;
let warnMsg       = '';
let warnVisible   = false;
let timerInterval = null;
let timeLeft      = COLLEGE.duration * 60;
let adminTab      = 'overview';

// ── Anti-cheat: tab visibility ─────────────────────────
document.addEventListener('visibilitychange', () => {
  if (session.view !== 'test' || autoSubmitted || testState.finished) return;
  if (document.hidden) {
    visCount++;
    if (visCount >= 3) {
      autoSubmitted = true;
      testState.finished = true;
      clearInterval(timerInterval);
      submitTest(true);
      return;
    }
    warnVisible = true;
    warnMsg = `Warning ${visCount}/3: Tab switch detected! ${3 - visCount} more will auto-submit your exam.`;
    render();
  }
});

// ── Router ────────────────────────────────────────────
function go(view) { session.view = view; render(); }

function render() {
  const el = document.getElementById('app');
  switch (session.view) {
    case 'home':      el.innerHTML = viewHome();       break;
    case 'register':  el.innerHTML = viewRegister();   break;
    case 'login':     el.innerHTML = viewLogin();      break;
    case 'dashboard': el.innerHTML = viewDashboard();  break;
    case 'test':      el.innerHTML = viewTest();       break;
    case 'result':    el.innerHTML = viewResult();     break;
    case 'admin':     el.innerHTML = viewAdminLogin(); break;
    case 'adminDash': el.innerHTML = viewAdminDash();  break;
  }
}

// ══════════════════════════════════════════════════════
// VIEWS
// ══════════════════════════════════════════════════════

function viewHome() {
  return `
  <div class="portal-header">
    <div class="sub">${COLLEGE.code} &nbsp;·&nbsp; ${COLLEGE.department}</div>
    <h1>${COLLEGE.name}</h1>
    <p>${COLLEGE.subject}</p>
  </div>
  <div class="grid4" style="margin-bottom:1.5rem">
    <div class="metric"><div class="metric-lbl">Duration</div><div class="metric-val">${COLLEGE.duration} min</div></div>
    <div class="metric"><div class="metric-lbl">Questions</div><div class="metric-val">30</div></div>
    <div class="metric"><div class="metric-lbl">Sections</div><div class="metric-val">3</div></div>
    <div class="metric"><div class="metric-lbl">Total marks</div><div class="metric-val">${COLLEGE.totalMarks}</div></div>
  </div>
  <div class="card">
    <h2 style="margin-bottom:10px">Exam instructions</h2>
    <ul class="instr">
      <li>30 questions across 3 sections — 10 Beginner + 10 Intermediate + 10 Advanced</li>
      <li>Each correct answer = 1 raw mark. Final score converted to ${COLLEGE.totalMarks} marks</li>
      <li>Conversion formula: (raw score / 30) × 20</li>
      <li>Switching tabs or minimizing 3 times will <strong>auto-submit</strong> your exam</li>
      <li>Questions are fully randomized — unique for every student every attempt</li>
      <li>One attempt only per registration — results are saved permanently</li>
      <li>Timer: ${COLLEGE.duration} minutes. Exam auto-submits when time runs out</li>
    </ul>
  </div>
  <div class="tab-row">
    <div class="tab active" onclick="go('login')">Student login</div>
    <div class="tab" onclick="go('register')">New registration</div>
  </div>
  <div style="text-align:center;margin-top:1rem">
    <button class="btn-link" onclick="go('admin')">Faculty / Admin access</button>
  </div>`;
}

function viewRegister() {
  return `
  <div class="portal-header">
    <h1>Student registration</h1>
    <p>${COLLEGE.subject} &nbsp;·&nbsp; ${COLLEGE.code}</p>
  </div>
  <div class="card">
    <div class="field"><label>Full name</label>
      <input id="r_name" placeholder="e.g. Rahul Sharma" /></div>
    <div class="field"><label>Student ID / Roll number</label>
      <input id="r_id" placeholder="e.g. 2024CS101" /></div>
    <div class="field"><label>Branch / Department</label>
      <select id="r_branch">
        <option value="">Select branch</option>
        <option>Computer Science &amp; Engineering</option>
        <option>Information Technology</option>
        <option>Electronics &amp; Communication</option>
        <option>Mechanical Engineering</option>
        <option>Electrical Engineering</option>
        <option>Civil Engineering</option>
        <option>Data Science</option>
        <option>Artificial Intelligence &amp; ML</option>
        <option>Other</option>
      </select></div>
    <div class="field"><label>Semester</label>
      <select id="r_sem">
        <option value="">Select semester</option>
        ${[1,2,3,4,5,6,7,8].map(s => `<option>Semester ${s}</option>`).join('')}
      </select></div>
    <div class="field"><label>Email address</label>
      <input id="r_email" type="email" placeholder="student@college.edu" /></div>
    <div class="field"><label>Password</label>
      <input id="r_pass" type="password" placeholder="Create a password (min 6 characters)" /></div>
    <div id="r_err" class="err"></div>
    <button class="btn-primary" onclick="doRegister()">Create account &amp; login</button>
    <div class="divider"><span>Already registered?</span></div>
    <button class="btn-outline full" onclick="go('login')">Login to your account</button>
  </div>
  <div style="text-align:center;margin-top:12px">
    <button class="btn-link" onclick="go('home')">Back to home</button>
  </div>`;
}

function viewLogin() {
  return `
  <div class="portal-header">
    <h1>Student login</h1>
    <p>${COLLEGE.subject} &nbsp;·&nbsp; ${COLLEGE.code}</p>
  </div>
  <div class="card">
    <div class="field"><label>Student ID / Roll number</label>
      <input id="l_id" placeholder="e.g. 2024CS101" /></div>
    <div class="field"><label>Password</label>
      <input id="l_pass" type="password" placeholder="Your password"
        onkeydown="if(event.key==='Enter')doLogin()" /></div>
    <div id="l_err" class="err"></div>
    <button class="btn-primary" onclick="doLogin()">Login</button>
    <div class="divider"><span>New student?</span></div>
    <button class="btn-outline full" onclick="go('register')">Register now</button>
  </div>
  <div style="text-align:center;margin-top:12px">
    <button class="btn-link" onclick="go('home')">Back to home</button>
  </div>`;
}

function viewDashboard() {
  const u     = session.user;
  const att   = DB.attempts[u.id];
  const fm    = att ? finalMarks(att.score) : null;
  const grade = att ? getGrade(fm, COLLEGE.totalMarks) : null;

  return `
  <div class="portal-header">
    <div class="sub">${COLLEGE.code}</div>
    <h1>Welcome, ${u.name.split(' ')[0]}</h1>
    <p>${u.branch} &nbsp;·&nbsp; ${u.sem} &nbsp;·&nbsp; Roll: ${u.id}</p>
  </div>
  ${att ? `
  <div class="card card-success">
    <div style="font-size:13px;font-weight:500;color:var(--green-dk);margin-bottom:12px">Exam completed &nbsp;·&nbsp; ${att.date}</div>
    <div class="grid3">
      <div class="metric"><div class="metric-lbl">Raw score</div><div class="metric-val">${att.score}/30</div></div>
      <div class="metric"><div class="metric-lbl">Final marks</div><div class="metric-val">${fm}/20</div></div>
      <div class="metric"><div class="metric-lbl">Grade</div><div class="metric-val">${grade}</div></div>
    </div>
    <div class="grid3">
      ${SLABELS.map((l, i) => `
        <div class="metric">
          <div class="metric-lbl">${l}</div>
          <div class="metric-val">${att.sectionScores[i]}/10</div>
          <div class="sec-bar-wrap">
            <div class="sec-bar" style="width:${pct(att.sectionScores[i],10)}%;background:${SEC_COLORS[i]}"></div>
          </div>
        </div>`).join('')}
    </div>
    ${att.autoSubmitted ? `<div class="warn-bar" style="margin-bottom:8px"><div class="warn-icon">!</div>Test was auto-submitted due to 3 tab switches.</div>` : ''}
    <button class="btn-outline" onclick="go('result')">View detailed result</button>
  </div>
  ` : `
  <div class="card">
    <h2 style="margin-bottom:8px">Your mid-term exam</h2>
    <p style="margin-bottom:16px;line-height:1.8">
      30 questions &nbsp;·&nbsp; ${COLLEGE.duration} minutes &nbsp;·&nbsp; 3 sections<br>
      Scored out of 30, converted to ${COLLEGE.totalMarks} marks &nbsp;·&nbsp; One attempt only
    </p>
    <button class="btn-primary" onclick="startTest()">Start exam now</button>
  </div>
  `}
  <button class="btn-outline full" onclick="doLogout()">Logout</button>`;
}

// ── TEST VIEW (with MCQ color feedback) ───────────────
function viewTest() {
  if (testState.finished) return viewResult();

  const s     = testState.sec;
  const q     = questions[SECS[s]][testState.qIdx];
  const pBar  = Math.round((testState.qIdx / 10) * 100);
  const total = testState.score.reduce((a, b) => a + b, 0);
  const mins  = Math.floor(timeLeft / 60);
  const secs  = timeLeft % 60;
  const tDanger = timeLeft <= 300;

  const choiceHTML = q.c.map((opt, i) => {
    let cls  = 'cbtn';
    let icon = '';
    if (testState.answered) {
      if (i === q.a) {
        cls  = 'cbtn correct';
        icon = '<span class="cbtn-icon correct-icon">&#10003;</span>';
      } else if (i === testState.chosen) {
        cls  = 'cbtn wrong';
        icon = '<span class="cbtn-icon wrong-icon">&#10007;</span>';
      }
    }
    return `<button class="${cls}" ${testState.answered ? 'disabled' : ''}
      onclick="chooseAnim(this,${i})">${icon}<span>${opt}</span></button>`;
  }).join('');

  return `
  ${warnVisible ? `<div class="warn-bar"><div class="warn-icon">!</div><span>${warnMsg}</span></div>` : ''}
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;gap:8px;flex-wrap:wrap">
    <div class="sec-tabs" style="flex:1;margin-bottom:0;min-width:200px">
      ${SLABELS.map((l, i) => `<div class="stab ${i===s?'act':''} ${testState.secDone[i]?'done':''}">${l} ${testState.secDone[i]?'&#10003;':''}</div>`).join('')}
    </div>
    <div class="timer ${tDanger?'danger':''}" id="timer-display">&#128337; ${mins}:${secs.toString().padStart(2,'0')}</div>
  </div>
  <div class="prog-wrap">
    <div class="prog-track">
      <div class="prog-fill" style="width:${pBar}%;background:${SEC_COLORS[s]}"></div>
    </div>
    <span class="prog-meta">Q${testState.qIdx+1}/10 &nbsp;|&nbsp; Total: ${total}/30 &nbsp;|&nbsp; Switches: ${visCount}/3</span>
  </div>
  <div class="q-card">
    <div class="q-label" style="color:${SEC_LBL_C[s]}">${SLABELS[s]} &nbsp;·&nbsp; Question ${testState.qIdx+1} of 10</div>
    <p class="q-text">${q.q}</p>
  </div>
  <div class="choices" id="choices-wrap">${choiceHTML}</div>
  ${testState.answered ? `
    <div class="explain-box">
      <span style="font-weight:500;color:${testState.chosen===q.a?'var(--green-dk)':'var(--red-bd)'}">
        ${testState.chosen===q.a?'&#10003; Correct!':'&#10007; Incorrect.'}
      </span>
      &nbsp;${q.e}
    </div>` : ''}
  <div class="nav-row">
    <span class="nav-hint">Section: ${testState.score[s]}/10 correct</span>
    ${testState.answered ? `
      <button class="btn-primary" style="width:auto;padding:9px 22px;background:${SEC_COLORS[s]}" onclick="nextQ()">
        ${testState.qIdx<9?'Next question &rarr;':s<2?'Next section &rarr;':'Finish exam &rarr;'}
      </button>` : ''}
  </div>`;
}

function viewResult() {
  const att = DB.attempts[session.user?.id] || testState.resultSnap;
  if (!att) return `<div class="card"><p>No result found.</p></div>`;

  const fm    = finalMarks(att.score);
  const p     = pct(fm, COLLEGE.totalMarks);
  const grade = getGrade(fm, COLLEGE.totalMarks);
  const gradeBg   = p>=70?'var(--green-lt)':p>=50?'var(--amber-lt)':'var(--red-lt)';
  const gradeText = p>=70?'var(--green-dk)':p>=50?'var(--amber-dk)':'var(--red-dk)';

  return `
  ${att.autoSubmitted?`<div class="warn-bar"><div class="warn-icon">!</div>Exam was auto-submitted due to 3 tab switches.</div>`:''}
  <div class="card" style="text-align:center;margin-bottom:1rem">
    <div class="sub" style="margin-bottom:4px">${COLLEGE.subject} — Mid-term</div>
    <div class="sub" style="margin-bottom:12px">${session.user?.name} &nbsp;·&nbsp; ${session.user?.id} &nbsp;·&nbsp; ${att.date}</div>
    <div class="big-score">${fm}<sup>/${COLLEGE.totalMarks}</sup></div>
    <div style="font-size:13px;color:var(--text2);margin:6px 0 10px">Raw: ${att.score}/30 &nbsp;·&nbsp; ${p}%</div>
    <div class="badge" style="background:${gradeBg};color:${gradeText};font-size:14px;padding:5px 18px">Grade: ${grade}</div>
  </div>
  <div class="grid3" style="margin-bottom:1rem">
    ${SLABELS.map((l,i)=>`
      <div class="metric">
        <div class="metric-lbl">${l}</div>
        <div class="metric-val">${att.sectionScores[i]}/10</div>
        <div class="sec-bar-wrap"><div class="sec-bar" style="width:${pct(att.sectionScores[i],10)}%;background:${SEC_COLORS[i]}"></div></div>
      </div>`).join('')}
  </div>
  <div class="card" style="margin-bottom:1rem">
    <h2 style="margin-bottom:12px">Score breakdown</h2>
    <div class="result-row"><span class="label">Raw score</span><span>${att.score}/30</span></div>
    <div class="result-row"><span class="label">Conversion</span><span>(${att.score}÷30)×20</span></div>
    <div class="result-row"><span class="label">Final marks</span><span style="font-weight:500;color:var(--purple)">${fm}/${COLLEGE.totalMarks}</span></div>
    <div class="result-row"><span class="label">Percentage</span><span>${p}%</span></div>
    <div class="result-row"><span class="label">Grade</span><span>${grade}</span></div>
    <div class="result-row"><span class="label">Status</span>
      <span class="badge ${p>=40?'badge-green':'badge-red'}">${p>=40?'Pass':'Fail'}</span></div>
  </div>
  <button class="btn-outline full" onclick="go('dashboard')">Back to dashboard</button>`;
}

function viewAdminLogin() {
  return `
  <div class="portal-header">
    <h1>Faculty / Admin access</h1>
    <p>Enter the admin password to access the teacher dashboard</p>
  </div>
  <div class="card">
    <div class="field"><label>Admin password</label>
      <input id="a_pass" type="password" placeholder="Enter faculty password"
        onkeydown="if(event.key==='Enter')doAdminLogin()" /></div>
    <div id="a_err" class="err"></div>
    <button class="btn-primary" onclick="doAdminLogin()">Access teacher dashboard</button>
  </div>
  <div style="text-align:center;margin-top:12px">
    <button class="btn-link" onclick="go('home')">Back to home</button>
  </div>`;
}

// ══════════════════════════════════════════════════════
// TEACHER DASHBOARD
// ══════════════════════════════════════════════════════

function viewAdminDash() {
  const tabs = [
    { id:'overview',  label:'Overview'  },
    { id:'students',  label:'Students'  },
    { id:'analytics', label:'Analytics' }
  ];
  return `
  <div class="portal-header">
    <div class="sub">${COLLEGE.code} &nbsp;·&nbsp; Teacher dashboard</div>
    <h1>${COLLEGE.subject}</h1>
    <p>Faculty analytics &amp; result management</p>
  </div>
  <div class="tab-row" style="margin-bottom:1.5rem">
    ${tabs.map(t=>`<div class="tab ${adminTab===t.id?'active':''}" onclick="setAdminTab('${t.id}')">${t.label}</div>`).join('')}
  </div>
  <div id="admin-content">
    ${adminTab==='overview'  ? renderOverview()  : ''}
    ${adminTab==='students'  ? renderStudents()  : ''}
    ${adminTab==='analytics' ? renderAnalytics() : ''}
  </div>
  <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:1.5rem;padding-top:1rem;border-top:0.5px solid var(--border)">
    <button class="btn-outline" onclick="exportCSV()">Export CSV</button>
    <button class="btn-outline" onclick="if(confirm('Reset ALL data? This cannot be undone.')){DB={users:{},attempts:{}};saveDB();render();}">Reset all data</button>
    <button class="btn-outline" onclick="go('home')">Back to home</button>
  </div>`;
}

function setAdminTab(tab) { adminTab = tab; render(); }

// ── OVERVIEW tab ──────────────────────────────────────
function renderOverview() {
  const users    = Object.values(DB.users);
  const attempts = Object.values(DB.attempts);
  const n        = attempts.length;

  if (users.length === 0) return `<div class="card"><p>No students registered yet. Share the portal link with your students.</p></div>`;

  const fmScores = attempts.map(a => finalMarks(a.score));
  const avgFm    = n ? Math.round((fmScores.reduce((s,v)=>s+v,0)/n)*10)/10 : 0;
  const highest  = n ? Math.max(...fmScores) : 0;
  const lowest   = n ? Math.min(...fmScores) : 0;
  const passes   = fmScores.filter(s=>(s/COLLEGE.totalMarks)>=0.4).length;
  const autoCount = attempts.filter(a=>a.autoSubmitted).length;

  const gradeDist = {'A+':0,'A':0,'B+':0,'B':0,'C':0,'D':0,'F':0};
  fmScores.forEach(s=>{ gradeDist[getGrade(s,COLLEGE.totalMarks)]++; });

  const secAvg = SECS.map((_,i)=>
    n ? Math.round((attempts.reduce((s,a)=>s+a.sectionScores[i],0)/n)*10)/10 : 0
  );

  return `
  <div class="grid4" style="margin-bottom:1rem">
    <div class="metric"><div class="metric-lbl">Registered</div><div class="metric-val">${users.length}</div></div>
    <div class="metric"><div class="metric-lbl">Attempted</div><div class="metric-val">${n}</div></div>
    <div class="metric"><div class="metric-lbl">Pending</div><div class="metric-val">${users.length-n}</div></div>
    <div class="metric"><div class="metric-lbl">Auto-submitted</div><div class="metric-val" style="color:var(--red-bd)">${autoCount}</div></div>
  </div>
  <div class="grid4" style="margin-bottom:1.5rem">
    <div class="metric"><div class="metric-lbl">Avg marks</div><div class="metric-val">${avgFm}/20</div></div>
    <div class="metric"><div class="metric-lbl">Highest</div><div class="metric-val">${highest}/20</div></div>
    <div class="metric"><div class="metric-lbl">Lowest</div><div class="metric-val">${lowest}/20</div></div>
    <div class="metric"><div class="metric-lbl">Pass rate</div><div class="metric-val">${n?Math.round((passes/n)*100):0}%</div></div>
  </div>

  <div class="grid2" style="margin-bottom:1rem">
    <div class="card" style="margin-bottom:0">
      <h2 style="margin-bottom:14px">Grade distribution</h2>
      ${Object.entries(gradeDist).map(([g,count])=>{
        const w = n?Math.round((count/n)*100):0;
        const barColor = (g==='A+'||g==='A')?'var(--green-bd)':(g==='B+'||g==='B')?'var(--purple)':(g==='C'||g==='D')?'var(--amber-dk)':'var(--red-bd)';
        return `
        <div style="margin-bottom:10px">
          <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:3px">
            <span style="font-weight:500">${g}</span>
            <span style="color:var(--text2)">${count} (${w}%)</span>
          </div>
          <div class="prog-track" style="height:8px">
            <div class="prog-fill" style="width:${w}%;background:${barColor}"></div>
          </div>
        </div>`;
      }).join('')}
    </div>

    <div class="card" style="margin-bottom:0">
      <h2 style="margin-bottom:14px">Section averages</h2>
      ${SLABELS.map((l,i)=>{
        const w=Math.round((secAvg[i]/10)*100);
        return `
        <div style="margin-bottom:14px">
          <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:3px">
            <span style="font-weight:500">${l}</span>
            <span style="color:var(--text2)">${secAvg[i]}/10 avg</span>
          </div>
          <div class="prog-track" style="height:8px">
            <div class="prog-fill" style="width:${w}%;background:${SEC_COLORS[i]}"></div>
          </div>
        </div>`;
      }).join('')}
      <div style="margin-top:14px;padding-top:12px;border-top:0.5px solid var(--border)">
        <div style="display:flex;gap:10px">
          <div style="flex:1;text-align:center;background:var(--green-lt);border-radius:var(--r-md);padding:10px">
            <div style="font-size:22px;font-weight:500;color:var(--green-dk)">${passes}</div>
            <div style="font-size:11px;color:var(--green-dk)">Passed</div>
          </div>
          <div style="flex:1;text-align:center;background:var(--red-lt);border-radius:var(--r-md);padding:10px">
            <div style="font-size:22px;font-weight:500;color:var(--red-bd)">${n-passes}</div>
            <div style="font-size:11px;color:var(--red-bd)">Failed</div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

// ── STUDENTS tab ──────────────────────────────────────
function renderStudents() {
  const users = Object.values(DB.users);
  if (users.length === 0) return `<div class="card"><p>No students registered yet.</p></div>`;

  const sorted = [...users].sort((a,b)=>{
    const fa = DB.attempts[a.id] ? finalMarks(DB.attempts[a.id].score) : -1;
    const fb = DB.attempts[b.id] ? finalMarks(DB.attempts[b.id].score) : -1;
    return fb-fa;
  });

  return `
  <div class="card" style="padding:1.25rem">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:8px">
      <h2>All students (${users.length})</h2>
      <span style="font-size:12px;color:var(--text2)">Sorted by marks — highest first</span>
    </div>
    <div style="overflow-x:auto">
      <table class="result-table">
        <thead>
          <tr>
            <th>#</th><th>Name</th><th>Roll No</th><th>Branch</th><th>Sem</th>
            <th title="Beginner section score">B</th>
            <th title="Intermediate section score">I</th>
            <th title="Advanced section score">A</th>
            <th>Raw/30</th><th>Marks/20</th><th>Grade</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${sorted.map((u,idx)=>{
            const att   = DB.attempts[u.id];
            const fm    = att ? finalMarks(att.score) : null;
            const grade = att ? getGrade(fm,COLLEGE.totalMarks) : null;
            const p2    = att ? pct(fm,COLLEGE.totalMarks) : null;
            const pass  = att ? p2>=40 : null;
            return `
            <tr>
              <td style="color:var(--text2)">${idx+1}</td>
              <td style="font-weight:500">${u.name}${att?.autoSubmitted?` <span style="color:var(--red-bd);font-size:10px">[auto]</span>`:''}
              </td>
              <td style="color:var(--text2)">${u.id}</td>
              <td style="color:var(--text2);font-size:12px">${u.branch.replace(' & Engineering','').replace(' Engineering','')}</td>
              <td style="color:var(--text2)">${u.sem.replace('Semester ','S')}</td>
              ${att ? `
                <td class="sec-cell" style="color:${att.sectionScores[0]>=7?'var(--green-dk)':att.sectionScores[0]>=5?'var(--amber-dk)':'var(--red-bd)'}">${att.sectionScores[0]}</td>
                <td class="sec-cell" style="color:${att.sectionScores[1]>=7?'var(--green-dk)':att.sectionScores[1]>=5?'var(--amber-dk)':'var(--red-bd)'}">${att.sectionScores[1]}</td>
                <td class="sec-cell" style="color:${att.sectionScores[2]>=7?'var(--green-dk)':att.sectionScores[2]>=5?'var(--amber-dk)':'var(--red-bd)'}">${att.sectionScores[2]}</td>
                <td>${att.score}</td>
                <td style="font-weight:500;color:var(--purple)">${fm}</td>
                <td><span class="badge ${p2>=70?'badge-green':p2>=40?'badge-purple':'badge-red'}">${grade}</span></td>
                <td><span class="badge ${pass?'badge-green':'badge-red'}">${pass?'Pass':'Fail'}</span></td>
              ` : `<td colspan="7" style="color:var(--text3);font-size:12px;text-align:center">Not attempted</td>`}
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
  </div>`;
}

// ── ANALYTICS tab ─────────────────────────────────────
function renderAnalytics() {
  const attempts = Object.values(DB.attempts);
  const n        = attempts.length;

  if (n === 0) return `<div class="card"><p>No exam attempts yet. Analytics will appear once students complete the exam.</p></div>`;

  const fmScores = attempts.map(a=>finalMarks(a.score));
  const avgFm    = fmScores.reduce((s,v)=>s+v,0)/n;
  const sorted2  = [...fmScores].sort((a,b)=>a-b);
  const median   = n%2===0 ? (sorted2[n/2-1]+sorted2[n/2])/2 : sorted2[Math.floor(n/2)];
  const stdDev   = Math.round(Math.sqrt(fmScores.reduce((s,v)=>s+(v-avgFm)**2,0)/n)*10)/10;
  const passes   = fmScores.filter(s=>(s/COLLEGE.totalMarks)>=0.4).length;

  // Score distribution buckets
  const buckets = [
    {label:'0–4', min:0, max:4},
    {label:'5–8', min:5, max:8},
    {label:'9–12',min:9, max:12},
    {label:'13–16',min:13,max:16},
    {label:'17–20',min:17,max:20}
  ];
  const bCounts = buckets.map(b=>fmScores.filter(s=>s>=b.min&&s<=b.max).length);
  const bMax    = Math.max(...bCounts,1);

  // Section averages + difficulty
  const secAvg = SECS.map((_,i)=>
    Math.round((attempts.reduce((s,a)=>s+a.sectionScores[i],0)/n)*10)/10
  );
  const weakestSec = secAvg.indexOf(Math.min(...secAvg));

  // Branch performance
  const branchMap = {};
  Object.values(DB.users).forEach(u=>{
    const att=DB.attempts[u.id];
    if(!att)return;
    const b=u.branch;
    if(!branchMap[b])branchMap[b]={total:0,count:0};
    branchMap[b].total+=finalMarks(att.score);
    branchMap[b].count++;
  });

  // Top 5
  const top5 = Object.values(DB.users)
    .filter(u=>DB.attempts[u.id])
    .sort((a,b)=>DB.attempts[b.id].score-DB.attempts[a.id].score)
    .slice(0,5);

  return `
  <!-- Key stats -->
  <div class="grid4" style="margin-bottom:1.5rem">
    <div class="metric"><div class="metric-lbl">Mean</div><div class="metric-val">${Math.round(avgFm*10)/10}/20</div></div>
    <div class="metric"><div class="metric-lbl">Median</div><div class="metric-val">${median}/20</div></div>
    <div class="metric"><div class="metric-lbl">Std deviation</div><div class="metric-val">${stdDev}</div></div>
    <div class="metric"><div class="metric-lbl">Pass rate</div><div class="metric-val">${Math.round((passes/n)*100)}%</div></div>
  </div>

  <div class="grid2" style="margin-bottom:1rem">
    <!-- Score distribution bar chart -->
    <div class="card" style="margin-bottom:0">
      <h2 style="margin-bottom:16px">Score distribution</h2>
      <div style="display:flex;align-items:flex-end;gap:8px;height:130px;margin-bottom:8px">
        ${buckets.map((b,i)=>{
          const h   = Math.round((bCounts[i]/bMax)*100);
          const col = i<=1?'var(--red-bd)':i===2?'var(--amber-dk)':'var(--green-bd)';
          return `
          <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;height:100%;justify-content:flex-end">
            <span style="font-size:11px;color:var(--text2)">${bCounts[i]}</span>
            <div style="width:100%;height:${h}%;background:${col};border-radius:4px 4px 0 0;min-height:${bCounts[i]?4:0}px"></div>
          </div>`;
        }).join('')}
      </div>
      <div style="display:flex;gap:8px">
        ${buckets.map(b=>`<div style="flex:1;text-align:center;font-size:11px;color:var(--text2)">${b.label}</div>`).join('')}
      </div>
      <div style="font-size:11px;color:var(--text3);text-align:center;margin-top:4px">Final marks (out of 20)</div>
    </div>

    <!-- Section difficulty analysis -->
    <div class="card" style="margin-bottom:0">
      <h2 style="margin-bottom:16px">Section difficulty</h2>
      ${SLABELS.map((l,i)=>{
        const avg=secAvg[i];
        const w  =Math.round((avg/10)*100);
        const diff=avg<4?'Hard':avg<7?'Medium':'Easy';
        const dc  =avg<4?'badge-red':avg<7?'badge-amber':'badge-green';
        return `
        <div style="margin-bottom:14px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
            <span style="font-size:13px;font-weight:500">${l}</span>
            <div style="display:flex;gap:6px;align-items:center">
              <span class="badge ${dc}" style="font-size:10px;padding:2px 8px">${diff}</span>
              <span style="font-size:13px;color:var(--text2)">${avg}/10</span>
            </div>
          </div>
          <div class="prog-track" style="height:10px">
            <div class="prog-fill" style="width:${w}%;background:${SEC_COLORS[i]}"></div>
          </div>
        </div>`;
      }).join('')}
      <div style="margin-top:10px;padding:10px;background:var(--bg2);border-radius:var(--r-md)">
        <div style="font-size:12px;font-weight:500">Weakest section: ${SLABELS[weakestSec]}</div>
        <div style="font-size:12px;color:var(--text2);margin-top:2px">Consider extra revision sessions on this topic</div>
      </div>
    </div>
  </div>

  <!-- Branch-wise performance (only if multiple branches) -->
  ${Object.keys(branchMap).length>1 ? `
  <div class="card" style="margin-bottom:1rem">
    <h2 style="margin-bottom:14px">Branch-wise average marks</h2>
    ${Object.entries(branchMap).sort((a,b)=>(b[1].total/b[1].count)-(a[1].total/a[1].count)).map(([branch,data])=>{
      const avg=Math.round((data.total/data.count)*10)/10;
      const w  =Math.round((avg/COLLEGE.totalMarks)*100);
      return `
      <div style="margin-bottom:12px">
        <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:3px">
          <span>${branch}</span>
          <span style="color:var(--text2)">${avg}/20 &nbsp;(${data.count} student${data.count!==1?'s':''})</span>
        </div>
        <div class="prog-track" style="height:8px">
          <div class="prog-fill" style="width:${w}%;background:var(--purple)"></div>
        </div>
      </div>`;
    }).join('')}
  </div>` : ''}

  <!-- Top performers -->
  <div class="card" style="margin-bottom:1rem">
    <h2 style="margin-bottom:14px">Top performers</h2>
    ${top5.map((u,i)=>{
      const att  =DB.attempts[u.id];
      const fm   =finalMarks(att.score);
      const grade=getGrade(fm,COLLEGE.totalMarks);
      const medals=['1st','2nd','3rd','4th','5th'];
      const medalColor=['#b8880a','#888','#a0522d','var(--text2)','var(--text2)'];
      return `
      <div class="result-row">
        <div style="display:flex;align-items:center;gap:12px">
          <div style="font-size:12px;font-weight:500;color:${medalColor[i]};width:28px;text-align:center">${medals[i]}</div>
          <div>
            <div style="font-size:14px;font-weight:500">${u.name}</div>
            <div style="font-size:12px;color:var(--text2)">${u.id} &nbsp;·&nbsp; ${u.branch}</div>
          </div>
        </div>
        <div style="text-align:right">
          <div style="font-size:16px;font-weight:500;color:var(--purple)">${fm}/20</div>
          <div style="font-size:12px;color:var(--text2)">${grade} &nbsp;·&nbsp; ${att.score}/30</div>
        </div>
      </div>`;
    }).join('')}
  </div>

  <!-- Integrity flags -->
  ${attempts.filter(a=>a.autoSubmitted).length>0 ? `
  <div class="card card-danger" style="margin-bottom:1rem">
    <h2 style="margin-bottom:12px;color:var(--red-bd)">Integrity flags</h2>
    ${Object.values(DB.users).filter(u=>DB.attempts[u.id]?.autoSubmitted).map(u=>{
      const att=DB.attempts[u.id];
      const fm =finalMarks(att.score);
      return `
      <div class="result-row">
        <div>
          <div style="font-size:14px;font-weight:500">${u.name}</div>
          <div style="font-size:12px;color:var(--text2)">${u.id} &nbsp;·&nbsp; ${att.date}</div>
        </div>
        <div style="text-align:right">
          <span class="badge badge-red">Auto-submitted</span>
          <div style="font-size:12px;color:var(--text2);margin-top:4px">${fm}/20 recorded</div>
        </div>
      </div>`;
    }).join('')}
  </div>` : ''}`;
}

// ══════════════════════════════════════════════════════
// ACTIONS
// ══════════════════════════════════════════════════════

function doRegister() {
  const name=document.getElementById('r_name').value.trim();
  const id  =document.getElementById('r_id').value.trim().toUpperCase();
  const branch=document.getElementById('r_branch').value;
  const sem =document.getElementById('r_sem').value;
  const email=document.getElementById('r_email').value.trim();
  const pass=document.getElementById('r_pass').value;
  const err =document.getElementById('r_err');
  if(!name||!id||!branch||!sem||!email||!pass){err.textContent='Please fill in all fields.';return;}
  if(pass.length<6){err.textContent='Password must be at least 6 characters.';return;}
  if(DB.users[id]){err.textContent='Student ID already registered. Please login.';return;}
  DB.users[id]={name,id,branch,sem,email,pass};
  saveDB();
  session.user=DB.users[id];
  go('dashboard');
}

function doLogin() {
  const id  =document.getElementById('l_id').value.trim().toUpperCase();
  const pass=document.getElementById('l_pass').value;
  const err =document.getElementById('l_err');
  if(!id||!pass){err.textContent='Please enter your Student ID and password.';return;}
  const u=DB.users[id];
  if(!u){err.textContent='Student ID not found. Please register first.';return;}
  if(u.pass!==pass){err.textContent='Incorrect password. Please try again.';return;}
  session.user=u;
  go('dashboard');
}

function doLogout(){session.user=null;go('home');}

function doAdminLogin(){
  const pass=document.getElementById('a_pass').value;
  if(pass!==ADMIN_PASS){document.getElementById('a_err').textContent='Incorrect admin password.';return;}
  adminTab='overview';
  go('adminDash');
}

// ══════════════════════════════════════════════════════
// EXAM ENGINE
// ══════════════════════════════════════════════════════

function startTest() {
  if(DB.attempts[session.user.id]){alert('You have already attempted this exam. Each student gets one attempt only.');return;}
  questions={};
  SECS.forEach(s=>{questions[s]=pick10(BANK[s]).map(shuffleQ);});
  testState={sec:0,qIdx:0,score:[0,0,0],answered:false,chosen:-1,secDone:[false,false,false],finished:false};
  visCount=0;autoSubmitted=false;warnVisible=false;warnMsg='';
  timeLeft=COLLEGE.duration*60;
  session.view='test';
  render();
  startTimer();
}

function startTimer(){
  clearInterval(timerInterval);
  timerInterval=setInterval(()=>{
    timeLeft--;
    const el=document.getElementById('timer-display');
    if(el){
      const m=Math.floor(timeLeft/60),s=timeLeft%60;
      el.textContent=`⏱ ${m}:${s.toString().padStart(2,'0')}`;
      if(timeLeft<=300)el.classList.add('danger');
    }
    if(timeLeft<=0){clearInterval(timerInterval);autoSubmitted=true;testState.finished=true;submitTest(true);}
  },1000);
}

// Animated MCQ selection — shows green/red immediately, then reveals explanation
function chooseAnim(btnEl, i) {
  if(testState.answered)return;
  const q=questions[SECS[testState.sec]][testState.qIdx];

  // Immediate visual on clicked button
  btnEl.classList.add(i===q.a?'correct':'wrong');

  setTimeout(()=>{
    testState.answered=true;
    testState.chosen=i;
    if(i===q.a)testState.score[testState.sec]++;

    // Apply color to all buttons + disable
    const btns=document.querySelectorAll('#choices-wrap .cbtn');
    btns.forEach((b,idx)=>{
      b.disabled=true;
      if(idx===q.a){
        b.classList.add('correct');
        if(!b.querySelector('.cbtn-icon'))b.insertAdjacentHTML('afterbegin','<span class="cbtn-icon correct-icon">&#10003;</span>');
      } else if(idx===i&&idx!==q.a){
        b.classList.add('wrong');
        if(!b.querySelector('.cbtn-icon'))b.insertAdjacentHTML('afterbegin','<span class="cbtn-icon wrong-icon">&#10007;</span>');
      }
    });

    // Inject explanation
    if(!document.querySelector('.explain-box')){
      const navRow=document.querySelector('.nav-row');
      const expDiv=document.createElement('div');
      expDiv.className='explain-box';
      expDiv.innerHTML=`<span style="font-weight:500;color:${i===q.a?'var(--green-dk)':'var(--red-bd)'}">${i===q.a?'&#10003; Correct!':'&#10007; Incorrect.'}</span> &nbsp;${q.e}`;
      navRow.parentNode.insertBefore(expDiv,navRow);
    }

    // Inject next button
    const navRow=document.querySelector('.nav-row');
    if(navRow&&!navRow.querySelector('button')){
      const s=testState.sec;
      navRow.querySelector('.nav-hint').textContent=`Section: ${testState.score[s]}/10 correct`;
      const btn=document.createElement('button');
      btn.className='btn-primary';
      btn.style.cssText=`width:auto;padding:9px 22px;background:${SEC_COLORS[s]}`;
      btn.innerHTML=testState.qIdx<9?'Next question &rarr;':s<2?'Next section &rarr;':'Finish exam &rarr;';
      btn.onclick=nextQ;
      navRow.appendChild(btn);
    }
  },180);
}

function nextQ(){
  warnVisible=false;
  if(testState.qIdx<9){testState.qIdx++;testState.answered=false;testState.chosen=-1;render();}
  else{
    testState.secDone[testState.sec]=true;
    if(testState.sec<2){testState.sec++;testState.qIdx=0;testState.answered=false;testState.chosen=-1;render();}
    else{testState.finished=true;clearInterval(timerInterval);submitTest(false);}
  }
}

function submitTest(auto){
  const total=testState.score.reduce((a,b)=>a+b,0);
  const att={
    score:total,
    sectionScores:[...testState.score],
    autoSubmitted:auto,
    date:new Date().toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'})
  };
  DB.attempts[session.user.id]=att;
  testState.resultSnap=att;
  saveDB();
  session.view='result';
  render();
}

// ── Export CSV ────────────────────────────────────────
function exportCSV(){
  const rows=[['Name','Roll No','Branch','Semester','Raw/30','Final/20','Beginner/10','Intermediate/10','Advanced/10','Grade','%','Status','Auto-Submitted','Date']];
  Object.values(DB.users).forEach(u=>{
    const att=DB.attempts[u.id];
    if(att){
      const fm=finalMarks(att.score);
      const p2=pct(fm,COLLEGE.totalMarks);
      rows.push([u.name,u.id,u.branch,u.sem,att.score,fm,att.sectionScores[0],att.sectionScores[1],att.sectionScores[2],getGrade(fm,COLLEGE.totalMarks),p2+'%',p2>=40?'Pass':'Fail',att.autoSubmitted?'Yes':'No',att.date]);
    } else {
      rows.push([u.name,u.id,u.branch,u.sem,'','','','','','','','Not attempted','','']);
    }
  });
  const csv=rows.map(r=>r.map(v=>`"${v}"`).join(',')).join('\n');
  const blob=new Blob([csv],{type:'text/csv'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;a.download=`AIML_Results_${new Date().toLocaleDateString('en-IN').replace(/\//g,'-')}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Init ──────────────────────────────────────────────
render();
