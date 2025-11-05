const game = (function () {
	const board = [
				   null, null, null,
				   null, null, null,
				   null, null, null,
				  ];

	function getBoard() {
		return board;
	}

	return { getBoard };
})();


const gameController = (function () {
	let gameState = false;
	let player1 = null;
	let player2 = null;
	let currentPlayer = null;
	const marker = {
		x: 'X',
		o: 'O',
	}

	function startGame() {
		gameState = true;
		return { gameState } ;
	}

	function endGame() {
		gameState = false;
		return gameState;
	}

	function getState() {
		return gameState;
	}

	function makeMatch() {
		[ player1, player2 ] = [ createPlayer('Yukino', marker.x), createPlayer('Charlotte', marker.o) ];
		return { player1, player2 }; 
	}

	return { startGame, endGame, getState, makeMatch };

})();

function createPlayer (name, marker) {
	return { name, marker };
}