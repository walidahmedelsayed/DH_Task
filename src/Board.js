module.exports = positions = {
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

module.exports = isValidPlay = (p) => {
    return positions[p] == ' ' ? true : false;
}


module.exports = isBoardEmpty = () => {
    for (let v of Object.values(positions)) {
        if (v !== " ") {
            return false;
        }
    }
    return true;
}

module.exports = checkDraw = () => {
    for (let v of Object.values(positions)) {
        if (v === " ") {
            return false;
        }
    }
    clearBoard();
    return true;
}

module.exports = printBoard = (positions) => {
    return ('\n' +
        ' ' + positions[1] + ' | ' + positions[2] + ' | ' + positions[3] + '\n' +
        ' ---------\n' +
        ' ' + positions[4] + ' | ' + positions[5] + ' | ' + positions[6] + '\n' +
        ' ---------\n' +
        ' ' + positions[7] + ' | ' + positions[8] + ' | ' + positions[9] + '\n');
}

module.exports = clearBoard = () => {
    for (let value of Object.keys(positions)) {
        positions[value] = " ";
    }
}

module.exports = checkWin = () => {
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