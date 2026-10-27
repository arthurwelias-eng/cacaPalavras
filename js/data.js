/* ============================================================
   CacaPalavras — dados
   Listas de palavras por tema + seleção determinística da
   palavra do dia (baseada na data).
   ============================================================ */

const WORD_LISTS = {
  animais: ["TIGRE", "ARARA", "PEIXE", "KOALA", "PANDA"],
  comida: ["ABACI", "CARNE", "ARROZ", "FEIJO", "AVEIA"],
  ciencia: ["QUARK", "LUMEN", "SOLAR", "RADIO", "ATOMS"],
  esportes: ["TENIS", "GOLFE", "KAYAK", "SKATE"],
};

const THEMES = [
  { id: "animais", name: "Animais", emoji: "🦁", color: "#2e7d32" },
  { id: "comida", name: "Comida", emoji: "🍎", color: "#e67e22" },
  { id: "ciencia", name: "Ciência", emoji: "🔬", color: "#8e44ad" },
  { id: "esportes", name: "Esportes", emoji: "⚽", color: "#2980b9" },
];

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) {
    h = (h * 31) + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function getDaily() {
  const now = new Date();
  const key = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const themeIndex = hashString(key) % THEMES.length;
  const theme = THEMES[themeIndex];
  const list = WORD_LISTS[theme.id];
  const word = list[hashString(key) % list.length];
  return { theme, word };
}
