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
			displayController.displayGameBoard();
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
			const result = `The winner is ${currentPlayer.name}`;
			displayController.displayResult(result);
			displayController.displayPostGameButton();
			gameController.endGame();
		} else if (game.hasEmptySlot() === false) {
			const result = 'Tie';
			displayController.displayResult(result);
			displayController.displayPostGameButton();
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
		game.putPlayerMove(position, currentPlayer);
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
		gameState = false;
	}

	function restartGame () {
		game.resetBoard();
	}

	function reset() {
		game.resetBoard();
		player.resetPlayer();
	}

	function getState() {
		return gameState;
	}

	return { startGame, endGame, getState, reset, restartGame };

})();

const displayController = (function (){
	const container = document.querySelector('.container');
	const main = document.querySelector('main');
	const footer = document.querySelector('footer');
	const marker = {
		x: 'X',
		o: 'O',
	}

	container.addEventListener('click', handleClick);
	generatePlayerNameInput();
	generateTitle();
	generateButton();
	getPlayerName();

	function handleClick(e) {
	 	if (e.target.id === 'startGame') startGame();
	 	else if (e.target.className === 'cell') {
	 		player.getPlayerMove(e.target.dataset.cellSlot);
	 	} else if (e.target.id === 'restart-game') {
	 		gameController.reset();
	 		gameController.startGame();
	 		footer.innerHTML = '';
	 		displayGameBoard();
	 	}
	}

	function startGame() {
		gameController.startGame();
		displayGameBoard();
	}

	function generateTitle() {
		const title = document.createElement('h1');
		title.textContent = 'Tic Tac Toe';
		main.appendChild(title);
	}

	function generateButton() {
		const startButton = document.createElement('button');
		startButton.id = 'startGame'
		startButton.textContent = 'Start';
		main.appendChild(startButton);
	}

	function  generatePlayerNameInput() {
		for (playerNumber = 0; playerNumber < 2; playerNumber++) {
			const nameLabel = document.createElement(`label`);
			nameLabel.htmlFor = `player${playerNumber + 1}`;
			nameLabel.innerText = `Player ${playerNumber + 1}`;


			const nameField = document.createElement('input');
			nameField.type = 'text';
			nameField.className = 'name-field';
			nameField.name = `player${playerNumber + 1}`;
			nameField.id = `player${playerNumber + 1}`;

			main.appendChild(nameLabel);
			main.appendChild(nameField);
		}
	}

	function displayGameBoard() {
		main.innerHTML = '';
		const wrapper = document.createElement('div');
		wrapper.className = 'board-wrapper';

		for (cellNumber = 0; cellNumber <= 8; cellNumber++) {
			let cell = document.createElement('div');
			if (game.getBoard()[cellNumber] === marker.x) {
				cell.textContent = marker.x;
			} else if (game.getBoard()[cellNumber] === marker.o) {
				cell.textContent = marker.o;
			}
			cell.dataset.cellSlot = cellNumber;
			cell.className = 'cell';
			wrapper.appendChild(cell);
		}

		main.appendChild(wrapper);
	}

	function getPlayerName() {
		const player1 = document.querySelector('#player1').value;
		const player2 = document.querySelector('#player2').value;

		return { player1, player2 };
	}

	function displayResult(result) {
		const resultCard = document.createElement('div');
		resultCard.className = 'result-card';
		resultCard.textContent = result;
		footer.appendChild(resultCard);
	}

	function displayPostGameButton() {
		const restartButton = document.createElement('button');
		restartButton.textContent = 'Restart';
		restartButton.className = 'button';
		restartButton.id = 'restart-game'


		const endGameButton = document.createElement('button');
		endGameButton.textContent = 'Back';
		endGameButton.className = 'button';

		footer.appendChild(restartButton);
		footer.appendChild(endGameButton);
	}

	return { getPlayerName, displayGameBoard, displayResult, displayPostGameButton };
})();

function createPlayer (name, marker) {
	return { name, marker };
}