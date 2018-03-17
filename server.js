const express = require('express');
const bodyParser = require('body-parser');
const Vue = require('vue');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'))

let opponent_pairs = {}; // {name: name}
let players = []; // [{name: String, shape: Int, timeout: Int}]

function pairOpponents() {
  let nextToPair = '';
  for (let i = 0; i < players.length; i++) {
    let player = players[i].name;
    if (opponent_pairs[player]) {
      continue; // This player is already paired
    }
    if (nextToPair != '') {
      opponent_pairs[nextToPair] = player;
      opponent_pairs[player] = nextToPair;
      nextToPair = '';
    } else {
      nextToPair = player;
    }
  }
}

let timer = setInterval(updateTimeouts, 1000);
function updateTimeouts() {
  let newPlayers = players.slice();
  for (let i = 0; i < players.length; i++) {
    players[i].timeout -= 1;
    if (players[i].timeout <= 0) {
      newPlayers.splice(i, 1);
      let opponent = opponent_pairs[players[i].name];
      delete opponent_pairs[players[i].name];
      delete opponent_pairs[opponent];
      console.log("Removed: " + players[i].name)
    }
  }
  players = newPlayers;
  pairOpponents();
}

function removePlayer(name) {
  let opponent = opponent_pairs[name];
  delete opponent_pairs[name];
  delete opponent_pairs[opponent];
  let index = players.map(player => { return player.name }).indexOf(name);
  if (index >= 0 ){
    players.splice(index, 1);
  }
  console.log("Removed: " + name)
}

app.post('/api/register/:name', (req, res) => {
  let name = req.params.name;
  console.log("Registered " + name);
  if (players.map(player => { return player.name }).indexOf(name) == -1) {
    players.push({
      name: name,
      shape: -1,
      timeout: 6,
    });
  }
  res.send(name);
  pairOpponents();
});

app.get('/api/opponent/:name', (req, res) => {
  let name = req.params.name;
  let opponentName = opponent_pairs[name];
  let opponent = players.filter(player => { return player.name == opponentName })[0];
  res.send(opponent);
  // Update player Timeouts
  let index = players.map(player => { return player.name }).indexOf(name);
  if (index > -1) {
    players[index].timeout = 6;
  }
});

app.put('/api/fight/:name', (req, res) => {
  let name = req.params.name;
  let player = players.filter(player => { return player.name == name })[0];
  player.shape = parseInt(req.body.shape);
  res.send("" + player.shape);
});

app.delete('/api/player/:name', (req, res) => {
  let name = req.params.name;
  removePlayer(name);
  res.send("");
});

app.listen(3000, () => console.log('Server listening on port 3000!'))
