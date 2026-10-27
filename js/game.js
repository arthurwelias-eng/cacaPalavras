/* ============================================================
   CacaPalavras — lógica do jogo
   Estado, seleção da palavra do dia, feedback por letra,
   validação e limite de tentativas.
   ============================================================ */

const Game = {
  status: "home",
  categoryId: null,
  word: null,
  guesses: [],
  feedbackByGuess: [],
  attemptsUsed: 0,
  maxAttempts: 6,

  start(categoryId, word) {
    this.status = "playing";
    this.categoryId = categoryId;
    this.word = word;
    this.guesses = [];
    this.feedbackByGuess = [];
    this.attemptsUsed = 0;
  },

  submitGuess(rawGuess) {
    const guess = String(rawGuess || "").trim().toUpperCase();
    if (this.status !== "playing") return { ok: false, error: "not-playing" };
    if (!/^[A-Z]{5}$/.test(guess)) {
      return { ok: false, error: "invalid", message: "A tentativa precisa ter exatamente 5 letras." };
    }
    const category = this.categoryId || this.getCategory();
    const list = WORD_LISTS[category] || [];
    if (!list.includes(guess)) {
      return { ok: false, error: "invalid", message: "Essa não é uma palavra válida para o tema de hoje." };
    }
    if (this.guesses.includes(guess)) {
      return { ok: false, error: "repeat", message: "Você já chutou essa palavra." };
    }
    if (this.attemptsUsed >= this.maxAttempts) {
      return { ok: false, error: "limit", message: "Você já usou todas as tentativas." };
    }

    this.guesses.push(guess);
    const feedback = computeFeedback(guess, this.word);
    this.feedbackByGuess.push(feedback);
    this.attemptsUsed += 1;

    const won = guess === this.word;
    if (won) this.status = "won";
    else if (this.attemptsUsed >= this.maxAttempts) this.status = "lost";

    return { ok: true, won };
  },
};

function computeFeedback(guess, answer) {
  const result = new Array(5).fill("gray");
  const remaining = {};
  for (let i = 0; i < 5; i += 1) {
    if (guess[i] === answer[i]) {
      result[i] = "green";
    } else {
      remaining[answer[i]] = (remaining[answer[i]] || 0) + 1;
    }
  }
  for (let i = 0; i < 5; i += 1) {
    if (result[i] === "green") continue;
    if ((remaining[guess[i]] || 0) > 0) {
      result[i] = "yellow";
      remaining[guess[i]] -= 1;
    }
  }
  return result;
}
