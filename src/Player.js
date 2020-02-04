require("./Board");

class Player {
    constructor(name, symbol, playturn, isSpectator) {
        this.name = name;
        this.symbol = symbol;
        this.playturn = playturn;
        this.playPosition = null;
        this.isSpectator = isSpectator;
    }
    play(player2) {
        if (isBoardEmpty() && this.playPosition === "Y") {
            return {
                message: "Press any key to play again",
                positions
            };
        }
        if (this.playturn) {
            if (isValidPlay(this.playPosition)) {
                positions[this.playPosition] = this.symbol;
                this.playturn = false;
                player2.playturn = !this.playturn
                if (checkWin()) {
                    console.log(positions);
                    return {
                        message: `${this.name} Win \n Choose a position and play again :)`,
                        positions
                    };
                } else if (checkDraw()) {
                    return {
                        message: "Game Draw",
                        positions
                    };
                } else {
                    return {
                        message: `It's ${player2.name} turn \n`,
                        positions
                    };
                }
            } else {
                return {
                    message: `For ${this.name}: Invalid position, Please choose another one \n`,
                    positions
                };
            }
        } else {
            return {
                message: `It's ${player2.name} turn \n`,
                positions
            };
        }
    }
}

module.exports = Player;