import react from "react"
import "./Switch.css"

export default function Switch() {
    return (
        <div className="outer">
            <input type="checkbox" id="inp" name="switch" />
            <label htmlFor="inp" id="RLabel">
                <span htmlFor="inp" id="CLabel">
                    <span htmlFor="inp" id="ILabel"></span>
                </span>
            </label>
        </div>
    );
}