export default function Scoreboard(props) {
    return (
        <div className="scoreboard">
            <p>Rolls : <span>{props.count}</span></p>
            <p>Leaderboard : <span>{props.leaderBoard}</span></p>
        </div>
    )
}