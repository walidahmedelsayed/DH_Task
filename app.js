require("./src/Board");
const WebSocket = require('ws');
const wss = new WebSocket.Server({
    port: 3000
});
const players = new Map();

wss.getUniqueID = () => {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
};

wss.on('connection', function connection(ws, req) {
    let generatedId = wss.getUniqueID();
    ws.id = generatedId;
    let id = generatedId;
    let name = req.url.match(/\?name=(.*?)\?/)[1];
    let symbol = req.url.match(/\?symbol=(.*?)?/)[1];
    let player = {
        name,
        symbol,
        playPosition: null,
        playturn: !players.size ? true : false
    };

    players.size < 2 ? players.set(id, player) : ws.send("You are a spectator");

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN && client.id !== ws.id) {
            client.send(`${name} has joined the game ... \n` + printBoard());
        }
    });
    if (players.has(ws.id)) {
        ws.send(`Welcome ${player.name} to the Game: \n 
            1 | 2 | 3 \n
            4 | 5 | 6 \n
            7 | 8 | 9 \n\nChoose the position by number, Please press the choosed postion to start\nYour symbol is ${player.symbol}`);

    }


    ws.onmessage = function (event) {
        if (!players.has(ws.id)) {
            ws.send("You're spectator. The board will appear on any player's turn");
            return;
        }

        let player1 = players.get(ws.id);
        player1.playPosition = event.data;

        if (players.size === 2) {
            let otherPlayerId = Array.from(players.keys()).filter(id => id !== ws.id)[0];
            let player2 = players.get(otherPlayerId);
            let result = play(player1, player2);
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(result);
                }
            });
        } else {
            ws.send("Waiting for the other player to connect ...");
        }
    }

    ws.onclose = () => {
        players.delete(ws.id);
    }
});