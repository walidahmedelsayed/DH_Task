# DH_Task
This is a tic tac toe game using websocket.
## The game has two interfaces:
#### CMD interface:
   After running the server, you can connect to it using cmd. The project contains wscat package which is used to connect to the server via the following command: wscat -c ws://localhost:3000?type=cmd?name=playerName. After that, you can start playing by choosing the position number.
#### Web browser interface:
   After running the server, you can open index.html file. A prompt will appear to take the player name. After that, you can start playing by clicking the required square.

## The game supports multiplayer option:
A cmd player can play with a web player or another cmd player and the same of the web player.

## The game has spectators feature:
once the game is started after having two players, anyone can join the game as a spectator and watch the game.
