import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from 'react-confetti'
// import { useWindowSize } from "react-use-window-size";
import Die from "./components/Die"


export default function App() {
    const [allDice, setAllDice] = useState(allNewDice)
    const [tenzies, setTenzies] = useState(false)
    // const { width, height } = useWindowSize()

    useEffect(() => {
        const allHeld = allDice.every(die => die.isHeld)
        const firstValue = allDice[0].value
        const allSame = allDice.every(die => die.value === firstValue)
        allHeld && allSame && setTenzies(true)

    }, [allDice])

    // function confetti() {
    //     const { width, height } = useWindowSize()
    //     return (
    //         <Confetti
    //             width={width}
    //             height={height}
    //         />
    //     )
    // }

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
        console.log(newDice)
        return newDice
    }

    function startNewGame() {
        setTenzies(false)
        setAllDice(allNewDice()) 
    }

    function handleClick() {
        tenzies ? startNewGame() : rollDice() 
    }

    function rollDice() {
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


    const diceElemnts = allDice.map(dice => (
        // <Die key={dice.id} value={dice.value} isHeld={dice.isHeld} id={dice.id} hold={holdDice} />
        <Die key={dice.id} value={dice.value} isHeld={dice.isHeld} hold={() => holdDice(dice.id)} />

    ))

    return (
        <main className="main">
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
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