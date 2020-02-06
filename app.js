require("./src/Board");

const Player = require("./src/Player")
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
    let id = generatedId;
    let type = req.url.match(/\?type=(.*?)\?/)[1];
    let name = req.url.match(/(?<=name=).*$/)[0];
    let symbol = wss.clients.size > 1 ? "O" : "X";
    let playturn = !players.size ? true : false;
    let isSpectator = players.size >= 2 ? true : false;
    ws.id = generatedId;
    ws.type = type;
    ws.isSpectator = isSpectator;
    console.log(`${name} connected to the server ...`)
    let player = new Player(name, symbol, playturn, isSpectator);
    console.log(player)
    players.set(id, player);

    if (player.isSpectator) {
        let message = "You are a spectator. The board will appear on any player's turn";
        return ws.type === "cmd" ? ws.send(message) : ws.send(JSON.stringify({
            message
        }))
    }

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN && client.id !== ws.id) {
            let message = `${name} has joined the game ... \n`;
            if (client.type === "cmd") {
                return client.send(message)
            } else {
                return client.send(JSON.stringify({
                    message,
                    positions
                }));
            }
        }
    });

    if (players.has(ws.id)) {
        if (ws.type === "cmd") {
            ws.send(`Welcome ${player.name} to the Game: \n 
            1 | 2 | 3 \n
            4 | 5 | 6 \n
            7 | 8 | 9 \n\nChoose the position by number, Please press the choosed postion to start\nYour symbol is ${player.symbol}`);
        } else {
            ws.send(JSON.stringify({
                message: `Welcome ${player.name} to the Game: \nYour symbol is ${player.symbol}`
            }))
        }
    }


    ws.onmessage = function (event) {
        let player1 = players.get(ws.id);
        player1.playPosition = event.data;

        if (ws.isSpectator) {
            let message = "You're a spectator. The board will appear on any player's turn";
            return (ws.type === "cmd") ? ws.send(message) : ws.send(JSON.stringify({
                message
            }));
        }
        let activePlayers = Array.from(players.values()).reduce((acc, p) => {
            return p.isSpectator ? acc : acc += 1;
        }, 0)

        if (activePlayers === 2) {
            let otherPlayerId = Array.from(players.keys()).filter(id => id !== ws.id)[0];
            let player2 = players.get(otherPlayerId);
            let result = player1.play(player2);
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    if (client.type !== "cmd") {
                        client.send(JSON.stringify(result));
                    } else {
                        client.send(`${result.message}\n` + printBoard(result.positions));
                    }
                }
            });
        } else {
            let message = "Waiting for the other player to connect ...";

            return ws.type !== "cmd" ? ws.send(JSON.stringify({
                message,
                positions
            })) : ws.send(message);
        }
    }

    ws.onclose = () => {
        players.delete(ws.id);
        console.log("User has left ...");
    }
});