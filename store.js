// Carga el menú desde Supabase y deja CONFIG, CATS y PRODUCTS con el mismo formato de data.js.
// Si Supabase falla o aún no está configurado, usa data.js como respaldo.
(async () => {
  const load = src => new Promise(r => {
    const s = document.createElement("script");
    s.src = src; s.onload = s.onerror = r; document.body.append(s);
  });
  try {
    const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    const [s, c, p, g] = await Promise.all([
      db.from("settings").select().eq("id", 1).single(),
      db.from("categories").select().order("sort"),
      db.from("products").select().eq("active", true).order("sort").order("id"),
      db.from("option_groups").select(),
    ]);
    if (s.error || c.error || p.error || g.error || !c.data.length) throw 0;
    const G = Object.fromEntries(g.data.map(x => [x.id, { label: x.label, choices: x.choices }]));
    window.CONFIG = { name: s.data.name, whatsapp: s.data.whatsapp, symbol: s.data.symbol };
    window.CATS = c.data;
    window.PRODUCTS = p.data.map(x => {
      const opts = x.opt_ids.map(i => G[i]).filter(Boolean);
      return { id: x.id, cat: x.cat, name: x.name, desc: x.description || "", price: +x.price,
               emoji: x.emoji || "🍽️", img: x.img || undefined, opts: opts.length ? opts : undefined };
    });
  } catch {
    await load("data.js");
  }
  load("script.js");
})();
