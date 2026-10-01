/* 3 günlük döngü — görünüm kurulumu ve hash yönlendirmesi. */

const CDN = "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/";

/* Hareket kisitlamasi acikken animasyon yerine duragan kare gosterilir. */
const STILL = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const el = (tag, cls, text) => {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text != null) node.textContent = text;
  return node;
};

const setCount = (day) =>
  day.work.reduce((total, item) => total + parseInt(item.sets, 10), 0);

const dayMeta = (day) =>
  day.meta || day.work.length + " hareket · " + setCount(day) + " set";

const initials = (name) =>
  name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

/* ---------- Döngü ---------- */

/* Döngünün başladığı gün bu tarayıcıda saklanır; yoksa plan.js'deki tarih geçerli. */
const CYCLE_KEY = "plan.cycle.v1";

const dayNumber = (stamp) => {
  const [y, m, d] = stamp.split("-").map(Number);
  return Date.UTC(y, m - 1, d) / 86400000;
};

function cycleStart() {
  try {
    return localStorage.getItem(CYCLE_KEY) || CYCLE_START;
  } catch {
    return CYCLE_START;
  }
}

function todayIndex() {
  const diff = dayNumber(todayStamp()) - dayNumber(cycleStart());
  return ((diff % CYCLE.length) + CYCLE.length) % CYCLE.length;
}

/* "Bugün n. gün" seçilince başlangıç tarihi bugünden n-1 gün geriye çekilir. */
function setToday(index) {
  const start = new Date((dayNumber(todayStamp()) - index) * 86400000);
  const stamp = start.toISOString().slice(0, 10);
  try {
    localStorage.setItem(CYCLE_KEY, stamp);
  } catch {
    /* Depolama kapaliysa secim yalnizca bu oturumda gecerli olmaz; varsayilan kalir. */
  }
  renderWeek();
}

/* ---------- Parçalar ---------- */

/* Hareketi gösteren animasyon. Yüklenemezse baş harfler kalır. */
function shot(ex, eager, item) {
  const box = el("button", "shot");
  box.type = "button";
  box.dataset.initials = initials(ex.name);
  box.setAttribute("aria-label", ex.name + " — büyüt");

  const img = el("img");
  img.src = CDN + ex.img + (STILL ? ".thumb.webp" : ".gif");
  img.alt = ex.name;
  img.loading = eager ? "eager" : "lazy";
  img.decoding = "async";
  img.addEventListener("error", () => box.classList.add("is-missing"));
  box.appendChild(img);

  box.addEventListener("click", () => openZoom(ex, item));
  return box;
}

function presentation(item) {
  const line = el("p", "pres");
  line.appendChild(el("span", "sets", item.sets));
  if (item.tag) line.appendChild(el("span", "tag", item.tag));
  return line;
}

function textBlock(ex, item) {
  const block = el("div", "row-text");
  block.appendChild(el("h3", null, ex.name));
  block.appendChild(el("p", "row-tr", ex.tr));
  if (item) block.appendChild(presentation(item));
  return block;
}

/* Nasıl yapılır ve dikkat edilecekler listeleri. */
function guide(ex) {
  const wrap = el("div", "guide");

  wrap.appendChild(el("h4", null, "Nasıl yapılır"));
  const steps = el("ol");
  ex.how.forEach((line) => steps.appendChild(el("li", null, line)));
  wrap.appendChild(steps);

  wrap.appendChild(el("h4", "is-warn", "Dikkat"));
  const tips = el("ul");
  ex.tips.forEach((line) => tips.appendChild(el("li", null, line)));
  wrap.appendChild(tips);

  return wrap;
}

function howto(ex) {
  const box = el("details", "howto");
  box.appendChild(el("summary", null, "Nasıl yapılır · dikkat edilecekler"));
  box.appendChild(guide(ex));
  return box;
}

function exerciseRow(item, index, eager) {
  const row = el("li", "row");
  if (index != null) row.appendChild(el("span", "idx", index + ""));
  row.appendChild(textBlock(item.ex, item));
  row.appendChild(shot(item.ex, eager, item));
  row.appendChild(howto(item.ex));
  if (item.ex.log !== false) row.appendChild(logField(item.ex));
  return row;
}

/* ---------- Döngü görünümü ---------- */

function renderWeek() {
  const grid = document.getElementById("week");
  const now = todayIndex();

  grid.replaceChildren();

  CYCLE.forEach((day, i) => {
    const card = el("a", "day-card");
    if (day.plate) card.dataset.plate = day.plate;

    card.appendChild(el("span", "card-day", day.day));

    if (day.rest) {
      card.classList.add("is-rest");
      card.appendChild(el("span", "card-focus", "Dinlenme"));
    } else {
      card.href = "#gun/" + day.slug;
      card.appendChild(el("span", "card-focus", day.focus));
      card.appendChild(el("span", "card-meta", dayMeta(day)));
    }

    if (i === now) {
      card.classList.add("is-today");
      card.appendChild(el("span", "badge-today", "bugün"));
    }

    grid.appendChild(card);
  });

  const today = CYCLE[now];
  const line = document.getElementById("today-line");
  line.replaceChildren(
    document.createTextNode(today.rest ? "Bugün dinlenme" : today.focus),
    el("em", null, "Döngünün " + today.day + "ü")
  );

  const picker = document.getElementById("cycle-pick");
  picker.replaceChildren();
  CYCLE.forEach((day, i) => {
    const button = el("button", null, (i + 1) + "");
    button.type = "button";
    button.setAttribute("aria-pressed", i === now ? "true" : "false");
    button.setAttribute("aria-label", "Bugün " + day.day);
    button.addEventListener("click", () => setToday(i));
    picker.appendChild(button);
  });
}

/* ---------- Gün ---------- */

function renderDay(day) {
  document.getElementById("dayhead").dataset.plate = day.plate;
  document.getElementById("day-title").textContent = day.day;
  document.getElementById("day-focus").textContent = day.focus;
  document.getElementById("day-count").textContent = dayMeta(day).replace(" · ", "\n");

  const notes = document.getElementById("notes");
  notes.replaceChildren();
  notes.hidden = !day.notes;
  if (day.notes) {
    notes.appendChild(el("h3", null, "Bilmen gerekenler"));
    const list = el("ul");
    day.notes.forEach((line) => list.appendChild(el("li", null, line)));
    notes.appendChild(list);
  }

  const list = document.getElementById("work");
  list.replaceChildren();
  day.work.forEach((item, i) => list.appendChild(exerciseRow(item, i + 1, i < 2)));

  const extra = document.getElementById("finisher");
  extra.replaceChildren();
  extra.hidden = !day.extra;
  if (day.extra) {
    extra.appendChild(el("p", null, day.extra.note));
    const extraList = el("ol", "work");
    day.extra.work.forEach((item) => extraList.appendChild(exerciseRow(item, null, false)));
    extra.appendChild(extraList);
  }
}

/* ---------- Büyütme ---------- */

const zoom = document.getElementById("zoom");

function openZoom(ex, item) {
  const body = document.getElementById("zoom-body");
  const big = shot(ex, true);
  big.disabled = true;
  big.removeAttribute("aria-label");
  body.replaceChildren(big, el("h3", null, ex.name), el("p", null, ex.tr));
  if (item) body.appendChild(presentation(item));
  body.appendChild(guide(ex));
  zoom.showModal();
}

zoom.addEventListener("click", (e) => {
  if (e.target === zoom || e.target.closest(".zoom-close")) zoom.close();
});

zoom.addEventListener("close", () => {
  document.getElementById("zoom-body").replaceChildren();
});

/* ---------- Yönlendirme ---------- */

function route() {
  if (zoom.open) zoom.close();

  const slug = (location.hash.match(/^#gun\/(.+)$/) || [])[1];
  const day = CYCLE.find((d) => d.slug === slug && !d.rest);

  document.getElementById("view-week").hidden = !!day;
  document.getElementById("view-day").hidden = !day;

  if (day) renderDay(day);
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", route);
renderWeek();
route();
