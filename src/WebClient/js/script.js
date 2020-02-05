const name = prompt("Please Enter Your Name");
const ws = new WebSocket(`ws://localhost:3000?type=web?name=${name}`);
let images = document.getElementsByClassName("positions");
let msg = document.getElementById("msg");

document.getElementById("playerName").innerHTML = `Player Name: ${name}`;

Array.prototype.forEach.call(images, img => {
    img.addEventListener("click", () => {
        ws.send(img.id);
    })
});
const drawBoard = (positions) => {

    Array.prototype.forEach.call(images, img => {
        if (positions[img.id] === "X") {
            img.src = "./images/x.png"
        } else if ((positions[img.id] === "O")) {
            img.src = "./images/o.jpg"
        } else {
            img.src = "./images/background.png"
        }

    });
}
const clearBoard = (positions) => {
    for (let value of Object.keys(positions)) {
        positions[value] = " ";
    }
}


ws.onmessage = (event) => {

    let {
        message,
        positions
    } = JSON.parse(event.data)
    msg.innerHTML = message;
    return drawBoard(positions);
}