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

	function putPlayerMove(position, marker) {
		if (gameController.getState() === false) return 'Game havent started yet'; 
		if (position < 0 || position > 8) {
			console.log('Out of range');
		} else if (board[position] !== null) {
			console.log('taken');
		} else {
			board[position] = marker;
			player.setCurrentPlayer();
			console.log(board);
		}
	}

	return { getBoard, putPlayerMove };
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
		game.putPlayerMove(position - 1, currentPlayer.marker);
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