import { useState, useEffect} from "react";
import { nanoid } from "nanoid";
import Confetti from 'react-confetti'
// import { useWindowSize } from "react-use-window-size";
// import Die from "./components/Die"
import FirstFace from "./components/FirstFace";
import SecondFace from "./components/SecondFace";
import ThirdFace from "./components/ThirdFace";
import FourthFace from "./components/FourthFace";
import FifthFace from "./components/FifthFace";
import SixthFace from "./components/SixthFace";
import Scoreboard from "./components/ScoreBoard";

export default function App() {
    const [allDice, setAllDice] = useState(allNewDice)
    const [tenzies, setTenzies] = useState(false)
    const [rollCount, setRollCount] = useState(1)
    let leaderBoard = parseInt(localStorage.getItem('leaderBoard') || 0)

    useEffect(() => {
        const allHeld = allDice.every(die => die.isHeld)
        const firstValue = allDice[0].value
        const allSame = allDice.every(die => die.value === firstValue)
        allHeld && allSame && setTenzies(true) && setLeaderBoard()
    }, [allDice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice() {
        const newDice = [];
        while (newDice.length < 10) {
            newDice.push(generateNewDie())
        }
        return newDice
    }

    function setLeaderBoard() {
        if( leaderBoard === 0 || rollCount < leaderBoard) {
            leaderBoard = rollCount
            localStorage.setItem('leaderBoard', leaderBoard)
        } 
    }
// if won set leaderboard
    tenzies && setLeaderBoard()


    function startNewGame() {
        setRollCount(0)
        setTenzies(false)
        setAllDice(allNewDice())
    }

    function handleClick() {
        tenzies ? startNewGame() : rollDice()
    }

    function rollDice() {
        setRollCount(prevCount => prevCount + 1);
        setAllDice(oldDice => oldDice.map(die => {
            return die.isHeld ?
                die :
                generateNewDie()
        }))
    }


    // function rollDice() {
    //     setAllDice(oldDice => oldDice.map(die => {
    //         return die.isHeld ? die :
    //         {...die, value: Math.ceil(Math.random() * 6)}
    //     }))
    // }

    function holdDice(id) {
        setAllDice(oldDice => oldDice.map(die => {
            return id === die.id ? { ...die, isHeld: !die.isHeld } : die
        }))
    }

    // const diceElemnts = allDice.map(dice => (
    //     // <Die key={dice.id} value={dice.value} isHeld={dice.isHeld} id={dice.id} hold={holdDice} />
    //     <Die key={dice.id} value={dice.value} isHeld={dice.isHeld} hold={() => holdDice(dice.id)} />
    // ))

    const diceElemnts = allDice.map(dice => {
        if (dice.value === 1) {
            return (<FirstFace key={dice.id} value={dice.value} isHeld={dice.isHeld} hold={() => holdDice(dice.id)} />)
        }
        if (dice.value === 2) {
            return (<SecondFace key={dice.id} value={dice.value} isHeld={dice.isHeld} hold={() => holdDice(dice.id)} />)
        }
        if (dice.value === 3) {
            return (<ThirdFace key={dice.id} value={dice.value} isHeld={dice.isHeld} hold={() => holdDice(dice.id)} />)
        }
        if (dice.value === 4) {
            return (<FourthFace key={dice.id} value={dice.value} isHeld={dice.isHeld} hold={() => holdDice(dice.id)} />)
        }
        if (dice.value === 5) {
            return (<FifthFace key={dice.id} value={dice.value} isHeld={dice.isHeld} hold={() => holdDice(dice.id)} />)
        }
        if (dice.value === 6) {
            return (<SixthFace key={dice.id} value={dice.value} isHeld={dice.isHeld} hold={() => holdDice(dice.id)} />)
        }
    })

    return (
        <main className="main">
            {tenzies && <Confetti />}
            <div className="title-bar">
                <h1 className="title">Tenzies</h1>
            </div>
            <Scoreboard count={rollCount} leaderBoard={leaderBoard}/>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="die-conatiner">
                {diceElemnts}
            </div>
            <button
                className="roll-dice"
                onClick={handleClick}>
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}