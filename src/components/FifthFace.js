export default function FifthFace(props) {
    const style = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div className="die fifth-face"
            style={style}
            onClick={props.hold}
        >
            <div className="column">
                <span className="pip"></span>
                <span className="pip"></span>
            </div>
            <div className="column">
                <span className="pip"></span>
            </div>
            <div className="column">
                <span className="pip"></span>
                <span className="pip"></span>
            </div>
        </div>
    )
}
