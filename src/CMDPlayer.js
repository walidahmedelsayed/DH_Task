const Player = require("./Player");

class CMDPlayer extends Player {
    constructor(name, symbol, playturn, isSpectator) {
        super(name, symbol, playturn, isSpectator);
    }

    // play(player2) {
    //     let result = super.play(player2);
    //     return `${result.message}\n${JSON.stringify(printBoard(result.positions))}`
    // }
}

module.exports = CMDPlayer;