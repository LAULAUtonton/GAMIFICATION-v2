# THE PIT - English Language Learning Gamification Platform

## Original Problem Statement
Gamification platform for learning English (2ESO curriculum) built as pure HTML/CSS/Vanilla JS for GitHub Pages. Multiple learning stations with global leaderboard.

## Architecture
```
/app/gamification_project/
├── index.html                    # Main hub - dark theme, leaderboard, all stations
└── stations/
    ├── vocabulary.html           # Purple - 336 words, 7 modes
    ├── vocabulary.js
    ├── vocabulary-icons.js
    ├── writing.html              # Teal - 6 writing modes
    ├── reading.html              # Green - 24 texts, manga illustrations, 3 modes
    ├── reading-bank.js
    ├── speaking.html             # Blue - 16 dialogues, 4 modes (role play, listen & repeat, fill, order)
    ├── listening.html            # Orange - 16 exercises, 3 modes (comprehension, dictation, note-taking)
    ├── funnycorner.html          # Pink - 25 idioms, 4 modes (guess, match, situation, listen)
    ├── games.html                # Red - language games
    ├── grammar.html              # Gray - grammar practice
    ├── to-be.html                # Gray - verb to be
    ├── pronouns.html             # Gray - pronouns practice
    ├── present-continuous.html   # Gray - present continuous
    ├── question-words.html       # Gray - question words
    ├── pit-score.js              # Global score tracker (localStorage)
    └── icons/                    # SVG assets
```

## Completed Stations
| Station | Color | Content | Modes | Score Integration |
|---------|-------|---------|-------|-------------------|
| Hub/Index | Dark/Gradient | Leaderboard, achievements | N/A | Reads all scores |
| Vocabulary | Purple | 336 words, 8 units | 7 (Flashcards, Sorting, Quiz, Hangman, Memory, Sentences, Explore) | Yes |
| Writing | Teal | 6 writing tasks | 6 modes with grammar check | Yes |
| Reading | Green | 24 texts, manga illustrations | 3 (Comprehension, T/F, Vocabulary) | Yes |
| Speaking | Blue | 16 dialogues, 8 units | 4 (Role Play, Listen & Repeat, Fill the Gap, Word Order) | Yes |
| Listening | Orange | 16 exercises (2/unit: easy+hard) | 3 (Comprehension, Dictation, Note-taking) | Yes |
| Funny Corner | Pink | 25 idioms, 5 categories | 4 (Guess Meaning, Match Up, Situation, Listen & Choose) | Yes |

## Backlog
### P0
- [ ] Challenge Station (red/fire) - Karaoke, Tongue Twisters, Who Am I, Multi-skill

### P1
- [ ] Review/improve existing grammar mini-stations (to-be, pronouns, etc.)
- [ ] Ensure all grammar stations use pit-score.js

### P2
- [ ] Mobile responsiveness polish
- [ ] Achievement unlock logic in pit-score.js
