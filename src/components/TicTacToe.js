import react, {useCallback, useEffect, useState} from "react";
import { useNvigate, useLocation, useNavigate } from "react-router";
import { calculateWinner, isBoardEmpty, getBestMove, getRandomInt } from "../views/utilities";



// components
import Board from "./Board";


export default function TicTacToe () {
    const [players, setPlayers] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const [ board, setBoard ] = useState(Array(9).fill(null));
    const [ isXNext, setIsNext ] = useState(true);

    const winner = calculateWinner(board);

    const isFull = board.filter((square) => square === null).length;
    const isDraw = isFull === 0 && winner === null;
    const status = `Next Player: ${isXNext ? 'X': '0'}`;

    const selectSquare = useCallback((i) => {
        const boardCopy = [...board];
        if (winner || boardCopy[i]) return;
        boardCopy[i] = isXNext ? 'X' : '0';
        setBoard(boardCopy);
        setIsNext(!isXNext);
    }, [board, isXNext, winner]);

    const click = (i) =>{
        
        selectSquare(i);
    };

    useEffect(() => {
        if(
            (players !== null && players.computer === 'X' && isXNext) ||
            (players !== null && players.computer === '0' && !isXNext)
        ){
            const boardCopy = [...board];
            const computer = players.computer;
            const computerMove = isBoardEmpty(boardCopy) ? getRandomInt(0, 8) : getBestMove(boardCopy, computer);

            const timeout = setTimeout(() => {
                selectSquare(computerMove);

            }, 500);
            return () => timeout && clearTimeout(timeout);
        }
    }, [board, isXNext, players, selectSquare]);

    console.log(players);

    

    useEffect(() => {
        
        if (location.state && players === null) {
            console.log('Loation State:' , location.state);
            const player = location.state.player;
            const computer = player === 'X' ? '0' : 'X';
            console.log(player, computer);

            setPlayers({
                human:player,
                computer
            });
        }
    }, [location, players]);

    useEffect(() => {
        if (winner !== null || isDraw) {
            navigate('/game-over', {state: { status: winner ? `Winner: Player ${winner}` : 'Draw!'}});
        }
    }, [navigate, isDraw, status, winner]);

    return location.state ? (
        <div className="wrap">
            <div className="Status">
                <strong>{status}</strong>
            </div>
            <Board squares={board} click={click}/>
        </div>
    ) : (
        <div className="status">
            <strong>
                Oops! You didnt select a player!
            </strong>
        </div>
    );
}