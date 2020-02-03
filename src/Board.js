let positions = {
    1: ' ',
    2: ' ',
    3: ' ',
    4: ' ',
    5: ' ',
    6: ' ',
    7: ' ',
    8: ' ',
    9: ' '
};

const isValidPlay = (p) => {
    return positions[p] == ' ' ? true : false;
}


const isBoardEmpty = () => {
    for (let v of Object.values(positions)) {
        if (v !== " ") {
            return false;
        }
    }
    return true;
}

const checkDraw = () => {
    for (let v of Object.values(positions)) {
        if (v === " ") {
            return false;
        }
    }
    clearBoard();
    return true;
}

module.exports = printBoard = () => {
    return ('\n' +
        ' ' + positions[1] + ' | ' + positions[2] + ' | ' + positions[3] + '\n' +
        ' ---------\n' +
        ' ' + positions[4] + ' | ' + positions[5] + ' | ' + positions[6] + '\n' +
        ' ---------\n' +
        ' ' + positions[7] + ' | ' + positions[8] + ' | ' + positions[9] + '\n');
}

const clearBoard = () => {
    for (let value of Object.keys(positions)) {
        positions[value] = " ";
    }
}

const checkWin = () => {
    if (
        positions[1] === positions[2] && positions[1] === positions[3] && positions[1] !== " " ||
        positions[4] === positions[5] && positions[4] === positions[6] && positions[4] !== " " ||
        positions[7] === positions[8] && positions[7] === positions[9] && positions[7] !== " " ||
        positions[1] === positions[2] && positions[1] === positions[3] && positions[1] !== " " ||
        positions[1] === positions[5] && positions[1] === positions[9] && positions[1] !== " " ||
        positions[3] === positions[6] && positions[3] === positions[9] && positions[3] !== " " ||
        positions[1] === positions[4] && positions[1] === positions[7] && positions[1] !== " " ||
        positions[2] === positions[5] && positions[2] === positions[8] && positions[2] !== " " ||
        positions[3] === positions[5] && positions[5] === positions[7] && positions[5] !== " ") {
        clearBoard();
        return true;
    } else {
        return false;
    }
}

module.exports = play = (player1, player2) => {
    if (isBoardEmpty() && player1.playPosition === "Y") {
        printBoard()
    }
    if (player1.playturn) {
        if (isValidPlay(player1.playPosition)) {
            positions[player1.playPosition] = player1.symbol;
            player1.playturn = false;
            player2.playturn = !player1.playturn
            if (checkWin()) {
                return `${player1.name} Win \n Press any key to play again`;
            } else if (checkDraw()) {
                return "Game Draw";
            } else {
                return printBoard();
            }
        } else {
            return `For ${player1.name}: Invalid position, Please choose another one \n` + printBoard();
        }
    } else {
        return `It's ${player2.name} turn \n` + printBoard();
    }
}