export const loopScore = {
  total: 76,
  placement: 62,
  project: 48,
  fitness: 72,
  protein: 70,
  recovery: 58,
};

export const todayLoop = [
  { id: "p1", loop: "placement", label: "Solve 2 array problems", done: true },
  { id: "p2", loop: "project", label: "Update GitHub README", done: false },
  { id: "p3", loop: "fitness", label: "Upper body workout", done: false },
  { id: "p4", loop: "nutrition", label: "Reach 125g protein", done: false },
  { id: "p5", loop: "recovery", label: "Sleep before 11:30 PM", done: false },
];

export const placementTasks = [
  { id: 1, title: "Solve 2 LeetCode arrays", category: "DSA", done: true },
  { id: 2, title: "Mock interview - system design", category: "Interview", done: false },
  { id: 3, title: "Polish resume bullet points", category: "Resume", done: true },
  { id: 4, title: "Aptitude test - quant 30 min", category: "Aptitude", done: false },
  { id: 5, title: "Add capstone to portfolio", category: "Project", done: false },
  { id: 6, title: "Revise binary search patterns", category: "DSA", done: false },
];

export const projects = [
  {
    id: 1,
    name: "MyDayLoop",
    stack: ["React", "TS", "Tailwind"],
    github: "github.com/you/mydayloop",
    demo: "mydayloop.app",
    progress: 64,
    missing: ["Connect backend", "Add auth", "Analytics page"],
  },
  {
    id: 2,
    name: "Campus Marketplace",
    stack: ["Next.js", "Postgres"],
    github: "github.com/you/campus-mkt",
    demo: "campus-mkt.vercel.app",
    progress: 38,
    missing: ["Payments", "Image upload", "Search"],
  },
  {
    id: 3,
    name: "ProteinAI",
    stack: ["React Native", "FastAPI"],
    github: "github.com/you/protein-ai",
    demo: "—",
    progress: 22,
    missing: ["Model selection", "Onboarding", "Pricing"],
  },
];

export const fitnessLog = [
  { day: "Mon", workout: "Upper body", run: 0, soreness: 3, load: 65 },
  { day: "Tue", workout: "Run 5k", run: 5, soreness: 2, load: 55 },
  { day: "Wed", workout: "Lower body", run: 0, soreness: 5, load: 75 },
  { day: "Thu", workout: "Rest", run: 0, soreness: 4, load: 10 },
  { day: "Fri", workout: "Push", run: 2, soreness: 3, load: 70 },
  { day: "Sat", workout: "Long run", run: 8, soreness: 2, load: 80 },
  { day: "Sun", workout: "Mobility", run: 0, soreness: 1, load: 25 },
];

export const proteinSources = [
  { name: "Whey scoop", grams: 24 },
  { name: "3 eggs", grams: 18 },
  { name: "1 cup milk", grams: 8 },
  { name: "Curd bowl", grams: 11 },
  { name: "100g paneer", grams: 18 },
  { name: "Hostel dal + rice", grams: 14 },
];

export const recoveryWeek = [
  { day: "Mon", sleep: 6.5, mood: 7, recovery: 72 },
  { day: "Tue", sleep: 7.1, mood: 8, recovery: 80 },
  { day: "Wed", sleep: 5.4, mood: 5, recovery: 55 },
  { day: "Thu", sleep: 6.0, mood: 6, recovery: 64 },
  { day: "Fri", sleep: 5.8, mood: 6, recovery: 60 },
  { day: "Sat", sleep: 7.8, mood: 9, recovery: 86 },
  { day: "Sun", sleep: 6.2, mood: 7, recovery: 70 },
];

export const scoreTrend = [
  { day: "Mon", score: 62 },
  { day: "Tue", score: 68 },
  { day: "Wed", score: 55 },
  { day: "Thu", score: 70 },
  { day: "Fri", score: 73 },
  { day: "Sat", score: 80 },
  { day: "Sun", score: 76 },
];

export const placementWeekly = [
  { day: "Mon", completed: 3 },
  { day: "Tue", completed: 5 },
  { day: "Wed", completed: 2 },
  { day: "Thu", completed: 6 },
  { day: "Fri", completed: 4 },
  { day: "Sat", completed: 7 },
  { day: "Sun", completed: 5 },
];
