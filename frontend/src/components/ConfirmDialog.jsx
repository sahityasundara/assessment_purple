export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="modal">
      <div className="modal-box">
        <p>{message}</p>
        <button className="danger" onClick={onConfirm}>Yes</button>
        <button className="secondary" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}
