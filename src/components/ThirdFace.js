export default function ThirdFace(props) {
    const style = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div className="die third-face"
            style={style}
            onClick={props.hold}
        >
            <span className="pip"></span>
            <span className="pip"></span>
            <span className="pip"></span>
        </div>
    )
}