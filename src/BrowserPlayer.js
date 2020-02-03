const Player = require("./Player");

class BrowserPlayer extends Player {
    constructor(name, symbol, playturn, isSpectator) {
        super(name, symbol, playturn, isSpectator);
    }

    // play(player2) {
    //     return JSON.stringify(super.play(player2));
    // }
}

module.exports = BrowserPlayer;