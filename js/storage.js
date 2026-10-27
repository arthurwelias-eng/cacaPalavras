/* ============================================================
   CacaPalavras — armazenamento (localStorage)
   Streak contínua + estatísticas básicas.
   ============================================================ */

const STORAGE_KEY = "cacaPalavras.stats.v1";

const DEFAULT_STATS = {
  streak: 0,
  bestStreak: 0,
  wins: 0,
  gamesPlayed: 0,
  lastPlayedDate: null,
};

function loadStats() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATS };
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_STATS, ...parsed };
  } catch (err) {
    return { ...DEFAULT_STATS };
  }
}

function saveStats(stats) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (err) {
    /* armazenamento indisponível: segue sem persistência */
  }
}

function todayKey() {
  const now = new Date();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${m}-${d}`;
}

function keyOf(date) {
  const d = new Date(date);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function effectiveStreak(stats) {
  if (!stats.lastPlayedDate) return 0;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (stats.lastPlayedDate === keyOf(yesterday) || stats.lastPlayedDate === todayKey()) {
    return stats.streak > 0 ? stats.streak : 0;
  }
  return 0;
}

function recordResult(won, stats) {
  stats.gamesPlayed += 1;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const consecutive = stats.lastPlayedDate === keyOf(yesterday);
  if (won) {
    stats.streak = consecutive ? stats.streak + 1 : 1;
    if (stats.streak > stats.bestStreak) stats.bestStreak = stats.streak;
    stats.wins += 1;
  }
  stats.lastPlayedDate = todayKey();
  saveStats(stats);
  return stats;
}

function loadAndRecord(won) {
  const current = loadStats();
  const updated = recordResult(won, current);
  return updated;
}

function clearStats() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    /* noop */
  }
}

function getSuccessRate(stats) {
  if (stats.gamesPlayed === 0) return 0;
  return Math.round((stats.wins / stats.gamesPlayed) * 100);
}
