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

function setGame() {
	const role = {
		x: 'X',
		o: 'O',
	}

	function makeMatch () {
		let name1 = prompt('1');
		let playerOne = createPlayer(name1, role.x);

		let name2 = prompt('2');
		let playerTwo = createPlayer(name2, role.o);

		return { playerOne, playerTwo };
	}

	return { makeMatch };
}