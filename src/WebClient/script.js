let socket = new WebSocket('ws://localhost:3000');
let b = document.getElementById("btn");

b.addEventListener("click", () => {
    socket.send("1");
})