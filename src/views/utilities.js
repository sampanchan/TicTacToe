const isBoardEmpty = (squares) => {
    return squares.filter((square) => square === null).length === 9;

};

const isBoardFull = (squares) => {
    return squares.filter((square) => square === null).length === 0;
}

const getRandomInt = (min, max) => {
    min= Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
};

const calculateWinner = (squares) => {
    const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

    for (let i = 0; i < lines.length; i++){
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
        }
    }

    return null;
}

const getBestMove = (squares, player) => {
    const opponent = player === 'X' ? '0' : 'X';

    const minimax = (squares, isMax) => {
        const winner = calculateWinner(squares);

        //if a player wins = +1
        if (winner === player) return { square: -1, score: 1};

        // if the opponent wins, score is -1
        if(winner === opponent) return { square: -1, score: -1};

        // if tie then score is 0
        if(isBoardFull(squares)) return { square: -1, score: 0};

        // intialize the 'best' move; 
        const best = { square: -1, score: isMax ? -1000 : 1000};

        // loop through every square on board
        for (let i = 0; i < squares.length; i++){
            // if squares is already filled, its null and skip it
            if(squares[i]){
                continue;
            }

            //if square is unfilled then it is valid move. play square
            squares[i] = isMax ? player: opponent;

            //simulate the game until the end of game and get the score
            //recure minMax
            const score = minimax(squares, !isMax).score

            //undo move
            squares[i] = null;

            if (isMax){
                //maximizing player: track largest score
                if (score > best.score){
                    best.score = score;
                    best.square = i
                }  
            } else {
                //minimizing player: track smallest score
                if (score < best.score){
                    best.score = score;
                    best.square = i
                }
            }

        }
        //the best score
        return best;
    }

    return minimax(squares, true).square;
}

export{
    isBoardEmpty,
    isBoardFull,
    getRandomInt,
    calculateWinner,
    getBestMove
}