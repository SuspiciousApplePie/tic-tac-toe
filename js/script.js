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
	const marker = {
		x: 'X',
		o: 'O',
	}

	function startGame() {
		gameState = true;
		let player1 = createPlayer('Yukino', marker.x);
		let player2 = createPlayer('Charlotte', marker.o);
		return { gameState, player1, player2 } ;
	}

	function endGame() {
		gameState = false;
		return gameState;
	}

	function getState() {
		return gameState;
	}

	return { startGame, endGame, getState };

})();

function createPlayer (name, marker) {
	return { name, marker };
}