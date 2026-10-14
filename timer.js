/* Kardiyo zamanlayicisi: bolumleri sirayla sayar, bolum degisince ses ve titresimle haber verir.
   Sure saat farkindan hesaplanir; sayfa yenilense ya da sekme uyusa bile kaymaz. */

const TIMER_KEY = "plan.timer.v1";

/* Ayni anda tek zamanlayici calisir: { id, base: birikmis ms, since: calismaya basladigi an ya da null }. */
let activeTimer = null;
try {
  activeTimer = JSON.parse(localStorage.getItem(TIMER_KEY)) || null;
} catch {
  /* Depolama kapaliysa zamanlayici yalnizca sayfa acikken yasar. */
}

let timerPainters = [];
let timerTick = null;
let timerAudio = null;
let timerWake = null;

function storeTimer() {
  try {
    if (activeTimer) localStorage.setItem(TIMER_KEY, JSON.stringify(activeTimer));
    else localStorage.removeItem(TIMER_KEY);
  } catch {
    /* Kaydedilemezse sayfa yenilenince sifirdan baslar. */
  }
}

const timerElapsed = (state) => state.base + (state.since ? Date.now() - state.since : 0);

function phaseAt(phases, ms) {
  let rest = ms / 1000;
  for (let i = 0; i < phases.length; i++) {
    if (rest < phases[i].sec) return { index: i, left: phases[i].sec - rest };
    rest -= phases[i].sec;
  }
  return null;
}

function clockText(sec) {
  const whole = Math.ceil(sec);
  return Math.floor(whole / 60) + ":" + String(whole % 60).padStart(2, "0");
}

/* Ekran kapanirsa tarayici sayaci ve sesi durdurur; calisirken ekrani acik tut. */
async function holdScreen(on) {
  try {
    if (on && !timerWake && navigator.wakeLock) {
      timerWake = await navigator.wakeLock.request("screen");
      timerWake.addEventListener("release", () => { timerWake = null; });
    } else if (!on && timerWake) {
      await timerWake.release();
    }
  } catch {
    /* Desteklenmiyorsa ya da pil tasarrufu aciksa ekran normal sekilde kararir. */
  }
}

document.addEventListener("visibilitychange", () => {
  if (!document.hidden && activeTimer && activeTimer.since) holdScreen(true);
});

function cue(times) {
  if (navigator.vibrate) navigator.vibrate(Array(times * 2 - 1).fill(250));
  if (!timerAudio) return;
  for (let i = 0; i < times; i++) {
    const at = timerAudio.currentTime + i * 0.4;
    const tone = timerAudio.createOscillator();
    const gain = timerAudio.createGain();
    tone.frequency.value = 880;
    gain.gain.setValueAtTime(0.3, at);
    gain.gain.exponentialRampToValueAtTime(0.001, at + 0.3);
    tone.connect(gain).connect(timerAudio.destination);
    tone.start(at);
    tone.stop(at + 0.3);
  }
}

function runTick(on) {
  if (on && !timerTick) {
    timerTick = setInterval(() => {
      timerPainters = timerPainters.filter((p) => p.box.isConnected);
      timerPainters.forEach((p) => p.paint());
    }, 250);
  } else if (!on && timerTick) {
    clearInterval(timerTick);
    timerTick = null;
  }
}

function timerBox(item) {
  const phases = item.timer;
  const id = (item.ex.key || item.ex.img) + "/" + item.sets;
  const total = phases.reduce((sum, p) => sum + p.sec, 0);

  const box = el("div", "timer");
  const phase = el("p", "timer-phase");
  const clock = el("p", "timer-clock");
  const next = el("p", "timer-next");
  const main = el("button", "timer-main");
  const reset = el("button", "timer-reset", "Sıfırla");
  main.type = "button";
  reset.type = "button";
  clock.setAttribute("role", "timer");

  const buttons = el("div", "timer-buttons");
  buttons.append(main, reset);
  box.append(phase, clock, next, buttons);

  const mine = () => activeTimer && activeTimer.id === id;
  const position = () => phaseAt(phases, mine() ? timerElapsed(activeTimer) : 0);

  let seen = position();
  seen = seen ? seen.index : phases.length;

  const paint = () => {
    const ms = mine() ? timerElapsed(activeTimer) : 0;
    const at = phaseAt(phases, ms);
    const running = mine() && !!activeTimer.since;
    const index = at ? at.index : phases.length;

    if (running && index !== seen) cue(at ? 1 : 3);
    seen = index;

    if (!at) {
      if (running) {
        activeTimer = { id, base: total * 1000, since: null };
        storeTimer();
        runTick(false);
        holdScreen(false);
      }
      phase.textContent = "Bitti";
      clock.textContent = "0:00";
      next.textContent = clockText(total) + " tamamlandı";
      main.hidden = true;
      reset.hidden = false;
      box.classList.remove("is-running");
      return;
    }

    const after = phases[at.index + 1];
    phase.textContent = phases[at.index].label;
    clock.textContent = clockText(at.left);
    next.textContent =
      (phases.length > 1 ? (at.index + 1) + " / " + phases.length + " · " : "") +
      "sonra: " + (after ? after.label : "bitiş");
    main.hidden = false;
    main.textContent = running ? "Duraklat" : ms > 0 ? "Devam" : "Başlat";
    reset.hidden = ms === 0;
    box.classList.toggle("is-running", running);
  };

  main.addEventListener("click", () => {
    if (mine() && activeTimer.since) {
      activeTimer = { id, base: timerElapsed(activeTimer), since: null };
      runTick(false);
      holdScreen(false);
    } else {
      /* Ses yalnizca kullanici dokunusuyla acilabilir. */
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!timerAudio && Ctx) timerAudio = new Ctx();
      if (timerAudio && timerAudio.state === "suspended") timerAudio.resume();

      activeTimer = { id, base: mine() ? activeTimer.base : 0, since: Date.now() };
      runTick(true);
      holdScreen(true);
    }
    storeTimer();
    timerPainters.forEach((p) => p.paint());
  });

  reset.addEventListener("click", () => {
    if (!mine()) return;
    activeTimer = null;
    storeTimer();
    runTick(false);
    holdScreen(false);
    paint();
  });

  timerPainters.push({ box, paint });
  if (mine() && activeTimer.since) {
    runTick(true);
    holdScreen(true);
  }
  paint();
  return box;
}
