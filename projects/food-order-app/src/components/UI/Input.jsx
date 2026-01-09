export default function Input({label, error, ...props}) {
    return (
        <div className="control">
            <label>{label}</label>
            <input {...props} />
            {error && <div className="error">{error}</div>}
        </div>
    )
}