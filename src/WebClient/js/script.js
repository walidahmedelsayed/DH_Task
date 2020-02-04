const ws = new WebSocket('ws://localhost:3000?type=web?name=web');
let images = document.getElementsByClassName("positions");
const drawBoard = (data) => {

    Array.prototype.forEach.call(images, img => {
        if (data[img.id] === "X") {
            img.src = "./images/x.png"
        } else if ((data[img.id] === "O")) {
            img.src = "./images/o.jpg"
        }

    });
}

Array.prototype.forEach.call(images, img => {
    img.addEventListener("click", () => {
        ws.send(img.id);
        drawBoard(images);
    })
});

ws.onmessage = function (event) {
    let {
        message,
        positions
    } = JSON.parse(event.data)
    return drawBoard(positions);
}