export default function SecondFace(props) {
    const style = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div className="die second-face"
            style={style}
            onClick={props.hold}
        >
            <span className="pip"></span>
            <span className="pip"></span>
        </div>
    )
}