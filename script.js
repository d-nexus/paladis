(() => {
  const $ = s => document.querySelector(s);
  const fmt = n => CONFIG.symbol + n.toFixed(2);
  let cat = CATS[0].id;
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem("paladis-cart")) || []; } catch {}

  const tabs = () => $("#tabs").innerHTML = CATS.map(c =>
    `<button class="tab${c.id === cat ? " on" : ""}" data-c="${c.id}">${c.icon} ${c.name}</button>`).join("");

  const grid = () => $("#grid").innerHTML = PRODUCTS.filter(p => p.cat === cat).map(p => `
    <article class="card" data-id="${p.id}">
      <div class="ph"><span>${p.emoji}</span>${p.img ? `<img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.remove()">` : ""}</div>
      <div class="cb"><h3>${p.name}</h3><p>${p.desc}</p>
        <div class="row"><b>${fmt(p.price)}</b><button class="add" data-add="${p.id}">Añadir</button></div></div>
    </article>`).join("");

  const toast = msg => { const t = $("#toast"); t.textContent = msg; t.classList.add("on"); clearTimeout(t.h); t.h = setTimeout(() => t.classList.remove("on"), 1500); };

  function addItem(p, extras = [], note = "") {
    const price = p.price + extras.reduce((s, e) => s + e[1], 0);
    const detail = extras.map(e => e[0]).join(", ");
    const key = [p.id, detail, note].join("|");
    const it = cart.find(i => i.key === key);
    it ? it.qty++ : cart.push({ key, name: p.name, detail, note, price, qty: 1 });
    save(); toast(`✓ ${p.name} añadido`);
  }

  function save() {
    try { localStorage.setItem("paladis-cart", JSON.stringify(cart)); } catch {}
    const n = cart.reduce((s, i) => s + i.qty, 0);
    $("#badge").textContent = n; $("#badge").style.display = n ? "grid" : "none";
    $("#total").textContent = fmt(cart.reduce((s, i) => s + i.price * i.qty, 0));
    $("#items").innerHTML = cart.length ? cart.map((i, k) => `
      <div class="it"><div><b>${i.name}</b><small>${i.detail}</small>${i.note ? `<small>📝 ${i.note}</small>` : ""}
        <div class="qty"><button data-q="${k}" data-d="-1" aria-label="Menos">−</button>${i.qty}<button data-q="${k}" data-d="1" aria-label="Más">+</button></div></div>
        <div><b>${fmt(i.price * i.qty)}</b><br><button class="x" data-rm="${k}" aria-label="Eliminar">🗑</button></div></div>`).join("")
      : `<p class="empty">Tu carrito está vacío ☕</p>`;
  }

  const panel = (id, open) => {
    $(id).classList.toggle("open", open);
    document.body.classList.toggle("o", open);
  };
  const closeAll = () => { $("#drawer").classList.remove("open"); $("#modal").classList.remove("open"); document.body.classList.remove("o"); };

  function openModal(p) {
    const opts = (p.opts || []).map((o, gi) => `<fieldset><legend>${o.label}</legend>${o.choices.map((c, ci) =>
      `<label class="op"><span><input type="radio" name="g${gi}" value="${ci}" ${ci ? "" : "checked"} style="width:auto"> ${c[0]}</span><span>${c[1] ? "+" + fmt(c[1]) : ""}</span></label>`).join("")}</fieldset>`).join("");
    $("#modal").innerHTML = `<div class="dh" style="padding:0 0 8px"><h2>${p.emoji} ${p.name}</h2><button class="x" data-close>✕</button></div>
      <p style="color:var(--mut)">${p.desc}</p>${opts}
      <textarea id="note" rows="2" placeholder="Nota para cocina/barra (sin hielo, poco azúcar…)"></textarea>
      <button class="btn" id="mAdd">Añadir · ${fmt(p.price)}</button>`;
    $("#mAdd").onclick = () => {
      const extras = (p.opts || []).map((o, gi) => o.choices[+document.querySelector(`input[name=g${gi}]:checked`).value]);
      addItem(p, extras, $("#note").value.trim()); closeAll();
    };
    panel("#modal", true);
  }

  function checkout() {
    const name = $("#name").value.trim(), mode = $("#mode").value, addr = $("#addr").value.trim();
    if (!cart.length) return toast("Añade algo primero ☕");
    if (!name) return $("#name").focus();
    if (mode === "entrega" && !addr) return $("#addr").focus();
    const lines = cart.map(i => `• ${i.qty}x ${i.name}${i.detail ? ` (${i.detail})` : ""} — ${fmt(i.price * i.qty)}${i.note ? `\n   📝 ${i.note}` : ""}`).join("\n");
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const msg = `🍰☕ *Nuevo pedido · ${CONFIG.name}*\n\n👤 *Cliente:* ${name}\n${{ entrega: `🛵 *Entrega:* ${addr}`, recogida: "🥡 *Para llevar*", local: "🪑 *Consumo en el local*" }[mode]}\n\n🧾 *Pedido*\n${lines}\n\n💰 *Total: ${fmt(total)}*\n\n¡Gracias! 🙌`;
    window.open(`https://api.whatsapp.com/send?phone=${CONFIG.whatsapp}&text=${encodeURIComponent(msg)}`, "_blank");
  }

  document.addEventListener("click", e => {
    const t = e.target, q = a => t.closest(`[${a}]`);
    if (q("data-c")) { cat = q("data-c").dataset.c; tabs(); grid(); }
    else if (q("data-add")) { const p = PRODUCTS.find(x => x.id == q("data-add").dataset.add); p.opts ? openModal(p) : addItem(p); }
    else if (t.closest(".card")) openModal(PRODUCTS.find(x => x.id == t.closest(".card").dataset.id));
    else if (q("data-q")) { const b = q("data-q"), i = cart[b.dataset.q]; i.qty += +b.dataset.d; if (i.qty < 1) cart.splice(b.dataset.q, 1); save(); }
    else if (q("data-rm")) { cart.splice(q("data-rm").dataset.rm, 1); save(); }
    else if (t.closest("#fab")) panel("#drawer", true);
    else if (t.closest("#closeCart,[data-close]") || t === $("#overlay")) closeAll();
  });
  $("#mode").onchange = e => $("#addr").style.display = e.target.value === "entrega" ? "" : "none";
  $("#send").onclick = checkout;
  document.addEventListener("keydown", e => e.key === "Escape" && closeAll());

  tabs(); grid(); save();
})();
