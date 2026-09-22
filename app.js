/* Haftalık plan — görünüm kurulumu ve hash yönlendirmesi. */

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

const moveCount = (day) =>
  day.work.reduce((total, item) => total + (item.superset ? item.superset.length : 1), 0);

const initials = (name) =>
  name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

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
  if (item.tag) {
    const tag = el("span", "tag", item.tag);
    if (item.tag.includes("Failure")) tag.classList.add("is-fail");
    line.appendChild(tag);
  }
  return line;
}

function textBlock(ex, item) {
  const block = el("div", "row-text");
  block.appendChild(el("h3", null, ex.name));
  block.appendChild(el("p", "row-tr", ex.tr));
  if (item) block.appendChild(presentation(item));
  return block;
}

/* ---------- Hafta ---------- */

function renderWeek() {
  const grid = document.getElementById("week");
  const todayIndex = (new Date().getDay() + 6) % 7;

  grid.replaceChildren();

  WEEK.forEach((day, i) => {
    const card = el("a", "day-card");
    card.href = day.rest ? "#" : "#gun/" + day.slug;
    if (day.plate) card.dataset.plate = day.plate;

    if (day.rest) {
      card.classList.add("is-rest");
      card.removeAttribute("href");
      card.appendChild(el("span", "card-day", day.day));
      card.appendChild(el("span", "card-focus", "Dinlenme"));
    } else {
      card.appendChild(el("span", "card-day", day.day));
      card.appendChild(el("span", "card-focus", day.focus));
      card.appendChild(el("span", "card-meta", moveCount(day) + " hareket · " + setCount(day) + " set"));
    }

    if (i === todayIndex) {
      card.classList.add("is-today");
      card.appendChild(el("span", "badge-today", "bugün"));
    }

    grid.appendChild(card);
  });

  const today = WEEK[todayIndex];
  const line = document.getElementById("today-line");
  line.replaceChildren(
    document.createTextNode(today.rest ? "Bugün dinlenme" : today.focus),
    el("em", null, today.day)
  );
}

/* ---------- Gün ---------- */

function renderDay(day) {
  document.getElementById("dayhead").dataset.plate = day.plate;
  document.getElementById("day-title").textContent = day.day;
  document.getElementById("day-focus").textContent = day.focus;
  document.getElementById("day-count").textContent =
    moveCount(day) + " hareket\n" + setCount(day) + " set";

  const list = document.getElementById("work");
  list.replaceChildren();

  let position = 0;

  day.work.forEach((item, i) => {
    const row = el("li", "row");
    const eager = i < 2;

    if (item.superset) {
      row.classList.add("is-ss");
      row.appendChild(el("span", "idx", ++position + ""));

      const group = el("div", "ss-group");
      const label = el("p", "ss-label");
      label.appendChild(el("b", null, item.sets));
      label.appendChild(document.createTextNode(" · " + item.tag + " · süperset"));
      group.appendChild(label);

      item.superset.forEach((ex) => {
        const pair = el("div", "ss-item");
        const text = el("div", "row-text");
        text.appendChild(el("h3", null, ex.name));
        text.appendChild(el("p", "row-tr", ex.tr));
        pair.appendChild(text);
        pair.appendChild(shot(ex, eager, { sets: item.sets, tag: item.tag }));
        group.appendChild(pair);
      });

      row.appendChild(group);
    } else {
      row.appendChild(el("span", "idx", ++position + ""));
      row.appendChild(textBlock(item.ex, item));
      row.appendChild(shot(item.ex, eager, item));
    }

    list.appendChild(row);
  });

  const extra = document.getElementById("finisher");
  extra.replaceChildren(el("p", null, FINISHER.note));
  const extraList = el("ol", "work");
  FINISHER.work.forEach((item) => {
    const row = el("li", "row");
    row.appendChild(textBlock(item.ex, item));
    row.appendChild(shot(item.ex, false, item));
    extraList.appendChild(row);
  });
  extra.appendChild(extraList);
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
  const day = WEEK.find((d) => d.slug === slug && !d.rest);

  document.getElementById("view-week").hidden = !!day;
  document.getElementById("view-day").hidden = !day;

  if (day) renderDay(day);
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", route);
renderWeek();
route();
