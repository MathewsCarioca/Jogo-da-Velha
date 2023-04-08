// initialize variables
let board = ['', '', '', '', '', '', '', '', ''];
let humanPlayer = 'X';
let computerPlayer = 'O';
let currentPlayer = humanPlayer;
let gameOver = false;

// get DOM elements
let squares = document.querySelectorAll('.square');
let message = document.getElementById('message');
let resetButton = document.getElementById('reset');

// add event listeners to squares and reset button
squares.forEach(square => square.addEventListener('click', makeMove));
resetButton.addEventListener('click', resetGame);

// make move function
function makeMove(event) {
	// check if game is over
	if (gameOver) return;

	// get id of clicked square
	let id = event.target.id;

	// check if square is empty
	if (board[id] === '') {
		// update board array and square text content
		board[id] = currentPlayer;
		event.target.textContent = currentPlayer;

		// check for winner or tie
		if (checkWinner(currentPlayer)) {
			gameOver = true;
			message.textContent = `${currentPlayer} wins!`;
			return;
		} else if (checkTie()) {
			gameOver = true;
			message.textContent = `It's a tie!`;
			return;
		}

		// switch players
		currentPlayer = currentPlayer === humanPlayer ? computerPlayer : humanPlayer;

		// make computer move
		if (currentPlayer === computerPlayer) {
			setTimeout(() => {
				let id = getComputerMove();
				board[id] = currentPlayer;
				squares[id].textContent = currentPlayer;

				// check for winner or tie
				if (checkWinner(currentPlayer)) {
					gameOver = true;
					message.textContent = `${currentPlayer} wins!`;
					return;
				} else if (checkTie()) {
					gameOver = true;
					message.textContent = `It's a tie!`;
					return;
				}

				// switch players
				currentPlayer = currentPlayer === humanPlayer ? computerPlayer : humanPlayer;
			}, 500);
		}
	}
}

// reset game function
function resetGame() {
	// reset variables
	board = ['', '', '', '', '', '', '', '', ''];
	currentPlayer = humanPlayer;
	gameOver = false;

	// reset board and message
	squares.forEach(square => square.textContent = '');
	message.textContent = '';

	// remove hover effect from squares
	squares.forEach(square => square.classList.remove('hover'));
}

// get computer move function
function getComputerMove() {
	// check for winning move
	for (let i = 0; i < board.length; i++) {
		if (board[i] === '') {
			board[i] = computerPlayer;
			if (checkWinner(computerPlayer)) {
				board[i] = '';
				return i;
			}
			board[i] = '';
		}
	}

	// check for blocking move
	for (let i = 0; i < board.length; i++) {
		if (board[i] === '') {
			board[i] = humanPlayer;
			if (checkWinner(humanPlayer)) {
				board[i] = '';
				return i;
			}
			board[i] = '';
		}
	}

	// pick random move
	let emptySquares = [];
	for (let i = 0; i < board.length; i++) {
		if (board[i] === '') {
			emptySquares.push(i);
		}
	}
	let id = emptySquares[Math.floor(Math.random() * emptySquares.length)];
	return id;
}

// check for winner function
function checkWinner(player) {
	// check rows
	for (let i = 0; i < board.length; i += 3) {
		if (board[i] === player && board[i+1] === player && board[i+2] === player) {
			return true;
		}
	}

	// check columns
	for (let i = 0; i < 3; i++) {
		if (board[i] === player && board[i+3] === player && board[i+6] === player) {
			return true;
		}
	}

	// check diagonals
	if (board[0] === player && board[4] === player && board[8] === player) {
		return true;
	}
	if (board[2] === player && board[4] === player && board[6] === player) {
		return true;
	}

	return false;
}

// check for tie function
function checkTie() {
	for (let i = 0; i < board.length; i++) {
		if (board[i] === '') {
			return false;
		}
	}
	return true;
}

// add hover effect to squares
squares.forEach(square => {
	square.addEventListener('mouseover', () => {
		if (square.textContent === '') {
			square.classList.add('hover');
		}
	});
	square.addEventListener('mouseout', () => {
		square.classList.remove('hover');
	});
});

