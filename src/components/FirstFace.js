export default function FirstFace(props) {
    const style = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div className="first-face die"
            style={style}
            onClick={props.hold}
        >
            <span className="pip"></span>
        </div>
    )
}
