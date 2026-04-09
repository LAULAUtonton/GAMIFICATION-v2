// THE PIT - Global Score System
// Shared across all stations for leaderboard

const PIT_SCORE = {
  getPlayer() {
    const data = localStorage.getItem('pitPlayer');
    if (!data) {
      return {
        name: '',
        totalScore: 0,
        stations: {
          vocabulary: { score: 0, sessions: 0, bestStreak: 0 },
          writing: { score: 0, sessions: 0, tasksCompleted: 0 },
          reading: { score: 0, sessions: 0, textsRead: 0 },
          grammar: { score: 0, sessions: 0, exercisesDone: 0 },
          listening: { score: 0, sessions: 0, audioCompleted: 0 },
          speaking: { score: 0, sessions: 0, dialogues: 0 },
          games: { score: 0, sessions: 0, gamesWon: 0 },
          funnycorner: { score: 0, sessions: 0, learned: 0 },
          challenge: { score: 0, sessions: 0, completed: 0 }
        },
        achievements: [],
        lastActive: null
      };
    }
    const p = JSON.parse(data);
    if (!p.stations.challenge) p.stations.challenge = { score: 0, sessions: 0, completed: 0 };
    return p;
  },

  savePlayer(player) {
    player.lastActive = new Date().toISOString();
    player.totalScore = Object.values(player.stations).reduce((sum, s) => sum + s.score, 0);
    localStorage.setItem('pitPlayer', JSON.stringify(player));
  },

  setName(name) {
    const player = this.getPlayer();
    player.name = name;
    this.savePlayer(player);
    return player;
  },

  addScore(station, points) {
    const player = this.getPlayer();
    if (player.stations[station]) {
      player.stations[station].score += points;
      player.stations[station].sessions++;
    }
    this.savePlayer(player);
    this.checkAchievements(player);
    return player;
  },

  updateStation(station, stats) {
    const player = this.getPlayer();
    if (player.stations[station]) {
      Object.assign(player.stations[station], stats);
    }
    this.savePlayer(player);
    return player;
  },

  // Leaderboard: store multiple players locally
  getLeaderboard() {
    const board = JSON.parse(localStorage.getItem('pitLeaderboard') || '[]');
    return board.sort((a, b) => b.score - a.score);
  },

  saveToLeaderboard() {
    const player = this.getPlayer();
    if (!player.name) return;
    let board = JSON.parse(localStorage.getItem('pitLeaderboard') || '[]');
    const idx = board.findIndex(e => e.name.toLowerCase() === player.name.toLowerCase());
    const entry = {
      name: player.name,
      score: player.totalScore,
      stations: Object.fromEntries(Object.entries(player.stations).map(([k, v]) => [k, v.score])),
      date: new Date().toISOString()
    };
    if (idx >= 0) board[idx] = entry;
    else board.push(entry);
    localStorage.setItem('pitLeaderboard', JSON.stringify(board));
  },

  // Export score as a shareable code (base64)
  exportCode() {
    const player = this.getPlayer();
    const data = {
      n: player.name,
      s: player.totalScore,
      st: Object.fromEntries(Object.entries(player.stations).map(([k, v]) => [k, v.score])),
      a: player.achievements,
      d: new Date().toISOString()
    };
    return btoa(JSON.stringify(data));
  },

  // Import a classmate's score code into the leaderboard
  importCode(code) {
    try {
      const data = JSON.parse(atob(code));
      if (!data.n || typeof data.s !== 'number') return false;
      let board = JSON.parse(localStorage.getItem('pitLeaderboard') || '[]');
      const idx = board.findIndex(e => e.name.toLowerCase() === data.n.toLowerCase());
      const entry = { name: data.n, score: data.s, stations: data.st, date: data.d };
      if (idx >= 0) { if (data.s > board[idx].score) board[idx] = entry; }
      else board.push(entry);
      localStorage.setItem('pitLeaderboard', JSON.stringify(board));
      return data.n;
    } catch (e) { return false; }
  },

  checkAchievements(player) {
    const achievements = [
      { id: 'first_100', condition: p => p.totalScore >= 100 },
      { id: 'score_500', condition: p => p.totalScore >= 500 },
      { id: 'score_1000', condition: p => p.totalScore >= 1000 },
      { id: 'all_stations', condition: p => Object.values(p.stations).every(s => s.sessions > 0) },
      { id: 'vocab_master', condition: p => p.stations.vocabulary.score >= 200 },
      { id: 'writer', condition: p => p.stations.writing.tasksCompleted >= 10 },
      { id: 'reader', condition: p => p.stations.reading.textsRead >= 5 },
      { id: 'challenger', condition: p => p.stations.challenge.completed >= 5 },
      { id: 'streak_10', condition: p => Object.values(p.stations).some(s => s.bestStreak >= 10) }
    ];
    achievements.forEach(ach => {
      if (!player.achievements.includes(ach.id) && ach.condition(player)) {
        player.achievements.push(ach.id);
      }
    });
    this.saveToLeaderboard();
  },

  reset() {
    localStorage.removeItem('pitPlayer');
  }
};

// Export for use in stations
if (typeof module !== 'undefined') {
  module.exports = PIT_SCORE;
}
