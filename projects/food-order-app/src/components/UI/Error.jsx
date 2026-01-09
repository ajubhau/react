import Modal from "./Modal";

export default function Error({label, message}) {
    return <div className="error">
        <h2>{label}</h2>
        <p>{message}</p>
    </div>
}