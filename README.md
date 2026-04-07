# AI/ML Mid-Term Examination Portal
### AIML-301 — Introduction to Artificial Intelligence & Machine Learning

---

## How to run

This is a **pure HTML/CSS/JS** project. No server or installation needed.

1. Extract the ZIP file
2. Double-click `index.html` to open in any browser
3. That's it — fully works offline!

---

## Project structure

```
aiml_exam_portal/
├── index.html          ← Open this file
├── css/
│   └── style.css       ← All styling (light + dark mode)
├── js/
│   ├── data.js         ← 90 questions (30 per section)
│   └── app.js          ← Full portal logic
└── README.md           ← This file
```

---

## Features

### For students
- Register with: Name, Roll No, Branch, Semester, Email, Password
- Login with Roll No + Password
- 30-question randomized exam (10 Beginner + 10 Intermediate + 10 Advanced)
- 30-minute countdown timer — auto-submits when time is up
- Answer explanation shown after each question
- Score converted: raw 30 marks → final 20 marks
- One attempt per student (locked after submission)

### Anti-cheat system
- Tab switch / window minimize detection
- Warning 1 → Warning 2 → Auto-submit on 3rd switch
- Auto-submitted exams are flagged in the faculty dashboard
- All questions and answer choices are fully randomized per attempt

### For faculty
- Admin login with password (default: `faculty123`)
- View all registered students
- See each student's: raw score, final marks, section breakdown, grade, pass/fail
- Summary stats: average, highest, lowest, pass rate
- Export all results to CSV with one click
- Reset all data option

---

## Grading scale

| Grade | Percentage |
|-------|------------|
| A+    | 90% and above |
| A     | 80–89% |
| B+    | 70–79% |
| B     | 60–69% |
| C     | 50–59% |
| D     | 40–49% |
| F     | Below 40% |

---

## Customization

### Change admin password
In `js/app.js`, find this line near the top:
```js
const ADMIN_PASS = 'faculty123';
```
Change `faculty123` to your preferred password.

### Change college details
In `js/app.js`, edit the `COLLEGE` object:
```js
const COLLEGE = {
  name:       "AI/ML Mid-Term Examination Portal",
  subject:    "Introduction to Artificial Intelligence & Machine Learning",
  code:       "AIML-301",
  department: "Computer Science & Engineering",
  duration:   30,    // exam duration in minutes
  totalMarks: 20,    // final marks (what students see)
  testMarks:  30     // raw questions count
};
```

### Add or edit questions
In `js/data.js`, each question follows this format:
```js
{
  q: "Question text here",
  c: ["Option A", "Option B", "Option C", "Option D"],
  a: 1,   // index of correct answer (0-based)
  e: "Explanation shown after answering."
}
```
Add to `BANK.b` (Beginner), `BANK.i` (Intermediate), or `BANK.a` (Advanced).
The system will randomly pick 10 from each section for every exam.

---

## Data storage

All student registrations and results are saved in the browser's `localStorage`.
Data persists across page refreshes and browser restarts on the same device.

> Note: If students clear their browser data, registrations may be lost.
> For production use, consider adding a backend database.

---

## Browser compatibility

Works in all modern browsers:
- Chrome / Edge (recommended)
- Firefox
- Safari

---

*Built for college mid-term examination — AIML-301*
