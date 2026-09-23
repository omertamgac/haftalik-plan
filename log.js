/* Son kaldirilan agirlik ve not.
   Kayit cihazin tarayicisinda (localStorage) durur, sunucuya ya da repoya gitmez. */

const LOG_KEY = "plan.log.v1";

const AYLAR = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];

/* Gizli sekmede ya da depolama kapaliyken bu cagrilar hata atar: site yine calissin. */
function readLog() {
  try {
    return JSON.parse(localStorage.getItem(LOG_KEY)) || {};
  } catch {
    return {};
  }
}

function writeLog(store) {
  try {
    localStorage.setItem(LOG_KEY, JSON.stringify(store));
    return true;
  } catch {
    return false;
  }
}

function todayStamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
}

function stampText(at) {
  if (!at) return "";
  const [, month, day] = at.split("-").map(Number);
  return "son: " + day + " " + AYLAR[month - 1];
}

/* Ayni hareket baska bir satirda da duruyorsa onu da guncelle. */
function syncFields(key, entry) {
  document.querySelectorAll(".log").forEach((box) => {
    if (box.dataset.ex !== key) return;
    box.querySelector(".log-kg").value = entry ? entry.kg : "";
    box.querySelector(".log-note").value = entry ? entry.note : "";
    box.querySelector(".log-stamp").textContent = entry ? stampText(entry.at) : "";
    box.classList.remove("is-stuck");
  });
}

function logField(ex) {
  const entry = readLog()[ex.img] || {};

  const box = el("div", "log");
  box.dataset.ex = ex.img;

  const kg = el("input", "log-kg");
  kg.type = "number";
  kg.inputMode = "decimal";
  kg.step = "0.5";
  kg.min = "0";
  kg.placeholder = "—";
  kg.value = entry.kg || "";
  kg.setAttribute("aria-label", ex.name + " — son kaldırılan ağırlık, kg");

  const note = el("input", "log-note");
  note.type = "text";
  note.maxLength = 80;
  note.placeholder = "not…";
  note.value = entry.note || "";
  note.setAttribute("aria-label", ex.name + " — not");

  const stamp = el("p", "log-stamp", stampText(entry.at));

  const line = el("div", "log-line");
  line.append(kg, el("span", "log-unit", "kg"), note);
  box.append(line, stamp);

  const save = () => {
    const kgValue = kg.value.trim();
    const noteValue = note.value.trim();
    const store = readLog();
    const prev = store[ex.img] || {};

    if ((prev.kg || "") === kgValue && (prev.note || "") === noteValue) return;

    if (!kgValue && !noteValue) delete store[ex.img];
    else store[ex.img] = { kg: kgValue, note: noteValue, at: todayStamp() };

    if (writeLog(store)) {
      syncFields(ex.img, store[ex.img]);
    } else {
      box.classList.add("is-stuck");
      stamp.textContent = "kaydedilemedi — tarayıcı depolaması kapalı";
    }
  };

  kg.addEventListener("change", save);
  note.addEventListener("change", save);
  kg.addEventListener("blur", save);
  note.addEventListener("blur", save);

  return box;
}
