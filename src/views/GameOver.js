import react from "react";
import { useLocation } from "react-router";


export default function GameOver() {
    const location = useLocation();
    const status = location.state ? location.state.status : `Oops you didnt play the game` 
    return(
        <div className="wrap">
            <div className="status">
                <strong>GAME OVER</strong>
            </div>
        </div>
    )
}