/* ============================================================
   CacaPalavras — aplicação (UI)
   Orquestra telas, renderização de tiles, eventos e stats.
   ============================================================ */

(function () {
  const screens = {
    home: document.getElementById("screen-home"),
    game: document.getElementById("screen-game"),
    result: document.getElementById("screen-result"),
  };

  const els = {
    play: document.getElementById("btn-play"),
    home: document.getElementById("btn-home"),
    submit: document.getElementById("btn-submit"),
    guess: document.getElementById("input-guess"),
    tiles: document.getElementById("tiles"),
    attempts: document.getElementById("attempts"),
    feedback: document.getElementById("feedback-status"),
    resultTitle: document.getElementById("result-title"),
    resultAttempts: document.getElementById("result-attempts"),
    revealTiles: document.getElementById("reveal-tiles"),
    resultHome: document.getElementById("btn-result-home"),
    themeChip: document.getElementById("theme-chip"),
    gameTitle: document.getElementById("game-title"),
    statStreak: document.getElementById("stat-streak"),
    statBest: document.getElementById("stat-best"),
    statWins: document.getElementById("stat-wins"),
    statGames: document.getElementById("stat-games"),
  };

  let won = false;
  let lastShareText = "";

  function show(screenName) {
    Object.keys(screens).forEach((key) => {
      const el = screens[key];
      if (key === screenName) {
        el.hidden = false;
        el.classList.add("is-active");
      } else {
        el.hidden = true;
        el.classList.remove("is-active");
      }
    });
  }

  function letterInfo(state, letter) {
    if (state === "green") {
      return { marker: "✓", label: `${letter} está correta e na posição certa.` };
    }
    if (state === "yellow") {
      return { marker: "⇄", label: `${letter} está na palavra, mas em outra posição.` };
    }
    return { marker: "✕", label: `${letter} não está na palavra.` };
  }

  function createTile(char, state) {
    const tile = document.createElement("div");
    tile.className = `tile ${state}`;
    const letter = document.createElement("span");
    letter.className = "letter";
    letter.textContent = char;
    const marker = document.createElement("span");
    marker.className = "marker";
    marker.textContent = letterInfo(state, char).marker;
    tile.appendChild(letter);
    tile.appendChild(marker);
    tile.setAttribute("aria-label", letterInfo(state, char).label);
    return tile;
  }

  function renderTiles(container, guess, feedback) {
    container.innerHTML = "";
    if (!guess || !feedback) {
      for (let i = 0; i < 5; i += 1) container.appendChild(createTile("", "empty"));
      return;
    }
    for (let i = 0; i < 5; i += 1) {
      const char = guess[i];
      if (char) {
        container.appendChild(createTile(char, feedback[i]));
      } else {
        container.appendChild(createTile("", "empty"));
      }
    }
  }

  function renderReveal(container, word) {
    container.innerHTML = "";
    for (let i = 0; i < 5; i += 1) {
      const tile = document.createElement("div");
      tile.className = "tile green";
      const letter = document.createElement("span");
      letter.className = "letter";
      letter.textContent = word[i];
      const marker = document.createElement("span");
      marker.className = "marker";
      marker.textContent = "✓";
      tile.appendChild(letter);
      tile.appendChild(marker);
      tile.setAttribute("aria-label", `${word[i]} está correta e na posição certa.`);
      container.appendChild(tile);
    }
  }

  function renderStats(stats) {
    if (els.statStreak) els.statStreak.textContent = String(effectiveStreak(stats));
    if (els.statBest) els.statBest.textContent = String(stats.bestStreak);
    if (els.statWins) els.statWins.textContent = String(stats.wins);
    if (els.statGames) els.statGames.textContent = String(stats.gamesPlayed);
  }

  function renderHome() {
    const daily = getDaily();
    els.themeChip.textContent = `${daily.theme.emoji} ${daily.theme.name}`;
    els.themeChip.style.backgroundColor = daily.theme.color;
    els.gameTitle.textContent = `${daily.theme.emoji} ${daily.theme.name}`;
    const stats = loadStats();
    renderStats(stats);
  }

  function handleSubmit() {
    const guess = els.guess.value;
    const result = Game.submitGuess(guess);
    if (!result.ok) {
      els.feedback.textContent = result.message || "Não foi possível validar o palpite.";
      return;
    }

    won = result.won;
    attemptsUsed = Game.attemptsUsed;

    const lastGuess = Game.guesses[Game.guesses.length - 1];
    const lastFeedback = Game.feedbackByGuess[Game.feedbackByGuess.length - 1];
    renderTiles(els.tiles, lastGuess, lastFeedback);
    els.attempts.textContent = `${Game.attemptsUsed} de ${Game.maxAttempts} tentativas`;

    const wonNow = Game.status === "won";
    const lostNow = Game.status === "lost";

    if (wonNow || lostNow) {
      const stats = loadAndRecord(wonNow);
      renderStats(stats);
      els.resultTitle.textContent = wonNow ? "Você acertou!" : "Não foi desta vez!";
      els.resultAttempts.textContent = `Você usou ${Game.attemptsUsed} de ${Game.maxAttempts} tentativas.`;
      renderReveal(els.revealTiles, Game.word);
      lastShareText = wonNow
        ? `Acabei de jogar hoje e usei ${Game.attemptsUsed} tentativas!`
        : `Hoje eu joguei no CacaPalavras e não descobri a palavra!`;
      show("result");
    }

    if (!wonNow && !lostNow) {
      els.guess.value = "";
      renderTiles(els.tiles, "", null);
      els.attempts.textContent = `${Game.attemptsUsed} de ${Game.maxAttempts} tentativas`;
      els.guess.focus();
    }
  }

  async function copyResult() {
    const text = lastShareText;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      els.feedback.textContent = "Resultado copiado!";
    } catch (err) {
      els.feedback.textContent = "Não foi possível copiar.";
    }
  }

  function startGame() {
    const daily = getDaily();
    Game.start(daily.theme.id, daily.word);
    won = false;
    attemptsUsed = 0;
    els.guess.value = "";
    renderTiles(els.tiles, "", null);
    els.attempts.textContent = `0 de ${Game.maxAttempts} tentativas`;
    els.feedback.textContent = "";
    show("game");
    els.guess.focus();
  }

  function goHome() {
    Game.status = "home";
    show("home");
    renderHome();
  }

  function bindEvents() {
    els.play.addEventListener("click", startGame);
    els.home.addEventListener("click", goHome);
    els.submit.addEventListener("click", handleSubmit);
    els.resultHome.addEventListener("click", goHome);
    els.guess.addEventListener("input", () => {
      els.guess.value = els.guess.value.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 5);
    });
    els.guess.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleSubmit();
      }
    });
  }

  function init() {
    bindEvents();
    renderHome();
    show("home");
  }

  document.addEventListener("DOMContentLoaded", init);
})();
