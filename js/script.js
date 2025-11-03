const gameBoard = (function () {
	const board = [
				   null, null, null,
				   null, null, null,
				   null, null, null,
				  ];

	let currentPlayer = 'X';

	function boardState() {
		return board;
	}

	function getCurrentPlayer() {
		return currentPlayer
	}

	function changeCurrentPlayer() {
		currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
	}

	return { boardState, getCurrentPlayer, changeCurrentPlayer };
})();