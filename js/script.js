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

	function startGame() {
		gameState = true;
		return gameState;
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