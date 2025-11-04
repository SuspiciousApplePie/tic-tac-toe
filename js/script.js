const gameBoard = (function () {
	const board = [
				   null, null, null,
				   null, null, null,
				   null, null, null,
				  ];

	function boardState() {
		return board;
	}

	return { boardState };
})();

function createPlayer(name, side) {
	return { name, side };
}