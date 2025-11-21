const game = (function () {
	let board = [
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

		game.checkWinner(currentPlayer);
	}

	function checkWinCondition(currentPlayer) {
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

	function hasEmptySlot() {
		return board.includes(null);
	}

	function checkWinner(currentPlayer) {
		if (game.checkWinCondition(currentPlayer) === true) {
			console.log(`${currentPlayer.name} wins`);
			gameController.endGame();
		} else if (game.hasEmptySlot() === false) {
			console.log('Tie');
			gameController.endGame();
		} else {
			player.setCurrentPlayer();
		}
	}

	function resetBoard() {
		board = [
				  null, null, null,
				  null, null, null,
				  null, null, null,
				];
	}

	return { getBoard, putPlayerMove, checkWinCondition, hasEmptySlot, resetBoard, checkWinner };
})();

const player = (function () {
	let player1 = null;
	let player2 = null;
	let currentPlayer = {name: null, marker: null,};
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
		if (currentPlayer.marker === player1.marker) {
			currentPlayer = player2;
		} else if ( currentPlayer.marker === player2.marker || !currentPlayer.marker ) {
			currentPlayer = player1;
		}
		return { currentPlayer };
	}

	function getPlayerMove(position) {
		if (gameController.getState() === false) return 'Game havent started yet'; 
		game.putPlayerMove(position - 1, currentPlayer);
	}

	function resetPlayer() {
		player1 = null;
		player2 = null;
		currentPlayer = {name: null, marker: null,};
	}

	return { getPlayer, getPlayerMove, setCurrentPlayer, resetPlayer };
})();


const gameController = (function () {
	let gameState = false;

	function startGame() {
		gameState = true;
		player.getPlayer();
		player.setCurrentPlayer();
	}

	function endGame() {
		gameController.reset();
		gameState = false;
	}

	function reset() {
		game.resetBoard();
		player.resetPlayer();
	}

	function getState() {
		return gameState;
	}

	return { startGame, endGame, getState, reset };

})();

function createPlayer (name, marker) {
	return { name, marker };
}