// ⚙️ Configuración: cambia el número (con código de país, sin + ni espacios) y la moneda
const CONFIG = { name: "Paladis", whatsapp: "5353012038", symbol: "$" };

const CATS = [
  { id: "cafes", name: "Cafés", icon: "☕" },
  { id: "postres", name: "Postres", icon: "🍰" },
  { id: "frappes", name: "Frappés", icon: "🥤" },
  { id: "desayunos", name: "Desayunos", icon: "🥐" },
  { id: "tapas", name: "Picaderas", icon: "🧀" },
  { id: "cocteles", name: "Cócteles", icon: "🍹" },
];

const SIZE = { label: "Tamaño", choices: [["Regular", 0], ["Grande", 1.5]] };
const MILK = { label: "Leche", choices: [["Entera", 0], ["Avena", 0.8], ["Sin lactosa", 0.5]] };

// img es opcional: si falta o falla, se muestra el emoji. Sustituye por tus fotos.
const PRODUCTS = [
  { id: 1, cat: "cafes", name: "Espresso Doble", desc: "Grano de altura, cuerpo intenso y crema espesa.", price: 2.5, emoji: "☕", opts: [SIZE] },
  { id: 2, cat: "cafes", name: "Capuchino", desc: "Espresso, leche vaporizada y espuma sedosa.", price: 3.5, emoji: "☕", img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=70", opts: [SIZE, MILK] },
  { id: 3, cat: "cafes", name: "Latte de Vainilla", desc: "Suave, cremoso y con toque de vainilla natural.", price: 4, emoji: "🥛", opts: [SIZE, MILK] },
  { id: 4, cat: "postres", name: "Cupcake de Dulce de Leche", desc: "Esponjoso, con dulce de leche y galleta triturada.", price: 3, emoji: "🧁" },
  { id: 5, cat: "postres", name: "Donas Glaseadas", desc: "Suaves, con glaseado y toppings del día.", price: 2.5, emoji: "🍩" },
  { id: 6, cat: "postres", name: "Torta de Chocolate", desc: "Bizcocho húmedo con ganache de chocolate negro.", price: 4.5, emoji: "🍫" },
  { id: 7, cat: "frappes", name: "Frappé de Caramelo", desc: "Café helado, caramelo y crema batida.", price: 4.8, emoji: "🥤", opts: [SIZE] },
  { id: 8, cat: "frappes", name: "Frappé de Oreo", desc: "Cremoso, con galleta triturada y chocolate.", price: 5, emoji: "🍪", opts: [SIZE] },
  { id: 9, cat: "desayunos", name: "Tostada con Aguacate", desc: "Pan artesanal, aguacate, huevo pochado y limón.", price: 6, emoji: "🥑" },
  { id: 10, cat: "desayunos", name: "Croissant de Jamón y Queso", desc: "Horneado al momento, con mantequilla.", price: 4.5, emoji: "🥐" },
  { id: 11, cat: "tapas", name: "Tabla de Quesos", desc: "Selección de quesos, frutos secos y miel.", price: 9, emoji: "🧀" },
  { id: 12, cat: "tapas", name: "Croquetas Caseras (6u)", desc: "Cremosas por dentro, crujientes por fuera.", price: 5.5, emoji: "🍘" },
  { id: 13, cat: "cocteles", name: "Caipiríssima", desc: "Ron blanco, lima, azúcar y hielo picado.", price: 5, emoji: "🍹" },
  { id: 14, cat: "cocteles", name: "Mojito Clásico", desc: "Ron, hierbabuena fresca, lima y soda.", price: 5, emoji: "🍃" },
  { id: 15, cat: "cocteles", name: "Espresso Martini", desc: "Vodka, licor de café y espresso recién hecho.", price: 6.5, emoji: "🍸" },
];
