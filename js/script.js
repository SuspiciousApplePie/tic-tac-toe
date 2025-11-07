const game = (function () {
	const board = [
				   null, null, null,
				   null, null, null,
				   null, null, null,
				  ];

	function getBoard() {
		if (gameController.getState() === false) return 'Game havent started yet'; 
		return board;
	}

	function putPlayerMove(position, currentPlayer) {
		if (gameController.getState() === false) return 'Game havent started yet'; 
		if (position < 0 || position > 8) {
			return 'out of range';
		} else if (board[position] !== null) {
			return 'taken';
		} else {
			board[position] = currentPlayer.marker;
			console.log(board);
		}

		if (game.checkWin(currentPlayer) === true) {
			 console.log(`${currentPlayer.name} wins`);
		} else {
			player.setCurrentPlayer();
		}
	}

	function checkWin(currentPlayer) {
		// Vertical
		if (board[0] === currentPlayer.marker && board[3] === currentPlayer.marker && board[6] === currentPlayer.marker) {
			return true;
		} else if (board[1] === currentPlayer.marker && board[4] === currentPlayer.marker && board[7] === currentPlayer.marker) {
			return true;
		} else if (board[2] === currentPlayer.marker && board[5] === currentPlayer.marker && board[8] === currentPlayer.marker) {
			return true;
		// Horizontal
		} else if (board[0] === currentPlayer.marker && board[1] === currentPlayer.marker && board[2] === currentPlayer.marker) {
			return true;
		} else if (board[3] === currentPlayer.marker && board[4] === currentPlayer.marker && board[5] === currentPlayer.marker) {
			return true;
		} else if (board[6] === currentPlayer.marker && board[7] === currentPlayer.marker && board[8] === currentPlayer.marker) {
			return true;
		// Diagoonal
		} else if (board[0] === currentPlayer.marker && board[4] === currentPlayer.marker && board[8] === currentPlayer.marker) {
			return true;
		} else if (board[2] === currentPlayer.marker && board[4] === currentPlayer.marker && board[6] === currentPlayer.marker) {
			return true;
		} else {
			return false;
		}
	}

	return { getBoard, putPlayerMove, checkWin };
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
		if (gameController.getState() === false) return 'Game havent started yet'; 
		[ player1, player2 ] = [ createPlayer('Yukino', marker.x), createPlayer('Charlotte', marker.o) ];
	}

	function setCurrentPlayer() {
		if (gameController.getState() === false) return 'Game havent started yet';
		if (currentPlayer === player1) {
			currentPlayer = player2;
		} else if ( currentPlayer === player2 || !currentPlayer ) {
			currentPlayer = player1;
		}

		return { currentPlayer };
	}

	function getPlayerMove(position) {
		if (gameController.getState() === false) return 'Game havent started yet'; 
		game.putPlayerMove(position - 1, currentPlayer);
	}

	return { getPlayer, getPlayerMove, setCurrentPlayer };
})();


const gameController = (function () {
	let gameState = false;

	function startGame() {
		gameState = true;
	}

	function endGame() {
		gameState = false;
	}

	function getState() {
		return gameState;
	}

	return { startGame, endGame, getState };

})();

function createPlayer (name, marker) {
	return { name, marker };
}