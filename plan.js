/* Haftalık antrenman planı.
   img: yuhonas/free-exercise-db içindeki hareket klasörünün adı (0.jpg + 1.jpg kareleri). */

const GYM = {
  chestPress:   { name: "Plate loaded chest press",     tr: "Makineli göğüs presi",        img: "Leverage_Chest_Press" },
  smithIncline: { name: "Smith machine low incline press", tr: "Smith makinesi eğimli pres", img: "Smith_Machine_Incline_Bench_Press" },
  chestFly:     { name: "Chest fly machine",            tr: "Makineli göğüs fly",          img: "Butterfly" },
  shoulderPress:{ name: "Shoulder press machine",       tr: "Makineli omuz presi",         img: "Leverage_Shoulder_Press" },
  lateralRaise: { name: "Lateral raise",                tr: "Yan omuz kaldırışı",          img: "Side_Lateral_Raise" },
  pushdown:     { name: "Triceps pushdown",             tr: "Triceps itiş",                img: "Triceps_Pushdown" },
  ropeExt:      { name: "Overhead rope extension",      tr: "Halat ile baş üstü triceps",  img: "Cable_Rope_Overhead_Triceps_Extension" },
  latPulldown:  { name: "Lat pulldown",                 tr: "Geniş tutuş lat çekişi",      img: "Wide-Grip_Lat_Pulldown" },
  closeLat:     { name: "Close grip lat pulldown",      tr: "Dar tutuş lat çekişi",        img: "Close-Grip_Front_Lat_Pulldown" },
  plateRow:     { name: "Plate loaded wide grip row",   tr: "Makineli geniş tutuş kürek",  img: "Leverage_High_Row" },
  cableRow:     { name: "Cable row",                    tr: "Oturarak kablo kürek",        img: "Seated_Cable_Rows" },
  dbCurl:       { name: "Dumbell curl",                 tr: "Dambıl biceps curl",          img: "Dumbbell_Bicep_Curl" },
  cableCurl:    { name: "Cable curl",                   tr: "Kablo biceps curl",           img: "Standing_Biceps_Cable_Curl" },
  hammerCurl:   { name: "Hammer curl",                  tr: "Çekiç curl",                  img: "Hammer_Curls" },
  reverseCurl:  { name: "Reverse barbell curl",         tr: "Ters tutuş barbell curl",     img: "Reverse_Barbell_Curl" },
  legPress:     { name: "Leg press",                    tr: "Bacak presi",                 img: "Leg_Press" },
  smithSquat:   { name: "Smith machine squat",          tr: "Smith makinesi squat",        img: "Smith_Machine_Squat" },
  legExt:       { name: "Leg extension",                tr: "Bacak ekstansiyonu",          img: "Leg_Extensions" },
  legCurl:      { name: "Seated leg curl",              tr: "Oturarak bacak curl",         img: "Seated_Leg_Curl" },
  rearDelt:     { name: "Cable rear delt fly",          tr: "Kablo arka omuz fly",         img: "Cable_Rear_Delt_Fly" },
  cableCrunch:  { name: "Cable crunch",                 tr: "Kablo karın çalışması",       img: "Cable_Crunch" },
  calfRaise:    { name: "Standing calf raise",          tr: "Ayakta baldır kaldırışı",     img: "Standing_Calf_Raises" },
};

const RIR1 = "RIR 1";
const FAIL = "Failure";
const BOTH = "RIR 1 → Failure";

const WEEK = [
  {
    slug: "pazartesi", day: "Pazartesi", short: "Pzt", focus: "Göğüs · Omuz · Triceps", plate: "25",
    work: [
      { ex: GYM.chestPress,    sets: "2 × 5-6",  tag: RIR1 },
      { ex: GYM.smithIncline,  sets: "2 × 5-6",  tag: RIR1 },
      { ex: GYM.chestFly,      sets: "1 × 6-8",  tag: FAIL },
      { ex: GYM.shoulderPress, sets: "2 × 5-6",  tag: RIR1 },
      { ex: GYM.lateralRaise,  sets: "3 × 8-10", tag: FAIL },
      { ex: GYM.pushdown,      sets: "2 × 6-8",  tag: FAIL },
      { ex: GYM.ropeExt,       sets: "2 × 8-10", tag: FAIL },
    ],
  },
  {
    slug: "sali", day: "Salı", short: "Sal", focus: "Sırt · Biceps", plate: "20",
    work: [
      { ex: GYM.latPulldown,   sets: "2 × 6-8",  tag: BOTH },
      { ex: GYM.plateRow,      sets: "3 × 6-8",  tag: BOTH },
      { ex: GYM.cableRow,      sets: "1 × 8-10", tag: FAIL },
      { ex: GYM.dbCurl,        sets: "2 × 6-8",  tag: FAIL },
      { ex: GYM.cableCurl,     sets: "2 × 6-8",  tag: FAIL },
      { superset: [GYM.hammerCurl, GYM.reverseCurl], sets: "2 × 8-10", tag: FAIL },
    ],
  },
  {
    slug: "carsamba", day: "Çarşamba", short: "Çar", focus: "Bacak", plate: "10",
    work: [
      { ex: GYM.legPress,   sets: "2 × 6-8",  tag: RIR1 },
      { ex: GYM.smithSquat, sets: "2 × 6-8",  tag: RIR1 },
      { ex: GYM.legExt,     sets: "2 × 8-10", tag: FAIL },
      { ex: GYM.legCurl,    sets: "3 × 8-10", tag: RIR1 },
    ],
  },
  { slug: "persembe", day: "Perşembe", short: "Per", rest: true },
  {
    slug: "cuma", day: "Cuma", short: "Cum", focus: "Omuz · Göğüs · Triceps", plate: "15",
    work: [
      { ex: GYM.shoulderPress, sets: "2 × 5-6",  tag: RIR1 },
      { ex: GYM.lateralRaise,  sets: "3 × 8-10", tag: FAIL },
      { ex: GYM.smithIncline,  sets: "2 × 5-6",  tag: RIR1 },
      { ex: GYM.chestFly,      sets: "2 × 6-8",  tag: FAIL },
      { ex: GYM.rearDelt,      sets: "2 × 8-10", tag: FAIL },
      { ex: GYM.pushdown,      sets: "2 × 6-8",  tag: FAIL },
      { ex: GYM.ropeExt,       sets: "2 × 8-10", tag: FAIL },
    ],
  },
  {
    slug: "cumartesi", day: "Cumartesi", short: "Cmt", focus: "Sırt · Kol · Bacak", plate: "5",
    work: [
      { ex: GYM.plateRow,   sets: "3 × 6-8",  tag: BOTH },
      { ex: GYM.closeLat,   sets: "3 × 6-8",  tag: BOTH },
      { ex: GYM.cableCurl,  sets: "2 × 6-8",  tag: FAIL },
      { superset: [GYM.hammerCurl, GYM.reverseCurl], sets: "2 × 8-10", tag: FAIL },
      { ex: GYM.legPress,   sets: "2 × 6-8",  tag: RIR1 },
      { ex: GYM.legExt,     sets: "2 × 6-8",  tag: FAIL },
      { ex: GYM.legCurl,    sets: "1 × 8-10", tag: FAIL },
    ],
  },
  { slug: "pazar", day: "Pazar", short: "Paz", rest: true },
];

const FINISHER = {
  note: "Haftada 2 antrenmanın sonunda",
  work: [
    { ex: GYM.cableCrunch, sets: "3 × 10" },
    { ex: GYM.calfRaise,   sets: "3 × 10" },
  ],
};
