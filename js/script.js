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

const player = (function () {
	let player1 = null;
	let player2 = null;
	let currentPlayer = null;
	const marker = {
		x: 'X',
		o: 'O',
	}

	function getPlayer() {
		if (gameController.getState().gameState) {
			[ player1, player2 ] = [ createPlayer('Yukino', marker.x), createPlayer('Charlotte', marker.o) ];
			return { player1, player2 };
		} else {
			return 'Game havent started yet';
		}
	}

	function setCurrentPlayer() {
		if (gameController.getState().gameState) {
			if (currentPlayer === player1) {
				currentPlayer = player2;
			} else if ( currentPlayer === player2 || !currentPlayer ) {
				currentPlayer = player1;
			}

			return { currentPlayer };
		} else {
			return 'Game havent started yet';
		}
	}

	function getPlayerMove(position) {
		if (gameController.getState().gameState) {
			game.getBoard()[position - 1] = currentPlayer.marker;
			game.getBoard();
			player.setCurrentPlayer();
		} else {
			return null;
		}
	}

	return { getPlayer, getPlayerMove, setCurrentPlayer };
})();


const gameController = (function () {
	let gameState = false;

	function startGame() {
		gameState = true;
		return { gameState } ;
	}

	function endGame() {
		gameState = false;
		return { gameState };
	}

	function getState() {
		return { gameState };
	}

	return { startGame, endGame, getState };

})();

function createPlayer (name, marker) {
	return { name, marker };
}