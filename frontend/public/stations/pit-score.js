// THE PIT - Global Score System
// Shared across all stations for leaderboard

const PIT_SCORE = {
  // Get current player data
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
          funnycorner: { score: 0, sessions: 0, learned: 0 }
        },
        achievements: [],
        lastActive: null
      };
    }
    return JSON.parse(data);
  },

  // Save player data
  savePlayer(player) {
    player.lastActive = new Date().toISOString();
    player.totalScore = Object.values(player.stations).reduce((sum, s) => sum + s.score, 0);
    localStorage.setItem('pitPlayer', JSON.stringify(player));
  },

  // Set player name
  setName(name) {
    const player = this.getPlayer();
    player.name = name;
    this.savePlayer(player);
    return player;
  },

  // Add score to a station
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

  // Update station stats
  updateStation(station, stats) {
    const player = this.getPlayer();
    if (player.stations[station]) {
      Object.assign(player.stations[station], stats);
    }
    this.savePlayer(player);
    return player;
  },

  // Get leaderboard (for future multiplayer)
  getLeaderboard() {
    const player = this.getPlayer();
    return [{
      name: player.name || 'Player',
      score: player.totalScore,
      stations: player.stations
    }];
  },

  // Check and award achievements
  checkAchievements(player) {
    const achievements = [
      { id: 'first_100', name: 'First Steps', desc: 'Score 100 points', condition: p => p.totalScore >= 100 },
      { id: 'score_500', name: 'Rising Star', desc: 'Score 500 points', condition: p => p.totalScore >= 500 },
      { id: 'score_1000', name: 'Champion', desc: 'Score 1000 points', condition: p => p.totalScore >= 1000 },
      { id: 'all_stations', name: 'Explorer', desc: 'Try all stations', condition: p => Object.values(p.stations).every(s => s.sessions > 0) },
      { id: 'vocab_master', name: 'Word Wizard', desc: 'Score 200 in Vocabulary', condition: p => p.stations.vocabulary.score >= 200 },
      { id: 'writer', name: 'Author', desc: 'Complete 10 writing tasks', condition: p => p.stations.writing.tasksCompleted >= 10 },
      { id: 'reader', name: 'Bookworm', desc: 'Read 5 texts', condition: p => p.stations.reading.textsRead >= 5 }
    ];

    achievements.forEach(ach => {
      if (!player.achievements.includes(ach.id) && ach.condition(player)) {
        player.achievements.push(ach.id);
        console.log(`Achievement unlocked: ${ach.name}`);
      }
    });
  },

  // Reset all data
  reset() {
    localStorage.removeItem('pitPlayer');
  }
};

// Export for use in stations
if (typeof module !== 'undefined') {
  module.exports = PIT_SCORE;
}
