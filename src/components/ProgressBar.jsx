export default function ProgressBar({ percent }) {
  return (
    <div className="progress-track" aria-label="答题进度">
      <div className="progress-fill" style={{ width: `${percent}%` }} />
    </div>
  );
}
