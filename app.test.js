describe('app', () => {
    let player1;
    let player2;


    it('User Connect succssfully with the right name', (done) => {
        player1 = new WebSocket("ws://localhost:3000?type=web?name=Player1");
        player1.onmessage = (msg) => {
            console.log(msg.data)
            expect(JSON.parse(msg.data).message).toEqual(`Welcome Player1 to the Game: \nYour symbol is X`);
            player1.close();
        }

        player1.onclose = () => done();

    });

    it('Right Symbol for each Player', (done) => {

        player1 = new WebSocket("ws://localhost:3000?type=web?name=Player1");
        player2 = new WebSocket("ws://localhost:3000?type=web?name=Player2");


        player2.onmessage = (msg) => {
            expect(JSON.parse(msg.data).message).toEqual(`Welcome Player2 to the Game: \nYour symbol is O`);
            player1.close();
            player2.close();
        }
        player1.onclose = () => done();

    });

});