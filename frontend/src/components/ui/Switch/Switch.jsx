import "./Switch.css"

export default function Switch({ checked, onChange, id = "task-status" }) {
    return (
        <div className="switch-outer">
            <input className="switch-input" type="checkbox" id={id} name="isCompleted" checked={checked} onChange={onChange} />
            <label htmlFor={id} className="switch-track" aria-label="Toggle task completion">
                <span className="switch-thumb"></span>
            </label>
        </div>
    );
}
